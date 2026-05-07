import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ALERTS = [
  { id: "ALR-0041", rule: "Rule 1", itemId: "I-001", itemName: "절단 길이", wc: "WC-CUT-01", lot: "LOT-20260505-01", points: 1, status: "OPEN", triggeredAt: "2026-05-05 09:12", assignee: "-" },
  { id: "ALR-0040", rule: "Rule 3", itemId: "I-002", itemName: "절곡 각도", wc: "WC-BEND-01", lot: "LOT-20260504-03", points: 3, status: "INVESTIGATING", triggeredAt: "2026-05-04 17:20", assignee: "insp.park" },
  { id: "ALR-0039", rule: "Rule 1", itemId: "I-001", itemName: "절단 길이", wc: "WC-CUT-01", lot: "LOT-20260503-02", points: 1, status: "CLOSED", triggeredAt: "2026-05-03 14:05", assignee: "qcmgr.lee" },
  { id: "ALR-0038", rule: "Rule 5", itemId: "I-003", itemName: "강판 두께", wc: "WC-INSP-01", lot: "LOT-20260502-01", points: 5, status: "CLOSED", triggeredAt: "2026-05-02 10:30", assignee: "qcmgr.lee" },
];

const STAT_MAP: Record<string, { type: "error" | "warning" | "idle"; label: string }> = {
  OPEN: { type: "error", label: "OPEN" },
  INVESTIGATING: { type: "warning", label: "INVESTIGATING" },
  CLOSED: { type: "idle", label: "종료" },
};

export default function QCSpcAlertPage() {
  return (
    <div>
      <PageHeader
        title="SPC 알림"
        accent="인박스"
        nodeRef="SCR-QC-023"
        status="PROTOTYPE"
        description="8 Rules 위반 알림 처리 보드 (FNC-QC-032~036, 040~045)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "OPEN", value: 8, bad: true },
          { label: "INVESTIGATING", value: 5, bad: true },
          { label: "CLOSED (30일)", value: 31, bad: false },
        ].map((k) => (
          <div key={k.label} className={`p-4 border-l-4 ${k.bad ? "border-error" : "border-outline-variant/20"}`}>
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{k.label}</p>
            <p className="font-headline font-black text-3xl">{k.value}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="알림 목록" moduleRef="SCR-QC-023" />
      <div className="flex gap-3 mb-4">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>전체 Rule</option><option>Rule 1</option><option>Rule 3</option><option>Rule 5</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>전체 상태</option><option>OPEN</option><option>INVESTIGATING</option><option>CLOSED</option>
        </select>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">SPC 알림 <span className="opacity-30 font-light ml-2">| Buffer: 041 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["알림 ID","Rule","항목","WC","LOT","포인트 수","상태","발생 시각","담당자"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {ALERTS.map((a, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-primary-accent tabular-nums">{a.id}</td>
                  <td className="px-4 py-2 font-bold">{a.rule}</td>
                  <td className="px-4 py-2 font-mono text-xs">{a.itemId}</td>
                  <td className="px-4 py-2 text-xs">{a.wc}</td>
                  <td className="px-4 py-2 text-xs">{a.lot}</td>
                  <td className="px-4 py-2 tabular-nums">{a.points}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT_MAP[a.status].type} label={STAT_MAP[a.status].label} /></td>
                  <td className="px-4 py-2 text-xs tabular-nums">{a.triggeredAt}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{a.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
