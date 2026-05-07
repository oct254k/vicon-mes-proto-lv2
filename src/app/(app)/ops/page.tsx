import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function OPSPage() {
  return (
    <div>
      <PageHeader
        title="운영현황·대시보드"
        accent="OPS"
        nodeRef="SCR-OPS-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          라인 상황판·Plant 종합 현황·멀티사이트 뷰·주문·WO·생산·재고 진행률·알림센터까지 경영·운영 의사결정을 위한 실시간 대시보드를 제공합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 22개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">LINE</p>
          <p className="font-headline font-bold text-sm">라인 상황판</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-001 ~ 003</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PLANT</p>
          <p className="font-headline font-bold text-sm">Plant 종합 현황</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-004 ~ 006</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MULTISITE</p>
          <p className="font-headline font-bold text-sm">멀티사이트 뷰</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-007 ~ 009</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ORDERS PROGRESS</p>
          <p className="font-headline font-bold text-sm">수주 진행률</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-010 ~ 012</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">WO PROGRESS</p>
          <p className="font-headline font-bold text-sm">WO 진행 현황</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-013 ~ 015</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PRODUCTION</p>
          <p className="font-headline font-bold text-sm">생산 실적 요약</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-016 ~ 018</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">INVENTORY</p>
          <p className="font-headline font-bold text-sm">재고 현황 요약</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-019 ~ 020</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">NOTIFICATIONS</p>
          <p className="font-headline font-bold text-sm">알림 센터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-OPS-021 ~ 022</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 5개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>라인별·공정별 실시간 가동 상태 상황판</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>Plant 단위 KPI(생산량·품질률·OEE·납기달성률) 요약</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>멀티사이트 비교 뷰 및 드릴다운 분석</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>수주·WO·생산·재고 통합 진행률 시각화</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>긴급·경고 알림 집중 관리 및 담당자 에스컬레이션</li>
      </ul>
    </div>
  );
}
