'use client';

export function AppFooter() {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 mt-12">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © 2025 TaskFlow. Built with Next.js, Tailwind CSS & Supabase.
        </p>
      </div>
    </footer>
  );
}
