'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, milestones } from "@/lib/mock-data";
import { PanelCard, MilestoneRow } from "@/components/shared/dashboard-primitives";
import { FolderKanban, Flag, AlertCircle, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <PageHeader
        title="Project Manager Dashboard"
        description="Coordinate timelines, milestones, and team delivery with confidence."
      />

      {/* ── Stat row ── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="My active projects"
          value="4"
          helper="Across 3 clients"
          icon={<FolderKanban className="h-4 w-4" />}
          accent="#484BF1"
        />
        <StatCard
          label="Milestones due"
          value="5"
          helper="This week"
          icon={<Flag className="h-4 w-4" />}
          accent="#0F3FC2"
        />
        <StatCard
          label="Overdue tasks"
          value="8"
          helper="Need follow-up"
          icon={<AlertCircle className="h-4 w-4" />}
          accent="#f43f5e"
        />
        <StatCard
          label="Team workload"
          value="87%"
          helper="Near capacity"
          icon={<Users className="h-4 w-4" />}
          accent="#f59e0b"
        />
      </div>

      {/* ── Charts ── */}
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

      {/* ── Bottom panels ── */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PanelCard
          title="Milestones"
          action={
            <span className="rounded-lg border border-[#484BF1]/20 bg-[#484BF1]/08 px-2 py-0.5 text-[#484BF1] dark:bg-[#484BF1]/10">
              {milestones.length} total
            </span>
          }
        >
          <div className="space-y-3">
            {milestones.map((m) => (
              <MilestoneRow
                key={m.id}
                title={m.title}
                dueDate={m.dueDate}
                progress={m.progress}
                invert={false}
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