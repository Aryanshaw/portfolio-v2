import { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
import Terminal from './terminal';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalPreview() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // <div className="">
    <div className={`fixed overflow-hidden relative `}>
      <AnimatePresence>
        <div className="h-screen w-full p-4">
          {/* main container */}
          <div className="container rounded-2xl bg-white/10 backdrop-blur-sm h-full w-full overflow-hidden">
            {/* Top header */}
            <div className="flex flex-grow justify-between items-center p-3 gap-x-4">
              {/* left side trafic lights */}
              <div>
                <div className="flex gap-x-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>
              {/* middle section */}
              <div>
                <p className="font-bold text-center font-mono underline">aryanshaw@portfolio</p>
              </div>
              {/* empty right side */}
              <div>
                <Maximize2 size={15} />
              </div>
            </div>
            {/* Border */}
            <div className="border-t border-border"></div>
            {/* middle section */}
            <div className="p-3 flex flex-col gap-y-2 overflow-y-scroll h-full">
              {/* terminal window */}
              <Terminal />
            </div>
            {/* Borders */}
            <BorderBeam
              duration={6}
              borderWidth={1}
              size={500}
              className="from-transparent via-purple-400 to-transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={500}
              borderWidth={1}
              className="from-transparent via-blue-400 to-transparent"
            />
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
