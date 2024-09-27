import React, { Component, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged} from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
const ProtechedRoute = ({ element: Component}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if(user) {
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
            setLoading(false);
        });
        return () => unsubscribe; 
    },[]);

    if(loading){
        return <div>Loading...</div>
    }

  return isAuthenticated ? <Component /> : <Navigate to="/users/login" />;
}

export default ProtechedRoute;
