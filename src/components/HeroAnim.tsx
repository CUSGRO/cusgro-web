import React, { useEffect, useState } from 'react';
import {
    Mail,
    Send,
    Sparkles,
    Zap,
    Bot,
    MessageSquare,
    LucideIcon,
} from 'lucide-react';

type Particle = { id: number; x: number; y: number; size: number; speed: number; opacity: number };
type FloatingIcon = { id: number; Icon: LucideIcon; x: number; y: number; scale: number; rotation: number; speed: number; direction: number };
type Spark = { id: number; x: number; y: number; size: number; duration: number; delay: number };
type Stream = { id: number; left: number; delay: number; duration: number };

const REPEL_RADIUS = 8;
const REPEL_STRENGTH = 5;

const SalesSpaceAnimation: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
    const [sparks, setSparks] = useState<Spark[]>([]);
    const [streams, setStreams] = useState<Stream[]>([]);
    const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        setParticles(
            Array.from({ length: 150 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2,
            }))
        );

        const icons: LucideIcon[] = [Mail, Send, Sparkles, Zap, Bot, MessageSquare];
        setFloatingIcons(
            Array.from({ length: 12 }, (_, i) => ({
                id: i,
                Icon: icons[Math.floor(Math.random() * icons.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.3,
                rotation: Math.random() * 360,
                speed: Math.random() * 20 + 10,
                direction: Math.random() * Math.PI * 2,
            }))
        );

        setSparks(
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 16 + Math.random() * 12,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 5,
            }))
        );

        setStreams(
            Array.from({ length: 5 }, (_, i) => ({
                id: i,
                left: 20 + i * 15,
                duration: 4 + i,
                delay: i * 0.8,
            }))
        );

        const move = (e: MouseEvent) =>
            setCursor({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    const repel = (x: number, y: number) => {
        if (!cursor) return { dx: 0, dy: 0 };
        const dx = x - cursor.x;
        const dy = y - cursor.y;
        const d = Math.hypot(dx, dy);
        if (d < REPEL_RADIUS) {
            const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
            return { dx: (dx / d) * f, dy: (dy / d) * f };
        }
        return { dx: 0, dy: 0 };
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-gray-900">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30"
                style={{ animation: 'bgScroll 30s linear infinite', backgroundSize: '200% 200%' }}
            />
            <div
                className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-800/50"
                style={{ animation: 'bgScroll 40s linear infinite reverse', backgroundSize: '200% 200%' }}
            />

            {/* Animated light beams */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
                        style={{
                            top: `${20 + i * 10}%`,
                            left: '-100%',
                            width: '200%',
                            transform: `rotate(${-15 + i * 5}deg)`,
                            animation: `slideBeam ${8 + i * 2}s linear infinite`,
                            animationDelay: `${i * 1.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Particle field */}
            <div className="absolute inset-0">
                {particles.map((p) => {
                    const { dx, dy } = repel(p.x, p.y);
                    return (
                        <div
                            key={p.id}
                            className="absolute rounded-full bg-white transform-gpu"
                            style={{
                                left: `${p.x + dx}%`,
                                top: `${p.y + dy}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                opacity: p.opacity,
                                animation: `float ${20 + p.speed * 10}s linear infinite`,
                                animationDelay: `${p.id * 0.1}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Floating icons */}
            <div className="absolute inset-0">
                {floatingIcons.map((icon) => {
                    const { dx, dy } = repel(icon.x, icon.y);
                    const IconComp = icon.Icon;
                    return (
                        <div
                            key={icon.id}
                            className="absolute transform-gpu"
                            style={{
                                left: `${icon.x + dx}%`,
                                top: `${icon.y + dy}%`,
                                animation: `floatIcon ${icon.speed}s ease-in-out infinite`,
                                animationDelay: `${icon.id * 0.8}s`,
                            }}
                        >
                            <div
                                className="relative"
                                style={{
                                    transform: `scale(${icon.scale}) rotate(${icon.rotation}deg)`,
                                    animation: `rotateIcon ${15 + icon.id * 2}s linear infinite`,
                                }}
                            >
                                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-lg scale-150" />
                                <IconComp size={32} className="relative text-blue-300/80 drop-shadow-lg" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pulsing AI sparks */}
            <div className="absolute inset-0">
                {sparks.map((s) => (
                    <div
                        key={s.id}
                        className="absolute transform-gpu"
                        style={{
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            animation: `sparkle ${s.duration}s ease-in-out infinite`,
                            animationDelay: `${s.delay}s`,
                        }}
                    >
                        <Sparkles size={s.size} className="text-yellow-300/60" />
                    </div>
                ))}
            </div>

            {/* Streams */}
            <div className="absolute inset-0">
                {streams.map((st) => (
                    <div
                        key={st.id}
                        className="absolute"
                        style={{
                            left: `${st.left}%`,
                            top: '0%',
                            height: '100%',
                            width: '1px',
                            background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent)',
                            animation: `dataStream ${st.duration}s ease-in-out infinite`,
                            animationDelay: `${st.delay}s`,
                        }}
                    >
                        <div
                            className="w-3 h-3 bg-blue-400/80 rounded-full blur-sm"
                            style={{ position: 'absolute', left: '-5px', animation: `streamDot ${st.duration}s ease-in-out infinite`, animationDelay: `${st.delay}s` }}
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes bgScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes slideBeam {
          0% { transform: translateX(-100%) rotate(var(--r,0deg)); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) rotate(var(--r,0deg)); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes rotateIcon {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) scale(var(--scale)); }
          100% { transform: rotate(360deg) scale(var(--scale)); }
        }
        @keyframes dataStream {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes streamDot {
          0% { top: -10px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default SalesSpaceAnimation;
