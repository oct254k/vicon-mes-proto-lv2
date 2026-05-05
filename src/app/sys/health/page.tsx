import { PageHeader } from "@/components/ui/PageHeader";

interface HealthItem {
  label: string;
  value: string | number;
  unit: string;
  pct?: number;
  state: "ok" | "warn" | "error";
}

const HEALTH: HealthItem[] = [
  { label: "API 응답시간", value: 84, unit: "ms", pct: 28, state: "ok" },
  { label: "DB 연결 수", value: 38, unit: "/ 100", pct: 38, state: "ok" },
  { label: "메모리 사용률", value: 71, unit: "%", pct: 71, state: "warn" },
  { label: "디스크 사용률", value: 88, unit: "%", pct: 88, state: "error" },
];

const STATE_STYLE: Record<string, { bar: string; text: string; badge: string }> = {
  ok:    { bar: "bg-[#00912F]", text: "text-[#00912F]", badge: "bg-[#00912F]/20 text-[#00912F]" },
  warn:  { bar: "bg-[#f59e0b]", text: "text-[#f59e0b]", badge: "bg-[#f59e0b]/20 text-[#f59e0b]" },
  error: { bar: "bg-error",     text: "text-error",     badge: "bg-error/20 text-error" },
};

const SERVICES = [
  { name: "API Gateway", up: 12, total: 12, state: "ok" },
  { name: "Database",    up: 4,  total: 4,  state: "ok" },
  { name: "Message Queue", up: 3, total: 4, state: "warn" },
  { name: "External",    up: 5,  total: 6,  state: "warn" },
  { name: "Device",      up: 47, total: 48, state: "ok" },
  { name: "License",     up: 1,  total: 1,  state: "warn" },
];

export default function SYSHealthPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="시스템" accent="헬스 대시보드" nodeRef="SCR-SYS-090" description="6종 헬스 지표 실시간 모니터링 (5분 신선도)" />

      <div className="grid grid-cols-2 gap-4 mb-8">
        {HEALTH.map(h => {
          const s = STATE_STYLE[h.state];
          return (
            <div key={h.label} className="bg-surface-container p-5">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60">{h.label}</p>
                <span className={`px-2 py-0.5 text-xs font-label uppercase ${s.badge}`}>{h.state.toUpperCase()}</span>
              </div>
              <p className={`text-3xl font-headline font-black tabular-nums ${s.text}`}>
                {h.value}<span className="text-base font-normal text-on-surface-variant ml-1">{h.unit}</span>
              </p>
              {h.pct !== undefined && (
                <div className="mt-3 h-1.5 bg-surface-container-high w-full">
                  <div className={`h-1.5 transition-all ${s.bar}`} style={{ width: `${h.pct}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">서비스 헬스</h3>
        </div>
        <div className="grid grid-cols-3 divide-x divide-outline-variant/10">
          {SERVICES.map(svc => {
            const s = STATE_STYLE[svc.state];
            const pct = Math.round((svc.up / svc.total) * 100);
            return (
              <div key={svc.name} className="p-4">
                <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">{svc.name}</p>
                <p className={`text-xl font-headline font-black tabular-nums ${s.text}`}>
                  {svc.up}<span className="text-sm font-normal text-on-surface-variant">/{svc.total}</span>
                </p>
                <div className="mt-2 h-1 bg-surface-container-high w-full">
                  <div className={`h-1 ${s.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-4 text-right text-xs text-on-surface-variant opacity-30 font-label">최종 갱신: 2026-05-06 10:00:00 (5분 주기)</p>
    </div>
  );
}
