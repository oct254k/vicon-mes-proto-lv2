"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const PLANTS = [
  { id: "P1000", name: "제1 이천공장", oee: 82.1, progress: 88, defect: 1.2, highlight: "진척률 88% — 전주 대비 +3%p" },
  { id: "P2000", name: "제2 이천공장", oee: 74.5, progress: 75, defect: 2.1, highlight: "불량률 2.1% — 주의 임계치 근접" },
  { id: "P3000", name: "제3 이천공장 (데크)", oee: 78.4, progress: 92, defect: 1.8, highlight: "진척률 92% — 이번 주 최고" },
  { id: "P4000", name: "제4 안성공장 (가설재)", oee: 68.0, progress: 61, defect: 3.5, highlight: "OEE 68% — 목표 75% 대비 -7%p 조치 필요" },
];

const DISPATCH_LOG = [
  { time: "07:00", target: "임원 전체 (이메일)", status: "발송 완료" },
  { time: "어제 07:00", target: "임원 전체 (이메일+카카오)", status: "발송 완료" },
];

export default function MultiPlantDigestPage() {
  return (
    <div className="p-4 bg-surface min-h-screen">
      <PageHeader title="임원 다이제스트" accent="SCR-OPS-031" nodeRef="FNC-OPS-043" description="다공장 요약 카드 + 발송 모니터 · 이벤트 갱신" />

      {/* 다이제스트 카드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {PLANTS.map(p => (
          <div key={p.id} className="bg-surface-container p-5 border-l-4 border-primary-accent">
            <p className="text-xs font-label text-on-surface-variant mb-1">{p.id}</p>
            <p className="text-base font-headline font-black text-on-surface mb-3">{p.name}</p>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              {[["OEE",`${p.oee}%`],["진척률",`${p.progress}%`],["불량률",`${p.defect}%`]].map(([l,v])=>(
                <div key={l}>
                  <p className="text-xs font-label text-on-surface-variant">{l}</p>
                  <p className="text-lg font-black tabular-nums">{v}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-label text-on-surface-variant border-t border-outline-variant/10 pt-2">{p.highlight}</p>
          </div>
        ))}
      </div>

      {/* 발송 이력 */}
      <div className="bg-surface-container p-4">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">다이제스트 발송 이력</p>
        {DISPATCH_LOG.map((d, i) => (
          <div key={i} className="flex gap-4 text-xs font-label mb-2 py-2 border-b border-outline-variant/5">
            <span className="text-on-surface-variant w-20">{d.time}</span>
            <span className="text-on-surface">{d.target}</span>
            <span className="text-primary-accent ml-auto">{d.status}</span>
          </div>
        ))}
        <button className="mt-3 bg-primary-accent text-surface text-xs font-label px-4 py-2 font-bold uppercase tracking-widest">
          즉시 발송
        </button>
      </div>
    </div>
  );
}
