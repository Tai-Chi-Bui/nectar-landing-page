// components/SoundIndicator.tsx
import React from 'react';

interface SoundIndicatorProps {
  isPlaying: boolean;
  size?: number; // Base size of the component
  color?: string; // Color of the bars
}

const SoundIndicator: React.FC<SoundIndicatorProps> = ({
  isPlaying,
  size = 132,
  color = '#626269',
}) => {
  const bars = [
    { x: 0, y: 22.4151, width: 4.98113, height: 21.1698 },
    { x: 54.7924, y: 22.4151, width: 4.98113, height: 21.1698 },
    { x: 73.4717, y: 24.9057, width: 4.98113, height: 16.1887 },
    { x: 118.302, y: 24.9057, width: 4.98113, height: 16.1887 },
    { x: 63.5094, y: 21.1698, width: 4.98113, height: 26.1509 },
    { x: 127.019, y: 21.1698, width: 4.98113, height: 26.1509 },
    { x: 8.71698, y: 27.3962, width: 4.98113, height: 11.2075 },
    { x: 17.434, y: 8.71698, width: 4.98113, height: 48.566 },
    { x: 82.1887, y: 8.71698, width: 4.98113, height: 48.566 },
    { x: 36.1132, y: 8.71698, width: 4.98113, height: 48.566 },
    { x: 100.868, y: 14.9434, width: 4.98113, height: 48.566 },
    { x: 27.3962, y: 0, width: 4.98113, height: 48.566 },
    { x: 92.1509, y: 0, width: 4.98113, height: 48.566 },
    { x: 44.8302, y: 0, width: 4.98113, height: 48.566 },
    { x: 109.585, y: 6.22641, width: 4.98113, height: 48.566 },
  ];

  return (
    <div
      className="relative bg-transparent"
      style={{
        width: `${size}px`,
        height: `${(size / 132) * 64}px`,
      }}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`absolute rounded-lg transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${(bar.width / 132) * size}px`,
            height: `${(bar.height / 64) * (size / 132) * 64}px`,
            left: `${(bar.x / 132) * size}px`,
            top: `${(bar.y / 64) * (size / 132) * 64}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default SoundIndicator;
