import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../../Utils/isAuthAdmin';

function AdminPrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState({
    is_authenticated: false,
    is_admin: false,
  });
  

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthAdmin();
      console.log(authInfo);
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!isAuthenticated.is_authenticated)
  {
    return <Navigate to="/admin/login" />;
  }

  console.log('aaaaaaaaaaaaaaaa------',isAuthenticated.is_admin)

  
  if ((!isAuthenticated.is_admin)) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default AdminPrivateRoute;
