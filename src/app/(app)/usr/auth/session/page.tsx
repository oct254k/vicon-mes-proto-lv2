import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SESSIONS = [
  { sessionId: "SES-20260506-0042", device: "PC-OFFICE-01", authMethod: "PIN", loginAt: "2026-05-06 09:02", expiresAt: "2026-05-06 17:02", shift: "DAY", status: "ACTIVE" as const },
  { sessionId: "SES-20260505-0198", device: "PC-MFG-03", authMethod: "PIN", loginAt: "2026-05-05 08:00", expiresAt: "2026-05-05 16:00", shift: "DAY", status: "EXPIRED" as const },
  { sessionId: "SES-20260504-0301", device: "PDA-SHP-02", authMethod: "RFID", loginAt: "2026-05-04 14:22", expiresAt: "2026-05-04 22:22", shift: "EVE", status: "EXPIRED" as const },
];

const BADGE: Record<string, "running" | "idle"> = { ACTIVE: "running", EXPIRED: "idle" };
const SL: Record<string, string> = { ACTIVE: "활성", EXPIRED: "만료" };

export default function SessionPage() {
  return (
    <div>
      <PageHeader title="내 활성 세션" nodeRef="SCR-USR-023" status="PROTOTYPE" description="로그인된 단말·세션 현황 조회 및 강제 로그아웃. 세션 최대 8시간." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 현재 로그인 정보" moduleRef="FNC-USR-045/047" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">사용자</p><p>kim.kj@vicon.local</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">권한 레벨</p><p>L2 STAFF</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">부서</p><p>PRD, SHP</p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">세션 만료</p><p className="text-warning">2026-05-06 17:02</p></div>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 세션 이력 <span className="opacity-30 font-light ml-2">| 3건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-049</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["세션 ID", "단말", "인증수단", "로그인", "만료", "교대", "상태", "액션"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {SESSIONS.map((s, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{s.sessionId}</td>
                <td className="px-4 py-2">{s.device}</td>
                <td className="px-4 py-2 text-xs opacity-70">{s.authMethod}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{s.loginAt}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{s.expiresAt}</td>
                <td className="px-4 py-2 text-xs opacity-60">{s.shift}</td>
                <td className="px-4 py-2"><StatusBadge type={BADGE[s.status]} label={SL[s.status] ?? s.status} /></td>
                <td className="px-4 py-2">
                  {s.status === "ACTIVE" && (
                    <button className="text-xs text-error font-label uppercase tracking-widest hover:underline">강제 로그아웃</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 세션 최대 8시간. 교대 종료 시 자동 만료.</p>
    </div>
  );
}
