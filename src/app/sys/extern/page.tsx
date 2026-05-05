import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CARDS = [
  { ref:"SCR-SYS-070", label:"VAULT",  title:"Vault 시크릿",  desc:"마스킹 표시·만료 임박 배지", url:"/sys/extern/vault", status:"running" as const },
  { ref:"SCR-SYS-071", label:"TOKEN",  title:"API Token",     desc:"1회 평문 노출·Scope 관리",   url:"/sys/extern/token", status:"running" as const },
  { ref:"SCR-SYS-072", label:"HEALTH", title:"연동 헬스",     desc:"5분 주기 UP/DOWN/latency",   url:"/sys/extern/health", status:"warning" as const },
];

export default function ExternIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="외부 연동" accent="EXTERN" nodeRef="SCR-SYS-07x" status="PROTOTYPE"
        description="Vault 키·EDI 연결·API Token·Scope·만료 알림·5분 헬스 (FNC-SYS-070~075)" />
      <FieldHeader title="하위 화면" moduleRef="FNC-SYS-070~075" />
      <div className="grid grid-cols-3 gap-4">
        {CARDS.map(c => (
          <a key={c.ref} href={c.url}
            className="block bg-surface-container p-6 border-l-4 border-[#00912F] hover:bg-surface-container-high transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-label uppercase tracking-widest text-[#00912F]">{c.label}</p>
              <StatusBadge type={c.status} label={c.status.toUpperCase()} />
            </div>
            <p className="font-headline font-black text-base mb-1">{c.title}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.desc}</p>
            <p className="text-xs text-on-surface-variant/40 mt-3 font-label">{c.ref}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
