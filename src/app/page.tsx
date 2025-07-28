"use client";
import { FeaturesCard } from '@/components/FeaturesCard';
import { Hero } from '@/components/Hero';
import VideoPlayer from '@/components/VideoPlayer';
import { BarChart2, LucideIcon, Mail, NotebookText, Search, Video } from 'lucide-react';
import { useState } from 'react';

interface Feature {
  icon: LucideIcon;
  label: string;
}

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Feature[] = [
    { icon: Search, label: "AI Lead Research" },
    { icon: Video, label: "Live Call Assist" },
    { icon: NotebookText, label: "Smart Call Notes" },
    { icon: Mail, label: "Auto Follow-ups" },
    { icon: BarChart2, label: "Performance Analytics" },
  ];


  return (
    <main className='bg-gradient-to-b from-white from-50% to-[#f6f7f7]'>
      <Hero />
      <div className="border border-gray-200 py-5">
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
      <FeaturesCard />
    </main>
  );
}
