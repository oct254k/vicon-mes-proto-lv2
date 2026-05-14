import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import Link from "next/link";

const NAV = [
  { label: "성적서 목록", href: "/qc/certificate/list", ref: "SCR-QC-081~082", desc: "성적서 PDF 발급·미리보기·재발행·이력 DataTable" },
  { label: "성적서 템플릿", href: "/qc/certificate/template", ref: "SCR-QC-083", desc: "KS / CE / 3S 거래처별 양식 탭 마스터" },
];

const CERT_STATS = [
  { label: "발행 (이번 달)", value: "41건" },
  { label: "재발행", value: "3건" },
  { label: "템플릿 수", value: "5건" },
];

const CERT_TYPES = [
  { type: "KS", name: "국가표준", color: "border-primary-accent", count: 22 },
  { type: "CE", name: "유럽 인증", color: "border-tertiary", count: 12 },
  { type: "3S", name: "자체 규격", color: "border-warning", count: 7 },
];

export default function QCCertificateLanding() {
  return (
    <div>
      <PageHeader
        title="품질 성적서"
        accent="CERTIFICATE"
        nodeRef="IA-QC-CERT"
        status="PROTOTYPE"
        description="품질 성적서 발급·이력·KS/CE/3S 템플릿 관리 진입점 (FNC-QC-120~124)"
      />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-5 mb-6">
        <p className="text-sm opacity-70 font-body leading-relaxed">
          WO 완료 시 자동 성적서 초안 생성 → QC 관리자 검토·PDF 발행 → 거래처 전송. KS·CE·3S 3종 양식 지원 (FNC-QC-120, 121).
        </p>
      </div>

      <FieldHeader title="성적서 현황" moduleRef="FNC-QC-122, 124" />
      <div className="grid grid-cols-3 gap-3 mb-6">
        {CERT_STATS.map((s) => (
          <div key={s.label} className="bg-surface-container-low border-l-4 border-outline-variant/20 p-4">
            <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-1">{s.label}</p>
            <p className="font-headline font-black text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="양식 유형별 발행 분포" moduleRef="FNC-QC-121" />
      <div className="flex gap-4 mb-8">
        {CERT_TYPES.map((t) => (
          <div key={t.type} className={`flex-1 bg-surface-container-low border-l-4 ${t.color} p-4 text-center`}>
            <p className="font-headline font-black text-2xl mb-1">{t.count}</p>
            <p className="font-label text-xs uppercase tracking-widest opacity-50">{t.type}</p>
            <p className="text-xs opacity-40 mt-1">{t.name}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="성적서 화면 목록" moduleRef="SCR-QC-080~083" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="block bg-surface-container-low border-l-4 border-primary-accent p-5 hover:bg-surface-container transition-colors">
            <p className="font-headline font-bold text-base mb-1">{n.label}</p>
            <p className="text-xs text-on-surface/50">{n.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
