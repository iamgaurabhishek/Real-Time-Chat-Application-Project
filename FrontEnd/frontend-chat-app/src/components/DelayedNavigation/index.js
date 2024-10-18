import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const DelayedNavigation = ({ delayTime, to, clearMessage}) => {
    const navigate = useNavigate();
    useEffect(()=> {
        const timer = setTimeout(()=>{
            navigate(to); // Navigate to the specified route
            clearMessage();
        }, delayTime);

        return () => clearTimeout(timer);
    },[delayTime, to, navigate, clearMessage]);

    // Cleanup the timer if the component unmounts or state changes
    return null;
}

export default DelayedNavigation;