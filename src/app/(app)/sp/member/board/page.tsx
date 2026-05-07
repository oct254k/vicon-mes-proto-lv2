"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MEMBERS = [
  { soId: "SO-2026-0042", code: "B01-1-G22C-C-171", type: "C형", lengthMm: 6000, qty: 240, status: "CONFIRMED" },
  { soId: "SO-2026-0042", code: "B01-1-G22C-S-172", type: "S형", lengthMm: 12000, qty: 80, status: "CONFIRMED" },
  { soId: "SO-2026-0042", code: "B01-2-G22C-C-201", type: "C형", lengthMm: 6000, qty: 320, status: "PENDING" },
  { soId: "SO-2026-0042", code: "B01-2-G22C-H-202", type: "H형", lengthMm: 9000, qty: 60, status: "PENDING" },
  { soId: "SO-2026-0041", code: "B02-1-T18B-C-101", type: "C형", lengthMm: 5400, qty: 160, status: "CONFIRMED" },
  { soId: "SO-2026-0041", code: "B02-1-T18B-S-102", type: "S형", lengthMm: 8000, qty: 40, status: "CONFIRMED" },
  { soId: "SO-2026-0041", code: "B02-2-T18B-H-103", type: "H형", lengthMm: 7500, qty: 30, status: "FAILED" },
  { soId: "SO-2026-0041", code: "B02-2-T18B-C-104", type: "C형", lengthMm: 5400, qty: 90, status: "PENDING" },
];

const STATUS_MAP: Record<string, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }> = {
  CONFIRMED: { type: "running", label: "확정" },
  PENDING:   { type: "idle",    label: "대기" },
  FAILED:    { type: "error",   label: "검증실패" },
};

export default function MemberBoardPage() {
  const groups = Array.from(new Set(MEMBERS.map((m) => m.soId)));
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (soId: string) => setCollapsed((p) => ({ ...p, [soId]: !p[soId] }));

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="부재 리스트" accent="보드" nodeRef="SCR-SP-010" />

      {groups.map((soId) => {
        const rows = MEMBERS.filter((m) => m.soId === soId);
        const open = !collapsed[soId];
        return (
          <section key={soId} className="mb-6 bg-surface-container-lowest">
            <div
              className="flex items-center justify-between px-4 py-3 bg-surface-container border-l-4 border-primary-accent cursor-pointer"
              onClick={() => toggle(soId)}
            >
              <span className="font-headline font-black text-sm uppercase tracking-widest">{soId}</span>
              <span className="text-xs text-on-surface-variant">{open ? "▲ 접기" : "▼ 펼치기"}</span>
            </div>
            {open && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline-variant/10">
                      {["부재코드", "타입", "길이(mm)", "수량", "상태"].map((h) => (
                        <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-headline">
                    {rows.map((m) => (
                      <tr key={m.code} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                        <td className="px-4 py-2 font-mono text-xs">{m.code}</td>
                        <td className="px-4 py-2">{m.type}</td>
                        <td className="px-4 py-2 tabular-nums">{m.lengthMm.toLocaleString()}</td>
                        <td className="px-4 py-2 tabular-nums">{m.qty}</td>
                        <td className="px-4 py-2">
                          <StatusBadge type={STATUS_MAP[m.status].type} label={STATUS_MAP[m.status].label} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
