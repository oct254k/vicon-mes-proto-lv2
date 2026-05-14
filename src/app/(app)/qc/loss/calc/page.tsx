import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function QCLossCalcPage() {
  return (
    <div>
      <PageHeader
        title="손실 환산"
        accent="계산"
        nodeRef="SCR-QC-070"
        status="PROTOTYPE"
        description="자재×BOM×시점 가중치 손실 환산 입력·산출 (FNC-QC-100~102)"
      />

      <div className="bg-surface-container border-l-4 border-warning p-4 mb-6">
        <p className="text-sm opacity-70">손실 환산식: <code className="font-mono text-xs bg-surface-container-highest px-2 py-1">loss_amount = 자재단가 × BOM_소요량 × 시점_가중치 + 인건비/공수</code> (FR-QC-090)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FieldHeader title="입력 정보" moduleRef="FNC-QC-100" />
          <div className="space-y-4 bg-surface-container-low p-5">
            <div>
              <label className="font-label text-xs uppercase opacity-50 block mb-1">불량 번호</label>
              <select className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm">
                <option>D-2026-0042 — B01-1-G22C-C-171</option>
                <option>D-2026-0043 — B01-2-G15A-S-040</option>
                <option>D-2026-0044 — B01-1-G22C-C-172</option>
              </select>
            </div>
            <div>
              <label className="font-label text-xs uppercase opacity-50 block mb-1">발생 시점</label>
              <select className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm">
                <option>② 생산공정 (가중치 1.5×)</option>
                <option>① 입고검사 (가중치 1.0×)</option>
                <option>⑥ 최종검사 (가중치 2.0×)</option>
                <option>⑨ 현장도착 (가중치 3.0×)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label text-xs uppercase opacity-50 block mb-1">자재 단가 (원/kg)</label>
                <input type="number" defaultValue={850000} className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" />
              </div>
              <div>
                <label className="font-label text-xs uppercase opacity-50 block mb-1">BOM 소요량 (kg)</label>
                <input type="number" defaultValue={1.46} step={0.01} className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label text-xs uppercase opacity-50 block mb-1">인건비/공수 (원)</label>
                <input type="number" defaultValue={45000} className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" />
              </div>
              <div>
                <label className="font-label text-xs uppercase opacity-50 block mb-1">불량 수량</label>
                <input type="number" defaultValue={1} className="w-full bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-mono" />
              </div>
            </div>
            <button className="w-full bg-primary-accent text-black font-label uppercase tracking-widest py-2.5 font-bold hover:opacity-90">손실 산출</button>
          </div>
        </div>

        <div>
          <FieldHeader title="산출 결과" moduleRef="FNC-QC-101~102" />
          <div className="space-y-3 bg-surface-container-low p-5">
            {[
              { label: "자재 손실", value: "₩ 1,241,000", sub: "850,000 × 1.46kg × 1" },
              { label: "시점 가중치 적용", value: "×1.5", sub: "② 생산공정" },
              { label: "가중 자재 손실", value: "₩ 1,861,500", sub: "자재손실 × 1.5" },
              { label: "인건비/공수", value: "₩ 45,000", sub: "작업 공수 환산" },
              { label: "총 손실 환산액", value: "₩ 1,906,500", sub: "가중자재 + 인건비", highlight: true },
            ].map((r) => (
              <div key={r.label} className={`flex justify-between items-center p-3 ${r.highlight ? "border-l-4 border-primary-accent bg-primary-accent/5" : "border-b border-outline"}`}>
                <div>
                  <p className="font-label text-xs uppercase opacity-60">{r.label}</p>
                  <p className="text-xs opacity-40">{r.sub}</p>
                </div>
                <p className={`font-headline font-black tabular-nums ${r.highlight ? "text-xl" : "text-base"}`}>{r.value}</p>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-primary-accent text-black font-label uppercase py-2 font-bold hover:opacity-90">회계 큐 전송</button>
              <button className="flex-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase py-2 hover:opacity-90">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
