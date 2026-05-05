import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INV_DATA = [
  { code: "COIL-A", name: "열연 코일 A형", qty: "36.1 t", location: "P3000-W01", lastMove: "2026-05-05", status: "정상" },
  { code: "COIL-B", name: "열연 코일 B형", qty: "0.89 t", location: "P2000-W02", lastMove: "2026-05-04", status: "부족" },
  { code: "BAR-S", name: "각형 강봉 S", qty: "680 본", location: "P1000-Y01", lastMove: "2026-05-05", status: "정상" },
  { code: "PLATE", name: "후판 일반", qty: "35 장", location: "P3000-W03", lastMove: "2026-05-03", status: "주의" },
  { code: "FASTENER", name: "고장력 볼트", qty: "12,500 ea", location: "P2000-W01", lastMove: "2026-05-05", status: "정상" },
];

const STATUS_COLOR: Record<string, string> = {
  정상: "text-tertiary bg-tertiary/20",
  주의: "text-[#f59e0b] bg-[#f59e0b]/20",
  부족: "text-error bg-error/20",
};

export default function OPSInventoryPage() {
  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="재고 종합"
        accent="INVENTORY"
        nodeRef="SCR-OPS-070"
        description="Plant × Material 재고 매트릭스 · 5분 갱신"
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>공장 전체</option>
            <option>P1000</option>
            <option>P2000</option>
            <option>P3000</option>
          </select>
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>Material 분류 전체</option>
          </select>
        </div>
        <span className="text-xs font-label text-on-surface-variant">마지막 갱신 14:32 ⟳ 5분</span>
      </div>

      {/* KPI 카드 4개 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">자재 종수</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">5</p>
        </div>
        <div className="bg-surface-container border-l-4 border-primary-accent p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">총 재고</p>
          <p className="text-3xl font-black tabular-nums text-primary-accent">37<span className="text-lg">t+</span></p>
          <p className="text-xs text-on-surface-variant mt-1">코일 기준</p>
        </div>
        <div className="bg-surface-container border-l-4 border-[#f59e0b] p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">이동 중</p>
          <p className="text-3xl font-black tabular-nums text-[#f59e0b]">2</p>
          <p className="text-xs text-on-surface-variant mt-1">건 입출고 처리중</p>
        </div>
        <div className="bg-surface-container border-l-4 border-error p-4">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">AGING 초과</p>
          <p className="text-3xl font-black tabular-nums text-error">1</p>
          <p className="text-xs text-on-surface-variant mt-1">30일 이상 미사용</p>
        </div>
      </div>

      {/* Plant × Material 매트릭스 */}
      <div className="bg-surface-container-lowest p-4 mb-6">
        <FieldHeader title="Plant × Material 매트릭스" moduleRef="FNC-OPS-080" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm font-headline">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">Material</th>
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">P1000</th>
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">P2000</th>
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">P3000</th>
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">합계</th>
                <th className="px-4 py-2 font-label text-xs uppercase opacity-50">액션</th>
              </tr>
            </thead>
            <tbody>
              {[
                { mat: "COIL-A", p1: "12.4 t", p2: "8.5 t", p3: "15.2 t", total: "36.1 t", alert: false },
                { mat: "COIL-B", p1: "0.8 t", p2: "0.05 t", p3: "0.04 t", total: "0.89 t", alert: true },
                { mat: "BAR-S", p1: "200 본", p2: "180 본", p3: "250 본", total: "680 본", alert: false },
                { mat: "PLATE", p1: "8 장", p2: "25 장", p3: "2 장", total: "35 장", alert: true },
                { mat: "FASTENER", p1: "5,000", p2: "3,000", p3: "4,500", total: "12,500", alert: false },
              ].map((row) => (
                <tr key={row.mat} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 ${row.alert ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2 font-black text-on-surface">{row.mat}</td>
                  <td className="px-4 py-2 tabular-nums">{row.p1}</td>
                  <td className={`px-4 py-2 tabular-nums ${row.alert ? "text-error font-black" : ""}`}>{row.p2}</td>
                  <td className={`px-4 py-2 tabular-nums ${row.alert ? "text-error font-black" : ""}`}>{row.p3}</td>
                  <td className="px-4 py-2 tabular-nums font-black">{row.total}</td>
                  <td className="px-4 py-2">
                    {row.alert && (
                      <button className="text-xs bg-error/20 text-error px-2 py-0.5 font-label uppercase mr-1">PR 발행</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 자재 상세 DataTable */}
      <DataTable
        title="자재별 재고 현황"
        columns={[
          { key: "code", label: "코드" },
          { key: "name", label: "자재명" },
          { key: "qty", label: "재고량" },
          { key: "location", label: "위치" },
          { key: "lastMove", label: "최종 이동일" },
          { key: "status", label: "상태" },
        ]}
        data={INV_DATA.map((d) => ({
          ...d,
          status: `[${d.status}]`,
        }))}
        bufferCount={INV_DATA.length}
      />
    </div>
  );
}
