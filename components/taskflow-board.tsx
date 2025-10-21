'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ListTodo, LogIn, UserPlus } from 'lucide-react';

import { supabase, Todo } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/logout-button';
import { TodoInput } from '@/components/todo-input';
import { TodoItem } from '@/components/todo-item';
import { TodoStats } from '@/components/todo-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TaskflowBoardProps {
  showAuthPrompt?: boolean;
  showSessionControls?: boolean;
  className?: string;
}

export function TaskflowBoard({
  showAuthPrompt = false,
  showSessionControls = false,
  className,
}: TaskflowBoardProps) {
  const AUTH_REQUIRED_ERROR = 'AUTH_REQUIRED';
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTodos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to fetch todos: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    const channel = supabase
      .channel('public:todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload) => {
          setTodos((current) => {
            if (payload.eventType === 'INSERT') {
              const newTodo = payload.new as Todo;
              const alreadyExists = current.some((todo) => todo.id === newTodo.id);
              if (alreadyExists) {
                return current.map((todo) => (todo.id === newTodo.id ? { ...todo, ...newTodo } : todo));
              }
              return [newTodo, ...current];
            }

            if (payload.eventType === 'UPDATE') {
              const updatedTodo = payload.new as Todo;
              return current.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo));
            }

            if (payload.eventType === 'DELETE') {
              const deletedTodo = payload.old as { id: string };
              return current.filter((todo) => todo.id !== deletedTodo.id);
            }

            return current;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTodo = async (title: string, priority: 'low' | 'medium' | 'high', attachment: File | null) => {
    try {
      let imageUrl: string | null = null;

      if (attachment) {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          toast({
            title: 'Authentication required',
            description: 'You must be signed in to upload an attachment.',
            variant: 'destructive',
          });
          throw new Error(AUTH_REQUIRED_ERROR);
        }

        const extension = attachment.name.split('.').pop();
        const fallbackId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        const uniqueName =
          typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function'
            ? globalThis.crypto.randomUUID()
            : fallbackId;
        const sanitizedName = extension ? `${uniqueName}.${extension}` : uniqueName;
        const filePath = `${user.id}/${sanitizedName}`;

        const { error: uploadError } = await supabase.storage.from('my-todo').upload(filePath, attachment, {
          cacheControl: '3600',
          upsert: false,
          contentType: attachment.type,
        });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage.from('my-todo').getPublicUrl(filePath);
        imageUrl = publicUrlData?.publicUrl ?? null;
      }

      const { data, error } = await supabase
        .from('todos')
        .insert([{ title, priority, image_url: imageUrl }])
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setTodos((current) => [data, ...current]);
        toast({
          title: 'Success',
          description: 'Todo added successfully',
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message === AUTH_REQUIRED_ERROR) {
        return;
      }

      toast({
        title: 'Error',
        description: `Failed to add todo: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setTodos((current) =>
        current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update todo',
        variant: 'destructive',
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id);

      if (error) throw error;
      setTodos((current) => current.filter((t) => t.id !== id));
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete todo',
        variant: 'destructive',
      });
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  if (loading) {
    return (
      <div className="flex min-h-[480px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('max-w-5xl mx-auto px-6 py-8 space-y-8', className)}>
      {showAuthPrompt && (
        <div className="rounded-3xl border-2 border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 md:p-8">
          <div className="space-y-4 text-center">
            <h2 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-2xl font-bold text-transparent">
              Welcome to TaskFlow
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to save your tasks or continue as a guest
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/auth/login">
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl sm:w-auto">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-2 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 sm:w-auto"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {showSessionControls && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">TaskFlow workspace</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keep an eye on your tasks and sign out when you&apos;re done.
            </p>
          </div>
          <LogoutButton className="rounded-full border-2 border-slate-300 px-4 dark:border-slate-600" />
        </div>
      )}

      <TodoStats total={stats.total} completed={stats.completed} pending={stats.pending} />

      <div className="rounded-3xl border-2 border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 md:p-8">
        <TodoInput onAdd={addTodo} />

        <div className="mt-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-base">
                All ({todos.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="text-base">
                Active ({activeTodos.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-base">
                Completed ({completedTodos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {todos.length === 0 ? (
                <EmptyState />
              ) : (
                todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-3">
              {activeTodos.length === 0 ? (
                <EmptyState message="Everything is checked off. Nice work!" />
              ) : (
                activeTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {completedTodos.length === 0 ? (
                <EmptyState message="No completed tasks yet. Keep going!" />
              ) : (
                completedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message = 'No tasks yet. Create your first one!' }: { message?: string }) {
  return (
    <div className="py-12 text-center">
      <ListTodo className="mx-auto mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
      <p className="text-lg text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}
