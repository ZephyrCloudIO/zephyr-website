import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import './terminal.css';

export interface Command {
  type: 'command' | 'output';
  content: string;
  label?: string;
  labelColor?: string;
  lineNumber?: number;
}

interface TerminalWindowProps {
  title: string;
  commands: Command[];
  showCopyButton?: boolean;
  darkMode?: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  commands,
  showCopyButton = false,
  darkMode = true,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = async () => {
    const commandText = commands
      .filter(cmd => cmd.type === 'command')
      .map(cmd => cmd.content)
      .join('\n');

    const success = await copyToClipboard(commandText);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const bgColor = darkMode ? 'bg-[#1E1E1E]' : 'bg-[#1A1A1A]';

  return (
    <div className="relative group">
      <div className={`relative ${bgColor} rounded-lg overflow-hidden shadow-2xl border border-gray-800/50`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          <div className="relative flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2 flex-grow">
              <div className="flex gap-1.5">
                <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
                <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
                <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
              </div>
              <span className="text-gray-400 text-sm font-medium w-full text-center">{title}</span>
            </div>
            {showCopyButton && (
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Copy to clipboard"
                >
                  {showSuccess ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 animate-fade-in"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="terminal-container p-4 font-mono text-sm space-y-1">
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-start">
              {cmd.lineNumber && (
                <span className="text-gray-600 w-6 flex-shrink-0 select-none">
                  {cmd.lineNumber}
                </span>
              )}
              {cmd.type === 'command' ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#925ff1] select-none">npm</span>
                  <span className="text-[#FFFAC2]">{cmd.content}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {cmd.label && (
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      cmd.labelColor || 'bg-[#3178C6] text-white'
                    }`}>
                      {cmd.label}
                    </span>
                  )}
                  <span className="text-gray-400">{cmd.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
