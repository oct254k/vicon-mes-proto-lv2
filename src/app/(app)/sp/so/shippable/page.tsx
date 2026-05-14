import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { soId: "SO-2026-0042", member: "B01-1-G22C-C-171", packingId: "PKG-WO-P3000-20260506-0007-001", location: "A-2-3", qty: 12, dueDate: "2026-05-10", status: "READY" },
  { soId: "SO-2026-0042", member: "B01-1-G22C-S-172", packingId: "PKG-WO-P3000-20260506-0007-002", location: "A-2-4", qty: 8,  dueDate: "2026-05-10", status: "READY" },
  { soId: "SO-2026-0041", member: "B02-1-T18B-C-101", packingId: "PKG-WO-P3000-20260505-0002-001", location: "B-1-1", qty: 20, dueDate: "2026-05-12", status: "STORED" },
  { soId: "SO-2026-0041", member: "B02-1-T18B-S-102", packingId: "PKG-WO-P3000-20260505-0001-001", location: "B-1-2", qty: 10, dueDate: "2026-05-12", status: "STORED" },
  { soId: "SO-2026-0042", member: "B01-2-G22C-C-201", packingId: "PKG-WO-P3000-20260504-0001-001", location: "A-1-4", qty: 15, dueDate: "2026-05-15", status: "READY" },
  { soId: "SO-2026-0040", member: "B03-1-G22C-C-301", packingId: "PKG-WO-P3000-20260503-0001-001", location: "C-2-1", qty: 6,  dueDate: "2026-05-20", status: "STORED" },
];

const STATUS_MAP: Record<string, { type: "warning" | "idle"; label: string }> = {
  READY:  { type: "warning", label: "출하준비" },
  STORED: { type: "idle",    label: "야적" },
};

export default function ShippablePage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="출하 가능"
        accent="부재 조회"
        nodeRef="SCR-SP-004"
        description="STORED·READY 상태의 출하 가능 부재 목록 — 패킹 ID와 야적 위치를 확인합니다."
      />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          출하 스케줄 등록
        </button>
        <button className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          Excel 내보내기
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            출하 가능 부재 <span className="opacity-30 font-light ml-2">| {ROWS.length} 건</span>
          </h3>
          <button className="text-xs opacity-40 hover:opacity-70 font-label uppercase tracking-widest">새로고침</button>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["수주 ID", "부재 코드", "패킹 ID", "야적 위치", "수량", "납기일", "상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r, i) => {
              const s = STATUS_MAP[r.status];
              return (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                  <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.soId}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.member}</td>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{r.packingId}</td>
                  <td className="px-4 py-2 text-xs font-bold">{r.location}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.qty}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.dueDate}</td>
                  <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
