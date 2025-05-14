import React from 'react';
import { Copy, Check } from 'lucide-react';
import { ResumeEntry as ResumeEntryType } from '../types';

interface Props {
  entry: ResumeEntryType;
  onDelete: (id: string) => void;
}

export function ResumeEntry({ entry, onDelete }: Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(entry.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 group animate-fadeIn">
      <p className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {entry.content}
      </p>
      <button
        onClick={handleCopy}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
      <button
        onClick={() => onDelete(entry.id)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Delete entry"
      >
        ×
      </button>
    </div>
  );
}