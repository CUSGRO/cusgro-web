"use client";
import { ArrowRight, CheckCircle, LucideIcon, Mail, Sparkles, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Russo_One } from 'next/font/google';
import HeroAnim from '@/components/HeroAnim';

const russo = Russo_One({
  subsets: ['latin'],
  weight: '400', // Bebas Neue has only 400
  variable: '--font-archivo',
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const Hero = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [waitListOpen, setWaitListOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const [waitListMessage, setWaitListMessage] = useState<string>('');
    const [waitListError, setWaitListError] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (email && name) {
            setIsSubmitting(true);
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setWaitListMessage(errorData.message || 'Failed to join waitlist');
                setIsSubmitting(false);
                setWaitListError(true);
                await sleep(5000); // Show error message for 5 seconds
                setWaitListOpen(false);
                setWaitListError(false);
            } else {
                const successData = await response.json();
                setWaitListMessage(successData.message || 'Joined waitlist successfully!');
                setWaitListError(false);
                setWaitListOpen(false);
                setIsSubmitted(true);
            }
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    return (
        <>
            <div className="min-h-screen" id='#join'>
                <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
                    <HeroAnim />
                    <div className="text-center w-full max-w-6xl relative">

                        {/* Hero Section */}
                        <h1 className={`text-4xl sm:text-6xl text-white ${russo.className}`}>
                            Your Ultimate AI Sales Co-Pilot
                        </h1>
                        <p className="w-full sm:w-[70%] mx-auto mt-6 text-lg text-gray-300 leading-relaxed">
                            Boost close rates by 40%
                            Automates lead research, guides your sales calls in real-time, and handles
                            post-call follow-ups so you never miss a lead again!
                        </p>

                        {/* CTA Form */}
                        <div className="mt-8">
                            <div className="flex justify-center">
                                <div className="flex flex-col sm:flex-row items-center bg-gray-300/20 backdrop-blur-2xl rounded-full p-2 max-w-md w-full">
                                    <input
                                        className="outline-none flex-1 px-4 py-3 rounded-full text-center sm:text-left text-white"
                                        type="email"
                                        placeholder="Enter your email for early access"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <button
                                        onClick={() => setWaitListOpen(true)}
                                        className={`${isSubmitted ? 'bg-green-500' : 'bg-slate-100'} px-6 py-3 rounded-full text-black font-bold cursor-pointer transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mt-2 sm:mt-0`}
                                        disabled={isSubmitted}
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Added!</span>
                                            </>
                                        ) : (
                                            <span>Join Waitlist</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Waitlist form */}
                        {waitListOpen && <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                            <div className="relative bg-white p-8 text-left rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
                                {/* Close button */}
                                <button
                                    onClick={() => setWaitListOpen(false)}
                                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                                >
                                    <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 cursor-pointer" />
                                </button>

                                {/* Header with icon */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
                                        <p className="text-sm text-gray-500">Be first to experience the future</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Get early access to our AI-powered sales intelligence platform and unlock
                                    <span className="font-semibold text-gray-900"> exclusive beta features</span> before anyone else.
                                </p>

                                {/* Form */}
                                <div className="space-y-4">
                                    {/* Name input */}
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                                            type="text"
                                            placeholder="Your full name"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </div>

                                    {/* Email input */}
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        onClick={handleSubmit}
                                        className={`w-full py-3 bg-gradient-to-r ${waitListError ? "from-red-600 to-red-700 " : "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"} text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer`}
                                        disabled={isSubmitting || isSubmitted}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Joining...
                                            </>
                                        ) : (
                                            <>
                                                {waitListMessage ? waitListMessage : "Join Waitlist"}
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Footer */}
                                <p className="text-xs text-gray-400 text-center mt-6">
                                    We&apos;ll notify you as soon as spots open up. No spam, promise! 🚀
                                </p>
                            </div>
                        </div>}
                    </div>
                </main>
            </div>
        </>
    )
}
