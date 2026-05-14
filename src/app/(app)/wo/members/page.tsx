import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK_MEMBERS = [
  { id: "B01-1-G22C-C-171", woNo: "WO-P3000-20260506-0007", type: "C형", lengthMm: 6000,  drawingNo: "DRW-2026-0001", attemptNo: 1, state: "RELEASED" },
  { id: "B01-1-G22C-C-172", woNo: "WO-P3000-20260506-0007", type: "C형", lengthMm: 6000,  drawingNo: "DRW-2026-0001", attemptNo: 1, state: "RELEASED" },
  { id: "B01-1-G22D-S-040", woNo: "WO-P3000-20260506-0008", type: "S형", lengthMm: 12000, drawingNo: "DRW-2026-0002", attemptNo: 2, state: "IN_PROGRESS" },
  { id: "B01-2-G15A-T-010", woNo: "WO-P3000-20260505-0002", type: "T형", lengthMm: 9000,  drawingNo: "DRW-2026-0003", attemptNo: 1, state: "COMPLETED" },
  { id: "B01-2-G15A-T-011", woNo: "WO-P3000-20260505-0002", type: "T형", lengthMm: 9000,  drawingNo: "DRW-2026-0003", attemptNo: 1, state: "COMPLETED" },
  { id: "B02-1-G10B-Z-005", woNo: "WO-P2000-20260506-0003", type: "Z형", lengthMm: 7500,  drawingNo: "DRW-2026-0004", attemptNo: 1, state: "RELEASED" },
];

function stateColor(state: string) {
  if (state === "RELEASED")    return "text-primary-accent";
  if (state === "IN_PROGRESS") return "text-warning";
  if (state === "COMPLETED")   return "text-tertiary";
  return "text-on-surface/40";
}

export default function WOMembersPage() {
  return (
    <div>
      <PageHeader title="부재 코드 목록" nodeRef="IA-WO-MEMBERS-LIST" status="PROTOTYPE" />
      <div className="bg-surface-container border-l-4 border-primary-accent p-3 mb-4 text-xs opacity-60 font-label">
        ⚠ DEC-BD-MEMBER-SCOPE — Member 마스터 = WO 책임 (site/bldg/grid/type/seq 분해·정규식 검증·attempt_no)
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">
        {[
          { label: "Site", placeholder: "B01" },
          { label: "Grid", placeholder: "G22C" },
          { label: "부재코드 검색", placeholder: "B01-1-G22C-C-" },
        ].map(f => (
          <div key={f.label} className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase tracking-widest opacity-50">{f.label}</label>
            <input type="text" placeholder={f.placeholder}
              className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label w-40" />
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">타입</label>
          <select className="bg-surface-container-high text-on-surface text-sm px-3 py-1.5 border border-outline-variant/20 font-label">
            <option value="">전체</option>
            {["C", "S", "T", "Z", "I"].map(t => <option key={t}>{t}형</option>)}
          </select>
        </div>
        <button className="px-4 py-1.5 bg-primary-accent text-black text-xs font-label uppercase tracking-widest self-end">검색</button>
        <button className="px-4 py-1.5 bg-warning/80 text-black text-xs font-label uppercase self-end">정규식 검증 ▶</button>
        <button className="px-4 py-1.5 bg-surface-container-high text-xs font-label uppercase border border-outline-variant/20 self-end">신규 부재</button>
      </div>

      <FieldHeader title="부재 목록" moduleRef={`${MOCK_MEMBERS.length}건`} />

      <div className="bg-surface-container-lowest overflow-x-auto">
        <div className="p-3 bg-surface-container-highest/30 border-l-4 border-primary-accent flex justify-between items-center">
          <span className="font-headline font-black text-xs uppercase tracking-widest">Members</span>
          <span className="text-xs opacity-30 font-label">총 1,083건 (샘플 6건)</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["부재코드", "수주번호(WO)", "타입", "길이(mm)", "도면번호", "attempt", "상태"].map(h => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {MOCK_MEMBERS.map(m => (
              <tr key={m.id}
                className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer
                  ${m.attemptNo >= 2 ? "bg-warning/5" : ""}`}
              >
                <td className="px-4 py-2 font-mono text-xs">{m.id}</td>
                <td className="px-4 py-2 text-xs opacity-70">{m.woNo}</td>
                <td className="px-4 py-2 text-xs">{m.type}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{m.lengthMm.toLocaleString()}</td>
                <td className="px-4 py-2 text-xs opacity-70">{m.drawingNo}</td>
                <td className="px-4 py-2 tabular-nums text-xs">
                  {m.attemptNo >= 2
                    ? <span className="text-warning font-bold">{m.attemptNo} ⚠ 재생산</span>
                    : <span>{m.attemptNo}</span>}
                </td>
                <td className={`px-4 py-2 text-xs font-label font-bold uppercase ${stateColor(m.state)}`}>{m.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-30 font-label mt-2">
        ⓘ attempt ≥ 2 = 재생산 (PRC-WO-003 §13 attempt_no). 노란 강조 행 참고.
      </p>
    </div>
  );
}
