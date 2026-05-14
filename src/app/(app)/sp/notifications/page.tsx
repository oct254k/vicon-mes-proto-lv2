import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const notifData = [
  { type: "MRP 부족 발생", channel: "이메일", receivers: "김민수, 박지영", active: true },
  { type: "계획 확정 요청", channel: "슬랙", receivers: "생산계획팀", active: true },
  { type: "수주 등록", channel: "이메일", receivers: "영업팀장", active: true },
  { type: "납기 D-3 임박", channel: "이메일+슬랙", receivers: "생산팀장, 물류팀", active: false },
  { type: "계획 취소", channel: "이메일", receivers: "관련 부서장", active: true },
];

export default function SPNotificationsPage() {
  return (
    <div>
      <PageHeader
        title="SP 알림 설정"
        accent="NOTIFICATIONS"
        nodeRef="SCR-SP-023"
        status="PROTOTYPE"
        description="수주·계획·MRP 이벤트별 알림 채널 및 수신자 설정."
      />

      <div className="flex justify-end mb-4">
        <button className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:bg-[#00912F]/80 transition-colors">
          구독 설정
        </button>
      </div>

      <FieldHeader title="알림 채널 목록" moduleRef="SCR-SP-023" />
      <section className="bg-surface-elevated mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            알림 설정{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(notifData.length).padStart(3, "0")} Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">알림 유형</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">채널</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">수신자</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-on-surface/40">활성화</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {notifData.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-on-surface/80">{row.type}</td>
                  <td className="px-4 py-3 text-on-surface/70">{row.channel}</td>
                  <td className="px-4 py-3 text-on-surface/60">{row.receivers}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      type={row.active ? "running" : "stopped"}
                      label={row.active ? "활성" : "비활성"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
