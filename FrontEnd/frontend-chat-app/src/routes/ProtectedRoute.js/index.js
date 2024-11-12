import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged} from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../../redux/slice/authSlice';
import LoadingSpinner from '../../components/Loading';

const ProtectedRoute = ({ element: Component, auth= false}) => {

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if(user) {
                dispatch(loginSuccess(user));
                // setIsAuthenticated(true);
            }
            else{
                dispatch(logoutSuccess());
                // setIsAuthenticated(false);
            }
            setLoading(false);
        });
        return () => unsubscribe; 
    },[dispatch]);

    if(loading){
        return <LoadingSpinner />;
    }

  return isAuthenticated ? <Component /> : <Navigate to="/users/login" />;
}

export default ProtectedRoute;