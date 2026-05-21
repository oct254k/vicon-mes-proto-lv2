import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { FieldHeader } from "@/components/ui/FieldHeader";

const ITEMS = [
  { id: "I-001", name: "절단 길이", wc: "WC-CUT-01", unit: "mm", ucl: "6000.5", lcl: "5999.5", cl: "6000.0", step: "10 절단", active: "✅" },
  { id: "I-002", name: "절곡 각도", wc: "WC-BEND-01", unit: "°", ucl: "290.3", lcl: "289.7", cl: "290.0", step: "20 절곡", active: "✅" },
  { id: "I-003", name: "강판 두께", wc: "WC-INSP-01", unit: "mm", ucl: "2.32", lcl: "2.28", cl: "2.30", step: "05 검사", active: "✅" },
  { id: "I-004", name: "용접 강도", wc: "WC-WELD-02", unit: "MPa", ucl: "470", lcl: "430", cl: "450", step: "30 용접", active: "⚠ 비활성" },
  { id: "I-005", name: "표면 등급", wc: "WC-CUT-01", unit: "grade", ucl: "A", lcl: "C", cl: "B", step: "10 절단", active: "✅" },
];

const COLUMNS = [
  { key: "id", label: "항목 코드" },
  { key: "name", label: "항목명" },
  { key: "wc", label: "적용 공정" },
  { key: "unit", label: "단위" },
  { key: "ucl", label: "UCL" },
  { key: "cl", label: "CL" },
  { key: "lcl", label: "LCL" },
  { key: "step", label: "공정 단계" },
  { key: "active", label: "상태" },
];

export default function QCSpcMasterPage() {
  return (
    <main className="p-8">
      <PageHeader
        title="SPC 측정 항목"
        accent="마스터"
        nodeRef="IA-QC-MASTER-ITEM"
        description="SPC 측정 항목 관리 한계(UCL/CL/LCL) 및 적용 공정 마스터"
      />

      <div className="flex items-center gap-3 mb-6">
        <FieldHeader title="측정 항목 목록" moduleRef="SCR-QC-001" />
      </div>

      <div className="flex gap-3 mb-4">
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>Work Center 전체</option>
          <option>WC-CUT-01</option>
          <option>WC-BEND-01</option>
          <option>WC-INSP-01</option>
          <option>WC-WELD-02</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>Material 전체</option>
          <option>M-COIL-A</option>
          <option>M-SHEET-B</option>
          <option>M-ASSY-A</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>활성만</option>
          <option>전체</option>
          <option>비활성만</option>
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-white text-sm font-label uppercase tracking-widest px-4 py-1.5 font-bold hover:opacity-90">
          + 신규 항목
        </button>
        <button className="bg-surface-container-high border border-outline-variant/20 text-on-surface text-sm font-label uppercase tracking-widest px-4 py-1.5 hover:opacity-90">
          엑셀
        </button>
      </div>

      <DataTable
        title="SPC 측정 항목 — 38건 중 5건 표시"
        columns={COLUMNS}
        data={ITEMS}
        bufferCount={38}
      />

      <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        행 클릭 → 수정 | [이력] | [한계 버전]
      </p>
    </main>
  );
}
