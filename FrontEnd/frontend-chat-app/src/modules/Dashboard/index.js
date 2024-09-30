import { useNavigate } from 'react-router-dom';
import DashboardLeftSide from '../../components/DashboardLeftSide';
import DashboardMiddle from '../../components/DashboardMiddle';
import DashboardRightSide from '../../components/DashboardRightSide';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Dashboard = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if(!user){
            navigate("/users/login");
        }
    },[user, navigate]);

  return (
    <div className='w-screen flex overflow-hidden'>
        <DashboardLeftSide/>
        <DashboardMiddle/>
        <DashboardRightSide/>
    </div>
  )
}

export default Dashboard;