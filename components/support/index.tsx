import React from 'react'

const SupportPage = () => {
  const el = document.getElementById('messages')
  // el?.scrollTop = el?.scrollHeight

  const support = [
    {
      id: 1,
      text: "Hi there! I am wondering if you can help me with a problem I've been having.",
    },
    {
      id: 2,
      text: "Oh, hey. I'm not sure, but I'll do my best.",
    },
    {
      id: 3,
      text: "I've been trying to install this package but it's not working and I don't know why.",
    },
    {
      id: 4,
      text: 'What package are you trying to install?',
    },
    {
      id: 5,
      text: "It's called @vue/devtools",
    },
    {
      id: 6,
      text: "Oh, I think I know what's going on. Give me a second and I'll get back to you.",
    },
    {
      id: 7,
      text: 'Okay, thank you!',
    },
    {
      id: 8,
      text: "Okay, I'm back. Are you using npm or yarn?",
    },
    {
      id: 9,
      text: "I'm using npm.",
    },
    {
      id: 10,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
    },
    {
      id: 11,
      text: "Okay, I'll try that.",
    },
    {
      id: 12,
      text: 'Did that work?',
    },
    {
      id: 13,
      text: "No, it didn't. I'm still getting the same error.",
    },
    {
      id: 14,
      text: "Okay, I'm not sure what's going on. Let me do some research and I'll get back to you.",
    },
    {
      id: 15,
      text: 'Okay, thank you!',
    },
    {
      id: 16,
      text: "Okay, I'm back. Are you using npm or yarn?",
    },
    {
      id: 17,
      text: "I'm using npm.",
    },
    {
      id: 18,
      text: 'Okay, try running this command: npm install -g @vue/devtools',
    },
  ]

  return (
    <div className='w-[800px] flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-chat-bg bg-gray-300'>
      <div
        id='messages'
        className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
      >
        {/* <div>
          <div className='flex items-end'>
            <div className='flex flex-col space-y-2 text-sm max-w-2xl mx-2 order-2 items-start'>
              <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#59AFFF] text-black'>
                Can be verified on any platform using docker
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-end justify-end'>
            <div className='flex flex-col space-y-2 text-sm max-w-2xl mx-2 order-1 items-end'>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-100 text-black '>
                  Your error message says permission denied, npm global installs
                  must be given root privileges.
                </span>
              </div>
            </div>
          </div>
        </div> */}

        {support.map((message, index) => (
          <div
            key={index}
            className={`flex items-end ${
              index % 2 === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex flex-col text-sm max-w-2xl mx-2 ${
                index % 2 === 0 ? 'order-1 items-end' : 'order-2 items-start'
              } `}
            >
              <span className='text-xs'>12:00pm</span>
              <span
                className={`px-4 py-2 rounded-md inline-block text-black shadow-md ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-[#59AFFF]'
                }`}
              >
                {message.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='border-t-2 border-gray-400 px-4 pt-4 mb-2 sm:mb-0'>
        <div className='relative flex flex-col bg-gray-300 rounded-md'>
          <input
            type='text'
            placeholder='Write your message!'
            className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-300 rounded-md py-3'
          />
          <div className='w-full flex items-center justify-between'>
            <div>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-6 w-6 text-gray-600'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                  ></path>
                </svg>
              </button>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='h-6 w-6 text-gray-600'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </button>
            </div>
            <button
              type='button'
              className='px-4 py-3 text-gray-500 focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-6 w-6 ml-2 transform rotate-90'
              >
                <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
