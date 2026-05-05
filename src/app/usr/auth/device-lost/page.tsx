"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

const QUEUE = [
  { reqId: "DL-20260506-001", device: "PDA-SHP-04", reporter: "kim.kj@vicon.local", reportedAt: "2026-05-06 09:15", sla: "09:20", progress: "처리 완료", status: "running" as const },
  { reqId: "DL-20260504-003", device: "PDA-PRD-11", reporter: "EMP1058", reportedAt: "2026-05-04 07:30", sla: "07:35", progress: "처리 완료", status: "running" as const },
];

export default function DeviceLostPage() {
  return (
    <div>
      <PageHeader title="단말 분실 신고" accent="USR-025" nodeRef="SCR-USR-025" status="PROTOTYPE" description="단말 분실 신고 후 5분 SLA 내 세션 무효화 및 단말 LOST 처리. 비동기 큐 진행 상황 표시." />

      <div className="bg-surface-container-low border-l-4 border-error p-4 mb-4 flex items-center gap-3">
        <span className="text-error font-bold text-sm font-label uppercase tracking-widest">긴급</span>
        <span className="text-xs font-body text-on-surface/60">신고 즉시 비동기 큐에 등록되며 5분(SLA) 이내 해당 단말 세션이 강제 만료됩니다.</span>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 분실 신고 입력" moduleRef="FNC-USR-041/048" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={LABEL}>단말 ID</label>
            <select className={INPUT}>
              <option>PDA-SHP-04</option><option>PDA-PRD-11</option><option>PDA-SHP-02</option><option>PC-OFFICE-01</option>
            </select>
          </div>
          <div><label className={LABEL}>신고자 사번</label><input className={INPUT} defaultValue="kim.kj@vicon.local" readOnly /></div>
          <div><label className={LABEL}>분실 추정 시각</label><input type="datetime-local" className={INPUT} defaultValue="2026-05-06T09:10" /></div>
          <div><label className={LABEL}>분실 장소 (선택)</label><input className={INPUT} placeholder="예: 3공장 2라인 근처" /></div>
          <div className="col-span-2"><label className={LABEL}>상세 내용</label>
            <textarea className={INPUT} rows={3} placeholder="분실 경위 기술 (선택)"></textarea>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-error text-white text-xs font-label uppercase tracking-widest font-bold">분실 신고 접수</button>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 처리 큐 현황</h3>
          <span className="text-xs font-label opacity-40">FNC-USR-048 — SLA 5분</span>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["신고 ID", "단말", "신고자", "신고 시각", "SLA 마감", "처리 상태"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {QUEUE.map((q, i) => (
              <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{q.reqId}</td>
                <td className="px-4 py-2">{q.device}</td>
                <td className="px-4 py-2 text-xs opacity-70">{q.reporter}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{q.reportedAt}</td>
                <td className="px-4 py-2 tabular-nums text-xs text-[#f59e0b]">{q.sla}</td>
                <td className="px-4 py-2"><StatusBadge type={q.status} label={q.progress} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
