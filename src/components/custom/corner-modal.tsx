import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CornerModal() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="modal"
            initial={{ width: 100, height: 40, opacity: 0 }}
            animate={{ width: '100vw', height: '100vh', opacity: 1 }}
            exit={{ width: 100, height: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white shadow-2xl border rounded-lg flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Expanded Modal</h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Collapse
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <p>This is your modal content...</p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(true)}
            className="bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-700"
          >
            Open Modal
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
