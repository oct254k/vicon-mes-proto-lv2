"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const STATUS_MAP: Record<string, { type: "running" | "stopped" | "warning" | "idle" | "error"; label: string }> = {
  DRAFT:         { type: "idle",    label: "초안" },
  CONFIRMED:     { type: "running", label: "확정" },
  IN_PRODUCTION: { type: "running", label: "생산 중" },
  READY:         { type: "warning", label: "출하 준비" },
  SHIPPED:       { type: "idle",    label: "출하됨" },
  CLOSED:        { type: "stopped", label: "종료" },
};

const MOCK_ORDERS = [
  { id: "SO-2026-0042", customer: "포스코건설", site: "송도 IFC", members: 640, amount: "₩12,544,000", dueDate: "2026-05-08", status: "CONFIRMED" },
  { id: "SO-2026-0041", customer: "현대건설",   site: "판교 테크노밸리", members: 320, amount: "₩8,230,000", dueDate: "2026-05-12", status: "IN_PRODUCTION" },
  { id: "SO-2026-0040", customer: "삼성물산",   site: "용산 드래곤시티", members: 180, amount: "₩5,670,000", dueDate: "2026-05-20", status: "READY" },
  { id: "SO-2026-0039", customer: "GS건설",     site: "마곡 R&D 센터",  members: 95,  amount: "₩3,140,000", dueDate: "2026-05-25", status: "DRAFT" },
  { id: "SO-2026-0038", customer: "대우건설",   site: "인천 스마트시티", members: 512, amount: "₩16,800,000", dueDate: "2026-04-30", status: "SHIPPED" },
];

const STATES = ["전체", "DRAFT", "CONFIRMED", "IN_PRODUCTION", "READY", "SHIPPED", "CLOSED"];

export default function SoListPage() {
  const [customer, setCustomer]   = useState("");
  const [dateFrom, setDateFrom]   = useState("");
  const [dateTo, setDateTo]       = useState("");
  const [statusFilter, setStatus] = useState("전체");

  const filtered = MOCK_ORDERS.filter((o) => {
    if (customer && !o.customer.includes(customer)) return false;
    if (statusFilter !== "전체" && o.status !== statusFilter) return false;
    return true;
  });

  const inputCls = "bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-3 py-2 text-sm";

  const columns = [
    { key: "id",       label: "수주번호" },
    { key: "customer", label: "거래처" },
    { key: "site",     label: "현장명" },
    { key: "members",  label: "부재 수" },
    { key: "amount",   label: "금액" },
    { key: "dueDate",  label: "납기" },
    { key: "statusBadge", label: "상태" },
  ];

  const tableData = filtered.map((o) => ({
    ...o,
    statusBadge: <StatusBadge type={STATUS_MAP[o.status].type} label={STATUS_MAP[o.status].label} /> as unknown as string,
  }));

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="수주" accent="목록" nodeRef="SCR-SP-002" status="CALIBRATED" />

      {/* 필터바 */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">거래처</label>
          <input className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="거래처명" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">납기 시작</label>
          <input type="date" className={inputCls} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">납기 종료</label>
          <input type="date" className={inputCls} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-on-surface-variant uppercase tracking-widest">상태</label>
          <select className={inputCls} value={statusFilter} onChange={(e) => setStatus(e.target.value)}>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <a href="/sp/so/new">
          <button className="px-5 py-2 bg-primary-accent text-black text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            + 신규 수주
          </button>
        </a>
      </div>

      <DataTable title="수주 목록" columns={columns} data={tableData} bufferCount={filtered.length} />
    </main>
  );
}
