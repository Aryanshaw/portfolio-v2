import { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
import Terminal from './terminal';
import { motion } from 'framer-motion';

export default function TerminalPreview() {
  const [isExpanded, setIsExpanded] = useState(false);

  const miniWidth = 350;
  const miniHeight = 50;
  const fullWidth = '100%';
  // const fullWidth = '60vw';
  const fullHeight = '100%';

  const variants = {
    collapsed: { width: miniWidth, height: miniHeight, borderRadius: 12 },
    expanded: { width: fullWidth, height: fullHeight, borderRadius: 24 },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 h-full w-full relative place-items-end">
      <motion.div
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={variants}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          transformOrigin: 'top right',

          padding: 4,
        }}
        className="bg-white/5 backdrop-blur-sm shadow-lg z-20 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          {/* traffic lights */}
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          {/* title */}
          <a
            href="https://www.linkedin.com/in/aryan-shaw-66784418b/"
            target="_blank"
            className="font-mono font-bold underline text-sm cursor-pointer"
          >
            aryanshaw@portfolio🔗
          </a>

          {/* expand / collapse button */}
          <button onClick={() => setIsExpanded(x => !x)} className="cursor-pointer">
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* clipped content */}
        {isExpanded && (
          <>
            <div className="border-t border-border" />
            <div
              className="p-3 flex flex-col gap-2 overflow-y-auto relative"
              style={{ height: `calc(100% - ${miniHeight}px)` }}
            >
              <Terminal isExpanded={isExpanded} />

              <BorderBeam
                duration={6}
                borderWidth={1}
                size={500}
                className="from-transparent via-purple-400 to-transparent absolute inset-0"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={500}
                borderWidth={1}
                className="from-transparent via-blue-400 to-transparent absolute inset-0"
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
