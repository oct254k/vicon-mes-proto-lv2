import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { soId: "SO-2026-0042", client: "포스코건설", site: "송도 IFC", memberCount: 700, confirmed: 320, pending: 378, failed: 2, status: "PARTIAL" },
  { soId: "SO-2026-0041", client: "현대건설",   site: "판교 Alpha", memberCount: 420, confirmed: 420, pending: 0, failed: 0, status: "DONE" },
  { soId: "SO-2026-0040", client: "삼성물산",   site: "서초 G1",   memberCount: 280, confirmed: 0,   pending: 280, failed: 0, status: "PENDING" },
  { soId: "SO-2026-0039", client: "대우건설",   site: "영종 Harbor", memberCount: 150, confirmed: 140, pending: 0, failed: 10, status: "FAILED" },
  { soId: "SO-2026-0038", client: "GS건설",     site: "마곡 R&D",  memberCount: 560, confirmed: 560, pending: 0, failed: 0, status: "DONE" },
];

const STATUS_MAP: Record<string, { type: "running" | "idle" | "warning" | "error" | "stopped"; label: string }> = {
  DONE:    { type: "running", label: "완료" },
  PARTIAL: { type: "warning", label: "부분확정" },
  PENDING: { type: "idle",    label: "대기" },
  FAILED:  { type: "error",   label: "검증실패" },
};

export default function MemberLandingPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader
        title="부재 리스트"
        accent="수주 분해"
        nodeRef="SCR-SP-010"
        description="수주별 부재 자동 분해 현황 — 검증 상태를 확인하고 보드로 진입하세요."
      />

      <div className="flex gap-3 mb-6">
        <a href="/sp/member/board" className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          보드 보기
        </a>
        <a href="/sp/member/upload" className="px-4 py-2 bg-surface-container text-on-surface text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
          Excel 업로드
        </a>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            수주별 부재 분해 현황 <span className="opacity-30 font-light ml-2">| {ROWS.length} 수주</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["수주 ID", "거래처", "현장", "총 부재", "확정", "대기", "검증실패", "상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {ROWS.map((r) => {
                const s = STATUS_MAP[r.status];
                return (
                  <tr key={r.soId} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                    <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.soId}</td>
                    <td className="px-4 py-2">{r.client}</td>
                    <td className="px-4 py-2 opacity-70">{r.site}</td>
                    <td className="px-4 py-2 tabular-nums">{r.memberCount}</td>
                    <td className="px-4 py-2 tabular-nums text-primary-accent">{r.confirmed}</td>
                    <td className="px-4 py-2 tabular-nums opacity-60">{r.pending}</td>
                    <td className="px-4 py-2 tabular-nums text-error">{r.failed}</td>
                    <td className="px-4 py-2"><StatusBadge type={s.type} label={s.label} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
