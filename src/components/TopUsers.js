import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setUsers(sorted);
      })
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>Top Users</Typography>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} md={6} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">Posts: {user.postCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TopUsers;