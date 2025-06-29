import React, { useState, useEffect } from 'react';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the API response is successful
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        // Store error message in state instead of logging
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>Failed to fetch posts. {error}</p>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '1rem' }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}

export default BlogPosts;
