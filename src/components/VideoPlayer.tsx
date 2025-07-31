'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';

// interface VideoPlayerProps { }

const VideoPlayer = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const openModal = (): void => setIsModalOpen(true);

    const closeModal = (): void => {
        setIsModalOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    useEffect(() => {
        if (isModalOpen && videoRef.current) {
            videoRef.current.play();
        }
    }, [isModalOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="relative mt-12 w-full max-w-4xl mx-auto group cursor-pointer" onClick={openModal}>
                <div className="relative rounded-2xl bg-slate-700/80 p-5 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                    <div className="relative rounded-[23px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>

                        {/* Mock Dashboard UI */}
                        <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div className="p-4 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="text-white/80 text-xs">CUSGRO Dashboard</div>
                                </div>
                                
                                <div className="flex-1 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                    <Image 
                                        src="/thumbnail.png" 
                                        alt="Play demo"
                                        width={1280}
                                        height={720}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center space-x-3 transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                <Play className="h-6 w-6 fill-current" />
                                <span>Watch Demo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300" onClick={closeModal}>
                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4">
                        <button
                            className="absolute md:-top-12 top-0 right-0 text-white hover:text-gray-300 transition-colors z-50 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                controls
                                className="w-full h-full"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                                <source src="/demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoPlayer;
