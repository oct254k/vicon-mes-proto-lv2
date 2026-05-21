import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const QUEUE = [
  { id: "D-2026-0044", partCode: "B01-1-G22C-C-172", type: "외관", stage: "⑥ 최종검사", qty: 1, reporter: "insp.park", reportedAt: "2026-05-05 11:20", age: "2h" },
  { id: "D-2026-0043", partCode: "B01-2-G15A-S-040", type: "규격", stage: "⑨ 현장도착", qty: 2, reporter: "cs.lee", reportedAt: "2026-05-05 09:45", age: "3h" },
  { id: "D-2026-0038", partCode: "M-COIL-A-...011", type: "표면", stage: "① 입고검사", qty: 4, reporter: "insp.choi", reportedAt: "2026-05-04 16:30", age: "19h" },
];

export default function QCDefectInspectQueuePage() {
  return (
    <div>
      <PageHeader
        title="검사 대기 큐"
        accent="검수"
        nodeRef="SCR-QC-040"
        status="PROTOTYPE"
        description="QC 검사자 결재 큐 REPORTED→CONFIRMED (FNC-QC-050~052, 064, 071)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: "대기 중", v: "3", bad: true }, { l: "처리 완료 (오늘)", v: "7", bad: false }, { l: "평균 대기 시간", v: "8.2h", bad: false }].map((k) => (
          <div key={k.l} className={`p-4 border-l-4 ${k.bad ? "border-warning" : "border-primary-accent"}`}>
            <p className="font-label text-sm uppercase opacity-80 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="REPORTED 대기 목록" moduleRef="FNC-QC-050" />
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-warning">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">결재 대기 <span className="opacity-60 font-light ml-2">| Buffer: 003 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["신고번호","부재코드","불량유형","시점","수량","신고자","신고시각","경과","처리"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-sm opacity-75 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {QUEUE.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{r.id}</td>
                  <td className="px-4 py-2 font-mono text-sm">{r.partCode}</td>
                  <td className="px-4 py-2">{r.type}</td>
                  <td className="px-4 py-2 text-sm">{r.stage}</td>
                  <td className="px-4 py-2 tabular-nums">{r.qty}</td>
                  <td className="px-4 py-2 text-sm opacity-90">{r.reporter}</td>
                  <td className="px-4 py-2 text-sm tabular-nums">{r.reportedAt}</td>
                  <td className="px-4 py-2"><StatusBadge type={parseInt(r.age) > 12 ? "error" : "warning"} label={r.age} /></td>
                  <td className="px-4 py-2">
                    <button className="bg-primary-accent text-white text-xs font-label uppercase px-3 py-1 hover:opacity-90">CONFIRM</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-4 text-sm text-on-surface-variant/70 font-label uppercase tracking-widest">
        CONFIRM 클릭 → REPORTED→CONFIRMED 상태 전환 (FNC-QC-064) | 4계층 결재: QC 검사자 1단계
      </p>
    </div>
  );
}
