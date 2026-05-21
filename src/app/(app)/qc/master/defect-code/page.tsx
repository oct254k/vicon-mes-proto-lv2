import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const CODES = [
  { code: "DC-001", name: "가공 불량", stage: "② 생산공정", owner: "생산팀", action: "폐기 또는 재작업", weight: "1.5×", active: "활성" },
  { code: "DC-002", name: "규격 미달", stage: "① 입고검사", owner: "자재팀", action: "반품", weight: "1.0×", active: "활성" },
  { code: "DC-003", name: "외관 불량", stage: "⑥ 최종검사", owner: "QC팀", action: "폐기 또는 클레임", weight: "2.0×", active: "활성" },
  { code: "DC-004", name: "조립 불량", stage: "⑤ 조립", owner: "생산팀", action: "재작업", weight: "1.8×", active: "활성" },
  { code: "DC-005", name: "운송 파손", stage: "⑨ 현장도착", owner: "CS팀", action: "클레임", weight: "3.0×", active: "활성" },
  { code: "DC-006", name: "표면 처리 불량", stage: "⑧ 출하검사", owner: "QC팀", action: "폐기", weight: "2.5×", active: "비활성" },
];

const COLUMNS = [
  { key: "code", label: "코드" },
  { key: "name", label: "불량명" },
  { key: "stage", label: "발생 시점" },
  { key: "owner", label: "책임 부서" },
  { key: "action", label: "처리 액션" },
  { key: "weight", label: "손실 가중치" },
  { key: "active", label: "상태" },
];

export default function QCDefectCodeMasterPage() {
  return (
    <div>
      <PageHeader
        title="불량 코드"
        accent="마스터"
        nodeRef="SCR-QC-005"
        status="PROTOTYPE"
        description="9시점 불량 코드·책임 부서·처리 액션·손실 가중치 매핑 (FNC-QC-051)"
      />
      <FieldHeader title="9시점 불량 코드 목록" moduleRef="FNC-QC-051" />
      <div className="flex gap-3 mb-5">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>시점 전체</option>
          <option>① 입고검사</option><option>② 생산공정</option><option>③ 반제품검사</option>
          <option>④ 이동입고</option><option>⑤ 조립</option><option>⑥ 최종검사</option>
          <option>⑦ 보관</option><option>⑧ 출하검사</option><option>⑨ 현장도착</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>처리 액션 전체</option><option>폐기</option><option>재작업</option><option>반품</option><option>클레임</option>
        </select>
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 신규 코드</button>
      </div>

      <DataTable title="불량 코드 — 6건" columns={COLUMNS} data={CODES} bufferCount={6} />
      <p className="mt-4 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest">
        행 클릭 → 수정 | 9시점 enum 강제 (FR-QC-050) | 손실 가중치 → /qc/loss/weight-master
      </p>
    </div>
  );
}
