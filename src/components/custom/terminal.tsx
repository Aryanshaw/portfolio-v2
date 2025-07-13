import React, { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHistory(history.concat(input));
    if (input === 'clear') {
      setHistory([]);
    }
    setInput('');
  };

  return (
    <div ref={terminalRef} className="text-green-400 font-mono p-4 rounded overflow-x-auto">
      {/* history */}
      {history.map((item, index) => (
        <div key={index} className="flex gap-x-2 gap-y-1">
          <span className="mr-2">user@aryan:~$</span>
          <span className="text-wrap">{item}</span>
        </div>
      ))}
      <div>
        {/* form */}
        <form onSubmit={handleSubmit} className="flex gap-x-2">
          <span className="mr-2">user@aryan:~$</span>
          <input
            className="bg-transparent outline-none flex-1 text-green-400"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
