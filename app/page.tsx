import React, { Suspense } from "react";

// Lazy-load components to use with Suspense
const IntroSection = React.lazy(() => import("./_components/intro"));
const Fantasies = React.lazy(() => import("./_components/fantasies"));
const RolePlay = React.lazy(() => import("./_components/roleplay"));
const VoiceCompanions = React.lazy(() => import("./_components/voice"));
const AiImages = React.lazy(() => import("./_components/ai_images"));
const ContentPreferenceModal = React.lazy(() => import("./_components/ContentPreferenceModal"));

export default function Home() {
  return (
    <div className="flex flex-col justify-start gap-[58px]">
      <Suspense fallback={<LoadingPlaceholder text="Loading Intro..." />}>
        <IntroSection />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder text="Loading Fantasies..." />}>
        <Fantasies />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder text="Loading Role Play..." />}>
        <RolePlay />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder text="Loading Voice Companions..." />}>
        <VoiceCompanions />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder text="Loading AI Images..." />}>
        <AiImages />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder text="Loading Preferences..." />}>
        <ContentPreferenceModal />
      </Suspense>
    </div>
  );
}

// Styled fallback component
function LoadingPlaceholder({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    </div>
  );
}
