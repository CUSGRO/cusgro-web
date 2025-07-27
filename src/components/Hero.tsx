"use client";
import { ArrowRight, BarChart2, CheckCircle, LucideIcon, Mail, NotebookText, Search, Sparkles, User, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

// interface AnimatedCounterProps {
//     target: number;
//     suffix?: string;
// }

// const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, suffix = "" }) => {
//   const [count, setCount] = useState<number>(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (count < target) {
//         setCount(count + Math.ceil((target - count) / 10));
//       }
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [count, target]);

//   return <span>{count}{suffix}</span>;
// };

interface Feature {
    icon: LucideIcon;
    label: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const Hero = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [waitListOpen, setWaitListOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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

    const features: Feature[] = [
        { icon: Search, label: "AI Lead Research" },
        { icon: Video, label: "Live Call Assist" },
        { icon: NotebookText, label: "Smart Call Notes" },
        { icon: Mail, label: "Auto Follow-ups" },
        { icon: BarChart2, label: "Performance Analytics" },
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50" id='#join'>
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
                </div>

                <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">

                    <div className="text-center mt-20 w-full max-w-6xl">
                        {/* Social Proof Banner */}
                        {/* <div className="mb-8 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">Trusted by</span>
              <span className="font-semibold text-purple-600"><AnimatedCounter target={2500} />+</span>
              <span className="text-sm text-gray-600">sales teams</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5</span>
            </div>
          </div> */}

                        {/* Hero Section */}
                        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent leading-tight">
                            Your Ultimate AI Sales Co-Pilot
                        </h1>
                        <p className="w-full sm:w-[70%] mx-auto mt-6 text-lg text-gray-600 leading-relaxed">
                            Boost close rates by <span className="font-semibold text-purple-600">40%</span>.
                            Automates lead research, guides your sales calls in real-time, and handles
                            post-call follow-ups so you never miss a lead again!
                        </p>

                        {/* CTA Form */}
                        <div className="mt-8">
                            <div className="flex justify-center">
                                <div className="flex flex-col sm:flex-row items-center bg-white rounded-full p-2 shadow-2xl border border-gray-200 max-w-md w-full">
                                    <input
                                        className="outline-none flex-1 px-4 py-3 rounded-full text-center sm:text-left"
                                        type="email"
                                        placeholder="Enter your email for early access"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <button
                                        onClick={() => setWaitListOpen(true)}
                                        className={`${isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'} px-6 py-3 rounded-full text-white font-bold cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 mt-2 sm:mt-0`}
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

                        {/* Video Demo */}
                        <VideoPlayer />

                        {/* Features */}
                        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm">
                            {features.map((feature: Feature, index: number) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center p-4 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-purple-200"
                                        onMouseEnter={() => setHoveredFeature(index)}
                                        onMouseLeave={() => setHoveredFeature(null)}
                                    >
                                        <div className={`p-3 rounded-full mb-2 transition-all duration-300 ${hoveredFeature === index ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-600'}`}>
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <span className="font-medium text-gray-800">{feature.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
