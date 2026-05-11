import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CARDS = [
  { ref:"SCR-SYS-100", label:"DEVICE LIST",      title:"단말 목록",        desc:"T1/T2/T3 사전 등록·상태 조회", url:"/sys/device/list",      alert:1, alertType:"LOST" },
  { ref:"SCR-SYS-101+", label:"LIFECYCLE",       title:"라이프사이클",     desc:"분실·재발급·폐기 워크플로",    url:"/sys/device/lifecycle", alert:0, alertType:"" },
];

export default function DeviceIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="단말 마스터" accent="DEVICE" nodeRef="SCR-SYS-10x" status="PROTOTYPE"
        description="사전 등록(T1/T2/T3)·분실 무효화(5분 SLA)·재발급·영구 폐기 (PRC-SYS-002 §6 [A]~[F])" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label:"전체 단말",   val:"48", sub:"등록 완료" },
          { label:"ACTIVE",     val:"46", sub:"정상 운영 중" },
          { label:"LOST",       val:"1",  sub:"5분 SLA 무효화 대상" },
          { label:"RETIRED",    val:"1",  sub:"영구 폐기" },
        ].map(k => (
          <div key={k.label} className={`bg-surface-container p-5 border-l-4 ${k.label === "LOST" ? "border-error" : "border-[#00912F]"}`}>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">{k.label}</p>
            <p className="font-headline font-black text-2xl tabular-nums">{k.val}</p>
            <p className="text-xs text-on-surface-variant opacity-50 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <FieldHeader title="하위 화면" moduleRef="PRC-SYS-002" />
      <div className="grid grid-cols-2 gap-4">
        {CARDS.map(c => (
          <a key={c.url} href={c.url}
            className="block bg-surface-container p-6 border-l-4 border-[#00912F] hover:bg-surface-container-high transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-label uppercase tracking-widest text-[#00912F]">{c.label}</p>
              {c.alert > 0 && <StatusBadge type="error" label={c.alertType} />}
            </div>
            <p className="font-headline font-black text-base mb-1">{c.title}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
