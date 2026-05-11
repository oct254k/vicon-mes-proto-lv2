import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CHANNELS = ["EMAIL","SMS","KAKAOTALK","INAPP","LINEBOARD"];
const CARDS = [
  { ref:"SCR-SYS-041", label:"SUBSCRIPTION", title:"구독 관리",     desc:"강제 구독 + 본인 우선순위", url:"/sys/notify/subscription" },
  { ref:"SCR-SYS-040", label:"CATALOG",      title:"알림 카탈로그", desc:"5채널 마스터·Vault 마스킹", url:"/sys/notify/catalog" },
  { ref:"SCR-SYS-042", label:"HISTORY",      title:"발송 이력",     desc:"1년 보존·3회 실패 재발송",  url:"/sys/notify/history" },
];

export default function NotifyIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="알림 채널" accent="NOTIFY" nodeRef="SCR-SYS-04x" status="PROTOTYPE"
        description="5채널 알림·카탈로그·우선순위·발송 큐·재시도(1/5/30분, 3회)·이력 (FNC-SYS-040~046)" />
      <FieldHeader title="지원 채널" moduleRef="FNC-SYS-040" />
      <div className="flex gap-2 mb-8 flex-wrap">
        {CHANNELS.map(ch => (
          <span key={ch} className="px-3 py-1.5 text-xs font-label uppercase tracking-widest bg-[#00912F]/10 border border-[#00912F]/40 text-[#00912F]">{ch}</span>
        ))}
      </div>
      <FieldHeader title="하위 화면" moduleRef="FNC-SYS-041~046" />
      <div className="grid grid-cols-3 gap-4">
        {CARDS.map(c => (
          <a key={c.url} href={c.url}
            className="block bg-surface-container p-6 border-l-4 border-[#00912F] hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-label uppercase tracking-widest text-[#00912F] mb-1">{c.label}</p>
            <p className="font-headline font-black text-base mb-1">{c.title}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
