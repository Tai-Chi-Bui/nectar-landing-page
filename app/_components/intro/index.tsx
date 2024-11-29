'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.css';
import Skeleton from '../common/skeleton';
import ImageModal from '../image_modal';
import Link from 'next/link';
import { TabKey } from '@/app/types/tabs';

interface Character {
    name: string;
    description: string;
    image: string;
}

const IntroSection: React.FC = () => {
    const searchParams = useSearchParams();
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>('😈');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    const icons = [
        { emoji: '😈', label: 'Devil' },
        { emoji: '🔥', label: 'Fire' },
        { emoji: '🤓', label: 'Nerd' },
        { emoji: '😎', label: 'Cool' },
    ];


    const fetchCharacters = async (tab: string | null, emoji: string | null) => {
        setIsLoading(true);

        // Generate mock data dynamically based on the selected emoji
        const generateMockData = (emoji: string | null): Record<TabKey, Character[]> => {
            const descriptionByEmoji: Record<string, string> = {
                '😈': 'Rebellious and mischievous, thriving on chaos and bold actions.',
                '🔥': 'Fiery and passionate, always striving to achieve greatness.',
                '🤓': 'Smart and curious, constantly seeking knowledge and solving problems.',
                '😎': 'Cool and confident, effortlessly navigating life with charm and style.',
            };

            const defaultDescription = 'A unique individual with a story to tell.';
            const emojiDescription = descriptionByEmoji[emoji || ''] || defaultDescription;

            return {
                girls: [
                    { name: 'Sophia', description: `A creative soul with ${emojiDescription}`, image: '/girls/vertical/random0.jpg' },
                    { name: 'Isabella', description: `An inquisitive thinker who embodies ${emojiDescription}`, image: '/girls/vertical/random1.jpg' },
                    { name: 'Emma', description: `A brave adventurer known for ${emojiDescription}`, image: '/girls/vertical/random2.jpg' },
                ],
                anime: [
                    { name: 'Renji', description: `A fiery swordsman reflecting ${emojiDescription}`, image: '/anime/vertical/random0.jpg' },
                    { name: 'Yuki', description: `A calm strategist inspired by ${emojiDescription}`, image: '/anime/vertical/random1.jpg' },
                    { name: 'Tsubasa', description: `A dreamer who embraces ${emojiDescription}`, image: '/anime/vertical/random2.jpg' },
                ],
                guys: [
                    { name: 'Leo', description: `A charismatic leader embodying ${emojiDescription}`, image: '/guys/vertical/random0.jpg' },
                    { name: 'Max', description: `A daring innovator driven by ${emojiDescription}`, image: '/guys/vertical/random1.jpg' },
                    { name: 'Ethan', description: `A stoic thinker inspired by ${emojiDescription}`, image: '/guys/vertical/random2.jpg' },
                ],
            };
        };

        const mockData = generateMockData(emoji);

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const validTab = (tab || 'girls') as TabKey;
                setCharacters(mockData[validTab]);
                setIsLoading(false);
                resolve();
            }, 1000);
        });
    };



    useEffect(() => {
        const tab = searchParams.get('tab');
        fetchCharacters(tab, selectedEmoji);
    }, [searchParams, selectedEmoji]);

    const handleSelectEmoji = (emoji: string): void => {
        const newEmoji = emoji === selectedEmoji ? null : emoji;
        setSelectedEmoji(newEmoji);
    };

    const handleImageClick = (image: string) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalImage(null);
        setIsModalOpen(false);
    };

    return (
        <div className={`text-white p-6 xl:p-8 rounded-[24px] flex flex-col xl:flex-row gap-6 xl:gap-[88px] ${styles.customBackground} ${styles.customShadow}`}>
            {/* Left Section */}
            <div className="w-full xl:w-[30%]">
                <div className="flex flex-col justify-start gap-4">
                    <h2 className="text-md text-gray-75 font-medium">Are you</h2>
                    <h2 className="text-xl text-white font-medium">Craving a little chaos?</h2>
                    <p className="text-base text-gray-75 font-medium">
                        Whether it's breaking rules or making your mark, the adventure begins with the bold.
                    </p>
                </div>
                <div className="flex space-x-3 xl:space-x-4 mt-6 xl:mt-[44px]">
                    {icons.map((icon, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectEmoji(icon.emoji)}
                            className={`w-12 h-12 xl:w-[56px] xl:h-[56px] flex items-center justify-center rounded-full cursor-pointer 
                                ${selectedEmoji === icon.emoji
                                    ? 'bg-gray-300'
                                    : 'bg-gray-400 hover:bg-gray-300'
                                }`}
                        >
                            <span className="text-xl xl:text-2xl">{icon.emoji}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-[18px] w-full">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className={`transition h-full`}>
                            <Skeleton />
                        </div>
                    ))
                    : characters.map((character, index) => (
                        <ImageModal
                            key={index}
                            isShow={isModalOpen && modalImage === character.image}
                            onClose={closeModal}
                        >
                            {/* Image Container */}
                            <div
                                key={index}
                                className={`cursor-pointer h-full bg-slate-800 relative p-4 rounded-lg shadow-md hover:bg-slate-700 transition overflow-hidden`}
                                onClick={() => handleImageClick(character.image)}
                            >
                                <div className="absolute inset-0 h-full">
                                    <Image
                                        src={character.image}
                                        alt={character.name}
                                        className="rounded-lg object-cover aspect-square lg:aspect-auto"
                                        fill
                                        quality={100}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-[#2C2C30] bg-opacity-50"></div>
                                <div className="relative w-full h-full flex flex-col justify-end z-10">
                                    <h3 className="font-semibold text-base xl:text-base text-white">{character.name}</h3>
                                    <p className={`text-gray-75 text-sm ${styles.lineClamp}`}>{character.description}</p>

                                    {/* "Chat Now" Button */}
                                    {isModalOpen && modalImage === character.image && (
                                        <Link
                                            href="https://trynectar.ai/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 py-2 px-4 bg-red-50 text-white font-bold rounded-lg text-center hover:bg-red-150 transition"
                                        >
                                            Chat Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </ImageModal>
                    ))}

            </div>
        </div>
    );
};

export default IntroSection;
