'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const VideoPlayer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
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

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="relative mt-12 w-full max-w-4xl mx-auto">
            {/* Gradient Border Container */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-200 to-white p-px">
                <div className="relative rounded-[23px] overflow-hidden bg-white">
                    <Image
                        src="/thumbnail.png"
                        alt="Video Thumbnail"
                        width={1280}
                        height={720}
                        className="w-full h-auto block"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            className="bg-slate-800/90 text-white font-bold py-3 px-6 rounded-full text-lg flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the div's onClick from firing again
                                openModal();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Watch Demo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-screen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative w-full h-full max-w-screen-lg max-h-screen-lg">
                        <button
                            className="absolute top-4 right-4 text-white text-4xl z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            &times;
                        </button>
                        <video
                            ref={videoRef}
                            src="/demo.mp4"
                            controls
                            className="w-full h-full"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on the video
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
