import Avatar from '../../assets/Avatar1.png';
const Dashboard = () => {

    const contacts = [
        {
            name: 'John',
            status: 'Active',
            img: Avatar
        },
        {
            name: 'Mary',
            status: 'Inactive',
            img: Avatar
        },
        {
            name: 'Alexander',
            status: 'Active',
            img: Avatar
        },
    ]

  return (
    <div className='w-screen flex'>
      <div className='w-[25%] border border-black h-screen bg-white'>
        <div className='flex justify-center items-center my-8'>
            <div className='border border-primary-color p-2 rounded-full'><img src={Avatar} width={50} height={50}/></div>
            <div className='ml-8'>
                <h3 className='text-2xl'>Tutorials Dev</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
        <hr className='bg-black'/>
        <div>
            <div>Messages</div>
        </div>
      </div>
      <div className='w-[50%] border border-black h-screen'></div>
      <div className='w-[25%] border border-black h-screen'></div>
    </div>
  )
}

export default Dashboard;