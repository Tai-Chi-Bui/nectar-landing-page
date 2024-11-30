'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SidebarProps {
  className?: string; // Optional className prop
}

const Navbar: React.FC<SidebarProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tabs with title and key (useMemo to prevent recreation)
  const tabs = useMemo(() => [
    { title: 'Girls', key: 'girls' },
    { title: 'Anime', key: 'anime' },
    { title: 'Guys', key: 'guys' },
  ], []);

  const defaultTab = tabs[0]; // Default to the first tab
  const [activeTab, setActiveTab] = useState(() => 
    tabs.find((tab) => tab.key === searchParams.get('tab')) || defaultTab
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    const matchedTab = tabs.find((tab) => tab.key === tabFromUrl);

    if (!matchedTab) {
      // Push default tab key to URL if no valid tab key exists
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', defaultTab.key);
      router.replace(`?${params.toString()}`);
      setActiveTab(defaultTab);
    } else if (matchedTab !== activeTab) {
      setActiveTab(matchedTab);
    }
  }, [searchParams, router, tabs, defaultTab, activeTab]);

  const handleTabClick = (tab: { title: string; key: string }) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab.key);
    router.push(`?${params.toString()}`);
  };

  return (
    <nav className={`flex bg-background z-30 space-x-6 px-5 py-[15px] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab)}
          className={`text-base font-bold ${
            activeTab.key === tab.key ? 'text-red-100' : 'text-white'
          } focus:outline-none`}
        >
          {tab.title}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
