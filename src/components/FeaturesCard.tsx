import Image from 'next/image'
import React from 'react'

export const FeaturesCard = () => {
  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1200px] items-center justify-center mx-auto py-20'>
        <h2 className='text-center text-3xl font-[500] mb-10'>AI Sale Copilot To make your life easier</h2>
        <div className="cards grid md:grid-cols-3 gap-4 mx-6">
          <div className="card bg-white p-8 w-full rounded-2xl">
            <Image className='w-full' src={"/lead_research.png"} alt='Lead Research' width={1280} height={0} />
            <h3 className='text-lg font-semibold'>Lead Research</h3>
            <p className='text-gray-600'>Use AI agent to find relevant information about your leads as they come in.</p>
          </div>
          <div className="card bg-white p-8 w-full rounded-2xl">
            <Image className='w-full' src={"/live_call.png"} alt='Lead Research' width={1280} height={0} />
            <h3 className='text-lg font-semibold'>Live Call Assist</h3>
            <p className='text-gray-600'>Use AI agent to find relevant information about your leads as they come in.</p>
          </div>
          <div className="card bg-white p-8 w-full rounded-2xl">
            <Image className='w-full' src={"/smart_call.png"} alt='Lead Research' width={1280} height={0} />
            <h3 className='text-lg font-semibold'>Smart Call Notes</h3>
            <p className='text-gray-600'>Use AI agent to find relevant information about your leads as they come in.</p>
          </div>
          <div className="card bg-white p-8 w-full rounded-2xl">
            <Image className='w-full' src={"/follow_up_email.png"} alt='Lead Research' width={1280} height={0} />
            <h3 className='text-lg font-semibold'>Follow-up Emails</h3>
            <p className='text-gray-600'>Use AI agent to find relevant information about your leads as they come in.</p>
          </div>
          <div className="card bg-white p-8 w-full rounded-2xl">
            <Image className='w-full' src={"/performance.png"} alt='Lead Research' width={1280} height={0} />
            <h3 className='text-lg font-semibold'>Performance Analytics</h3>
            <p className='text-gray-600'>Use AI agent to find relevant information about your leads as they come in.</p>
          </div>
        </div>
      </div>
    </>
  )
}
