'use client';

import React from 'react';
import { ActivityFeed } from "@/components/shared/activity-feed";
import { PieChartCard, BarChartCard } from "@/components/shared/chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { chartData, projects } from "@/lib/mock-data";
import { PanelCard, PriorityProjectRow } from "@/components/shared/dashboard-primitives";
import { Users, FolderKanban, AlertTriangle, ShieldAlert } from "lucide-react";


export default function Page() {
  const highRisk = projects.filter((p) => p.risk === "High");

  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <PageHeader
        title="Admin Dashboard"
        description="Portfolio-grade oversight across users, delivery health, and risk signals."
      />

      {/* ── Stat row ── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total users"
          value="128"
          helper="+12 this month"
          icon={<Users className="h-4 w-4" />}
          accent="#484BF1"
        />
        <StatCard
          label="Total projects"
          value="36"
          helper="9 currently active"
          icon={<FolderKanban className="h-4 w-4" />}
          accent="#0F3FC2"
        />
        <StatCard
          label="Overdue tasks"
          value="14"
          helper="Requires intervention"
          icon={<AlertTriangle className="h-4 w-4" />}
          accent="#f59e0b"
        />
        <StatCard
          label="High-risk projects"
          value="3"
          helper="Escalation needed"
          icon={<ShieldAlert className="h-4 w-4" />}
          accent="#f43f5e"
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-6 xl:grid-cols-2">
        <PieChartCard title="Projects by status" data={chartData.projectStatus} />
        <BarChartCard title="User role distribution" data={chartData.roleDistribution} />
      </div>

      {/* ── Bottom panels ── */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PanelCard
          title="Priority escalations"
          action={
            <span className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-0.5 text-rose-500 dark:border-rose-500/20 dark:bg-rose-500/10">
              {highRisk.length} high-risk
            </span>
          }
        >
          <div className="space-y-3">
            {highRisk.map((project) => (
              <PriorityProjectRow
                key={project.id}
                name={project.name}
                description={project.description}
                progress={project.progress}
                risk={project.risk}
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