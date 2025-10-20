import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Protected Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-sm p-3 px-5 rounded-md flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} />
            This is a protected page that you can only see as an authenticated user
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl">Your user details</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {JSON.stringify(data.claims, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl">Next steps</CardTitle>
        </CardHeader>
        <CardContent>
          <FetchDataSteps />
        </CardContent>
      </Card>
    </div>
  );
}
