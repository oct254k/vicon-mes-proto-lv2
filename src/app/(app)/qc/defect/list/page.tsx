import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DEFECTS = [
  { id: "D-2026-0044", partCode: "B01-1-G22C-C-172", type: "외관", stage: "⑥ 최종검사", qty: 1, reporter: "insp.park", status: "CONFIRMED" },
  { id: "D-2026-0043", partCode: "B01-2-G15A-S-040", type: "규격", stage: "⑨ 현장도착", qty: 2, reporter: "cs.lee", status: "REPORTED" },
  { id: "D-2026-0042", partCode: "B01-1-G22C-C-171", type: "가공", stage: "② 생산공정", qty: 1, reporter: "worker.han", status: "DISPOSED" },
  { id: "D-2026-0041", partCode: "B01-1-G22C-C-150", type: "조립", stage: "⑥ 최종검사", qty: 3, reporter: "insp.park", status: "CLOSED" },
  { id: "D-2026-0030", partCode: "M-COIL-A-...013", type: "표면", stage: "① 입고검사", qty: 5, reporter: "insp.choi", status: "CLOSED" },
];

const STAT: Record<string, { type: "warning" | "running" | "idle" | "stopped" }> = {
  REPORTED: { type: "warning" },
  CONFIRMED: { type: "running" },
  DISPOSED: { type: "idle" },
  CLOSED: { type: "stopped" },
};
const SL: Record<string, string> = { REPORTED: "보고됨", CONFIRMED: "확정", DISPOSED: "처리됨", CLOSED: "종료" };

export default function QCDefectListPage() {
  return (
    <div>
      <PageHeader
        title="불량 목록"
        accent="트랜잭션"
        nodeRef="SCR-QC-032"
        status="PROTOTYPE"
        description="불량 트랜잭션 조회·이력 (부재/Lot/시점/기간) (FNC-QC-073)"
      />
      <FieldHeader title="필터" moduleRef="FNC-QC-073" />
      <div className="flex flex-wrap gap-3 mb-5">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>최근 6개월</option><option>최근 30일</option><option>최근 7일</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>시점 전체</option><option>① 입고검사</option><option>② 생산공정</option><option>⑥ 최종검사</option><option>⑨ 현장도착</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>유형 전체</option><option>가공</option><option>조립</option><option>표면</option><option>규격</option><option>외관</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>상태 전체</option><option>REPORTED</option><option>CONFIRMED</option><option>DISPOSED</option><option>CLOSED</option>
        </select>
        <div className="flex-1" />
        <a href="/qc/defect/report-pda" className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 신규 신고</a>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {[{ l: "총 건수", v: "24" }, { l: "REPORTED", v: "5" }, { l: "CONFIRMED", v: "4" }, { l: "DISPOSED/CLOSED", v: "15" }].map((k) => (
          <div key={k.l} className="bg-surface-container-low border-l-4 border-primary-accent p-3">
            <p className="font-label text-xs uppercase opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">불량 트랜잭션 <span className="opacity-30 font-light ml-2">| Buffer: 024 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["신고번호","부재코드","불량유형","시점","수량","신고자","상태"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {DEFECTS.map((d, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{d.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{d.partCode}</td>
                  <td className="px-4 py-2">{d.type}</td>
                  <td className="px-4 py-2 text-xs">{d.stage}</td>
                  <td className="px-4 py-2 tabular-nums">{d.qty}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{d.reporter}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT[d.status].type} label={SL[d.status] ?? d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
