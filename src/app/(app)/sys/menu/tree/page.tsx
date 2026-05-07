import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TREE = [
  { lv:1, id:"MNU-001", label:"시스템관리", device:"BOTH",   visible:"Y", order:10 },
  { lv:2, id:"MNU-010", label:"공지사항",   device:"BOTH",   visible:"Y", order:10 },
  { lv:3, id:"MNU-011", label:"공지 목록",  device:"PC",     visible:"Y", order:10 },
  { lv:3, id:"MNU-012", label:"공지 수신함",device:"MOBILE", visible:"Y", order:20 },
  { lv:2, id:"MNU-020", label:"메뉴 관리",  device:"PC",     visible:"Y", order:20 },
  { lv:3, id:"MNU-021", label:"트리 편집",  device:"PC",     visible:"Y", order:10 },
  { lv:3, id:"MNU-022", label:"권한 매트릭스",device:"PC",   visible:"Y", order:20 },
  { lv:2, id:"MNU-030", label:"코드 마스터",device:"PC",     visible:"Y", order:30 },
  { lv:3, id:"MNU-031", label:"코드 목록",  device:"PC",     visible:"N", order:10 },
];

export default function MenuTreePage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="메뉴 트리 편집" accent="TREE" nodeRef="SCR-SYS-020" status="PROTOTYPE"
        description="3단계 계층 트리 구조, 신규 메뉴 자동 비노출, 단말 PC/MOBILE/BOTH 분기 (FNC-SYS-020·022·025)" />
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F] text-white">+ 노드 추가</button>
        <button className="px-4 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 hover:border-[#00912F] transition-colors">저장</button>
      </div>
      <FieldHeader title="메뉴 트리" moduleRef="FNC-SYS-020" />
      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">메뉴 계층 구조</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["메뉴 ID","레이블","LV","단말","노출","순서"].map(h => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {TREE.map(row => (
              <tr key={row.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                <td className="px-4 py-2 text-xs font-label text-[#00912F]">{row.id}</td>
                <td className="px-4 py-2" style={{ paddingLeft: `${(row.lv - 1) * 24 + 16}px` }}>{row.label}</td>
                <td className="px-4 py-2 text-xs text-on-surface-variant">L{row.lv}</td>
                <td className="px-4 py-2 text-xs text-on-surface-variant uppercase">{row.device}</td>
                <td className="px-4 py-2">
                  <StatusBadge type={row.visible === "Y" ? "running" : "idle"} label={row.visible === "Y" ? "VISIBLE" : "HIDDEN"} />
                </td>
                <td className="px-4 py-2 tabular-nums text-xs text-on-surface-variant">{row.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
