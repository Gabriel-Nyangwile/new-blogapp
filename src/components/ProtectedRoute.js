import React from 'react';
import {Navigate } from 'react-router';
import { useAuth } from '../contexte/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (user) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
import React from 'react';
import {Navigate } from 'react-router';
import { useAuth } from '../contexte/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (user) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;