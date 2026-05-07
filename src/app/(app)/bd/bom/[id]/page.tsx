import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface BomRow {
  level: number;
  itemCode: string;
  itemName: string;
  qtyPerMeter: number;
  uom: string;
  type: "완제품" | "반제품" | "원자재";
}

const BOM_TREE: BomRow[] = [
  { level: 0, itemCode: "M-DECK-C형", itemName: "데크플레이트 C형", qtyPerMeter: 1.000, uom: "m", type: "완제품" },
  { level: 1, itemCode: "SP-COIL-C", itemName: "C형 코일 반제품", qtyPerMeter: 0.980, uom: "m", type: "반제품" },
  { level: 2, itemCode: "M-COIL-A", itemName: "코일 A (SS400)", qtyPerMeter: 0.980, uom: "m", type: "원자재" },
  { level: 1, itemCode: "SP-TG-C", itemName: "TG 반제품 (C형)", qtyPerMeter: 2.000, uom: "ea", type: "반제품" },
  { level: 2, itemCode: "M-WIRE-01", itemName: "와이어 1호", qtyPerMeter: 0.150, uom: "m", type: "원자재" },
  { level: 2, itemCode: "M-FASTENER", itemName: "체결구", qtyPerMeter: 4.000, uom: "ea", type: "원자재" },
  { level: 1, itemCode: "M-COIL-B", itemName: "코일 B (보강재)", qtyPerMeter: 0.150, uom: "m", type: "원자재" },
];

const levelIndent = ["", "  ├─ ", "    └─ "];

const typeColor: Record<BomRow["type"], string> = {
  완제품: "text-primary-accent font-bold",
  반제품: "text-[#f59e0b]",
  원자재: "text-on-surface/70",
};

export default function BomDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageHeader
        title={`BOM 상세`}
        accent={decodeURIComponent(params.id)}
        nodeRef="SCR-BD-022"
        status="PROTOTYPE"
        description="다단계 BOM 펼침 View — 완제품 → 반제품 → 원자재 3단계 계층"
      />

      {/* 헤더 요약 */}
      <div className="bg-surface-container border-l-4 border-primary-accent p-4 mb-6 flex flex-wrap gap-6 items-center">
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface/50">품목</span>
          <p className="font-headline font-bold text-sm mt-0.5">M-DECK-C형</p>
        </div>
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface/50">버전</span>
          <p className="font-headline font-bold text-sm mt-0.5 text-primary-accent">v3</p>
        </div>
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface/50">상태</span>
          <div className="mt-0.5">
            <StatusBadge type="running" label="유효" />
          </div>
        </div>
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-on-surface/50">발효일</span>
          <p className="font-headline font-bold text-sm mt-0.5">2026-04-01</p>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest hover:bg-primary-accent/80 transition-colors">
            MRP 재실행 트리거
          </button>
        </div>
      </div>

      <FieldHeader title="BOM 트리 (다단계 펼침)" moduleRef="FNC-BD-022" />

      {/* BOM Tree Table */}
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            BOM 구성 트리
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">자재코드</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">이름</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold text-right">qty/m</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">단위</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">레벨</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">구분</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {BOM_TREE.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors ${row.level === 0 ? "bg-surface-container-high/40" : ""}`}
                >
                  <td className="px-4 py-2 tabular-nums font-mono text-xs">
                    <span className="text-on-surface/30">{levelIndent[row.level]}</span>
                    <span className={typeColor[row.type]}>{row.itemCode}</span>
                  </td>
                  <td className={`px-4 py-2 ${typeColor[row.type]}`}>{row.itemName}</td>
                  <td className="px-4 py-2 tabular-nums text-right">{row.qtyPerMeter.toFixed(3)}</td>
                  <td className="px-4 py-2 text-on-surface/60">{row.uom}</td>
                  <td className="px-4 py-2 text-on-surface/50 font-mono text-xs">L{row.level}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-label uppercase tracking-wider px-2 py-0.5 ${
                      row.type === "완제품" ? "bg-primary-accent/20 text-primary-accent" :
                      row.type === "반제품" ? "bg-[#f59e0b]/20 text-[#f59e0b]" :
                      "bg-surface-container-highest text-on-surface/50"
                    }`}>
                      {row.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Leaf 합산 */}
      <div className="mt-6 bg-surface-container p-4 border-l-4 border-outline-variant/30">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface/50 mb-3">원자재 소요 합산 (leaf)</p>
        <div className="flex flex-wrap gap-6">
          {[
            { id: "M-COIL-A", qty: "0.980", uom: "m/m" },
            { id: "M-WIRE-01", qty: "0.150", uom: "m/m" },
            { id: "M-FASTENER", qty: "4.000", uom: "ea/m" },
            { id: "M-COIL-B", qty: "0.150", uom: "m/m" },
          ].map((r) => (
            <div key={r.id} className="flex flex-col">
              <span className="font-mono text-xs text-primary-accent">{r.id}</span>
              <span className="font-headline font-bold text-sm tabular-nums">{r.qty} <span className="text-on-surface/40 text-xs">{r.uom}</span></span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-on-surface/40 font-label">
        영속화 X — 매 호출 재계산 (FNC-BD-022, A6) · PRC-BD-001 §6 B2
      </p>
    </div>
  );
}
