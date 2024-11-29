import Image from "next/image";

interface SidebarProps {
  className?: string; // Optional className prop
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={`w-[64px] h-[100vh] min-w-[64px] min-h-[100vh] pt-[15px] px-[18px] bg-sidebar_background ${className}`}>
      
      <Image
        src="/icons/logo.png"
        alt="Logo"
        width={48}
        height={48}
        priority // Ensures the logo loads quickly
      />
    </div>
  );
};

export default Sidebar;
