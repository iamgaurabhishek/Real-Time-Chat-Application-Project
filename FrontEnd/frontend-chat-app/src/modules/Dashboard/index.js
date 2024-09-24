import Avatar from '../../assets/Avatar1.png';
import DashboardLeftSide from '../../components/DashboardLeftSide';
const Dashboard = () => {

  return (
    <div className='w-screen flex'>
      <div className='w-[25%] border h-screen bg-white'>
        <DashboardLeftSide/>
      </div>
      <div className='w-[50%] border h-screen bg-light flex flex-col items-center'>
        <div className='w-[75%] bg-primary-light h-[80px] mt-10 rounded-full flex items-center justify-between px-6'>
            <div className="flex items-center space-x-4">
            <img src={Avatar} width={70} height={70} className="rounded-full cursor-pointer" />
            <div>
                <h3 className='text-lg font-semibold'>Dawn</h3>
                <p className='text-gray-500'>Online</p>
            </div>
            </div>
            <div className='ml-auto cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 9l5 -5" />
                <path d="M16 4l4 0l0 4" />
            </svg>
            </div>
        </div>
        <div className='h-[75%] border w-full overflow-y-scroll'>
            <div className='h-[1000px] px-10 py-10'>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
            </div>
        </div>
    </div>
      <div className='w-[25%] border h-screen'></div>
    </div>
  )
}

export default Dashboard;