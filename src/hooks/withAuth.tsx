import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {auth} from '../utils/firebase';
import CustomSpinner from '../components/spinner';
import {useLocation} from 'react-router-dom';

function withAuth<T>(Component: React.ComponentType<T>) {
  const WithAuth: React.FC<T> = (props: T) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (loading) {
      return (<CustomSpinner />);
    }

    return authenticated ? location.pathname === '/main' ? <Navigate to="/main" /> : <Component {...props} /> : <Navigate to="/main" />;
  };

  return WithAuth;
}

export default withAuth;
