import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedSpeakerRoute = ({ children }) => {
     const { user, loading } = useAuth();

     if (loading) {
          return (
               <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
               </div>
          )
     }

     if (!user || user.role !== 'speaker') {
          return <Navigate to="/speaker/login" />;
     }

     return children;
};

export default ProtectedSpeakerRoute;
