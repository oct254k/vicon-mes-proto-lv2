import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function EQPage() {
  return (
    <div>
      <PageHeader
        title="설비관리"
        accent="EQ"
        nodeRef="SCR-EQ-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          설비 계층 구조·가동 이력·PM 계획·정비 작업지시·예비품 관리·OEE 분석·PdM 예측 정비까지 설비 생애주기 전반을 관리합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 40개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">HIERARCHY</p>
          <p className="font-headline font-bold text-sm">설비 계층 마스터</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RUNTIME</p>
          <p className="font-headline font-bold text-sm">가동 이력·현황</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PM</p>
          <p className="font-headline font-bold text-sm">예방정비 계획</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ORDERS</p>
          <p className="font-headline font-bold text-sm">정비 작업지시</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PARTS</p>
          <p className="font-headline font-bold text-sm">예비품 재고</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">OEE</p>
          <p className="font-headline font-bold text-sm">OEE 분석</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PDM</p>
          <p className="font-headline font-bold text-sm">예측 정비(PdM)</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PDA</p>
          <p className="font-headline font-bold text-sm">현장 PDA 정비</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>설비 계층(Site → Plant → Line → Equipment) 마스터 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>가동·정지·고장 이력 수집 및 MTBF/MTTR 산출</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>PM 주기 설정 및 정비 작업지시 자동 생성</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>예비품 재고 관리 및 소요량 예측</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>OEE(가동률·성능률·품질률) 실시간 분석</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>센서 데이터 기반 PdM 이상 징후 감지 및 알림</li>
      </ul>
    </div>
  );
}
