import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar';
import NoChatContainer from '../components/NoChatContainer';
import ChatContainer from '../components/ChatContainer';


const HomePage = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className='h-screen bg-base-100'>
      <div className='flex justify-center items-center pt-20 px-4'>
          <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
              <div className='flex h-full rounded-lg overflow-hidden'>
                <SideBar />

                {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
              </div>
          </div>
      </div>
    </div>
  )
}

export default HomePage;