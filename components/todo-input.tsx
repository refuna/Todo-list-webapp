'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TodoInputProps {
  onAdd: (title: string, priority: 'low' | 'medium' | 'high', attachment: File | null) => Promise<void> | void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onAdd(title.trim(), priority, attachment);
      setTitle('');
      setPriority('medium');
      setAttachment(null);
      setErrorMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAttachment(null);
      setErrorMessage(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setAttachment(null);
      setErrorMessage('Please select an image file.');
      return;
    }

    setAttachment(file);
    setErrorMessage(null);
  };

  const clearAttachment = () => {
    setAttachment(null);
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 h-12 text-lg border-2 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="w-32 h-12 border-2 border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border-2 border-dashed border-slate-300 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100 dark:border-slate-600 dark:file:bg-slate-700 dark:file:text-white sm:w-auto"
        />
        {attachment && (
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-100">
            <span className="max-w-[200px] truncate">{attachment.name}</span>
            <Button variant="ghost" size="sm" type="button" onClick={clearAttachment} className="h-7 px-2 text-slate-500 hover:text-red-500">
              Remove
            </Button>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
