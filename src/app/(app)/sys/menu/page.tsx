import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CARDS = [
  { ref:"SCR-SYS-020", label:"TREE",     title:"메뉴 트리 편집",       desc:"3단계 트리·자동 비노출",        url:"/sys/menu/tree" },
  { ref:"SCR-SYS-021", label:"MATRIX",   title:"메뉴 권한 매트릭스",   desc:"Level×부서 셀 토글",            url:"/sys/menu/matrix" },
  { ref:"SCR-SYS-022", label:"FAVORITE", title:"즐겨찾기 관리",        desc:"본인 ≤20건, PC↔MOBILE 동기화", url:"/sys/menu/favorite" },
];

export default function MenuIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="메뉴 관리" accent="MENU" nodeRef="SCR-SYS-02x" status="PROTOTYPE"
        description="3단계 메뉴 트리, 권한 매트릭스(Level×부서), 즐겨찾기 동기화 (FNC-SYS-020~025)" />
      <FieldHeader title="하위 화면" moduleRef="FNC-SYS-020~025" />
      <div className="grid grid-cols-3 gap-4">
        {CARDS.map(c => (
          <a key={c.ref} href={c.url}
            className="block bg-surface-container p-6 border-l-4 border-[#00912F] hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-label uppercase tracking-widest text-[#00912F] mb-1">{c.label}</p>
            <p className="font-headline font-black text-base mb-1">{c.title}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.desc}</p>
            <p className="text-xs text-on-surface-variant/40 mt-3 font-label">{c.ref}</p>
          </a>
        ))}
      </div>
      <div className="mt-8 bg-surface-container-lowest border-l-4 border-outline-variant/20 p-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">단말 분기</p>
        <p className="text-sm text-on-surface-variant">PC / MOBILE / BOTH — 신규 메뉴는 자동 HIDDEN 상태로 등록</p>
      </div>
    </div>
  );
}
