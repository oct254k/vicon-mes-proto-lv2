"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const KPI = [
  { label: "진행 수주",  value: "47건",  color: "text-primary-accent" },
  { label: "지연 위험",  value: "3건",   color: "text-error" },
  { label: "D-3 이내",  value: "5동",   color: "text-[#f59e0b]" },
  { label: "진척률 평균", value: "82%",  color: "text-primary-accent" },
];

const ROWS = [
  { so: "SO-2026-0301", customer: "(주)현대건설", site: "힐스테이트 일산", dong: "101~105동", progress: 92, dday: 5,  status: "정상" },
  { so: "SO-2026-0287", customer: "GS건설",      site: "자이 세종",      dong: "A~C동",     progress: 78, dday: 12, status: "정상" },
  { so: "SO-2026-0259", customer: "DL이앤씨",    site: "e편한세상 용인",  dong: "201~203동", progress: 45, dday: 3,  status: "지연위험" },
  { so: "SO-2026-0241", customer: "(주)롯데건설", site: "롯데캐슬 동탄",   dong: "1~3단지",   progress: 98, dday: 1,  status: "출하임박" },
];

export default function SOProgressPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="수주별 진척" accent="SCR-OPS-040" nodeRef="FNC-OPS-050~053" description="거래처·현장·동 단위 진척 · 5분 갱신" />

      <div className="grid grid-cols-4 gap-3 mb-6">
        {KPI.map(k => (
          <div key={k.label} className="bg-surface-container border-l-4 border-primary-accent p-4">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">{k.label}</p>
            <p className={`text-2xl font-black tabular-nums ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <a href="/ops/so-progress/tree" className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">수주→부재 트리</a>
        <a href="/ops/so-progress/external" className="bg-surface-container px-4 py-2 text-xs font-label hover:border hover:border-primary-accent/40">거래처 공유 뷰</a>
      </div>

      <div className="bg-surface-container">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <p className="font-headline font-black text-sm uppercase tracking-widest">수주 진척 목록</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["수주번호","거래처","현장명","동","진척률","D-day","상태"].map(h=>(
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {ROWS.map(r=>(
              <tr key={r.so} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 tabular-nums text-primary-accent">{r.so}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2">{r.site}</td>
                <td className="px-4 py-2">{r.dong}</td>
                <td className="px-4 py-2 tabular-nums">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-surface-container-highest/30">
                      <div className={`h-2 ${r.progress>=80?"bg-primary-accent":r.progress>=60?"bg-[#f59e0b]":"bg-error"}`} style={{width:`${r.progress}%`}} />
                    </div>
                    <span>{r.progress}%</span>
                  </div>
                </td>
                <td className={`px-4 py-2 tabular-nums ${r.dday<=3?"text-error":r.dday<=7?"text-[#f59e0b]":"text-on-surface"}`}>D-{r.dday}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-0.5 font-label ${r.status==="지연위험"?"text-error":r.status==="출하임박"?"text-[#f59e0b]":"text-primary-accent"}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
