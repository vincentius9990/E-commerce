import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/admin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      // Map over the data and add an 'id' property to each row
      const updatedUsers = response.data.map((user, index) => ({
        ...user,
        id: user._id // Assuming '_id' is the unique identifier
      }));
      setUsers(updatedUsers);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, [token]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'fname', headerName: 'First name', width: 150, editable: true },
    { field: 'lastname', headerName: 'Last name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 500, editable: true }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Users;
