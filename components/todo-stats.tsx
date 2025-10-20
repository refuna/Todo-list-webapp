'use client';

import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

export function TodoStats({ total, completed, pending }: TodoStatsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Tasks</p>
              <p className="text-4xl font-bold text-white mt-1">{total}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold text-white mt-1">{completed}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <p className="text-4xl font-bold text-white mt-1">{pending}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Circle className="w-7 h-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
