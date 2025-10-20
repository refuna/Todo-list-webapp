import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppBackground } from "@/components/app-background";

export default function Page() {
  return (
    <AppBackground>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Thank you for signing up!
                </CardTitle>
                <CardDescription>Check your email to confirm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You&apos;ve successfully signed up. Please check your email to
                  confirm your account before signing in.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppBackground>
  );
}
