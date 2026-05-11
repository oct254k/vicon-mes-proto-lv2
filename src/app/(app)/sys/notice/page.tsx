import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const CARDS = [
  { ref: "SCR-SYS-010", label: "NOTICE LIST", title: "공지 목록", desc: "상태 필터·게시 관리", url: "/sys/notice/list", alert: 1 },
  { ref: "SCR-SYS-014", label: "INBOX",        title: "공지 수신함",  desc: "전사/공장 읽음 동기화", url: "/sys/notice/inbox", alert: 0 },
];

export default function NoticeIndexPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="공지사항" accent="NOTICE" nodeRef="SCR-SYS-01x" status="PROTOTYPE"
        description="전사·공장·부서·역할 대상 게시, 긴급 모달, 읽음 동기화" />
      <FieldHeader title="하위 화면" moduleRef="FNC-SYS-010~016" />
      <div className="grid grid-cols-2 gap-4">
        {CARDS.map(c => (
          <a key={c.url} href={c.url}
            className="block bg-surface-container p-6 border-l-4 border-[#00912F] hover:bg-surface-container-high transition-colors">
            <p className="text-xs font-label uppercase tracking-widest text-[#00912F] mb-1">{c.label}</p>
            <p className="font-headline font-black text-base mb-1">{c.title}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{c.desc}</p>
            {c.alert > 0 && (
              <span className="mt-2 inline-block px-2 py-0.5 text-xs font-label bg-error/20 text-error uppercase">URGENT {c.alert}</span>
            )}
          </a>
        ))}
      </div>
      <div className="mt-8 bg-surface-container-lowest border-l-4 border-outline-variant/20 p-5">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">상태 머신</p>
        <p className="text-sm text-on-surface-variant">DRAFT → PUBLISHED → EXPIRED (FNC-SYS-010)</p>
      </div>
    </div>
  );
}
