'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import Skeleton from '../common/skeleton'; // Assuming a Skeleton component exists
import SoundIndicator from '../icons/SoundIndicator';
import DoubleQuoteIcon from '../icons/double_quote';
import { TabKey } from '@/app/types/tabs';

interface Companion {
    name: string;
    image: string;
    voiceQuote: string;
}

const fetchCompanions = async (tab: string): Promise<Companion[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const companionsData: Record<string, Companion[]> = {
                girls: [
                    {
                        name: 'Natalie',
                        image: '/girls/face/random0.jpg',
                        voiceQuote: "Hi, I'm Natalie! Let's explore new adventures together.",
                    },
                    {
                        name: 'Sophia',
                        image: '/girls/face/random1.jpg',
                        voiceQuote: "Hi there, I'm Sophia. Let's make this moment special.",
                    },
                    {
                        name: 'Eunji',
                        image: '/girls/face/random2.jpg',
                        voiceQuote: "Hello, I'm Eunji. Let's create wonderful moments together.",
                    },
                ],
                guys: [
                    {
                        name: 'Liam',
                        image: '/guys/face/random2.jpg',
                        voiceQuote: "Hey there, I'm Liam. I love sharing stories with you.",
                    },
                    {
                        name: 'Nathan',
                        image: '/guys/face/random3.jpg',
                        voiceQuote: "Hey, I'm Nathan. Ready for an unforgettable experience?",
                    },
                    {
                        name: 'Leo',
                        image: '/guys/face/random4.jpg',
                        voiceQuote: "Hello, I'm Leo. Let's make today amazing.",
                    },
                ],
                anime: [
                    {
                        name: 'Renji',
                        image: '/anime/face/random0.jpg',
                        voiceQuote: "Hi, I'm Renji. Let’s dive into an epic adventure.",
                    },
                    {
                        name: 'Yuki',
                        image: '/anime/face/random1.jpg',
                        voiceQuote: "Hey, I’m Yuki. Let’s explore new worlds together.",
                    },
                    {
                        name: 'Tsubasa',
                        image: '/anime/face/random2.jpg',
                        voiceQuote: "Hello, I’m Tsubasa. Let’s soar to new heights.",
                    },
                ],
            };

            resolve(companionsData[tab] || companionsData['girls']);
        }, 1000); // Simulated delay
    });
};

const VoiceCompanions: React.FC = () => {
    const [companions, setCompanions] = useState<Companion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeCompanion, setActiveCompanion] = useState<number>(0);
    const searchParams = useSearchParams();

    const getSize = () => {
        if (typeof window === 'undefined') return 50; // Default size for SSR
        if (window.innerWidth >= 1024) return 132; // Large screens
        if (window.innerWidth >= 768) return 70; // Medium screens
        return 50; // Small screens
    };

    const [indicatorSize, setIndicatorSize] = useState<number>(50); // Default value for SSR

    useEffect(() => {
        setIndicatorSize(getSize());

        const handleResize = () => {
            setIndicatorSize(getSize());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    useEffect(() => {
        const tab = (searchParams.get('tab') || 'anime') as TabKey;
        const loadCompanions = async () => {
            setIsLoading(true);
            const data = await fetchCompanions(tab);
            setCompanions(data);
            setIsLoading(false);
            setActiveCompanion(1); // Default to the first companion in the new tab
        };
        loadCompanions();
    }, [searchParams]);

    return (
        <div className="text-white">
            {/* Header Section */}
            <h2 className="text-red-50 text-base font-bold mb-[12px]">AI Voice - Coming Soon</h2>
            <h1 className="text-lg text-gray-100 font-bold mb-[12px]">Hear your Companions!</h1>
            <p className="text-gray-300 text-base mb-[33px]">
                Experience the unique voices of your AI companions as they bring their personalities to life.
            </p>

            {isLoading ? (
                <div className={`h-[374px] w-full rounded-[16px] flex flex-col justify-center items-center gap-8 xl:gap-20 ${styles.container}`}>
                    {/* Skeletons */}
                    <Skeleton />
                </div>
            ) : (
                <div className={`min-h-[374px] rounded-[16px] flex flex-col justify-center items-center gap-8 xl:gap-20 ${styles.container}`}>
                    {/* Companions Carousel */}
                    <div className="relative w-full flex items-center justify-center gap-4 xl:gap-10">
                        {companions.map((companion, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveCompanion(index)}
                                className={`rounded-full overflow-hidden p-2 cursor-pointer ${activeCompanion === index ? 'ring-2 ring-gray-200 ring-offset-2 ring-offset-background' : ''}`}
                                style={{
                                    transform: activeCompanion === index ? 'scale(1.2)' : 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <div className="w-[64px] h-[64px] xl:w-[109px] xl:h-[109px]">
                                    <Image src={companion.image} alt={companion.name} fill className="rounded-full" />
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* Active Companion Details */}
                    <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 text-center">
                        <SoundIndicator isPlaying={true} size={indicatorSize} />
                        <p className="text-white text-base italic">
                            <DoubleQuoteIcon type="left" className="-translate-y-2 inline-block text-xs xl:text-base" />
                            {companions[activeCompanion]?.voiceQuote}
                            <DoubleQuoteIcon type="right" className="-translate-y-2 inline-block text-xs xl:text-base" />
                        </p>
                        <SoundIndicator isPlaying={true} size={indicatorSize} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceCompanions;
