import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable } from "@/components/ui/DataTable";

const NOTIFY_QUEUE = [
  { recallId: "RC-2026-003", client: "현대건설", contact: "김철수 (QA팀장)", method: "이메일+FAX", sentAt: "2026-04-25 09:00", replyDue: "2026-04-27", replyStatus: "PENDING" },
  { recallId: "RC-2026-002", client: "GS건설", contact: "이영희 (자재팀)", method: "이메일", sentAt: "2026-04-20 14:30", replyDue: "2026-04-22", replyStatus: "REPLIED" },
];

const STAT: Record<string, { type: "warning" | "running" }> = {
  PENDING: { type: "warning" },
  REPLIED: { type: "running" },
};

const COLS = [
  { key: "recallId", label: "회수 ID" },
  { key: "client", label: "거래처" },
  { key: "contact", label: "담당자" },
  { key: "method", label: "통보 방법" },
  { key: "sentAt", label: "발송일시" },
  { key: "replyDue", label: "회신 기한" },
];

export default function QCRecallNotifyPage() {
  return (
    <div>
      <PageHeader
        title="통보 발송"
        accent="RECALL"
        nodeRef="SCR-QC-053"
        status="PROTOTYPE"
        description="RECALL_NOTIFIED 거래처 통보 발송·회신 큐 (FNC-QC-094~095)"
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: "발송 완료", v: 2 }, { l: "회신 대기", v: 1 }, { l: "회신 완료", v: 1 }].map((k) => (
          <div key={k.l} className="p-4 border-l-4 border-primary-accent bg-surface-container-low">
            <p className="font-label text-xs uppercase opacity-50 mb-1">{k.l}</p>
            <p className="font-headline font-black text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <FieldHeader title="통보 발송 큐" moduleRef="FNC-QC-094" />
      <section className="bg-surface-container-lowest mb-6">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">통보 큐 <span className="opacity-30 font-light ml-2">| Buffer: 002 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["회수 ID","거래처","담당자","통보 방법","발송일시","회신 기한","회신 상태","액션"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {NOTIFY_QUEUE.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                  <td className="px-4 py-2 text-primary-accent tabular-nums">{r.recallId}</td>
                  <td className="px-4 py-2">{r.client}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{r.contact}</td>
                  <td className="px-4 py-2 text-xs">{r.method}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.sentAt}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{r.replyDue}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT[r.replyStatus].type} label={r.replyStatus} /></td>
                  <td className="px-4 py-2">
                    {r.replyStatus === "PENDING" && <button className="bg-primary-accent text-black text-xs font-label uppercase px-3 py-1 hover:opacity-90">회신 등록</button>}
                    {r.replyStatus === "REPLIED" && <span className="text-xs opacity-40">완료</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex gap-2">
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-5 py-2 font-bold hover:opacity-90">+ 신규 통보 발송</button>
        <button className="bg-surface-container-high border border-outline-variant/20 text-sm font-label uppercase px-5 py-2 hover:opacity-90">통보 이력 내보내기</button>
      </div>
    </div>
  );
}
