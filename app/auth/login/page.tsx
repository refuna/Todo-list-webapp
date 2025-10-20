import { LoginForm } from "@/components/login-form";
import { AppBackground } from "@/components/app-background";

export default function Page() {
  return (
    <AppBackground>
      <div className="flex min-h-svh items-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start">
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Supabase Starter Kit
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Sign in to manage your workspace
            </h1>
            <p className="text-base text-muted-foreground">
              Access your Supabase-backed dashboard, manage todos, and explore protected routes. Use the same credentials you created during signup.
            </p>
          </div>
          <LoginForm className="w-full max-w-md" />
        </div>
      </div>
    </AppBackground>
  );
}
