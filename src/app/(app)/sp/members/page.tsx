import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const columns = [
  { key: "soNo", label: "수주번호" },
  { key: "site", label: "현장명" },
  { key: "memberCount", label: "총 부재 수" },
  { key: "regDate", label: "등록일" },
  { key: "status", label: "상태" },
];

const data = [
  { soNo: "SO-2026-0042", site: "인천 플랜트 3공구", memberCount: "248", regDate: "2026-04-28", status: "진행중" },
  { soNo: "SO-2026-0041", site: "울산 정유 설비", memberCount: "132", regDate: "2026-04-22", status: "완료" },
  { soNo: "SO-2026-0040", site: "여수 석화 A동", memberCount: "87", regDate: "2026-04-15", status: "완료" },
  { soNo: "SO-2026-0039", site: "포항 신항 크레인", memberCount: "320", regDate: "2026-04-10", status: "진행중" },
  { soNo: "SO-2026-0038", site: "당진 제철 보수", memberCount: "56", regDate: "2026-04-02", status: "완료" },
];

export default function SPMembersPage() {
  return (
    <div>
      <PageHeader
        title="부재 리스트"
        accent="부재 목록"
        nodeRef="SCR-SP-020"
        status="PROTOTYPE"
        description="수주 분해 기반 부재리스트 — 수주 선택 후 상세 부재 목록을 조회합니다."
      />

      <div className="bg-surface-elevated border-l-4 border-[#00912F]/50 p-4 mb-6 flex items-center gap-3">
        <span className="text-[#00912F] font-label uppercase tracking-widest text-xs font-bold">안내</span>
        <span className="text-on-surface/60 text-sm">수주 선택 후 [부재 리스트 보기] 를 클릭하면 해당 수주의 부재 상세 목록이 표시됩니다.</span>
      </div>

      <FieldHeader title="수주 목록" moduleRef="SCR-SP-020" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            수주 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(data.length).padStart(3, "0")} Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">{col.label}</th>
                ))}
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">액션</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {data.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00912F]">{row.soNo}</td>
                  <td className="px-4 py-3 text-on-surface/80">{row.site}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.memberCount}</td>
                  <td className="px-4 py-3 tabular-nums text-on-surface/70">{row.regDate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      type={row.status === "진행중" ? "running" : "idle"}
                      label={row.status}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button className="border border-outline/30 text-on-surface/60 font-label uppercase tracking-widest text-xs px-3 py-1 hover:border-[#00912F] hover:text-[#00912F] transition-colors">
                      부재 리스트 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
