import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function BDPage() {
  return (
    <div>
      <PageHeader
        title="기준정보"
        accent="BD"
        nodeRef="SCR-BD-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          Plant·자재·BOM·라우팅·공정라인·설비·고객·공급사·KS인증 등 전 도메인 공통 기준 마스터 데이터를 정의·관리합니다. MES 전 모듈의 데이터 정합성 기반.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 37개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PLANT</p>
          <p className="font-headline font-bold text-sm">Plant 마스터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-001 ~ 003</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MATERIAL</p>
          <p className="font-headline font-bold text-sm">자재 마스터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-004 ~ 008</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">BOM</p>
          <p className="font-headline font-bold text-sm">BOM 구성</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-009 ~ 013</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ROUTING</p>
          <p className="font-headline font-bold text-sm">라우팅·공정</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-014 ~ 018</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PROCESS LINE</p>
          <p className="font-headline font-bold text-sm">공정라인 마스터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-019 ~ 022</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">EQUIPMENT</p>
          <p className="font-headline font-bold text-sm">설비 마스터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-023 ~ 028</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CUSTOMER / SUPPLIER</p>
          <p className="font-headline font-bold text-sm">고객·공급사</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-029 ~ 033</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CERTIFICATION</p>
          <p className="font-headline font-bold text-sm">KS인증 마스터</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-BD-034 ~ 037</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 8개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>Plant 계층 구조 정의 및 코드 체계 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>자재 마스터 등록·분류·단위 설정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>BOM 다단계 구성 및 버전 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>라우팅(공정순서) 등록 및 표준 시간 설정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>공정라인·워크센터 용량 및 설비 매핑</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>KS인증 규격 및 검사 항목 마스터</li>
      </ul>
    </div>
  );
}
