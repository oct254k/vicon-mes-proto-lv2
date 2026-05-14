import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const events: Record<number, { label: string; color: string }[]> = {
  6:  [{ label: "MO-001 CUT-01", color: "bg-error/70" }],
  10: [{ label: "PM-LINE-P3-01", color: "bg-primary-accent/70" }],
  15: [{ label: "MO-002 PRESS-01", color: "bg-warning/70" }],
  20: [{ label: "PM-WELD-01", color: "bg-primary-accent/70" }],
  25: [{ label: "MO-003 ASM-01", color: "bg-warning/70" }],
  28: [{ label: "PM-LINE-P4-01", color: "bg-primary-accent/70" }],
};

export default function EQMaintOrderCalendarPage() {
  return (
    <div className="p-8">
      <PageHeader title="MO 캘린더" accent="CALENDAR" nodeRef="SCR-EQ-042" description="월간 정비 작업지시 및 PM 일정 캘린더 뷰." />
      <FieldHeader title="2026년 5월" moduleRef="FR-EQ-053" />
      <div className="grid grid-cols-7 gap-px bg-outline-variant/10">
        {["일","월","화","수","목","금","토"].map((d) => (
          <div key={d} className="bg-surface-container p-2 text-center font-label text-xs uppercase tracking-widest opacity-40">{d}</div>
        ))}
        {/* offset: 2026-05-01 is Friday (5) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`e${i}`} className="bg-surface-container-lowest h-20" />
        ))}
        {days.map((d) => (
          <div key={d} className="bg-surface-container-lowest h-20 p-1">
            <p className="font-label text-xs opacity-50 mb-1">{d}</p>
            {(events[d] || []).map((ev, i) => (
              <div key={i} className={`${ev.color} text-black text-xs px-1 py-0.5 font-label truncate mb-0.5`}>{ev.label}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-accent/70" /><span className="font-label text-xs">PM 일정</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-error/70" /><span className="font-label text-xs">BM 긴급</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warning/70" /><span className="font-label text-xs">CM 계획</span></div>
      </div>
    </div>
  );
}
