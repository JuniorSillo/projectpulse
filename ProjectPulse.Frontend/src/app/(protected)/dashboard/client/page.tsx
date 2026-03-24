'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, milestones, projects } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Client Dashboard"
        description="A clean view of delivery progress, milestones, and shared updates."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active projects" value="2" helper="Currently in delivery" />
        <StatCard label="Current milestone" value="UAT" helper="Near sign-off" />
        <StatCard label="Completion" value="81%" helper="Average across projects" />
        <StatCard label="Feedback items" value="3" helper="Pending review" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <LineChartCard title="Project progress overview" data={chartData.progressTrend} />
        <BarChartCard
          title="Milestone completion"
          data={milestones.map((m) => ({
            name: m.title.split(" ")[0],
            value: m.progress,
          }))}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-2xl border p-4 dark:border-slate-800">
                <h3 className="font-medium">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{project.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <ActivityFeed />
      </div>
    </div>
  );
}