"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

type DongNode = { id: string; name: string };
type SiteNode = { id: string; name: string; dongs: DongNode[] };
type CustomerNode = {
  id: string; name: string; code: string;
  address: string; contact: string; sites: SiteNode[];
};

const CUSTOMERS: CustomerNode[] = [
  {
    id: "c1", code: "C-1001", name: "포스코건설",
    address: "서울시 강남구 테헤란로 440", contact: "02-3457-0000",
    sites: [
      { id: "s1", name: "송도 IFC", dongs: [{ id: "d1", name: "B1동" }, { id: "d2", name: "B2동" }, { id: "d3", name: "B3동" }] },
      { id: "s2", name: "부산 센텀", dongs: [{ id: "d4", name: "A동" }, { id: "d5", name: "B동" }] },
    ],
  },
  {
    id: "c2", code: "C-1002", name: "삼성물산",
    address: "서울시 서초구 서초대로 74길 11", contact: "02-2145-2000",
    sites: [
      { id: "s3", name: "래미안 잠실", dongs: [{ id: "d6", name: "101동" }, { id: "d7", name: "102동" }, { id: "d8", name: "103동" }] },
      { id: "s4", name: "래미안 수원", dongs: [{ id: "d9", name: "A-1동" }] },
    ],
  },
  {
    id: "c3", code: "C-1003", name: "현대건설",
    address: "서울시 종로구 율곡로 75", contact: "02-746-4000",
    sites: [
      { id: "s5", name: "힐스테이트 광교", dongs: [{ id: "d10", name: "1블록" }, { id: "d11", name: "2블록" }] },
    ],
  },
];

type SelectedNode =
  | { type: "customer"; data: CustomerNode }
  | { type: "site"; customer: CustomerNode; data: SiteNode }
  | { type: "dong"; customer: CustomerNode; site: SiteNode; data: DongNode }
  | null;

export default function BDCustomersPage() {
  const [openCustomers, setOpenCustomers] = useState<Set<string>>(new Set());
  const [openSites, setOpenSites] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<SelectedNode>(null);

  const toggleCustomer = (id: string) => {
    setOpenCustomers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleSite = (id: string) => {
    setOpenSites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-8">
      <PageHeader title="기준정보 /" accent="거래처 마스터" nodeRef="SCR-BD-060" description="거래처 › 현장 › 동 3단계 계층 관리" />
      <div className="grid grid-cols-12 gap-6">
        {/* 트리 패널 */}
        <aside className="col-span-4 bg-surface-container-lowest border border-outline p-4 min-h-[400px]">
          <FieldHeader title="거래처 트리" moduleRef="3단계" />
          {CUSTOMERS.map((c) => (
            <div key={c.id} className="mb-1">
              <button
                className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors font-headline font-bold text-sm"
                onClick={() => { toggleCustomer(c.id); setSelected({ type: "customer", data: c }); }}
              >
                <span className="text-primary-accent">▶</span>
                <span className="ml-2 flex-1">{c.name}</span>
                <span className="text-xs text-on-surface/40 ml-1">{openCustomers.has(c.id) ? "▲" : "▼"}</span>
              </button>
              {openCustomers.has(c.id) && c.sites.map((s) => (
                <div key={s.id} className="ml-4">
                  <button
                    className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors text-sm"
                    onClick={() => { toggleSite(s.id); setSelected({ type: "site", customer: c, data: s }); }}
                  >
                    <span className="text-on-surface/50">—</span>
                    <span className="ml-2 flex-1">{s.name}</span>
                    <span className="text-xs text-on-surface/40">{openSites.has(s.id) ? "▲" : "▼"}</span>
                  </button>
                  {openSites.has(s.id) && s.dongs.map((d) => (
                    <button
                      key={d.id}
                      className="w-full text-left px-3 py-1 ml-4 text-xs text-on-surface/60 hover:text-primary-accent hover:bg-surface-container-high/40 transition-colors"
                      onClick={() => setSelected({ type: "dong", customer: c, site: s, data: d })}
                    >
                      · {d.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* 상세 패널 */}
        <div className="col-span-8 bg-surface-container-lowest border border-outline p-6 min-h-[400px]">
          {!selected ? (
            <div className="flex items-center justify-center h-full text-on-surface/30 text-sm font-label uppercase tracking-widest">
              좌측 트리에서 노드를 선택하세요
            </div>
          ) : selected.type === "customer" ? (
            <>
              <FieldHeader title="거래처 상세" moduleRef={selected.data.code} />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">코드</dt><dd className="font-headline font-bold">{selected.data.code}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">이름</dt><dd className="font-headline font-bold">{selected.data.name}</dd></div>
                <div className="col-span-2"><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">주소</dt><dd>{selected.data.address}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">연락처</dt><dd>{selected.data.contact}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">현장 수</dt><dd>{selected.data.sites.length}개</dd></div>
              </dl>
            </>
          ) : selected.type === "site" ? (
            <>
              <FieldHeader title="현장 상세" moduleRef={`${selected.customer.name} > ${selected.data.name}`} />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">현장명</dt><dd className="font-headline font-bold">{selected.data.name}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">거래처</dt><dd>{selected.customer.name}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">동 수</dt><dd>{selected.data.dongs.length}개</dd></div>
              </dl>
            </>
          ) : (
            <>
              <FieldHeader title="동 상세" moduleRef={`${selected.site.name} > ${selected.data.name}`} />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">동 이름</dt><dd className="font-headline font-bold">{selected.data.name}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">현장</dt><dd>{selected.site.name}</dd></div>
                <div><dt className="text-xs text-on-surface/40 uppercase tracking-widest mb-1">거래처</dt><dd>{selected.customer.name}</dd></div>
              </dl>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
