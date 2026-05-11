import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function WOPage() {
  return (
    <div>
      <PageHeader
        title="작업지시·부재·패킹"
        accent="WO"
        nodeRef="SCR-WO-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          생산계획 기반 작업지시(WO) 발행부터 부재코드 부여·패킹 8단계 절차·라벨 출력·작업문서 관리까지 현장 실행 준비를 담당합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 21개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ORDERS</p>
          <p className="font-headline font-bold text-sm">작업지시 발행·조회</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MEMBERS</p>
          <p className="font-headline font-bold text-sm">부재코드 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PACKING</p>
          <p className="font-headline font-bold text-sm">패킹 8단계 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">LABELS</p>
          <p className="font-headline font-bold text-sm">라벨 발행·재발행</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">DOCUMENTS</p>
          <p className="font-headline font-bold text-sm">작업문서 출력</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">DASHBOARD</p>
          <p className="font-headline font-bold text-sm">WO 진행 현황</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>생산계획 연계 WO 자동/수동 발행 및 취소</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>부재별 고유 코드 생성 및 바코드/QR 라벨 출력</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>패킹 8단계 순서 제어 및 단계별 승인</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>PDA 기반 패킹 스캔 확인</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>작업지시서·자재투입표 등 현장 문서 출력</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>WO별 진행 상태 실시간 모니터링</li>
      </ul>
    </div>
  );
}
