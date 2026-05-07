"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const PENDING = [
  { shp:"SHP-2026-0025", customer:"현대건설", eta:"2026-05-06 14:00", pkg:2, status:"ETA_NEAR" },
  { shp:"SHP-2026-0021", customer:"GS건설", eta:"2026-05-07 09:00", pkg:3, status:"SCHEDULED" },
];
const SM: Record<string,"warning"|"idle"> = { ETA_NEAR:"warning", SCHEDULED:"idle" };

export default function ReceiveMainPage() {
  return (
    <div>
      <PageHeader title="현장 검수 랜딩" accent="SCR-SHP-060" nodeRef="IA-SHP-RECEIVE-MAIN" status="PROTOTYPE"
        description="현장 검수자(EXTERNAL 토큰) 모바일 앱 메인 — 도착 알림 인박스 (FNC-SHP-070/081)" />
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-4 py-3 mb-4 text-sm font-label text-[#f59e0b]">
        EXTERNAL 토큰 — 현장 검수자 단일 출하 범위 액션만 허용
      </div>
      <FieldHeader title="도착 예정 출하" moduleRef={`${PENDING.length}건`} />
      <div className="space-y-3 mb-6">
        {PENDING.map(p=>(
          <div key={p.shp} className="bg-surface-container p-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-primary-accent">{p.shp}</p>
              <p className="font-headline font-bold text-sm">{p.customer}</p>
              <p className="text-xs opacity-60 mt-0.5">ETA: {p.eta} · PKG {p.pkg}개</p>
            </div>
            <StatusBadge type={SM[p.status]} label={p.status.replace("_"," ")} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <a href="/shp/receive/scan" className="px-6 py-4 bg-primary-accent text-black text-base font-headline font-black uppercase tracking-widest text-center block">
          QR 스캔 검수 시작 ▶
        </a>
        <a href="/shp/receive/mismatch" className="px-6 py-3 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-sm font-label uppercase text-center block">
          불일치 보고 →
        </a>
      </div>
    </div>
  );
}
