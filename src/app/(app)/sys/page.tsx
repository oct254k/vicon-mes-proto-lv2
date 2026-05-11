import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function SYSPage() {
  return (
    <div>
      <PageHeader
        title="시스템관리"
        accent="SYS"
        nodeRef="SCR-SYS-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          공지·메뉴 구성·코드 마스터·알림 채널·시스템 감사 로그·데이터 백업·외부 연동·Plant 설정·서버 헬스·단말기 관리까지 MES 시스템 운영 전반을 담당합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 32개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">NOTICES</p>
          <p className="font-headline font-bold text-sm">공지사항</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MENUS</p>
          <p className="font-headline font-bold text-sm">메뉴 구성 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CODES</p>
          <p className="font-headline font-bold text-sm">공통 코드 마스터</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CHANNELS</p>
          <p className="font-headline font-bold text-sm">알림 채널 설정</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">AUDIT</p>
          <p className="font-headline font-bold text-sm">시스템 감사 로그</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">BACKUP</p>
          <p className="font-headline font-bold text-sm">데이터 백업·복구</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">INTEGRATION</p>
          <p className="font-headline font-bold text-sm">외부 시스템 연동</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">HEALTH</p>
          <p className="font-headline font-bold text-sm">서버 헬스·단말기</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>시스템 공지사항 등록·게시·만료 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>메뉴 트리 구성 및 표시 순서 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>공통 코드 그룹·상세코드 마스터 CRUD</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>이메일·SMS·슬랙 알림 채널 설정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>데이터 정기 백업 스케줄 및 복구 이력</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>ERP·WMS 등 외부 시스템 API 연동 상태 모니터링</li>
      </ul>
    </div>
  );
}
