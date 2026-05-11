"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CANDIDATES = [
  { rank:1, supplier:"현대제철", score:92, price:12500, deliveryDays:7, qualityRate:98.2, recentOrders:5, tag:"AUTO_RECOMMEND" },
  { rank:2, supplier:"포스코", score:87, price:12800, deliveryDays:8, qualityRate:97.5, recentOrders:3, tag:"AUTO_RECOMMEND" },
  { rank:3, supplier:"동국제강", score:74, price:11900, deliveryDays:12, qualityRate:95.0, recentOrders:1, tag:"LOW_QUALITY" },
];

export default function SupplierRecommendPage() {
  const [selected, setSelected] = useState<number|null>(null);
  return (
    <div>
      <PageHeader title="공급사 자동 추천" nodeRef="IA-PUR-SUPPLIER-RECOMMEND" status="PROTOTYPE"
        description="1·2순위 자동 추천 — 점수·가격·납기·품질율 종합 (FNC-PUR-020~025)" />
      <FieldHeader title="PR 연계 자재" moduleRef="PR-2026-0042 / M-COIL-A / 500 m" />
      <div className="bg-surface-container p-4 mb-6 flex gap-6 text-sm">
        {[{l:"자재",v:"M-COIL-A"},{l:"수량",v:"500 m"},{l:"납기 희망",v:"2026-05-20"},{l:"PR 번호",v:"PR-2026-0042"}].map(f=>(
          <div key={f.l}><p className="text-xs font-label opacity-50 uppercase">{f.l}</p><p className="font-bold">{f.v}</p></div>
        ))}
      </div>
      <FieldHeader title="추천 공급사" moduleRef="FNC-PUR-020/021" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {CANDIDATES.map(c=>(
          <div key={c.rank} onClick={()=>setSelected(c.rank)}
            className={`bg-surface-container-lowest border-2 p-5 cursor-pointer transition-colors ${selected===c.rank?"border-primary-accent":"border-outline-variant/20 hover:border-primary-accent/50"}`}>
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-0.5 text-xs font-label font-black ${c.rank===1?"bg-primary-accent text-black":"bg-surface-container"}`}>#{c.rank}순위</span>
              <StatusBadge type={c.tag==="AUTO_RECOMMEND"?"running":"warning"} label={c.tag} />
            </div>
            <p className="font-headline font-black text-lg mb-3">{c.supplier}</p>
            <div className="space-y-1.5 text-xs font-label">
              <div className="flex justify-between"><span className="opacity-50">추천 점수</span><span className="font-black text-primary-accent">{c.score}점</span></div>
              <div className="flex justify-between"><span className="opacity-50">단가 (₩/m)</span><span className="tabular-nums">{c.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="opacity-50">납기 (일)</span><span className="tabular-nums">{c.deliveryDays}일</span></div>
              <div className="flex justify-between"><span className="opacity-50">품질율</span><span className="tabular-nums">{c.qualityRate}%</span></div>
              <div className="flex justify-between"><span className="opacity-50">최근 발주</span><span className="tabular-nums">{c.recentOrders}건</span></div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest">#{selected}순위 선택 · PO 발행 이동 ▶</button>
          <a href="/pur/supplier/override" className="px-6 py-2 bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase">수동 변경 →</a>
        </div>
      )}
    </div>
  );
}
