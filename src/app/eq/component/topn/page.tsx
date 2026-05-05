import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { rank: "1", partNo: "BLD-5000-A",  partName: "절단 칼날",    totalCnt: "24", totalCost: "2,880,000", avgInterval: "15일", eqCode: "EQ-P3-CUT-01"   },
  { rank: "2", partNo: "TIP-WLD-10",  partName: "용접 팁",      totalCnt: "18", totalCost: "270,000",   avgInterval: "20일", eqCode: "EQ-P3-WELD-01"  },
  { rank: "3", partNo: "SEL-HYD-02",  partName: "유압 씰",      totalCnt: "12", totalCost: "1,020,000", avgInterval: "30일", eqCode: "EQ-P3-PRESS-01" },
  { rank: "4", partNo: "BRG-6205",    partName: "베어링 6205",  totalCnt: "10", totalCost: "400,000",   avgInterval: "36일", eqCode: "EQ-P3-CUT-01"   },
  { rank: "5", partNo: "FLT-OIL-05",  partName: "오일 필터",    totalCnt: "8",  totalCost: "120,000",   avgInterval: "45일", eqCode: "EQ-P4-ASM-01"   },
];

const cols = [
  { key: "rank",        label: "순위" },
  { key: "partNo",      label: "부품 번호" },
  { key: "partName",    label: "부품명" },
  { key: "totalCnt",    label: "교체 횟수",   className: "text-primary-accent" },
  { key: "totalCost",   label: "총 비용(원)", className: "tabular-nums" },
  { key: "avgInterval", label: "평균 교체 주기" },
  { key: "eqCode",      label: "주 설비" },
];

export default function EQComponentTopNPage() {
  return (
    <div className="p-8">
      <PageHeader title="교체 빈도 Top-N" accent="TOP-N" nodeRef="SCR-EQ-033" description="교체 횟수 기준 상위 부품 분석 (최근 12개월)." />
      <DataTable title="교체 빈도 Top-5 부품" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
