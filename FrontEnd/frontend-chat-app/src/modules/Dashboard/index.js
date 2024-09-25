import Avatar from '../../assets/Avatar1.png';
import DashboardLeftSide from '../../components/DashboardLeftSide';
import DashboardMiddle from '../../components/DashboardMiddle';
import DashboardRightSide from '../../components/DashboardRightSide';
const Dashboard = () => {

  return (
    <div className='w-screen flex overflow-hidden'>
        <DashboardLeftSide/>
        <DashboardMiddle/>
        <DashboardRightSide/>
    </div>
  )
}

export default Dashboard;