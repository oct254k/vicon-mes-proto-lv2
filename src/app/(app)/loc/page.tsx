import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function LOCPage() {
  return (
    <div>
      <PageHeader
        title="위치·재고"
        accent="LOC"
        nodeRef="SCR-LOC-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          야적장 도면 기반 구역·로케이션 마스터, 입고·이동·조정·실사 등 현물 재고의 위치 추적 및 수량 관리 전 과정을 담당합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 28개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MASTER</p>
          <p className="font-headline font-bold text-sm">로케이션 마스터</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MAP</p>
          <p className="font-headline font-bold text-sm">야적장 도면 뷰</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECEIVE</p>
          <p className="font-headline font-bold text-sm">입고 처리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">TRANSFER</p>
          <p className="font-headline font-bold text-sm">위치 이동</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ADJUST</p>
          <p className="font-headline font-bold text-sm">재고 조정</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">INVENTORY</p>
          <p className="font-headline font-bold text-sm">재고 실사·현황</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>야적장 도면 기반 구역·로케이션 시각적 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>생산 완료품·구매품 입고 스캔 및 위치 배정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>로케이션 간 이동 및 이력 추적</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>재고 증감 조정 및 사유 등록</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>정기·비정기 실사 계획 수립 및 결과 반영</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>자재·제품별 실시간 재고 현황 조회</li>
      </ul>
    </div>
  );
}
