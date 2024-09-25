import Avatar from "../../assets/Avatar1.png"
const DashboardMiddle = () => {
  return (
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
        <div className='h-[75%] w-full overflow-y-scroll shadow-md'>
            <div className='p-10'>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
                <div className='max-w-[45%] bg-gray-500 rounded-b-xl rounded-tr-xl p-4 text-white mb-6'>Hi there? How are you I was hoping you are pretty well. When can we meet next?</div>
                <div className='max-w-[45%] bg-sky-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>I am doing well, how about you? Lemme check my next week schedule we can meet any weekday after office.</div>
            </div>
        </div>
        <div className="left-0 w-full p-4 bg-white">
            <div className="flex items-center justify-between">
                <input
                type="text"
                placeholder="Type your message..."
                className="w-[80%] p-3 rounded-md focus:outline-none shadow-xl bg-blue-100 outline-none"
                />
                <div className="mr-[5%] cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                </div>
                <div className="mr-[5%] cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardMiddle
