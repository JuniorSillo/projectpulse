'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { LineChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, milestones, projects } from "@/lib/mock-data";
import { PanelCard, ProjectRow } from "@/components/shared/dashboard-primitives";
import { Layers, Milestone, TrendingUp, MessageSquare } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <PageHeader
        title="Client Dashboard"
        description="A clean view of delivery progress, milestones, and shared updates."
      />

      {/* ── Stat row ── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active projects"
          value="2"
          helper="Currently in delivery"
          icon={<Layers className="h-4 w-4" />}
          accent="#484BF1"
        />
        <StatCard
          label="Current milestone"
          value="UAT"
          helper="Near sign-off"
          icon={<Milestone className="h-4 w-4" />}
          accent="#0F3FC2"
        />
        <StatCard
          label="Completion"
          value="81%"
          helper="Average across projects"
          icon={<TrendingUp className="h-4 w-4" />}
          accent="#10b981"
        />
        <StatCard
          label="Feedback items"
          value="3"
          helper="Pending review"
          icon={<MessageSquare className="h-4 w-4" />}
          accent="#f59e0b"
        />
      </div>

      {/* ── Charts ── */}
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

      {/* ── Bottom panels ── */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PanelCard
          title="Your projects"
          action={<span className="text-slate-400">{projects.length} total</span>}
        >
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                name={project.name}
                description={project.description}
                progress={project.progress}
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