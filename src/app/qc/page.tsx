import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function QCPage() {
  return (
    <div>
      <PageHeader
        title="품질·SPC·불량"
        accent="QC"
        nodeRef="SCR-QC-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          SPC 마스터·측정값 입력·관리도 분석·불량 신고·회수 처리·위험 관리·손실 산출·인증 관리까지 품질 관리 전 사이클을 통합합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 43개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">SPC MASTER</p>
          <p className="font-headline font-bold text-sm">SPC 관리 항목</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-001 ~ 006</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">SPC INPUT</p>
          <p className="font-headline font-bold text-sm">측정값 입력</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-007 ~ 012</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CHARTS</p>
          <p className="font-headline font-bold text-sm">관리도·공정능력</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-013 ~ 018</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">DEFECTS</p>
          <p className="font-headline font-bold text-sm">불량 신고·분석</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-019 ~ 025</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECALL</p>
          <p className="font-headline font-bold text-sm">불량품 회수·격리</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-026 ~ 030</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RISK</p>
          <p className="font-headline font-bold text-sm">위험 관리</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-031 ~ 035</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">LOSS</p>
          <p className="font-headline font-bold text-sm">품질 손실 산출</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-036 ~ 039</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CERT</p>
          <p className="font-headline font-bold text-sm">품질 인증 관리</p>
          <p className="text-xs text-on-surface/50 mt-1">SCR-QC-040 ~ 043</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>SPC 항목 마스터 등록 및 관리 기준(UCL/LCL) 설정</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>현장 측정값 입력 및 X-bar·R 관리도 자동 생성</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>공정능력지수(Cpk) 분석 및 이상 패턴 알림</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>불량 신고·원인 분석·5Why 기록</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>불량 LOT 회수·격리 및 처리 이력 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>품질 성적서·인증서 발급 및 이력 관리</li>
      </ul>
    </div>
  );
}
