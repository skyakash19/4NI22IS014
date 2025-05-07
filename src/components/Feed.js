import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box } from '@mui/material';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        const sorted = response.data.sort((a, b) => b.id - a.id); // newest first
        setPosts(sorted);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // load once

    const interval = setInterval(fetchPosts, 5000); // refresh every 5 sec
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Live Feed
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} sx={{ my: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{post.content}</Typography>
            <Typography variant="body2" color="text.secondary">
              Comments: {post.comments}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Feed;
