import Image from "next/image";
import IntroSection from "./_components/intro";
import Fantasies from "./_components/fantasies";
import RolePlay from "./_components/roleplay";
import VoiceCompanions from "./_components/voice";
import AiImages from "./_components/ai_images";
import ContentPreferenceModal from "./_components/ContentPreferenceModal";

export default function Home() {
  return (
    <div className="flex flex-col justify-start gap-[58px]">
      <IntroSection />
      <Fantasies />
      <RolePlay />
      <VoiceCompanions/>
      <AiImages/>
      <ContentPreferenceModal/>
    </div>
  );
}
