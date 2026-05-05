import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { date: "2026-05-01", eqCode: "EQ-P3-CUT-01",   partNo: "BLD-5000-A",  partName: "절단 칼날",    qty: "2", worker: "김철수", ttl: "240,000" },
  { date: "2026-04-22", eqCode: "EQ-P3-PRESS-01",  partNo: "SEL-HYD-02",  partName: "유압 씰",      qty: "1", worker: "이순신", ttl: "85,000"  },
  { date: "2026-04-18", eqCode: "EQ-P3-WELD-01",   partNo: "TIP-WLD-10",  partName: "용접 팁",      qty: "5", worker: "박영수", ttl: "75,000"  },
  { date: "2026-04-10", eqCode: "EQ-P3-CUT-01",    partNo: "BRG-6205",    partName: "베어링 6205",  qty: "4", worker: "김철수", ttl: "160,000" },
  { date: "2026-03-30", eqCode: "EQ-P4-ASM-01",    partNo: "MOT-SRV-3K",  partName: "서보 모터",    qty: "1", worker: "최민수", ttl: "980,000" },
];

const cols = [
  { key: "date",     label: "교체일" },
  { key: "eqCode",   label: "설비 코드" },
  { key: "partNo",   label: "부품 번호" },
  { key: "partName", label: "부품명" },
  { key: "qty",      label: "수량" },
  { key: "worker",   label: "작업자" },
  { key: "ttl",      label: "비용(원)", className: "text-primary-accent tabular-nums" },
];

export default function EQComponentHistoryPage() {
  return (
    <div className="p-8">
      <PageHeader title="부품 교체 이력" accent="COMP HISTORY" nodeRef="SCR-EQ-031" description="설비 구성 부품 교체 이력 및 비용 기록." />
      <DataTable title="교체 이력 목록" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
