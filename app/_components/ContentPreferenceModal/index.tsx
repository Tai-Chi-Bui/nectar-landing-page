'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AnimeIcon from '../icons/anime_icon';
import GenderIcon from '../icons/gender_icon';

const ContentPreferenceModal: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleSelection = (preference: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('tab', preference);
    router.push(currentUrl.toString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const options = [
    {
      label: 'Girls',
      value: 'girls',
      overlayColor: 'bg-pink-500',
      imageSrc: '/girls/vertical/random0.jpg',
      Icon: GenderIcon,
      iconProps: { size: '20', color: 'white', gender: 'female' },
    },
    {
      label: 'Anime',
      value: 'anime',
      overlayColor: 'bg-purple-500',
      imageSrc: '/anime/vertical/random1.jpg',
      Icon: AnimeIcon,
      iconProps: { size: '20', color: 'white' }, // No gender here
    },
    {
      label: 'Guys',
      value: 'guys',
      overlayColor: 'bg-blue-500',
      imageSrc: '/guys/vertical/random0.jpg',
      Icon: GenderIcon,
      iconProps: { size: '20', color: 'white', gender: 'male' },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50" />

      {/* Modal */}
      <div className="relative flex flex-col items-center justify-center z-10 bg-background p-6 rounded-lg shadow-md">
        <h2 className="text-lg text-white font-bold text-center mb-4">
          What content are you interested in?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => (
            <div
              key={option.value}
              className="group relative flex flex-col items-center justify-center md:justify-end w-48 h-48 rounded-lg cursor-pointer overflow-hidden"
              onClick={() => handleSelection(option.value)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full">
                <Image
                  src={option.imageSrc}
                  alt={option.label}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 ${option.overlayColor} bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300`}
              />

              {/* Icon and Label */}
              <div className="flex justify-center items-center gap-2 mb-2 z-10">
                {option.value === 'anime' ? (
                  <AnimeIcon
                    size={option.iconProps.size}
                    color={option.iconProps.color}
                  />
                ) : (
                  <GenderIcon
                    size={option.iconProps.size}
                    color={option.iconProps.color}
                    gender={option.iconProps.gender as string}
                  />
                )}
                <span className="text-sm text-white font-medium">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPreferenceModal;
