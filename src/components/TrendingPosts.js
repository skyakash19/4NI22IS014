import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then((res) => {
        const posts = res.data;
        const maxComments = Math.max(...posts.map(post => post.comments));
        const topPosts = posts.filter(post => post.comments === maxComments);
        setTrendingPosts(topPosts);
      })
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>Trending Posts</Typography>
      <List>
        {trendingPosts.map(post => (
          <ListItem key={post.id}>
            <ListItemText primary={post.content} secondary={`Comments: ${post.comments}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TrendingPosts;