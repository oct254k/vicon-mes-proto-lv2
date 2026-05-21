import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ROWS = [
  { userId: "USR-001", name: "김계획", dept: "생산관리팀", email: "plan01@vicon.kr", notiTypes: "MRP_SHORTAGE, PR_CANDIDATE", channel: "Email+Web", active: true },
  { userId: "USR-002", name: "이영업", dept: "영업팀",     email: "sales01@vicon.kr", notiTypes: "SO_APPROVED, SO_REJECTED",    channel: "Email+Web", active: true },
  { userId: "USR-003", name: "박자재", dept: "자재팀",     email: "mat01@vicon.kr",   notiTypes: "MRP_SHORTAGE, PR_CANDIDATE",   channel: "Email",     active: true },
  { userId: "USR-010", name: "최공장장", dept: "제조팀",   email: "mgr01@vicon.kr",   notiTypes: "PLAN_CONFIRM, WO_FORCE",       channel: "Web",       active: true },
  { userId: "USR-020", name: "정시스템", dept: "IT팀",     email: "admin@vicon.kr",   notiTypes: "ALL",                          channel: "Email+Web", active: false },
];

export default function NotiRecipientsPage() {
  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="알림 수신자" accent="마스터" nodeRef="SCR-SP-041" description="SP 도메인 알림 수신자 마스터 — 유형별 채널과 활성 여부를 관리합니다." />

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold hover:opacity-90">
          + 수신자 추가
        </button>
      </div>

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            수신자 목록 <span className="opacity-30 font-light ml-2">| {ROWS.length} 명</span>
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["사용자 ID", "이름", "부서", "이메일", "알림 유형", "채널", "활성"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {ROWS.map((r) => (
              <tr key={r.userId} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer">
                <td className="px-4 py-2 font-mono text-xs text-primary-accent">{r.userId}</td>
                <td className="px-4 py-2 text-xs font-bold">{r.name}</td>
                <td className="px-4 py-2 text-xs opacity-70">{r.dept}</td>
                <td className="px-4 py-2 text-xs opacity-60">{r.email}</td>
                <td className="px-4 py-2 text-xs opacity-70 max-w-xs truncate">{r.notiTypes}</td>
                <td className="px-4 py-2 text-xs">{r.channel}</td>
                <td className="px-4 py-2">
                  <StatusBadge type={r.active ? "running" : "stopped"} label={r.active ? "활성" : "비활성"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
