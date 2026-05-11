import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function PURPage() {
  return (
    <div>
      <PageHeader
        title="구매·발주"
        accent="PUR"
        nodeRef="SCR-PUR-000"
        status="PROTOTYPE"
      />

      <div className="bg-surface-container border-l-4 border-primary-accent p-6 mb-8">
        <p className="text-on-surface/70 text-sm font-body leading-relaxed">
          구매요청(PR)→발주(PO)→납기확인(ACK)→ASN→입고→3-Way Matching→클레임까지 구매 조달 전 사이클을 통합 관리합니다.
        </p>
      </div>

      <FieldHeader title="화면 인벤토리" moduleRef="SCR 26개" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PR</p>
          <p className="font-headline font-bold text-sm">구매요청</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">SUPPLIER</p>
          <p className="font-headline font-bold text-sm">공급사 관리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">PO</p>
          <p className="font-headline font-bold text-sm">발주서 발행</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ACK</p>
          <p className="font-headline font-bold text-sm">납기 확인</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">ASN</p>
          <p className="font-headline font-bold text-sm">사전출하통보</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">RECEIPT</p>
          <p className="font-headline font-bold text-sm">입고 처리</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">MATCHING</p>
          <p className="font-headline font-bold text-sm">3-Way Matching</p>
        </div>
        <div className="bg-surface-container-low p-4">
          <p className="font-label text-xs uppercase tracking-widest text-primary-accent mb-1">CLAIMS</p>
          <p className="font-headline font-bold text-sm">클레임·반품</p>
        </div>
      </div>

      <FieldHeader title="주요 기능" moduleRef="FNC 6개" />
      <ul className="space-y-2 text-sm text-on-surface/70">
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>MRP 연계 구매요청 자동 생성 및 승인 워크플로</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>공급사 평가·선정 및 단가 계약 관리</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>발주서 발행·전송 및 납기 추적</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>ASN 수신 및 입고 예정 수량 사전 확인</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>PO·ASN·입고 3-Way Matching 자동 검증</li>
        <li className="flex items-start gap-2"><span className="text-primary-accent mt-0.5">—</span>수입검사 불합격 시 클레임·반품 처리</li>
      </ul>
    </div>
  );
}
