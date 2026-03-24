'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, tasks } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Developer Dashboard"
        description="Stay focused on priorities, blockers, and deadlines."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned tasks" value="12" helper="Across active projects" />
        <StatCard label="Due soon" value="4" helper="Next 3 days" />
        <StatCard label="Completed this week" value="7" helper="Strong momentum" />
        <StatCard label="Blocked tasks" value="1" helper="Needs support" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <LineChartCard title="Task progress trend" data={chartData.progressTrend} />
        <BarChartCard
          title="Priority distribution"
          data={[
            { name: "Low", value: 1 },
            { name: "Med", value: 3 },
            { name: "High", value: 5 },
            { name: "Crit", value: 3 },
          ]}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Priority tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="rounded-2xl border p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className="text-sm text-slate-500">{task.priority}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{task.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <ActivityFeed />
      </div>
    </div>
  );
}