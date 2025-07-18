import React, { useState, useRef, useEffect } from 'react';
import { fileSystem, resolveNode } from '@/helper';

type HistoryType = 'command' | 'output';

type HistoryItem = {
  message: string;
  type: HistoryType;
  success: boolean;
  isHtml?: boolean;
};

export default function Terminal({ isExpanded }: { isExpanded: boolean }) {
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [cwd, setCwd] = useState<string[]>(['']);
  // const [currentDirList, setCurrentDirList] = useState<string[]>([]);
  const suggestionsRef = useRef<string[]>([]);
  const suggestionIndexRef = useRef(0);
  const commandsRef = useRef<string[]>([]);
  const historyPointerRef = useRef<number>(-1);

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
        setHistory(prev => [...prev, { message: introMessage, success: true, type: 'output' }]);
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
    const baseHistory = [...history, { message: `${prompt} ${input}`, success: true, type: 'command' as HistoryType }];
    commandsRef.current.push(input);
    historyPointerRef.current = -1;

    // 2) run the command
    const output = handleCommand(input.replace('/', ''));
    let resultItem: HistoryItem;

    if (!output) {
      resultItem = { message: 'Command not found', success: false, type: 'output' };
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
      resultItem = { message: output, success: !isError, isHtml: html, type: 'output' };
    } else {
      // if in future you return objects, handle here...
      resultItem = { message: String(output), success: true, type: 'output' };
    }

    setHistory([...baseHistory, resultItem]);
    // historyIndexRef.current = history.length;
    setInput('');
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
  //   if (e.key === 'Tab' && !e.shiftKey) {
  //     e.preventDefault();
  //     const commandInput = e.target.value.split(' ');
  //     console.log('commandInput', e.target.value);
  //     if (commandInput.length <= 1) return;

  //     const command = commandInput[0];
  //     const args = commandInput.slice(1).join(' ');

  //     // const dir = resolveNode(fileSystem, cwd);

  //     console.log(command, 'command', args, ' < -args');
  //     if (command === 'ls' || command === 'cd' || command === 'cat') {
  //       const response = handleCommand(`ls ${args}`);
  //       const ls_list = response.split('        ');

  //       if (currentDirList.length === 0) {
  //         setCurrentDirList(ls_list);
  //         setInput(`${command} ${ls_list.join(' ')}`);
  //         e.target.value = `${command} ${ls_list.join(' ')}`;
  //       }

  //       console.log('currentDirList', currentDirList);
  //       console.log('args', args);
  //       if (currentDirList.length > 0 && !currentDirList.includes(args)) {
  //         console.log('came in this if to match key words');
  //       }

  //       if (currentDirList.length > 0) {
  //         console.log('came in this if to shift');
  //         const latestDir = currentDirList.shift();
  //         setInput(`${command} ${latestDir}`);
  //         e.target.value = `${command} ${latestDir}`;
  //       }

  //       return;
  //     }
  //   }
  //   if (e.key === 'Enter') {
  //     setCurrentDirList([]);
  //     handleSubmit(e as any);
  //     // handleCommand(input.replace('/', ''));
  //     // e.preventDefault();
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();

      // 1) Grab the latest raw value
      const raw = e.currentTarget.value.trim();
      const [command, ...rest] = raw.split(' ');
      const args = rest.join(' ');

      if (!['ls', 'cd', 'cat'].includes(command)) return;

      // 2) On the **first** Tab, build the list of completions
      if (suggestionsRef.current.length === 0) {
        const lsOutput = handleCommand(`ls ${args}`) || '';
        // split on whitespace, strip trailing '/' from dirs
        suggestionsRef.current = lsOutput.split(/\s+/).map((s: any) => s.replace(/\/$/, ''));
        suggestionIndexRef.current = 0;
      }

      // 3) Pick the next suggestion
      const suggestion = suggestionsRef.current[suggestionIndexRef.current] || '';
      // advance, wrap around
      suggestionIndexRef.current = (suggestionIndexRef.current + 1) % suggestionsRef.current.length;

      // 4) Update the input both visually and in state
      const newValue = `${command} ${suggestion}/`;
      e.currentTarget.value = newValue;
      setInput(newValue);
      return;
    }

    if (e.key === 'ArrowUp') {
      // iterate over the history from the end
      e.preventDefault();
      const cmds = commandsRef.current;
      if (cmds.length === 0) return;

      historyPointerRef.current = Math.min(historyPointerRef.current + 1, cmds.length - 1);
      const idx = cmds.length - 1 - historyPointerRef.current;
      const cmd = cmds[idx];
      setInput(cmd);
      e.currentTarget.value = cmd;
    }
    if (e.key === 'ArrowDown') {
      // iterate over the history from the current index to the end
      e.preventDefault();
      const cmds = commandsRef.current;
      if (cmds.length === 0) return;

      historyPointerRef.current = Math.max(historyPointerRef.current - 1, 0);
      const idx = cmds.length - 1 - historyPointerRef.current;
      const cmd = cmds[idx];
      setInput(cmd);
      e.currentTarget.value = cmd;
    }

    // On Enter, reset suggestions so next Tab rebuilds them
    if (e.key === 'Enter') {
      suggestionsRef.current = [];
      suggestionIndexRef.current = 0;
      handleSubmit(e as any);
    }
  };

  const handleCommand = (raw: string) => {
    const tokens = raw.trim().split(' ');
    const command = tokens[0];
    const args = tokens[1];
    const dir = resolveNode(fileSystem, cwd);
    switch (command) {
      case 'ls':
        // if (!dir || dir.type !== 'directory') return 'No such file or directory';
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
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
