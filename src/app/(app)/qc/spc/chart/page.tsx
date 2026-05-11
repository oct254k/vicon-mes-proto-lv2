import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const CHART_ITEMS = [
  { itemId: "I-001", name: "절단 길이", wc: "WC-CUT-01", type: "X-bar/R", lastViolate: "2026-05-05", violateCount: 3, status: "ALERT" },
  { itemId: "I-002", name: "절곡 각도", wc: "WC-BEND-01", type: "X-bar/R", lastViolate: "2026-05-04", violateCount: 2, status: "ALERT" },
  { itemId: "I-003", name: "강판 두께", wc: "WC-INSP-01", type: "X-bar/R", lastViolate: "-", violateCount: 0, status: "NORMAL" },
  { itemId: "I-005", name: "표면 등급", wc: "WC-CUT-01", type: "p-chart", lastViolate: "2026-05-02", violateCount: 1, status: "WARNING" },
];

const STAT: Record<string, { type: "error" | "warning" | "running" }> = {
  ALERT: { type: "error" },
  WARNING: { type: "warning" },
  NORMAL: { type: "running" },
};

export default function QCSpcChartPage() {
  return (
    <div>
      <PageHeader
        title="관리도 선택"
        accent="SPC"
        nodeRef="SCR-QC-020"
        status="PROTOTYPE"
        description="X-bar/R/p-chart 항목 선택 화면 (FNC-QC-030~031)"
      />

      <div className="flex gap-3 mb-5">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>Work Center 전체</option><option>WC-CUT-01</option><option>WC-BEND-01</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>차트 유형 전체</option><option>X-bar/R</option><option>p-chart</option>
        </select>
      </div>

      <FieldHeader title="측정 항목별 관리도" moduleRef="FNC-QC-030" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHART_ITEMS.map((item) => (
          <Link key={item.itemId} href="/qc/spc/chart/detail" className="block bg-surface-container-low p-5 hover:bg-surface-container transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-mono text-xs opacity-50 mb-1">{item.itemId} — {item.wc}</p>
                <p className="font-headline font-bold text-base">{item.name}</p>
                <p className="text-xs opacity-50 mt-1">차트 유형: {item.type}</p>
              </div>
              <StatusBadge type={STAT[item.status].type} label={item.status} />
            </div>
            <div className="flex gap-4 text-xs opacity-60">
              <span>최근 위반: {item.lastViolate}</span>
              <span>위반 건수 (30일): {item.violateCount}건</span>
            </div>
            <div className="mt-3 h-12 bg-surface-container-highest/30 flex items-center justify-center">
              <p className="text-xs opacity-30 font-label uppercase">[관리도 미니 차트 — Recharts 연동]</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        카드 클릭 → 상세 관리도 | [Rule 맵 →] /qc/spc/chart/rule-map
      </p>
    </div>
  );
}
