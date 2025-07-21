

import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mt-32">
        <h1 className="text-5xl font-bold">Your Ultimate AI Sales Co-Pilot</h1>
        <p className="w-[70%] mx-auto mt-4 text-gray-500">Close more deals in less time. Automates lead research, guides your sales calls in real-time, and handles post-call follow-ups so you never miss a lead again!</p>
        <form className="mt-8">
          <div className="flex justify-center">
            <input className="outline-none w-80 border-l border-t border-b border-slate-100 rounded-l-full px-4 py-[10px]" type="text" placeholder="Enter Your Email" />
            <div className="border-r border-t border-b border-slate-100 rounded-r-full px-1 py-1">
              <button type="button" className="bg-purple-500 px-4 py-2 rounded-full text-white font-bold cursor-pointer">Submit</button>
              <button type="submit" className="bg-purple-500 px-4 py-2 rounded-full text-white font-bold cursor-pointer hidden">Submit</button>
            </div>
          </div>
        </form>
        <VideoPlayer />
      </div>
    </main>
  );
}
