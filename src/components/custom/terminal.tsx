import React, { useState, useRef, useEffect } from 'react';
import { fileSystem, resolveNode } from '@/helper';

type HistoryItem = {
  message: string;
  success: boolean;
  isHtml?: boolean;
};

export default function Terminal({ isExpanded }: { isExpanded: boolean }) {
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [cwd, setCwd] = useState<string[]>(['']);

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

    // 1) push the prompt
    const baseHistory = [...history, { message: `${prompt} ${input}`, success: true }];

    // 2) run the command
    const output = handleCommand(input);
    let resultItem: HistoryItem;

    if (!output) {
      resultItem = { message: 'Command not found', success: false };
    } else if (typeof output === 'string') {
      // error vs success
      const isError = [
        'It is not a directory',
        'It is not a file',
        'No such file or directory',
        'Cannot go up',
      ].includes(output.trim());
      // detect if it’s HTML by looking for an <img> tag
      const html = output.includes('<img ');
      resultItem = { message: output, success: !isError, isHtml: html };
    } else {
      // if in future you return objects, handle here...
      resultItem = { message: String(output), success: true };
    }

    setHistory([...baseHistory, resultItem]);
    setInput('');
  };

  const handleCommand = (raw: string) => {
    const tokens = raw.trim().split(' ');
    const command = tokens[0];
    const args = tokens[1];
    const dir = resolveNode(fileSystem, cwd);

    switch (command) {
      case 'ls':
        if (!dir || dir.type !== 'directory') return 'No such file or directory';
        return Object.entries(dir.children)
          .map(([name, node]: any) => (node.type === 'directory' ? `${node.name}/` : `${node.name}`))
          .join('        ');

      case 'help':
        return `Available commands:
ls      - list contents
cd      - change directory
cat     - read file
clear   - clear terminal
pwd     - print working directory
help    - show commands
whoami  - show current user
`;

      case 'cd':
        if (args === '..') {
          if (cwd.length === 1) return 'Cannot go up';
          setCwd(cwd.slice(0, -1));
          return `Changed directory from ${cwd[cwd.length - 1]} to ${cwd[cwd.length - 2]}`;
        }

        if (args === undefined) {
          setCwd(['']);
          return 'Changed directory to /';
        }
        const newDir = resolveNode(fileSystem, [...cwd, args]);
        if (!newDir || newDir.type !== 'directory') return 'It is not a directory';

        setCwd([...cwd, args]);

        return `Changed directory to ${args}`;

      case 'cat':
        if (!args) return 'No file specified';

        const argsExt = args.split('.').pop();
        if (argsExt !== 'txt') return 'Only .txt files are supported';

        const file = dir.children?.[args.replace('.txt', '')];
        if (!file || file.type !== 'file') return 'It is not a file';
        return file.content;

      case 'pwd':
        return cwd.join('/');

      case 'whoami':
        return `aryanshaw | ${introMessage}`;

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
          {/* <span className=" whitespace-pre-wrap text-wrap text-xs text-left">{item.message}</span> */}
          {item.isHtml ? (
            <div
              className="prose text-xs font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: item.message }}
            />
          ) : (
            <pre className="whitespace-pre-wrap text-xs font-mono">{item.message}</pre>
          )}
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
