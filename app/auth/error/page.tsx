import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppBackground } from "@/components/app-background";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <AppBackground>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Sorry, something went wrong.
                </CardTitle>
              </CardHeader>
              <CardContent>
                {params?.error ? (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Code error: {params.error}
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    An unspecified error occurred.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppBackground>
  );
}
