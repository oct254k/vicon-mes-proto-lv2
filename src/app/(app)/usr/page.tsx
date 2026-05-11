import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function USRPage() {
  return (
    <div>
      <PageHeader
        title="사용자·권한"
        accent="USR"
        nodeRef="SCR-USR-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          사용자 마스터·역할 정의·메뉴 권한 매트릭스·자격 관리·위임·API 토큰·감사 로그까지 시스템 접근 보안 전반을 관리합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 35개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">USERS</p>
          <p className="font-headline font-bold text-sm">사용자 마스터</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ROLES</p>
          <p className="font-headline font-bold text-sm">역할 정의</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">AUTH</p>
          <p className="font-headline font-bold text-sm">인증 설정</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">DELEGATION</p>
          <p className="font-headline font-bold text-sm">권한 위임</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">QUALIFICATION</p>
          <p className="font-headline font-bold text-sm">자격·면허 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">TOKENS</p>
          <p className="font-headline font-bold text-sm">API 토큰 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MATRIX</p>
          <p className="font-headline font-bold text-sm">권한 매트릭스</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">AUDIT</p>
          <p className="font-headline font-bold text-sm">사용자 감사 로그</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>사용자 등록·수정·비활성화 및 부서·직책 연계</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>역할(Role) 정의 및 사용자-역할 매핑</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>메뉴·기능별 권한 매트릭스(RBAC) 설정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>휴가·부재 시 권한 위임 및 기간 제어</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>용접·크레인 등 현장 자격·면허 만료 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>로그인·권한 변경 등 보안 감사 로그 기록</li>
      </ul>
    </div>
  );
}
