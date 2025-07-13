import { useState, useEffect } from 'react';
import { Spotlight } from '../components/ui/spotlight';
import { BackgroundBeams } from '../components/ui/background-beams';
import Aurora from '../blocks/Backgrounds/Aurora/Aurora';
import Noise from '../blocks/Animations/Noise/Noise';
import Lanyard from '../blocks/Components/Lanyard/Lanyard';
import TerminalPreview from '../components/custom/right-terminal';

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* Noise */}
      <div className="absolute inset-0 z-0">
        <Noise patternSize={550} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={20} />
      </div>
      {/* Aurora */}
      <div className="absolute inset-0 z-1">
        <Aurora colorStops={['#242424', '#2B2B2B', '#0E0917']} blend={0.5} amplitude={2.0} speed={0.5} />
        <BackgroundBeams />
      </div>
      <div className="flex w-full">
        {/* left side */}
        <div className=" inset-0 z-2 w-[40%]">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={13} transparent={true} />
        </div>
        {/* Right side component */}
        <div
          className={`
            relative
            inset-0
            z-2
            h-full
            w-[60%]
            fixed
            overflow-hidden
      `}
        >
          <TerminalPreview />
        </div>
      </div>
    </div>
  );
}
