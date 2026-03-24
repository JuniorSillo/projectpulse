'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, milestones } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Manager Dashboard"
        description="Coordinate timelines, milestones, and team delivery with confidence."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="My active projects" value="4" helper="Across 3 clients" />
        <StatCard label="Milestones due" value="5" helper="This week" />
        <StatCard label="Overdue tasks" value="8" helper="Need follow-up" />
        <StatCard label="Team workload" value="87%" helper="Near capacity" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <LineChartCard title="Project progress trend" data={chartData.progressTrend} />
        <BarChartCard
          title="Upcoming milestone risk"
          data={milestones.map((m) => ({
            name: m.title.split(" ")[0],
            value: 100 - m.progress,
          }))}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((m) => (
              <div key={m.id} className="rounded-2xl border p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{m.title}</h3>
                  <span className="text-sm text-slate-500">{m.dueDate}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Current progress: {m.progress}%
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <ActivityFeed />
      </div>
    </div>
  );
}