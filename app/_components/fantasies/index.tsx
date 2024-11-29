'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ImageModal from '../image_modal';
import Skeleton from '../common/skeleton'; // Assuming a Skeleton component exists
import Link from 'next/link';
import { TabKey } from '@/app/types/tabs';

interface Fantasy {
    title: string;
    description: string;
    image: string;
    avatar: string;
    plays: string;
    likes: string;
}


const fetchFantasies = async (tab: TabKey): Promise<Fantasy[]> => {
    const generateMockData = (): Record<TabKey, Fantasy[]> => ({
        girls: [
            {
                title: 'Sophia’s Adventure',
                description: 'A whimsical journey of discovery...',
                image: '/girls/horizontal/random0.jpg',
                avatar: '/girls/vertical/random1.jpg',
                plays: '48.2k',
                likes: '78',
            },
            {
                title: 'Isabella’s Secrets',
                description: 'Unravel the mysteries of the hidden realm...',
                image: '/girls/horizontal/random2.jpg',
                avatar: '/girls/vertical/random2.jpg',
                plays: '73.5k',
                likes: '102',
            },
            {
                title: 'Emma’s Quest',
                description: 'Embark on a mission of courage and love...',
                image: '/girls/horizontal/random3.jpg',
                avatar: '/girls/vertical/random3.jpg',
                plays: '91.7k',
                likes: '150',
            },
        ],
        anime: [
            {
                title: 'The Teacher Pet.',
                description: 'You are a university math professor...',
                image: '/anime/horizontal/random0.jpg',
                avatar: '/anime/vertical/random1.jpg',
                plays: '55.5k',
                likes: '64',
            },
            {
                title: 'Late Payment',
                description: 'Jennifer is your landlord...',
                image: '/anime/horizontal/random3.jpg',
                avatar: '/anime/vertical/random2.jpg',
                plays: '654.5k',
                likes: '168',
            },
            {
                title: 'Jerk Off Instructions',
                description: 'Your hot roommate catches you...',
                image: '/anime/horizontal/random2.jpg',
                avatar: '/anime/vertical/random3.jpg',
                plays: '55.5k',
                likes: '64',
            },
        ],
        guys: [
            {
                title: 'Leo’s Leap',
                description: 'A bold move towards greatness...',
                image: '/guys/horizontal/random0.jpg',
                avatar: '/guys/vertical/random1.jpg',
                plays: '87.4k',
                likes: '125',
            },
            {
                title: 'Max’s Challenge',
                description: 'An innovative path to success...',
                image: '/guys/horizontal/random2.jpg',
                avatar: '/guys/vertical/random2.jpg',
                plays: '132.8k',
                likes: '180',
            },
            {
                title: 'Ethan’s Resolve',
                description: 'A stoic journey of determination...',
                image: '/guys/horizontal/random3.jpg',
                avatar: '/guys/vertical/random3.jpg',
                plays: '77.3k',
                likes: '96',
            },
        ],
    });

    const mockData = generateMockData();

    return new Promise<Fantasy[]>((resolve) => {
        setTimeout(() => {
            resolve(mockData[tab]);
        }, 1000);
    });
};

const Fantasies: React.FC = () => {
    const searchParams = useSearchParams();
    const [fantasies, setFantasies] = useState<Fantasy[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const loadFantasies = async () => {
            setIsLoading(true);
            const tab = (searchParams.get('tab') || 'girls') as TabKey;
            const data = await fetchFantasies(tab);
            setFantasies(data);
            setIsLoading(false);
        };
        loadFantasies();
    }, [searchParams]);

    const handleImageClick = (e: React.MouseEvent, image: string) => {
        e.stopPropagation();
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalImage(null);
        setIsModalOpen(false);
    };

    const toggleLike = (e: React.MouseEvent, key: string) => {
        e.stopPropagation(); // Prevent event bubbling to overlay
        setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="text-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-red-100 text-base font-semibold mb-4">AI Fantasies</h2>
                <h1 className="text-lg font-bold mb-4">Live your dream experience.</h1>
                <p className="text-gray-300 text-base mb-8">
                    Explore unique, immersive experiences powered by AI, designed to ignite your imagination and bring your fantasies to life.
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="transition h-[255px]">
                                <Skeleton />
                            </div>
                        ))
                        : fantasies.map((fantasy, index) => (
                            <ImageModal
                                key={index}
                                isShow={isModalOpen && modalImage === fantasy.image}
                                onClose={closeModal}
                            >
                                <div
                                    key={index}
                                    className="cursor-pointer relative h-full min-h-[255px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                                    onClick={(e) => handleImageClick(e, fantasy.image)}
                                >
                                    <div className="w-full h-full absolute inset-0 z-0">
                                        <Image
                                            src={fantasy.image}
                                            alt={fantasy.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-[#2C2C30] bg-opacity-50 z-10"></div>

                                    <div className="relative w-full h-full flex flex-col justify-end p-4 z-20">
                                        <div className="flex flex-col justify-start items-start gap-[10px]">
                                            <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden mr-2">
                                                <Image
                                                    src={fantasy.avatar}
                                                    alt="Avatar"
                                                    width={30}
                                                    height={30}
                                                    className="object-cover"
                                                />
                                            </div>

                                            <p className="text-base font-semibold">{fantasy.title}</p>
                                        </div>
                                        <p className="text-gray-50 text-sm mb-2">{fantasy.description}</p>
                                        <div className="flex space-x-3">
                                            <div className="flex items-center bg-gray-500 text-white px-2 py-1 rounded-full text-xs space-x-1">
                                                <span>▶</span>
                                                <p>{fantasy.plays}</p>
                                            </div>
                                            <div
                                                className="flex select-none items-center bg-gray-500 px-2 py-1 rounded-full text-xs space-x-1 cursor-pointer"
                                                onClick={(e) => toggleLike(e, fantasy.title)}
                                            >
                                                {
                                                    <span>
                                                        {liked[fantasy.title] ? '❤️' : ' 🤍'}
                                                    </span>
                                                }
                                                <p>{fantasy.likes}</p>
                                            </div>
                                        </div>
                                        {isModalOpen && modalImage === fantasy.image && (
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
                <div className="flex justify-center mt-8 space-x-4">
                    <button className="bg-red-50 text-white px-6 py-2 rounded-full hover:bg-red-150 transition">
                        Create Fantasy
                    </button>
                    <button className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition">
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Fantasies;
