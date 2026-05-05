"use client";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const COLS = [
  { key:"svcId",    label:"서비스 ID" },
  { key:"svcName",  label:"서비스명" },
  { key:"protocol", label:"프로토콜" },
  { key:"endpoint", label:"엔드포인트" },
  { key:"latency",  label:"응답(ms)" },
  { key:"status",   label:"상태" },
  { key:"checkedAt",label:"마지막 점검" },
];

const MOCK = [
  { svcId:"EXT-ERP-001",  svcName:"ERP (SAP)",        protocol:"REST",  endpoint:"https://erp.vicon.com/api",    latency:"45ms",  statusK:"UP",   checkedAt:"2026-05-06 09:55" },
  { svcId:"EXT-WMS-001",  svcName:"WMS",              protocol:"REST",  endpoint:"https://wms.vicon.com/api",    latency:"120ms", statusK:"UP",   checkedAt:"2026-05-06 09:55" },
  { svcId:"EXT-MES-EDI",  svcName:"EDI 게이트웨이",   protocol:"AS2",   endpoint:"edi://gateway.vicon.com",      latency:"—",     statusK:"DOWN", checkedAt:"2026-05-06 09:50" },
  { svcId:"EXT-KAKAO-01", svcName:"카카오 API",       protocol:"HTTPS", endpoint:"https://kapi.kakao.com",       latency:"230ms", statusK:"UP",   checkedAt:"2026-05-06 09:55" },
  { svcId:"EXT-SMS-01",   svcName:"SMS 프로바이더",   protocol:"HTTPS", endpoint:"https://api.sms-provider.com", latency:"88ms",  statusK:"UP",   checkedAt:"2026-05-06 09:55" },
  { svcId:"EXT-LINE-01",  svcName:"LINEBOARD",        protocol:"WSS",   endpoint:"wss://board.vicon.com",        latency:"55ms",  statusK:"UP",   checkedAt:"2026-05-06 09:55" },
];

const ST_MAP: Record<string,"running"|"error"> = { UP:"running", DOWN:"error" };

export default function ExternHealthPage() {
  const data = MOCK.map(r => ({ ...r, status: <StatusBadge type={ST_MAP[r.statusK]} label={r.statusK} /> as unknown as string }));
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="연동 헬스" accent="HEALTH" nodeRef="SCR-SYS-072" status="PROTOTYPE"
        description="외부 연동 서비스 5분 주기 헬스 체크 — UP/DOWN/latency (FNC-SYS-073)" />
      <div className="bg-surface-container border-l-4 border-error p-4 mb-6 flex items-center gap-4">
        <StatusBadge type="error" label="DOWN" />
        <p className="text-sm text-on-surface-variant">EDI 게이트웨이 응답 없음 — 마지막 확인 2026-05-06 09:50</p>
      </div>
      <p className="text-xs font-label text-on-surface-variant opacity-50 mb-4">마지막 점검: 2026-05-06 09:55 (5분 주기)</p>
      <DataTable title="외부 연동 헬스 현황" columns={COLS} data={data as unknown as Record<string,string|number>[]} bufferCount={MOCK.length} />
    </div>
  );
}
