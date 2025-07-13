import React, { useState, useRef, useEffect } from 'react';
import { fileSystem, resolveNode } from '@/helper';

type HistoryItem = { message: string; success: boolean };

export default function Terminal({ isExpanded }: { isExpanded: boolean }) {
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [cwd, setCwd] = useState<string[]>(['/']);

  const introMessage =
    "Hey, I'm Aryan 👋 , I'm a backend engineer who loves building full-stack apps, GenAI workflows, and developer tools from scratch. Type `help` to see what I can do!";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const speed = 20;

    const interval = setInterval(() => {
      if (currentIndex < introMessage.length) {
        setStreamingText(prev => prev + introMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        // Add full streamed message to history
        setHistory(prev => [...prev, { message: introMessage, success: true }]);
        setStreamingText('');
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isExpanded]);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history, streamingText]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = `user@aryan:${cwd.join('/') || '/'}$`;
    if (input.trim() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = handleCommand(input);
    const newHistory = [...history, { message: `${prompt} ${input}`, success: true }];
    if (output) newHistory.push({ message: output, success: true });
    else newHistory.push({ message: 'Command not found', success: false });
    setHistory(newHistory);
    setInput('');
  };

  const handleCommand = (raw: string) => {
    const tokens = raw.trim().split(' ');
    const command = tokens[0];
    const args = tokens[1];
    const dir = resolveNode(fileSystem, cwd);

    console.log(command, args, dir);

    switch (command) {
      case 'ls':
        if (!dir || dir.type !== 'directory') return 'No such file or directory';
        return Object.entries(dir.children)
          .map(([name, node]: any) => (node.type === 'directory' ? `${name}/` : `${name}.txt`))
          .join('        ');

      case 'help':
        return `Available commands:
ls      - list contents
cd      - change directory
cat     - read file
clear   - clear terminal
pwd     - print working directory
help    - show commands`;

      case 'cd':
        if (!args) return 'No directory specified';
        const newDir = resolveNode(fileSystem, cwd.concat(args));
        if (!newDir || newDir.type !== 'directory') return 'No such directory';
        return `Changed directory to ${args}`;

      default:
        return null;
    }
  };

  return (
    <div ref={terminalRef} className="text-green-400 font-mono p-4 rounded overflow-x-auto ">
      {/* history */}
      {history.map((item: HistoryItem, index) => (
        <div
          key={index}
          className={`flex gap-x-2 gap-y-1 border-b py-2 rounder-md `}
          style={{
            backgroundColor: item.success === false ? '#a70d0d10' : 'transparent',
            color: item.success === false ? '#a70d0d' : '#48bb78',
            fontWeight: 400,
          }}
        >
          {/* <span className="mr-2 text-xs">user@aryan:~$</span> */}
          <span className=" whitespace-pre-wrap text-wrap text-xs">{item.message}</span>
        </div>
      ))}
      {/* Streaming intro text (no prefix for realism) */}
      {streamingText && (
        <div className="flex gap-x-2 gap-y-1 border-b py-2 rounder-md">
          <span className="mr-2 text-xs">user@aryan:~$</span>
          <span className="whitespace-pre-wrap text-xs">{streamingText}</span>
        </div>
      )}
      <div>
        {/* form */}
        <form onSubmit={handleSubmit} className="flex border-1 rounded-sm p-2 py-4 text-xs bg-black/20">
          <span className="mr-2 text-xs">user@aryan:{cwd.join('/') || '/'}$</span>
          <input
            className="bg-transparent outline-none flex-1 text-green-400 text-xs"
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
