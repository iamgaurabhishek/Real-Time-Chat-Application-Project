import Avatar from "../../assets/Avatar1.png"

const DashboardLeftSide = () => {

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
        {
            name: 'Dawn',
            status: 'Active',
            img: Avatar
        },
        {
            name: 'Joy',
            status: 'Inactive',
            img: Avatar
        },
        {
            name: 'Sean',
            status: 'Inactive',
            img: Avatar
        },
    ]
  return (
    <div>
      <div className='flex justify-center items-center my-8'>
            <div className='border border-primary-color p-2 rounded-full'><img src={Avatar} width={50} height={50}/></div>
            <div className='ml-8'>
                <h3 className='text-2xl'>Tutorials Dev</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
        <hr className='bg-black'/>
        <div className='mx-10 mt-10'>
            <div className='text-primary-color text-xl'>Messages</div>
            <div className='mt-10'>
                {
                    contacts.map(contact =>{
                        return <div key={contact.name} className='flex justify-between items-center my-4'>
                            <div className='flex items-center cursor-pointer'>
                                <img src={contact.img} width={30} height={30} className='rounded-full mr-4'/>
                                <p>{contact.name}</p>
                            </div>
                            <p className='text-gray-500'>{contact.status}</p>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default DashboardLeftSide
