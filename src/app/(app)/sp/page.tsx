import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function SPPage() {
  return (
    <div>
      <PageHeader
        title="수주·생산계획"
        accent="SP"
        nodeRef="SCR-SP-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          고객 수주 접수부터 부재리스트 생성·일일생산계획 수립·MRP 자재소요량 산출까지 생산 준비 전 과정을 다룹니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 23개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ORDERS</p>
          <p className="font-headline font-bold text-sm">수주 등록·조회</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MEMBERS</p>
          <p className="font-headline font-bold text-sm">부재리스트 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PLANS</p>
          <p className="font-headline font-bold text-sm">일일생산계획</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MRP</p>
          <p className="font-headline font-bold text-sm">자재소요량 계획</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">NOTIFICATIONS</p>
          <p className="font-headline font-bold text-sm">계획 알림·승인</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 5개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>수주 등록·수정·취소 및 납기 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>제품 BOM 기반 부재리스트 자동 생성</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>생산 능력 고려 일일계획 수립 및 확정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>MRP 실행 — 자재 부족분 자동 산출 및 발주 연계</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>계획 변경 알림 및 관련 부서 승인 워크플로</li>
      </ul>
    </div>
  );
}
