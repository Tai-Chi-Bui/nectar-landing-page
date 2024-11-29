'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.css';
import ImageModal from '../image_modal';
import Skeleton from '../common/skeleton'; // Assuming a Skeleton component exists
import Link from 'next/link';
import { TabKey } from '@/app/types/tabs';

interface Recommendation {
    name: string;
    description: string;
    image: string;
}


const categories = [
    'Action',
    'Alien',
    'Anime',
    'Arab',
    'Asexual',
    'Assistant',
    'BBW',
    'BDSM',
    'Bisexual',
    'Bondage',
    'Books',
    'Breeding',
    'Bully',
    'CNC',
    'Chastity',
    'Cheating',
    'Dandere',
    'Demi Human',
    'Deredere',
    'Detective',
    'Dilf',
    'Dominant',
    'Elf',
    'Fandom',
];


const fetchRecommendations = async (tab: TabKey, category: string): Promise<Recommendation[]> => {
    const generateMockData = (): Record<TabKey, Recommendation[]> => {
        const descriptionByCategory: Record<string, string> = {
            Fantasy: 'A whimsical and magical journey awaits...',
            'Movie & TV': 'Experience the world of your favorite screen stories...',
            'Game & Anime': 'Dive into vibrant, action-packed realms...',
            'Parallel world': 'Discover a universe unlike any other...',
            Modern: 'A fresh take on contemporary settings...',
            RPG: 'Role-play your way to epic adventures...',
            Novel: 'Step into stories that inspire and captivate...',
            Celebrities: 'Get closer to the stars of your dreams...',
            Vtuber: 'Join virtual creators in their dynamic worlds...',
            Philosophy: 'Explore profound thoughts and ideas...',
            Region: 'Uncover the beauty and culture of diverse lands...',
            Politics: 'Engage in power, strategy, and diplomacy...',
        };

        const defaultDescription = 'An intriguing experience tailored for you.';
        const categoryDescription = descriptionByCategory[category] || defaultDescription;

        return {
            girls: [
                {
                    name: 'Sophia Grace',
                    description: `${categoryDescription} Sophia brings elegance to every moment.`,
                    image: '/girls/vertical/random1.jpg',
                },
                {
                    name: 'Isabella Marie',
                    description: `${categoryDescription} Isabella embodies curiosity and charm.`,
                    image: '/girls/vertical/random2.jpg',
                },
                {
                    name: 'Emma Jane',
                    description: `${categoryDescription} Emma inspires creativity and wonder.`,
                    image: '/girls/vertical/random3.jpg',
                },
                {
                    name: 'Olivia Claire',
                    description: `${categoryDescription} Olivia turns dreams into reality.`,
                    image: '/girls/vertical/random4.jpg',
                },
            ],
            anime: [
                {
                    name: 'Renji Abarai',
                    description: `${categoryDescription} Renji fights with fire and justice.`,
                    image: '/anime/vertical/random1.jpg',
                },
                {
                    name: 'Yuki Nagato',
                    description: `${categoryDescription} Yuki unlocks the mysteries of the cosmos.`,
                    image: '/anime/vertical/random3.jpg',
                },
                {
                    name: 'Tsubasa Hanekawa',
                    description: `${categoryDescription} Tsubasa’s strategy knows no bounds.`,
                    image: '/anime/vertical/random4.jpg',
                },
                {
                    name: 'Shinichi Kudo',
                    description: `${categoryDescription} Shinichi solves the unsolvable.`,
                    image: '/anime/vertical/random5.jpg',
                },
            ],
            guys: [
                {
                    name: 'Leo Carter',
                    description: `${categoryDescription} Leo leads with charisma and vision.`,
                    image: '/guys/vertical/random1.jpg',
                },
                {
                    name: 'Max Turner',
                    description: `${categoryDescription} Max innovates with bold ideas.`,
                    image: '/guys/vertical/random2.jpg',
                },
                {
                    name: 'Ethan Brooks',
                    description: `${categoryDescription} Ethan’s wisdom guides his journey.`,
                    image: '/guys/vertical/random3.jpg',
                },
                {
                    name: 'Liam Reed',
                    description: `${categoryDescription} Liam protects and inspires.`,
                    image: '/guys/vertical/random4.jpg',
                },
            ],
        };
    };

    const mockData = generateMockData();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData[tab]);
        }, 1000); // Simulated delay
    });
};

const RolePlay: React.FC = () => {
    const searchParams = useSearchParams();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Fantasy'); // Default category

    useEffect(() => {
        const loadRecommendations = async () => {
            setIsLoading(true);
            const tab = (searchParams.get('tab') || 'anime') as TabKey;
            const data = await fetchRecommendations(tab, selectedCategory);
            setRecommendations(data);
            setIsLoading(false);
        };
        loadRecommendations();
    }, [searchParams, selectedCategory]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
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
        <div className="w-full">
            {/* Header Section */}
            <h2 className="text-red-100 mb-[10px] text-base font-bold">AI Roleplay</h2>
            <h2 className="text-gray-100 mb-[19px] text-large font-bold">Recommended For You.</h2>

            {/* Categories */}
            <div className={`flex gap-4 mb-[27px] pb-2 overflow-x-auto whitespace-nowrap ${styles.customScrollbar}`}>
                {categories.map((category, index) => (
                    <span
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-[18px] py-[4px] bg-gray-400 rounded-[31px] cursor-pointer text-gray-100 text-sm transition ${selectedCategory === category ? 'text-red-50' : ''
                            }`}
                    >
                        {category}
                    </span>
                ))}
            </div>


            {/* Recommendations Grid */}
            {isLoading ? (
                <div className="mb-[22px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="transition h-[412px]">
                            <Skeleton />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mb-[22px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((recommendation, index) => (
                        <ImageModal
                            key={index}
                            isShow={isModalOpen && modalImage === recommendation.image}
                            onClose={closeModal}
                        >
                            <div
                                key={index}
                                className="relative cursor-pointer h-full min-h-[412px] bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                                onClick={() => handleImageClick(recommendation.image)}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={recommendation.image}
                                        alt={recommendation.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-[#2C2C30] bg-opacity-50"></div>
                                <div className="relative w-full h-full flex flex-col justify-end z-10 p-4">
                                    <h3 className="text-sm font-medium text-white mb-2">
                                        {recommendation.name}
                                    </h3>
                                    <p className="text-xs font-normal text-gray-100">
                                        {recommendation.description}
                                    </p>
                                    {/* "Chat Now" Button */}
                                    {isModalOpen && modalImage === recommendation.image && (
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
            )}

            {/* Buttons */}
            <div className="flex justify-center mt-8 gap-4">
                <button className="bg-red-50 text-white px-6 py-2 rounded-full hover:bg-red-150 transition">
                    Create AI Boyfriend
                </button>
                <button className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition">
                    Show More
                </button>
            </div>
        </div>
    );
};

export default RolePlay;
