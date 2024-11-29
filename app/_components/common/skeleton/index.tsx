import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse space-y-2 p-4 bg-slate-100 rounded h-full w-full ${className}`}>
      <div className="h-[60%] bg-slate-300 rounded"></div>
      <div className="h-[35%] bg-slate-300 rounded"></div>
    </div>
  );
};

export default Skeleton;
