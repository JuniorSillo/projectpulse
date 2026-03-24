'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, tasks } from "@/lib/mock-data";
import { PanelCard, TaskRow } from "@/components/shared/dashboard-primitives";
import { CheckSquare, Clock, CheckCircle2, Ban } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <PageHeader
        title="Developer Dashboard"
        description="Stay focused on priorities, blockers, and deadlines."
      />

      {/* ── Stat row ── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Assigned tasks"
          value="12"
          helper="Across active projects"
          icon={<CheckSquare className="h-4 w-4" />}
          accent="#484BF1"
        />
        <StatCard
          label="Due soon"
          value="4"
          helper="Next 3 days"
          icon={<Clock className="h-4 w-4" />}
          accent="#f59e0b"
        />
        <StatCard
          label="Completed this week"
          value="7"
          helper="Strong momentum"
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="#10b981"
        />
        <StatCard
          label="Blocked tasks"
          value="1"
          helper="Needs support"
          icon={<Ban className="h-4 w-4" />}
          accent="#f43f5e"
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-6 xl:grid-cols-2">
        <LineChartCard title="Task progress trend" data={chartData.progressTrend} />
        <BarChartCard
          title="Priority distribution"
          data={[
            { name: "Low",  value: 1 },
            { name: "Med",  value: 3 },
            { name: "High", value: 5 },
            { name: "Crit", value: 3 },
          ]}
        />
      </div>

      {/* ── Bottom panels ── */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PanelCard
          title="Priority tasks"
          action={
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-0.5 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
              4 due soon
            </span>
          }
        >
          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <TaskRow
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
              />
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Activity feed">
          <ActivityFeed />
        </PanelCard>
      </div>
    </div>
  );
}