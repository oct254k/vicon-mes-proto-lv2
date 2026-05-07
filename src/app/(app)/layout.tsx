"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { SideNav } from "@/components/layout/SideNav";
import { TelemetryStrip } from "@/components/layout/TelemetryStrip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      <TopNav onMenuClick={() => setSideOpen((v) => !v)} />
      <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* 모바일 백드롭 */}
      {sideOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSideOpen(false)}
        />
      )}

      <main className="mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto lg:ml-72">
        {children}
      </main>
      <TelemetryStrip />
    </div>
  );
}
