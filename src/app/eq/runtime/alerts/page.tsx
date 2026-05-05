import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "lvl", label: "단계" },
  { key: "eqId", label: "설비" },
  { key: "startedAt", label: "정지 시작시각" },
  { key: "elapsedMin", label: "경과(분)" },
  { key: "stopReason", label: "정지 사유" },
  { key: "recipients", label: "수신자" },
  { key: "status", label: "처리 상태" },
];

const alerts = [
  {
    lvl: "🔴 60분(2차)",
    eqId: "EQ-P3000-PRESS-02",
    startedAt: "2026-05-05 14:23",
    elapsedMin: "65",
    stopReason: "미입력 ⚠",
    recipients: "공장장",
    status: "미해소",
  },
  {
    lvl: "🟡 30분(1차)",
    eqId: "EQ-P3000-PRESS-02",
    startedAt: "2026-05-05 14:23",
    elapsedMin: "30",
    stopReason: "미입력",
    recipients: "설비팀·생산",
    status: "ACK",
  },
  {
    lvl: "🟡 30분(1차)",
    eqId: "EQ-P3000-CUT-01",
    startedAt: "2026-05-05 14:50",
    elapsedMin: "32",
    stopReason: "미입력 ⚠",
    recipients: "설비팀·생산",
    status: "미해소",
  },
  {
    lvl: "⚪ 30분(1차)",
    eqId: "EQ-P3000-WELD-03",
    startedAt: "2026-05-05 10:15",
    elapsedMin: "30",
    stopReason: "청소 (계획정지)",
    recipients: "—",
    status: "스킵·해소",
  },
];

const open = alerts.filter(a => a.status === "미해소").length;
const esc = alerts.filter(a => a.lvl.includes("60분")).length;

export default function EQAlertsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="30분 정지 알림"
        accent="에스컬레이션"
        nodeRef="SCR-EQ-030"
        description="30분 1차 알림 + 60분 공장장 에스컬레이션 인박스 (FNC-EQ-018, 019)"
      />

      {/* Summary KPI */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-error/10 border-l-4 border-error p-4">
          <p className="font-label text-xs uppercase opacity-60">60분 에스컬레이션</p>
          <p className="font-headline font-black text-3xl mt-1 text-error">{esc}<span className="text-base font-normal ml-1 opacity-60">건</span></p>
        </div>
        <div className="bg-[#f59e0b]/10 border-l-4 border-[#f59e0b] p-4">
          <p className="font-label text-xs uppercase opacity-60">미해소 알림</p>
          <p className="font-headline font-black text-3xl mt-1 text-[#f59e0b]">{open}<span className="text-base font-normal ml-1 opacity-60">건</span></p>
        </div>
        <div className="bg-surface-container border-l-4 border-outline-variant/30 p-4">
          <p className="font-label text-xs uppercase opacity-60">총 알림</p>
          <p className="font-headline font-black text-3xl mt-1">{alerts.length}<span className="text-base font-normal ml-1 opacity-60">건</span></p>
        </div>
      </div>

      <DataTable
        title="정지 알림 목록 (30분 자동 새로고침)"
        columns={columns}
        data={alerts}
        bufferCount={alerts.length}
      />

      <div className="mt-4 bg-surface-container p-4 border-l-4 border-[#f59e0b]">
        <p className="font-label text-xs uppercase opacity-50 mb-1">임계값 (P3000 기준)</p>
        <div className="flex gap-6 text-sm">
          <span>1차 알림: <strong>30분</strong></span>
          <span>2차 에스컬레이션: <strong>60분</strong></span>
          <span className="opacity-50">계획정지(청소·휴식) = 알림 스킵</span>
        </div>
      </div>
    </div>
  );
}
