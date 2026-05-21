import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const TRIGGERS = [
  { defectId: "D-2026-0042", partCode: "B01-1-G22C-C-171", scrapQty: 1, woType: "URGENT", targetDate: "2026-05-06", plannerNote: "긴급 일정 반영 필요", status: "PENDING" },
  { defectId: "D-2026-0040", partCode: "B01-1-G22C-C-168", scrapQty: 2, woType: "NORMAL", targetDate: "2026-05-12", plannerNote: "일반 일정 추가", status: "CREATED" },
  { defectId: "D-2026-0035", partCode: "B01-2-G15A-S-035", scrapQty: 1, woType: "URGENT", targetDate: "2026-05-07", plannerNote: "고객사 납기 임박", status: "PENDING" },
];

const STAT: Record<string, { type: "warning" | "running" }> = {
  PENDING: { type: "warning" },
  CREATED: { type: "running" },
};
const SL: Record<string, string> = { PENDING:"대기", CREATED:"생성됨" };
const WO_TYPE_LABEL: Record<string, string> = { URGENT:"긴급", NORMAL:"일반" };

const COLS = [
  { key: "defectId", label: "불량 번호" },
  { key: "partCode", label: "부재코드" },
  { key: "scrapQty", label: "SCRAP 수량" },
  { key: "woType", label: "WO 유형" },
  { key: "targetDate", label: "목표 납기" },
  { key: "plannerNote", label: "플래너 메모" },
];

export default function QCDefectWoReplenishmentPage() {
  return (
    <div>
      <PageHeader
        title="WO 동적 보충"
        accent="트리거"
        nodeRef="SCR-QC-090"
        status="PROTOTYPE"
        description="SCRAP 트리거 → URGENT/NORMAL WO 동적 보충 라인 보드 (FNC-QC-080~084)"
      />

      <div className="bg-surface-container border-l-4 border-warning p-4 mb-6">
        <p className="text-sm opacity-70">SCRAP 확정 시 부재 부족 감지 → 플래너 승인 후 WO URGENT(긴급) 또는 NORMAL(일반) 자동 발행. 자동 PO 금지 (PRC-QC-001 §9).</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: "PENDING", v: 2, bad: true }, { l: "CREATED (오늘)", v: 1, bad: false }, { l: "URGENT 비율", v: "67%", bad: true }].map((k) => (
          <div key={k.l} className={`p-4 border-l-4 ${k.bad ? "border-warning" : "border-primary-accent"}`}>
            <p className="font-label text-xs uppercase opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="WO 보충 트리거 목록" moduleRef="FNC-QC-080~082" />
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">보충 트리거 <span className="opacity-30 font-light ml-2">| Buffer: 003 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["불량 번호","부재코드","SCRAP 수량","WO 유형","목표 납기","플래너 메모","상태","처리"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {TRIGGERS.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.defectId}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.partCode}</td>
                  <td className="px-4 py-2 tabular-nums">{r.scrapQty}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={r.woType === "URGENT" ? "error" : "idle"} label={WO_TYPE_LABEL[r.woType] ?? r.woType} />
                  </td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.targetDate}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.plannerNote}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT[r.status].type} label={SL[r.status] ?? r.status} /></td>
                  <td className="px-4 py-2">
                    {r.status === "PENDING" && <button className="bg-primary-accent text-white text-xs font-label uppercase px-3 py-1 hover:opacity-90">WO 생성</button>}
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
