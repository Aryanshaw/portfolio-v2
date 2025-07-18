// import { useState, useEffect } from 'react';
import { Spotlight } from '../components/ui/spotlight';
import { BackgroundBeams } from '../components/ui/background-beams';
import Aurora from '../blocks/Backgrounds/Aurora/Aurora';
import Noise from '../blocks/Animations/Noise/Noise';
import Lanyard from '../blocks/Components/Lanyard/Lanyard';
import TerminalPreview from '../components/custom/right-terminal';
// import { useTheme } from '@/components/theme-provider';

export default function Home() {
  // const { theme } = useTheme();

  return (
    <div
      className="h-screen w-full flex flex-col relative"
      // style={{ background: theme === 'dark' ? '#121212' : '#f5f5f5' }}
    >
      {/* Noise */}
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Noise patternSize={1550} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={20} />
      </div>
      {/* Aurora */}
      <div className="absolute inset-0 z-1">
        <Aurora colorStops={['#242424', '#2B2B2B', '#0E0917']} blend={0.5} amplitude={2.0} speed={0.5} />
        <BackgroundBeams />
      </div>
      <div className="flex w-full h-screen flex-col md:flex-row p-4 gap-x-4 md:overflow-hidden overflow-y-auto">
        {/* Left side */}
        <div
          className="z-2 transition-[flex-grow] duration-500 ease-in-out inline-block"
          style={{
            flexGrow: 1.4,
            flexShrink: 1,
            flexBasis: '0%',
          }}
        >
          <div className="border-4 border-gray p-1 rounded-md h-full">
            <div className="border-4 border-gray border-double rounded-md h-full">
              <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={13} transparent={true} />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="relative z-2 h-full transition-[flex-grow] duration-500 ease-in-out" style={{ flexGrow: 1.6 }}>
          <div className="border-4 border-gray p-1 rounded-md h-screen md:h-full">
            <div className="border-4 border-gray border-double rounded-md h-screen md:h-full overflow-hidden">
              <TerminalPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
