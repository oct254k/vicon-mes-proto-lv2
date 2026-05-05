"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STEPS = [
  { step:"[A] 사전 등록",   desc:"T1/T2/T3 신청 → 페어링 완료",     state:"running" as const },
  { step:"[B] 분실 무효화", desc:"5분 SLA — 토큰 즉시 무효화",        state:"error" as const },
  { step:"[C] 재발급",      desc:"신규 페어링 코드 발급 후 활성화",   state:"idle" as const },
  { step:"[D] 임시 비활성", desc:"일시적 사용 중단 → 재활성 가능",    state:"idle" as const },
  { step:"[E] 영구 폐기",   desc:"RETIRED 전환 — 재사용 불가",        state:"idle" as const },
  { step:"[F] USR 연동",    desc:"user.status=INACTIVE 자동 연동",    state:"idle" as const },
];

const COLS = [
  { key:"eventId",   label:"이벤트 ID" },
  { key:"devId",     label:"단말 ID" },
  { key:"eventType", label:"이벤트 유형" },
  { key:"fromState", label:"이전 상태" },
  { key:"toState",   label:"이후 상태" },
  { key:"actor",     label:"처리자" },
  { key:"eventAt",   label:"처리일시" },
];

const MOCK = [
  { eventId:"DLC-20260506-007", devId:"DEV-T1-0042", eventType:"LOST",     fromState:"ACTIVE",    toState:"LOST",     actor:"operator1", eventAt:"2026-05-06 09:40" },
  { eventId:"DLC-20260415-005", devId:"DEV-T1-0039", eventType:"RETIRED",  fromState:"ACTIVE",    toState:"RETIRED",  actor:"admin",     eventAt:"2026-04-15 10:00" },
  { eventId:"DLC-20260301-003", devId:"DEV-T3-0005", eventType:"REGISTER", fromState:"—",         toState:"ACTIVE",   actor:"admin",     eventAt:"2026-03-01 09:00" },
  { eventId:"DLC-20260215-002", devId:"DEV-T2-0012", eventType:"REISSUE",  fromState:"LOST",      toState:"ACTIVE",   actor:"admin",     eventAt:"2026-02-15 14:00" },
  { eventId:"DLC-20260110-001", devId:"DEV-T1-0041", eventType:"REGISTER", fromState:"—",         toState:"ACTIVE",   actor:"admin",     eventAt:"2026-01-10 09:00" },
];

export default function DeviceLifecyclePage() {
  const data = MOCK.map(r => ({ ...r }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="단말 라이프사이클" accent="LIFECYCLE" nodeRef="SCR-SYS-101" status="PROTOTYPE"
        description="분실 무효화(5분 SLA)·재발급·영구 폐기·USR INACTIVE 연동 (PRC-SYS-002 §6 [A]~[F])" />
      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-center gap-4">
        <StatusBadge type="error" label="LOST" />
        <p className="text-sm text-on-surface-variant">DEV-T1-0042 분실 처리 진행 중 — 무효화까지 잔여 3분</p>
        <div className="ml-auto flex gap-2">
          <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-error/20 text-error border border-error/30">분실 무효화 확정</button>
          <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20">재발급 요청</button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.step} className={`bg-surface-container p-4 border-t-2 ${s.state === "error" ? "border-error" : s.state === "running" ? "border-[#00912F]" : "border-outline-variant/20"}`}>
            <p className="text-xs font-label uppercase tracking-widest text-[#00912F] mb-1">{`0${i+1}`}</p>
            <p className="font-headline font-bold text-xs mb-1">{s.step}</p>
            <p className="text-xs text-on-surface-variant opacity-60 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <DataTable title="라이프사이클 이벤트 이력" columns={COLS} data={data} bufferCount={MOCK.length} />
    </div>
  );
}
