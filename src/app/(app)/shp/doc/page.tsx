import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function DocLandingPage() {
  const cards = [
    { label:"패킹리스트 PDF", href:"/shp/doc/packlist", desc:"패킹리스트 PDF 3부 발행·미리보기 (FNC-SHP-031/032/033)", scr:"SCR-SHP-030" },
    { label:"라벨 발행", href:"/shp/doc/label", desc:"묶음 라벨 발행·재인쇄 큐 (FNC-SHP-030)", scr:"SCR-SHP-031" },
    { label:"문서 보관", href:"/shp/doc/archive", desc:"전자 사본 아카이브 조회 (FNC-SHP-034)", scr:"SCR-SHP-032" },
  ];
  return (
    <div>
      <PageHeader title="출하 문서" accent="DOC" nodeRef="IA-SHP-DOC" status="PROTOTYPE"
        description="패킹리스트·라벨·문서 아카이브 통합 관리" />
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
