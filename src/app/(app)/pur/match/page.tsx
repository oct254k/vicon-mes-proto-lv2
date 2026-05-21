import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function MatchLandingPage() {
  const cards = [
    { label:"매칭 현황 보드", href:"/pur/match/board", desc:"PASS/EXCEPTION 보드 뷰 (FNC-PUR-081/082)", scr:"SCR-PUR-060" },
    { label:"인보이스 등록", href:"/pur/match/invoice", desc:"인보이스 수신·등록 폼 (FNC-PUR-080/087/088)", scr:"SCR-PUR-061" },
    { label:"매칭 예외 목록", href:"/pur/match/exception", desc:"5사유 예외 워크리스트 (FNC-PUR-083/084)", scr:"SCR-PUR-062" },
  ];
  return (
    <div>
      <PageHeader title="3자 대사" accent="매칭" nodeRef="IA-PUR-MATCH" status="PROTOTYPE"
        description="PO·ASN·인보이스 3자 대사 자동 검증 (FR-PUR-010)" />
      <FieldHeader title="매칭 예외 사유 5종" moduleRef="FNC-PUR-083" />
      <div className="flex gap-2 mb-8 flex-wrap text-xs font-label">
        {[["QTY_DIFF","수량 차이"],["PRICE_DIFF","단가 차이"],["MATERIAL_DIFF","자재 불일치"],["OVER_DELIVERY","초과 납품"],["SHORT_DELIVERY","부족 납품"]].map(([,label])=>(
          <span key={label} className="px-3 py-1 bg-surface-container border border-warning/40 text-warning">{label}</span>
        ))}
      </div>
      <FieldHeader title="화면 목록" moduleRef="3 SCR" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(c=>(
          <a key={c.href} href={c.href}
            className="bg-surface-container-low border-l-4 border-primary-accent p-5 block hover:bg-surface-container transition-colors">
            <p className="text-xs font-label text-primary-accent uppercase tracking-widest mb-1">{c.scr}</p>
            <p className="font-headline font-black text-base mb-1">{c.label}</p>
            <p className="text-xs text-on-surface/50">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
