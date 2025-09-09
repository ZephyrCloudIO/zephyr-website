import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => (
  <pre
    className={`bg-neutral-800/50 p-4 rounded-md text-sm overflow-x-auto text-neutral-300 border border-neutral-700 ${className}`}
  >
    <code>{children}</code>
  </pre>
);
