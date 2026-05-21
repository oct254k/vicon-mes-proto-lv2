import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const GRANTS = [
  { grantId: "G-EMP1058-L2", target: "EMP1058 박작업", type: "레벨 L1→L2", grantedAt: "2026-05-02 15:30", grantedBy: "최관리(L4)", dept: "PRD", status: "ACTIVE" as const },
  { grantId: "G-EMP2011-QC", target: "EMP2011 이품질", type: "부서 추가 QC", grantedAt: "2026-04-15 10:00", grantedBy: "kim.kj@vicon.local(L2)", dept: "QC", status: "ACTIVE" as const },
  { grantId: "G-EMP3030-SHP", target: "EMP3030 정출하", type: "메뉴 권한 SHP-SHIP", grantedAt: "2026-03-20 09:30", grantedBy: "최관리(L4)", dept: "SHP", status: "ACTIVE" as const },
];

const STATUS_LABEL: Record<string, string> = { ACTIVE:"활성", REVOKED:"취소됨" };
export default function GrantRevokePage() {
  return (
    <div>
      <PageHeader title="권한 회수" nodeRef="SCR-USR-032" status="PROTOTYPE" description="부여된 권한 즉시 회수. 5분 SLA 이내 세션 권한 갱신. L3 MANAGER 이상 전용." />

      <div className="bg-surface-container-low border-l-4 border-error p-4 mb-4 flex items-center gap-3">
        <span className="text-error font-bold text-sm font-label uppercase tracking-widest">주의</span>
        <span className="text-xs font-body text-on-surface/60">권한 회수 후 5분 이내 해당 사용자의 모든 활성 세션에서 권한이 갱신됩니다. 진행 중인 작업에 영향이 발생할 수 있습니다.</span>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-053/055" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">사번/이름</label>
            <input className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent w-40" placeholder="검색" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">부서</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>PRD</option><option>QC</option><option>SHP</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">검색</button>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 활성 권한 목록 <span className="opacity-30 font-light ml-2">| 3건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-053</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["Grant ID", "대상", "권한 내용", "부여 일시", "부여자", "부서", "상태", "회수"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {GRANTS.map((g, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{g.grantId}</td>
                <td className="px-4 py-2 text-xs">{g.target}</td>
                <td className="px-4 py-2 text-xs">{g.type}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-60">{g.grantedAt}</td>
                <td className="px-4 py-2 text-xs opacity-60">{g.grantedBy}</td>
                <td className="px-4 py-2 text-xs">{g.dept}</td>
                <td className="px-4 py-2"><StatusBadge type="running" label={STATUS_LABEL[g.status] ?? g.status} /></td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-error/20 text-error border border-error/40 text-xs font-label uppercase tracking-widest">회수</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 회수 클릭 시 확인 다이얼로그 → SLA 5분 비동기 큐 처리.</p>
    </div>
  );
}
