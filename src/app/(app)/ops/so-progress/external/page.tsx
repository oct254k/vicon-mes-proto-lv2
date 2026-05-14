"use client";

// 거래처 공유 링크 뷰 — 읽기 전용 (외부 토큰 FNC-OPS-054)

const MEMBERS = [
  { id: "B01-101-G22C-C-171", step: "용접",  progress: "IN_PROGRESS", rate: 60 },
  { id: "B01-101-G22C-C-172", step: "천공",  progress: "DONE",        rate: 100 },
  { id: "B01-102-G22C-C-201", step: "절단",  progress: "DONE",        rate: 100 },
  { id: "B01-102-G22C-C-202", step: "조립",  progress: "PENDING",     rate: 0 },
];

const PROG_LABEL: Record<string, string> = { DONE: "완료", IN_PROGRESS: "진행중", PENDING: "대기" };
const PROG_COLOR: Record<string, string> = { DONE: "text-primary-accent", IN_PROGRESS: "text-warning", PENDING: "text-on-surface-variant" };

export default function SOProgressExternalPage() {
  return (
    <div className="p-6 bg-surface min-h-screen max-w-2xl mx-auto">
      {/* 공유 헤더 */}
      <div className="border-b border-outline-variant/20 pb-4 mb-6">
        <h1 className="text-xl font-headline font-black text-on-surface">수주 진척 공유 뷰</h1>
        <p className="text-sm font-label text-on-surface-variant mt-1">SO-2026-0301 · 힐스테이트 일산 · (주)현대건설</p>
        <p className="text-xs font-label text-on-surface-variant mt-1">토큰 만료 2026-05-12 · 열람 전용 (다운로드 불가)</p>
      </div>

      {/* KPI 요약 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[["전체 부재","47개"],["완료","38개"],["진행중","9개"]].map(([l,v])=>(
          <div key={l} className="bg-surface-container p-4 text-center">
            <p className="text-xs font-label text-on-surface-variant mb-1">{l}</p>
            <p className="text-2xl font-black tabular-nums text-on-surface">{v}</p>
          </div>
        ))}
      </div>

      {/* 진척률 */}
      <div className="bg-surface-container p-4 mb-6">
        <div className="flex justify-between text-sm font-label mb-2">
          <span className="text-on-surface-variant">전체 진척률</span>
          <span className="font-black tabular-nums">92%</span>
        </div>
        <div className="h-3 bg-surface-container-highest/30">
          <div className="h-3 bg-primary-accent" style={{width:"92%"}} />
        </div>
      </div>

      {/* 부재 목록 */}
      <div className="bg-surface-container">
        <div className="p-4 border-l-4 border-primary-accent">
          <p className="font-headline font-black text-sm uppercase tracking-widest">부재 진척 현황</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["부재ID","현공정","상태","진척"].map(h=>(
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {MEMBERS.map(m=>(
              <tr key={m.id} className="border-b border-outline-variant">
                <td className="px-4 py-2 font-label text-on-surface-variant">{m.id}</td>
                <td className="px-4 py-2">{m.step}</td>
                <td className={`px-4 py-2 font-label text-xs ${PROG_COLOR[m.progress]}`}>{PROG_LABEL[m.progress]}</td>
                <td className="px-4 py-2 tabular-nums">{m.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs font-label text-on-surface-variant mt-6 text-center">마지막 갱신 2026-05-05 14:32 · 5분 주기 자동 갱신</p>
    </div>
  );
}
