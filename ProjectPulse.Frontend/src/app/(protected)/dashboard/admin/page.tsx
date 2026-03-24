'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { PieChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, projects } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Portfolio-grade oversight across users, delivery health, and risk signals."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value="128" helper="+12 this month" />
        <StatCard label="Total projects" value="36" helper="9 currently active" />
        <StatCard label="Overdue tasks" value="14" helper="Requires intervention" />
        <StatCard label="High-risk projects" value="3" helper="Escalation needed" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PieChartCard title="Projects by status" data={chartData.projectStatus} />
        <BarChartCard title="User role distribution" data={chartData.roleDistribution} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Priority panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects
              .filter((p) => p.risk === "High")
              .map((project) => (
                <div key={project.id} className="rounded-2xl border p-4 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="text-sm text-rose-500">{project.progress}% complete</span>
                  </div>
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