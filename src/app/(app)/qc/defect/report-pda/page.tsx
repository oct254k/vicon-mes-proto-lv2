import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const STAGES = ["① 입고검사","② 생산공정","③ 반제품검사","④ 이동입고","⑤ 조립","⑥ 최종검사","⑦ 보관","⑧ 출하검사","⑨ 현장도착"];

export default function QCDefectReportPdaPage() {
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader
        title="PDA 불량 신고"
        accent="신고"
        nodeRef="SCR-QC-030"
        status="PROTOTYPE"
        description="9시점 + 사진 첨부 현장 불량 신고 (FNC-QC-053, 060~063)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="1단계: 부재 스캔" moduleRef="FNC-QC-053" />
        <div className="flex gap-2">
          <input type="text" defaultValue="B01-1-G22C-C-173" className="flex-1 bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" readOnly />
          <button className="bg-primary-accent text-black px-3 py-2 text-xs font-label uppercase font-bold">스캔</button>
        </div>
        <p className="text-xs opacity-50 mt-1">LOT: LOT-20260505-02 | 수량: 1</p>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="2단계: 발생 시점 (9시점 필수)" moduleRef="FR-QC-050" />
        <div className="grid grid-cols-1 gap-2">
          {STAGES.map((s) => (
            <label key={s} className="flex items-center gap-3 p-2 bg-surface-container cursor-pointer hover:bg-surface-container-high">
              <input type="radio" name="stage" value={s} defaultChecked={s === "② 생산공정"} className="accent-primary-accent" />
              <span className="text-sm font-body">{s}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-warning mt-2">* 시점이 늦을수록 손실 가중치·통보 범위 자동 가중 (FR-QC-050)</p>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="3단계: 불량 정보" moduleRef="FNC-QC-060~061" />
        <div className="space-y-3">
          <div>
            <label className="font-label text-xs uppercase opacity-50 block mb-1">불량 코드</label>
            <select className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm">
              <option>DC-001 가공 불량</option><option>DC-003 외관 불량</option><option>DC-004 조립 불량</option>
            </select>
          </div>
          <div>
            <label className="font-label text-xs uppercase opacity-50 block mb-1">불량 수량</label>
            <input type="number" defaultValue={1} className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" />
          </div>
          <div>
            <label className="font-label text-xs uppercase opacity-50 block mb-1">비고</label>
            <textarea rows={2} placeholder="현장 상황 메모" className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body" />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-outline-variant/20 p-4 mb-4">
        <FieldHeader title="4단계: 사진 첨부" moduleRef="FNC-QC-062" />
        <div className="h-24 bg-surface-container flex items-center justify-center border border-dashed border-outline-variant/30">
          <p className="text-xs opacity-40 font-label uppercase">[카메라 / 갤러리 — mock://defect/D-2026-0044.jpg]</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-primary-accent text-black font-label uppercase tracking-widest py-3 font-bold hover:opacity-90">신고 제출</button>
        <button className="flex-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase tracking-widest py-3 hover:opacity-90">취소</button>
      </div>
    </div>
  );
}
