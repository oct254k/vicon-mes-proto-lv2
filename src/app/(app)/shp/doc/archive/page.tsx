"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FieldHeader } from "@/components/ui/FieldHeader";

const MOCK = [
  { id:"DOC-2026-0025", type:"PACKLIST", shp:"SHP-2026-0025", customer:"현대건설", issuedAt:"2026-05-05 15:00", issuedBy:"출하팀 이담당", copies:3 },
  { id:"DOC-2026-0024", type:"PACKLIST", shp:"SHP-2026-0024", customer:"GS건설", issuedAt:"2026-05-04 16:30", issuedBy:"출하팀 김담당", copies:3 },
  { id:"DOC-2026-0023L", type:"LABEL", shp:"SHP-2026-0025", customer:"현대건설", issuedAt:"2026-05-05 14:35", issuedBy:"포장팀A", copies:24 },
  { id:"DOC-2026-0022", type:"PACKLIST", shp:"SHP-2026-0022", customer:"DL이앤씨", issuedAt:"2026-05-02 10:00", issuedBy:"출하팀 박담당", copies:3 },
];
const TYPES = ["ALL","PACKLIST","LABEL"];
const SM: Record<string,"idle"|"warning"> = { PACKLIST:"idle", LABEL:"warning" };

export default function DocArchivePage() {
  const [tf, setTf] = useState("ALL");
  const rows = MOCK.filter(r=>tf==="ALL"||r.type===tf);
  return (
    <div>
      <PageHeader title="문서 보관" nodeRef="IA-SHP-DOC-ARCHIVE" status="PROTOTYPE"
        description="출하 문서 전자 사본 아카이브 조회 (FNC-SHP-034) — SHP-STAFF/ADMIN" />
      <div className="flex gap-2 mb-4">
        {TYPES.map(t=>(
          <button key={t} onClick={()=>setTf(t)}
            className={`px-3 py-1 text-xs font-label uppercase tracking-widest border ${tf===t?"bg-primary-accent text-black border-primary-accent":"bg-surface-container border-outline-variant/20"}`}>
            {t}
          </button>
        ))}
      </div>
      <FieldHeader title="문서 목록" moduleRef={`${rows.length}건`} />
      <div className="bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-surface-container border-b border-outline-variant/10">
            {["문서 ID","유형","출하 ID","고객","발행 일시","발행자","부수","다운로드"].map(h=>(
              <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50">{h}</th>
            ))}</tr></thead>
          <tbody className="font-headline text-sm">
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 text-primary-accent font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2"><StatusBadge type={SM[r.type]} label={r.type} /></td>
                <td className="px-4 py-2 font-mono text-xs opacity-70">{r.shp}</td>
                <td className="px-4 py-2">{r.customer}</td>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{r.issuedAt}</td>
                <td className="px-4 py-2 text-xs opacity-60">{r.issuedBy}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{r.copies}</td>
                <td className="px-4 py-2">
                  <button className="text-xs px-2 py-1 bg-surface-container-high border border-outline-variant/20 font-label uppercase">PDF ↓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
