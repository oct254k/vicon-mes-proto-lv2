import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";

const data = [
  { line: "LINE-P3-01", seq: "1", eqCode: "EQ-P3-CUT-01", eqName: "절단기 #1",    type: "절단",  install: "2021-03-10", status: "가동중" },
  { line: "LINE-P3-01", seq: "2", eqCode: "EQ-P3-CUT-02", eqName: "절단기 #2",    type: "절단",  install: "2021-03-10", status: "가동중" },
  { line: "LINE-P3-02", seq: "1", eqCode: "EQ-P3-PRESS-01", eqName: "프레스 #1", type: "성형",  install: "2020-11-05", status: "가동중" },
  { line: "LINE-P3-02", seq: "2", eqCode: "EQ-P3-WELD-01",  eqName: "용접기 #1",  type: "용접",  install: "2022-01-20", status: "점검중" },
  { line: "LINE-P4-01", seq: "1", eqCode: "EQ-P4-ASM-01",   eqName: "조립기 #1",  type: "조립",  install: "2023-06-15", status: "가동중" },
];

const cols = [
  { key: "line",    label: "라인" },
  { key: "seq",     label: "순서" },
  { key: "eqCode",  label: "설비 코드" },
  { key: "eqName",  label: "설비명" },
  { key: "type",    label: "유형" },
  { key: "install", label: "설치일" },
  { key: "status",  label: "상태" },
];

export default function EQMasterLineupPage() {
  return (
    <div className="p-8">
      <PageHeader title="라인업 배치 현황" accent="LINEUP" nodeRef="SCR-EQ-002" description="라인 내 설비 배치 순서 및 설치 현황." />
      <DataTable title="라인별 설비 배치" columns={cols} data={data} bufferCount={data.length} />
    </div>
  );
}
