import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function SHPPage() {
  return (
    <div>
      <PageHeader
        title="출하"
        accent="SHP"
        nodeRef="SCR-SHP-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          출하 일정 수립·PDA 패킹·보관 관리·출하 서류·상차·게이트 확인·현장 검수 알림까지 제품 출하 전 과정을 지원합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 26개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">SCHEDULE</p>
          <p className="font-headline font-bold text-sm">출하 일정 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PACKING</p>
          <p className="font-headline font-bold text-sm">패킹 PDA 스캔</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">STORED</p>
          <p className="font-headline font-bold text-sm">출하 대기 보관</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">DOCUMENTS</p>
          <p className="font-headline font-bold text-sm">출하 서류 발행</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">LOADING</p>
          <p className="font-headline font-bold text-sm">상차 확인</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">GATE</p>
          <p className="font-headline font-bold text-sm">게이트 통과 확인</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECEIVE</p>
          <p className="font-headline font-bold text-sm">현장 검수 입력</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">NOTIFICATIONS</p>
          <p className="font-headline font-bold text-sm">출하 알림 관리</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>수주 연계 출하 일정 수립 및 차량 배차 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>PDA 스캔 기반 패킹 목록 확인 및 수량 검증</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>포장명세서·거래명세서·품질성적서 자동 발행</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>상차 스캔 및 게이트 통과 기록</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>고객 현장 검수 결과 입력 및 수령 확인</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>출하 지연·미출하 알림 및 담당자 에스컬레이션</li>
      </ul>
    </div>
  );
}
