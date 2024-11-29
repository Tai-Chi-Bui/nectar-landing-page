'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Skeleton from '../common/skeleton';
import { TabKey } from '@/app/types/tabs';
import styles from './styles.module.css';

interface ImageOption {
    description: string;
    details: string;
}

interface GeneratedImage {
    src: string;
    alt: string;
}


const fetchMockData = (tabKey: TabKey, optionDescription: string): Promise<GeneratedImage[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockImages: Record<TabKey, GeneratedImage[]> = {
                girls: [
                    { src: `/girls/vertical/random1.jpg`, alt: `${optionDescription} - Girl 1` },
                    { src: `/girls/vertical/random2.jpg`, alt: `${optionDescription} - Girl 2` },
                    { src: `/girls/vertical/random3.jpg`, alt: `${optionDescription} - Girl 3` },
                ],
                anime: [
                    { src: `/anime/vertical/random1.jpg`, alt: `${optionDescription} - Anime 1` },
                    { src: `/anime/vertical/random2.jpg`, alt: `${optionDescription} - Anime 2` },
                    { src: `/anime/vertical/random3.jpg`, alt: `${optionDescription} - Anime 3` },
                ],
                guys: [
                    { src: `/guys/vertical/random1.jpg`, alt: `${optionDescription} - Guy 1` },
                    { src: `/guys/vertical/random2.jpg`, alt: `${optionDescription} - Guy 2` },
                    { src: `/guys/vertical/random3.jpg`, alt: `${optionDescription} - Guy 3` },
                ],
            };

            resolve(mockImages[tabKey]);
        }, 1000); // Simulates a 1000ms delay
    });
};

const AiImages: React.FC = () => {
    const searchParams = useSearchParams();
    const [tabKey, setTabKey] = useState<TabKey>('girls'); // Default tab
    const [imageOptions, setImageOptions] = useState<ImageOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<number>(0); // Default option index
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const tab = searchParams.get('tab') as TabKey | null;
        if (tab && ['girls', 'anime', 'guys'].includes(tab)) {
            setTabKey(tab as TabKey);
        }
    }, [searchParams]);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            const options: ImageOption[] = [
                { description: 'Seductive pose, casual outfit', details: 'High Resolution, Vertical' },
                { description: 'Elegant and smiling', details: 'Full HD, Close-up Portrait' },
                { description: 'Confident stance, stylish look', details: 'Artistic Style, Medium Quality' },
            ];
            setImageOptions(options);

            // Fetch images for the current tabKey and option
            const images = await fetchMockData(tabKey, options[0].description);
            setGeneratedImages(images);

            setIsLoading(false);
        };
        loadInitialData();
    }, [tabKey]);

    const handleOptionClick = async (index: number) => {
        setSelectedOption(index);
        setIsLoading(true);

        const selectedDescription = imageOptions[index].description;
        const images = await fetchMockData(tabKey, selectedDescription);
        setGeneratedImages(images);

        setIsLoading(false);
    };


    return (
        <div>
            {/* Header Section */}
            <h2 className="text-red-100 text-base font-bold mb-[12px]">Generate AI Image</h2>
            <h1 className="text-gray-100 text-lg font-bold mb-[12px]">Beautiful art in seconds.</h1>
            <p className="text-base text-gray-300 font-normal mb-[57px]">
                Choose from a variety of styles and let AI generate stunning, personalized artwork in just seconds.
            </p>

            {/* Layout */}
            <div className={`flex flex-col xl:flex-row xl:justify-between gap-6 rounded-[16px] p-[32px] ${styles.gradientBackground}`}>
                {/* Image Options */}
                <div className="xl:w-[40%] flex flex-col">
                    {imageOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            className={`p-4 cursor-pointer transition ${selectedOption === index
                                ? `text-gray border-l border-l-red-100 ${styles.selectedOptionBg}`
                                : 'bg-transparent text-white border-l-[2px] border-l-gray-500'
                                }`}
                        >
                            <p className="text-white text-base">{option.description}</p>
                            <p className="text-xs text-gray-150">{option.details}</p>
                        </div>
                    ))}
                </div>

                {/* Image Preview */}
                <div className="flex flex-nowrap gap-2 xl:gap-4 justify-center">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-40 h-60 sm:w-70 rounded-lg overflow-hidden"
                            >
                                <Skeleton />
                            </div>
                        ))
                    ) : (
                        generatedImages.map((image, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-800 w-40 h-60 sm:w-70 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={160}
                                    height={240}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiImages;
