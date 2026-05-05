import { PageHeader } from "@/components/ui/PageHeader";

const CHANNELS = [
  { id: "CH-001", channel: "EMAIL", description: "SMTP 이메일 발송", active: true, color: "bg-blue-500/20 text-blue-400" },
  { id: "CH-002", channel: "SMS", description: "문자 메시지 (KT)", active: true, color: "bg-purple-500/20 text-purple-400" },
  { id: "CH-003", channel: "KAKAOTALK", description: "카카오톡 알림 채널", active: true, color: "bg-yellow-400/20 text-yellow-400" },
  { id: "CH-004", channel: "INAPP", description: "앱 내 알림 (토스트·배지)", active: true, color: "bg-[#00912F]/20 text-[#00912F]" },
  { id: "CH-005", channel: "LINEBOARD", description: "현장 라인 보드 표시", active: false, color: "bg-surface-container-high text-on-surface-variant" },
];

export default function SYSChannelsPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="알림 채널" accent="·구독" nodeRef="SCR-SYS-040" description="5채널 발송 설정 및 구독 관리 (재시도: 1/5/30분 × 3회)" />

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">알림 채널 마스터</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["채널 ID", "채널", "설명", "활성화", "설정"].map(h => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {CHANNELS.map(row => (
                <tr key={row.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-xs text-on-surface-variant opacity-50">{row.id}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 text-xs font-label uppercase tracking-wider font-bold ${row.color}`}>
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-on-surface-variant">{row.description}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs font-label uppercase ${row.active ? "bg-[#00912F]/20 text-[#00912F]" : "bg-surface-container-high text-on-surface-variant opacity-40"}`}>
                      {row.active ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <a href="#" className="text-xs text-[#00912F] hover:underline font-label uppercase tracking-widest">구독 설정</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6 p-4 bg-surface-container border border-outline-variant/10">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">발송 실패 정책</p>
        <p className="text-sm text-on-surface-variant">재시도: <span className="text-[#f59e0b]">1분 → 5분 → 30분</span> (최대 3회). 3회 초과 시 수동 재발송 전환 (사유 코드 필수).</p>
      </div>
    </div>
  );
}
