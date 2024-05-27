import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Users from './Users';
import Sidebar from './Sidebar';

const Admin = () => {
  return (
    <>
      <Users data={users} />
      <Sidebar />
    </>
  );
};

export default Admin;
