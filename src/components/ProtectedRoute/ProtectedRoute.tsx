import React from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  Component: React.FC;
  isLogged: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component, isLogged, ...props }) => (isLogged ? (
  <Component {...props} />
) : (
  <Navigate to="/sign-in" />
));

export default ProtectedRoute;