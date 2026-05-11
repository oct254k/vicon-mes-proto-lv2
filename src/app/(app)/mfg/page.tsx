import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function MFGPage() {
  return (
    <div>
      <PageHeader
        title="생산실행·추적성"
        accent="MFG"
        nodeRef="SCR-MFG-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          자재 ISSUE·공정 PRODUCE·반제품 TRANSFER·회수 RECALL·외주 공정 관리 등 현장 생산실행 전 사이클과 Lot 단위 추적성을 제공합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 28개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">TODAY</p>
          <p className="font-headline font-bold text-sm">금일 작업 현황</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ISSUE</p>
          <p className="font-headline font-bold text-sm">자재 투입·불출</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PRODUCE</p>
          <p className="font-headline font-bold text-sm">생산 실적 등록</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">TRANSFER</p>
          <p className="font-headline font-bold text-sm">공정 간 이송</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECALL</p>
          <p className="font-headline font-bold text-sm">공정 회수·반품</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">OUTSOURCE</p>
          <p className="font-headline font-bold text-sm">외주 공정 관리</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>WO 기반 자재 불출(ISSUE) 스캔 및 실적 연계</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>공정별 생산 실적 입력 및 LOT 추적 기록</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>반제품 공정 간 이송 스캔(TRANSFER)</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>부적합 발생 시 공정 회수(RECALL) 및 격리 처리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>외주 공정 발주·입고 및 실적 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>순방향·역방향 LOT 계보 추적성 제공</li>
      </ul>
    </div>
  );
}
