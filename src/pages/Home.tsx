import React, { useState, useEffect } from 'react';
import { Spotlight } from '../components/ui/spotlight';
import { BackgroundBeams } from '../components/ui/background-beams';
import Aurora from '../blocks/Backgrounds/Aurora/Aurora';
import Noise from '../blocks/Animations/Noise/Noise';
import Lanyard from '../blocks/Components/Lanyard/Lanyard';
import TerminalPreview from '../components/custom/right-terminal';

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 1000);
    return () => clearTimeout(t);
  }, []);

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
      <div className="flex w-full h-full flex-col md:flex-row">
        {/* left side */}
        <div
          className={`  z-2 transition-[flex-grow] duration-500 ease-in-out`}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: '0%',
          }}
          // style={{ flexGrow: ratio === 'equal' ? 2 : 1 }}
        >
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={13} transparent={true} />
          {/* <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">hello</div> */}
        </div>
        {/* Right side component */}
        <div
          className={`
            relative
            
            z-2
            h-full
            overflow-hidden
            transition-[flex-grow]
            duration-500 ease-in-out
      `}
          style={{ flexGrow: expanded ? 2 : 1 }}
        >
          <TerminalPreview />
        </div>
      </div>
    </div>
  );
}
