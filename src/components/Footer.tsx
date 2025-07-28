import Link from 'next/link';
import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <>
            <footer className='bg-[#1a1a1a] text-white py-6'>
                <div className="text-center mx-auto pt-10">
                    <h3 className='mt-5 text-2xl font-semibold'>Try out the next gen AI Sales Co-Pilot</h3>
                    <p className='text-slate-400 mt-2'>
                        Join the waitlist now to get early access and an exclusive discount on our all-in-one AI app—fully managed or self-hosted, your choice!
                    </p>
                    <Link href={'#join'}>
                        <button className='bg-[#242424] shadow-2xl px-4 py-3 mt-6 rounded-lg font-semibold cursor-pointer'>
                            Join Waitlist
                        </button>
                    </Link>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="https://twitter.com/cusgro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/company/cusgro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-slate-500 text-sm">@CUSGRO 2025</p>
                </div>
            </footer>
        </>
    )
}
