import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className="fixed top-4 left-4 right-4 z-50 bg-blue-50/20 backdrop-blur-lg border border-slate-100 text-black flex justify-between px-6 py-4 rounded-xl items-center h-24">
            <div className="logo text-2xl font-extrabold">
                <Link href={'/'}>CUS<span className="text-blue-500">GRO</span></Link>
            </div>

            <div className="right-bar flex items-center space-x-6 font-[500]">
                <ul className="pages flex items-center space-x-2 text-black">
                    <li>
                        <Link href="/pricing" className="hover:bg-blue-100/30 hover:text-blue-700 px-4 py-3 rounded-full">Pricing</Link>
                    </li>
                    {/* <li className="relative group">
                        <div className="cursor-pointer hover:bg-blue-100/30 hover:text-blue-700 px-4 py-3 rounded-full flex">Resources <ChevronDown /></div>
                        <div className="absolute top-6 right-0 w-60 h-16 hidden group-hover:block"></div>
                        <ul className="absolute hidden group-hover:flex flex-col top-20 right-0 z-50 bg-white shadow-md text-black w-60 px-4 py-4 rounded-xl space-y-2">
                            <li>
                                <Link href="/about" className="hover:bg-slate-100 px-4 py-3 flex rounded-full"> <Fingerprint className='' /><span className='ml-2'>About Us</span></Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:bg-slate-100 px-4 py-3 flex rounded-full"><Info className='' /><span className='ml-2'>Help Center</span></Link>
                            </li>
                            <li>
                                <Link href="/demos" className="hover:bg-slate-100 px-4 py-3 flex rounded-full"><Play className='' /><span className='ml-2'>Demos</span></Link>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li>
                        <Link href="/pricing" className="hover:bg-blue-100/30 hover:text-blue-700 px-4 py-3 rounded-full">Login</Link>
                    </li> */}
                    <li>
                        <Link href="/contact" className="hover:bg-blue-100/30 hover:text-blue-700 px-4 py-3 rounded-full">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
