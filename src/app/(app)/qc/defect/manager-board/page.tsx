import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CONFIRMED = [
  { id: "D-2026-0044", partCode: "B01-1-G22C-C-172", type: "외관", stage: "⑥ 최종검사", qty: 1, confirmedAt: "2026-05-05 12:10" },
  { id: "D-2026-0043", partCode: "B01-2-G15A-S-040", type: "규격", stage: "⑨ 현장도착", qty: 2, confirmedAt: "2026-05-05 11:50" },
  { id: "D-2026-0038", partCode: "M-COIL-A-...011", type: "표면", stage: "① 입고검사", qty: 4, confirmedAt: "2026-05-05 10:30" },
];

const ACTIONS = ["SCRAP", "CLAIM", "RETURN", "REWORK"];
const ACTION_STYLE: Record<string, string> = {
  SCRAP: "bg-error text-white",
  CLAIM: "bg-[#f59e0b] text-black",
  RETURN: "bg-tertiary text-black",
  REWORK: "bg-surface-container-highest text-on-surface",
};

export default function QCDefectManagerBoardPage() {
  return (
    <div>
      <PageHeader
        title="관리자 불량 보드"
        accent="4종 분기"
        nodeRef="SCR-QC-041"
        status="PROTOTYPE"
        description="QC 관리자 CONFIRMED→DISPOSED 4종 분기 발행 (FNC-QC-054, 065~072)"
      />

      <div className="bg-surface-container border-l-4 border-[#f59e0b] p-4 mb-6 flex items-start gap-3">
        <StatusBadge type="warning" label="4계층 결재 2단계" />
        <p className="text-sm opacity-70">CONFIRMED 건을 SCRAP / CLAIM / RETURN / REWORK 4종으로 분기 발행. 발행 시 재고 차감·거래처 통보·격리 입고 자동 실행.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {ACTIONS.map((a) => (
          <div key={a} className="p-4 border-l-4 border-outline-variant/20 bg-surface-container-low">
            <p className="font-label text-xs uppercase opacity-50 mb-1">{a}</p>
            <p className="font-headline font-black text-2xl">
              {a === "SCRAP" ? 3 : a === "CLAIM" ? 2 : a === "RETURN" ? 1 : 2}
            </p>
            <p className="text-xs opacity-40 mt-1">이번 달 누적</p>
          </div>
        ))}
      </div>

      <FieldHeader title="CONFIRMED 발행 대기" moduleRef="FNC-QC-054" />
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">발행 대기 <span className="opacity-30 font-light ml-2">| Buffer: 003 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["신고번호","부재코드","불량유형","시점","수량","확인일시","4종 발행"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {CONFIRMED.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{r.partCode}</td>
                  <td className="px-4 py-2">{r.type}</td>
                  <td className="px-4 py-2 text-xs">{r.stage}</td>
                  <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.confirmedAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      {ACTIONS.map((a) => (
                        <button key={a} className={`text-xs font-label uppercase px-2 py-1 hover:opacity-80 ${ACTION_STYLE[a]}`}>{a}</button>
                      ))}
                    </div>
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
