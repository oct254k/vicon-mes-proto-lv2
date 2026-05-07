import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const kpis = [
  { label: "오늘 계획 부재 수", value: "86", unit: "개" },
  { label: "확정 계획", value: "3", unit: "건" },
  { label: "미확정", value: "2", unit: "건" },
];

const planColumns = [
  { key: "planDate", label: "계획 일자" },
  { key: "plant", label: "Plant" },
  { key: "memberCount", label: "부재 수" },
  { key: "status", label: "상태" },
];

const planData = [
  { planDate: "2026-05-06", plant: "P3000", memberCount: "32", status: "확정" },
  { planDate: "2026-05-06", plant: "P1000", memberCount: "28", status: "확정" },
  { planDate: "2026-05-07", plant: "P3000", memberCount: "26", status: "미확정" },
  { planDate: "2026-05-07", plant: "P2000", memberCount: "18", status: "미확정" },
  { planDate: "2026-05-08", plant: "P3000", memberCount: "40", status: "확정" },
];

export default function SPPlansPage() {
  return (
    <div>
      <PageHeader
        title="생산 계획"
        accent="PLANS"
        nodeRef="SCR-SP-011"
        status="PROTOTYPE"
        description="일일 생산계획 현황 및 확정·미확정 계획 관리."
      />

      <div className="grid grid-cols-3 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#1a1a1a] border-l-4 border-[#00912F] p-5">
            <p className="text-xs font-label uppercase tracking-widest text-white/40 mb-2">{k.label}</p>
            <p className="text-2xl font-black font-headline text-white">
              {k.value} <span className="text-sm font-normal text-white/50">{k.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-[#00912F] text-white font-label font-bold uppercase tracking-widest px-5 py-2 text-xs hover:bg-[#00912F]/80 transition-colors">
          일일 계획 보드 →
        </button>
      </div>

      <FieldHeader title="계획 목록" moduleRef="SCR-SP-011" />
      <DataTable
        title="생산 계획"
        columns={planColumns}
        data={planData}
        bufferCount={planData.length}
      />
    </div>
  );
}
