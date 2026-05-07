import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function ClaimLandingPage() {
  const cards = [
    { label:"클레임 보드", href:"/pur/claim/board", desc:"5상태 클레임 칸반 보드 (FNC-PUR-094/095)", scr:"SCR-PUR-070" },
    { label:"AGING 목록", href:"/pur/claim/aging", desc:"미입고·과입고 AGING 워크리스트 (FNC-PUR-090/091)", scr:"SCR-PUR-072" },
  ];
  return (
    <div>
      <PageHeader title="클레임 관리" accent="CLAIM" nodeRef="IA-PUR-CLAIM" status="PROTOTYPE"
        description="입고 FAIL/PARTIAL/OVER 클레임 라이프사이클 관리 (FR-PUR-013)" />
      <FieldHeader title="클레임 상태머신" moduleRef="5상태" />
      <div className="flex gap-2 mb-8 flex-wrap text-xs font-label">
        {["OPEN","SUPPLIER_NOTIFIED","REPLENISHMENT_PO","REPLENISHED","CLOSED"].map(s=>(
          <span key={s} className="px-3 py-1 bg-surface-container border border-outline-variant/20">{s}</span>
        ))}
      </div>
      <FieldHeader title="화면 목록" moduleRef="2 SCR" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
