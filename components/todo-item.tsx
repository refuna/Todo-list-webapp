'use client';

import Image from 'next/image';
import { Check, Trash2, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Todo } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-950', border: 'border-red-300 dark:border-red-700' },
  medium: { color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-950', border: 'border-yellow-300 dark:border-yellow-700' },
  low: { color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-950', border: 'border-green-300 dark:border-green-700' },
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const config = priorityConfig[todo.priority];

  return (
    <Card
      className={cn(
        'group transition-all duration-300 hover:shadow-xl border-2',
        todo.completed ? 'opacity-60 bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-800 hover:scale-[1.02]',
        config.border
      )}
    >
      <div className="flex flex-wrap items-center gap-4 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(todo.id)}
          className={cn(
            'relative h-10 w-10 rounded-full border-2 transition-all duration-300 shrink-0',
            todo.completed
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500 hover:from-blue-600 hover:to-cyan-600'
              : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400'
          )}
        >
          {todo.completed && (
            <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-lg font-medium transition-all duration-300',
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-600'
                : 'text-slate-900 dark:text-white'
            )}
          >
            {todo.title}
          </p>
        </div>

        <div className={cn('flex items-center gap-1 px-3 py-1 rounded-full shrink-0', config.bg)}>
          <Flag className={cn('w-4 h-4', config.color)} />
          <span className={cn('text-sm font-medium capitalize', config.color)}>
            {todo.priority}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all opacity-0 group-hover:opacity-100 shrink-0"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
      {todo.image_url && (
        <div className="px-4 pb-4">
          <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800/60 aspect-[4/3] max-h-72 w-full">
            <Image
              src={todo.image_url}
              alt={`${todo.title} attachment`}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
