import Image from 'next/image'
import React from 'react'

export const FeaturesCard = () => {
  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1200px] items-center justify-center mx-auto py-20'>
        <h2 className='text-center text-3xl font-[500] mb-10'>AI Sale Copilot To make your life easier</h2>
        <div className="cards grid md:grid-cols-3 gap-4 mx-6">
          <div className="card bg-zinc-900/50 p-8 w-full rounded-2xl">
            <div className="h-[72%] flex items-center justify-center">
              <Image className='w-full' src={"/lead_research_.png"} alt='Lead Research' width={1280} height={0} />
            </div>
            <div className="">

            <h3 className='text-lg font-semibold text-[#e4e4e7]'>Lead Research</h3>
            <p className='text-gray-500 mt-2'>AI-powered comprehensive lead research and prospect identification, gathering deep insights and contact information in minutes.</p>
            </div>
          </div>
          <div className="card bg-zinc-900/50 p-8 w-full rounded-2xl">
            <div className="h-[72%] flex items-center justify-center">
              <Image className='w-full' src={"/live_call_.png"} alt='Lead Research' width={1280} height={0} />
            </div>
            <div className="">

            <h3 className='text-lg font-semibold text-[#e4e4e7]'>Live Call Assist</h3>
            <p className='text-gray-500 mt-2'>Real-time AI guidance during sales calls, providing instant insights, objection handling, and conversation optimization.</p>
            </div>
          </div>
          <div className="card bg-zinc-900/50 p-8 w-full rounded-2xl">
            <div className="h-[72%] flex items-center justify-center">
              <Image className='w-full' src={"/smart_call_.png"} alt='Lead Research' width={1280} height={0} />
            </div>
            <div className="">

            <h3 className='text-lg font-semibold text-[#e4e4e7]'>Post-Call Management</h3>
            <p className='text-gray-500 mt-2'>Auto CRM updates and hyper-personalized follow-ups generated instantly after each call to maximize conversion rates.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
