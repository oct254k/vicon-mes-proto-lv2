import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function QCSpcMeasurePdaPage() {
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader
        title="PDA 측정 입력"
        accent="SPC"
        nodeRef="SCR-QC-010"
        status="PROTOTYPE"
        description="현장 스캔→측정→즉시 평가 (FNC-QC-016, 020~024)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="1단계: LOT 스캔" moduleRef="FNC-QC-016" />
        <div className="flex gap-2 mb-2">
          <input type="text" defaultValue="LOT-20260505-01" className="flex-1 bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" readOnly />
          <button className="bg-primary-accent text-black px-3 py-2 text-xs font-label uppercase font-bold">스캔</button>
        </div>
        <p className="text-xs opacity-50">부재코드: B01-1-G22C-C-171 | WC: WC-CUT-01</p>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="2단계: 측정 항목 선택" moduleRef="FNC-QC-020" />
        <select className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-label uppercase tracking-wider">
          <option>I-001 절단 길이 (mm)</option>
          <option>I-002 절곡 각도 (°)</option>
          <option>I-005 표면 등급 (grade)</option>
        </select>
        <div className="flex gap-3 mt-2 text-xs opacity-50">
          <span>UCL: 6000.5</span><span>CL: 6000.0</span><span>LCL: 5999.5</span>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="3단계: 측정값 입력" moduleRef="FNC-QC-021~022" />
        <input
          type="number"
          step="0.1"
          defaultValue="6000.2"
          className="w-full bg-surface-container border border-outline-variant/20 px-3 py-3 text-2xl font-mono font-bold text-center mb-2"
        />
        <p className="text-xs opacity-50 text-center">단위: mm | 샘플 크기: 1</p>
      </div>

      <div className="bg-surface-container border-l-4 border-primary-accent/30 p-4 mb-4">
        <FieldHeader title="즉시 평가 결과" moduleRef="FNC-QC-023~024" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-accent/20 flex items-center justify-center text-primary-accent font-black text-lg">OK</div>
          <div>
            <p className="font-headline font-bold text-sm">정상 — UCL/LCL 범위 내</p>
            <p className="text-xs opacity-50">±1σ 내 | 8 Rules 위반 없음</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-primary-accent text-black font-label uppercase tracking-widest py-3 font-bold hover:opacity-90">저장</button>
        <button className="flex-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase tracking-widest py-3 hover:opacity-90">취소</button>
      </div>
    </div>
  );
}
