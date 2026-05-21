import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { pkgId: "PKG-WO-P3000-20260420-0001-001", woId: "WO-P3000-20260420-0001", reason: "QUALITY_FAIL",   reasonLabel: "품질 불합격",   holdDays: 16, location: "B-3-2", approver: "최공장장", status: "HOLD" as const },
  { pkgId: "PKG-WO-P3000-20260428-0002-001", woId: "WO-P3000-20260428-0002", reason: "SHIPMENT_DELAY", reasonLabel: "출하 일정 지연", holdDays: 8,  location: "C-1-1", approver: "미정",    status: "HOLD" as const },
  { pkgId: "PKG-WO-P3000-20260430-0001-001", woId: "WO-P3000-20260430-0001", reason: "DOCUMENT_MISS",  reasonLabel: "서류 누락",     holdDays: 6,  location: "A-3-3", approver: "미정",    status: "HOLD" as const },
  { pkgId: "PKG-WO-P3000-20260501-0001-001", woId: "WO-P3000-20260501-0001", reason: "CUSTOMER_REQ",   reasonLabel: "고객 요청",     holdDays: 5,  location: "B-2-1", approver: "최공장장", status: "RELEASED" as const },
  { pkgId: "PKG-WO-P3000-20260502-0003-001", woId: "WO-P3000-20260502-0003", reason: "AGING",          reasonLabel: "AGING 초과",    holdDays: 30, location: "D-1-2", approver: "시스템", status: "HOLD" as const },
];

const STATUS_MAP = {
  HOLD:     { type: "stopped" as const, label: "보류" },
  RELEASED: { type: "running" as const, label: "해제됨" },
};

export default function PackingHoldPage() {
  const aging = ROWS.filter((r) => r.reason === "AGING");

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="패킹 보류" accent="모니터" nodeRef="SCR-WO-022" description="보류·해제·AGING 모니터 — HOLD 사유 5종, L3 결재. FNC-WO-026,027,030" />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-surface-container p-4 border-l-2 border-error">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">현재 HOLD</p>
          <p className="font-headline font-black text-2xl text-error">{ROWS.filter((r) => r.status === "HOLD").length}</p>
        </div>
        <div className="bg-surface-container p-4 border-l-2 border-warning">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">AGING 초과 (30일↑)</p>
          <p className="font-headline font-black text-2xl text-warning">{aging.length}</p>
        </div>
        <div className="bg-surface-container p-4 border-l-2 border-primary-accent">
          <p className="text-xs font-label uppercase tracking-widest opacity-50 mb-1">이번 달 해제</p>
          <p className="font-headline font-black text-2xl">{ROWS.filter((r) => r.status === "RELEASED").length}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          선택 해제 요청
        </button>
        <button className="px-4 py-2 bg-error/20 text-error text-xs font-label uppercase tracking-widest hover:bg-error/30">
          AGING 일괄 처리
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-error">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">HOLD 패킹 목록</h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["패킹 ID", "WO번호", "사유", "보류 일수", "위치", "승인자", "상태", ""].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => {
              const s = STATUS_MAP[r.status];
              const isAging = r.holdDays >= 30;
              return (
                <tr key={r.pkgId} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors ${isAging ? "bg-warning/5" : ""}`}>
                  <td className="px-4 py-2 font-mono text-xs text-error">{r.pkgId}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{r.woId}</td>
                  <td className="px-4 py-2 text-xs">{r.reasonLabel}</td>
                  <td className={`px-4 py-2 tabular-nums text-xs font-bold ${isAging ? "text-warning" : ""}`}>{r.holdDays}일{isAging ? " ⚠" : ""}</td>
                  <td className="px-4 py-2 text-xs">{r.location}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.approver}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  <td className="px-4 py-2">
                    {r.status === "HOLD" && (
                      <button className="text-xs text-primary-accent hover:opacity-70 font-label uppercase tracking-widest">해제요청</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
