import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const RESERVED = ["WO_STATUS","QC_STATUS","DEVICE_TYPE","SHIFT","UNIT","CURRENCY"];

const CARDS = [
  { ref:"SCR-SYS-030", label:"CODE LIST",    title:"코드 목록",       desc:"4 DB 카테고리 + 시스템 예약 표시", url:"/sys/code/list" },
  { ref:"SCR-SYS-031", label:"APPROVAL",     title:"코드 변경 결재",  desc:"L2=결재 큐 / L3=즉시",           url:"/sys/code/approval" },
  { ref:"SCR-SYS-032", label:"HISTORY",      title:"코드 변경 이력",  desc:"A7 시점 스냅샷, 변경 거부 로그",  url:"/sys/code/history" },
];

export default function CodeIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="코드 마스터" accent="CODE" nodeRef="SCR-SYS-03x" status="PROTOTYPE"
        description="공통 코드·시스템 예약 보호·다국어·결재·import/export·시점 스냅샷 (FNC-SYS-030~035)" />
      <FieldHeader title="하위 화면" moduleRef="FNC-SYS-030~035" />
      <div className="grid grid-cols-3 gap-4 mb-8">
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
      <FieldHeader title="시스템 예약 코드 그룹 (6종)" moduleRef="FNC-SYS-031" />
      <div className="flex gap-2 flex-wrap">
        {RESERVED.map(r => (
          <span key={r} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-surface-container border border-outline-variant/20 flex items-center gap-1">
            <span className="text-on-surface-variant opacity-50">🔒</span> {r}
          </span>
        ))}
      </div>
    </div>
  );
}
