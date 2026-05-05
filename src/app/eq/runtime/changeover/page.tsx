import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "eqId", label: "설비" },
  { key: "type", label: "Changeover 유형" },
  { key: "startedAt", label: "시작시각" },
  { key: "endedAt", label: "종료시각" },
  { key: "elapsedMin", label: "소요(분)" },
  { key: "reason", label: "사유 / 비고" },
];

const data = [
  { eqId: "EQ-P3000-CUT-01", type: "코일 교체", startedAt: "2026-05-05 09:10", endedAt: "2026-05-05 09:35", elapsedMin: "25", reason: "코일 #14 → #15, COIL-A011" },
  { eqId: "EQ-P3000-CUT-01", type: "코일 교체", startedAt: "2026-05-04 14:23", endedAt: "2026-05-04 14:48", elapsedMin: "25", reason: "코일 #13 → #14, COIL-A010" },
  { eqId: "EQ-P3000-PRESS-01", type: "금형 교체", startedAt: "2026-05-04 08:00", endedAt: "2026-05-04 08:45", elapsedMin: "45", reason: "금형 MD-007 → MD-008, 제품 전환" },
  { eqId: "EQ-P3000-CUT-03", type: "다이 교체", startedAt: "2026-05-03 15:10", endedAt: "2026-05-03 15:30", elapsedMin: "20", reason: "다이 수명 100% 도달" },
  { eqId: "EQ-P3000-WELD-01", type: "기타", startedAt: "2026-05-03 11:00", endedAt: "2026-05-03 11:15", elapsedMin: "15", reason: "전극봉 교체" },
  { eqId: "EQ-P3000-PRESS-02", type: "금형 교체", startedAt: "2026-05-02 07:50", endedAt: "2026-05-02 08:30", elapsedMin: "40", reason: "신규 금형 MD-009 투입" },
];

export default function EQChangeoverPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Changeover"
        accent="이력"
        nodeRef="SCR-EQ-020"
        description="DOWN 과 분리 측정되는 Changeover 이력 (FR-EQ-016)"
      />
      <div className="mb-4 flex gap-3 flex-wrap">
        <div className="bg-surface-container px-4 py-2">
          <span className="font-label text-xs uppercase opacity-40">기간</span>
          <p className="font-headline text-sm mt-0.5">2026-05-01 ~ 2026-05-05</p>
        </div>
        <div className="bg-surface-container px-4 py-2">
          <span className="font-label text-xs uppercase opacity-40">총 건수</span>
          <p className="font-headline text-sm mt-0.5">{data.length}건</p>
        </div>
        <div className="bg-surface-container px-4 py-2">
          <span className="font-label text-xs uppercase opacity-40">평균 소요</span>
          <p className="font-headline text-sm mt-0.5">
            {(data.reduce((s, r) => s + Number(r.elapsedMin), 0) / data.length).toFixed(0)}분
          </p>
        </div>
      </div>
      <DataTable
        title="Changeover 이력"
        columns={columns}
        data={data}
        bufferCount={data.length}
      />
      <p className="mt-3 text-xs opacity-30 font-label">
        ⓘ DOWN 과 분리 측정 — OEE 가용성 산식 별도 적용 (FR-EQ-016, FNC-EQ-017)
      </p>
    </div>
  );
}
