import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const LOGS = [
  { logId: "AL-20260506-0842", eventType: "LOGIN", userId: "kim.kj@vicon.local", device: "PC-OFFICE-01", ip: "10.1.2.42", occurredAt: "2026-05-06 09:02", result: "SUCCESS", detail: "PIN 인증" },
  { logId: "AL-20260506-0801", eventType: "GRANT_APPROVED", userId: "최관리(L4)", device: "PC-SYS-01", ip: "10.1.1.10", occurredAt: "2026-05-06 08:45", result: "SUCCESS", detail: "EMP1058 L1→L2" },
  { logId: "AL-20260506-0744", eventType: "PIN_FAIL", userId: "EMP2011", device: "PDA-PRD-03", ip: "—", occurredAt: "2026-05-06 08:14", result: "FAIL", detail: "5회 오류 → LOCKED" },
  { logId: "AL-20260505-1923", eventType: "TOKEN_ISSUED", userId: "kim.kj@vicon.local", device: "PC-SHP-02", ip: "10.1.3.11", occurredAt: "2026-05-05 19:23", result: "SUCCESS", detail: "EXTERNAL PACKING scope" },
  { logId: "AL-20260505-1722", eventType: "LOGOUT", userId: "EMP3030", device: "PC-SHP-02", ip: "10.1.3.11", occurredAt: "2026-05-05 17:22", result: "SUCCESS", detail: "세션 만료" },
];

const RESULT_BADGE: Record<string, "running" | "error"> = { SUCCESS: "running", FAIL: "error" };
const SL: Record<string, string> = { SUCCESS:"성공", FAIL:"실패" };

export default function AuditLogsPage() {
  return (
    <div>
      <PageHeader title="감사 로그 검색" nodeRef="SCR-USR-080" status="PROTOTYPE" description="로그인·권한 변경·PIN 오류 등 전체 보안 이벤트 감사 로그. AUDITOR·ADMIN 전용." />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-100/104" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">이벤트 유형</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>LOGIN</option><option>LOGOUT</option><option>PIN_FAIL</option><option>GRANT_APPROVED</option><option>GRANT_REJECTED</option><option>TOKEN_ISSUED</option><option>DELEG_APPROVED</option><option>MATRIX_CHANGED</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 시작</label>
            <input type="date" defaultValue="2026-05-05" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">기간 종료</label>
            <input type="date" defaultValue="2026-05-06" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">사번/이름</label>
            <input className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent w-36" placeholder="검색" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">결과</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>SUCCESS</option><option>FAIL</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">검색</button>
          <button className="px-4 py-1.5 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">CSV 내보내기</button>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 감사 로그 <span className="opacity-30 font-light ml-2">| 5건 표시 / 전체 2,847건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-100</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["로그 ID", "이벤트 유형", "사용자", "단말", "IP", "발생 시각", "결과", "상세"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {LOGS.map((l, i) => (
                <tr key={i} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 ${l.result === "FAIL" ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-70">{l.logId}</td>
                  <td className="px-4 py-2 text-xs font-bold">{l.eventType}</td>
                  <td className="px-4 py-2 text-xs">{l.userId}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{l.device}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-50">{l.ip}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{l.occurredAt}</td>
                  <td className="px-4 py-2"><StatusBadge type={RESULT_BADGE[l.result]} label={SL[l.result] ?? l.result} /></td>
                  <td className="px-4 py-2 text-xs opacity-60">{l.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
