'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="relative border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ListTodo className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Organize your life</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {!isHomePage && (
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          )}
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Premium</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
