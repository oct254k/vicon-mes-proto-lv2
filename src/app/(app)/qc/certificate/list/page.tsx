import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const CERTS = [
  { id: "CERT-2026-0041", woId: "WO-2026-0120", partCode: "B01-1-G22C-C-171", client: "현대건설", type: "KS", issuedAt: "2026-05-05 14:00", issuedBy: "qcmgr.lee", status: "ISSUED" },
  { id: "CERT-2026-0040", woId: "WO-2026-0118", partCode: "B01-2-G15A-S-038", client: "GS건설", type: "3S", issuedAt: "2026-05-04 11:30", issuedBy: "qcmgr.kim", status: "REISSUED" },
  { id: "CERT-2026-0039", woId: "WO-2026-0115", partCode: "M-COIL-A-...010", client: "삼성물산", type: "CE", issuedAt: "2026-05-03 09:15", issuedBy: "qcmgr.lee", status: "ISSUED" },
  { id: "CERT-2026-0038", woId: "WO-2026-0112", partCode: "B01-1-G22C-C-168", client: "롯데건설", type: "KS", issuedAt: "2026-05-02 15:40", issuedBy: "qcmgr.kim", status: "DRAFT" },
];

const STAT: Record<string, { type: "running" | "warning" | "idle" }> = {
  ISSUED: { type: "running" },
  REISSUED: { type: "warning" },
  DRAFT: { type: "idle" },
};

export default function QCCertificateListPage() {
  return (
    <div>
      <PageHeader
        title="성적서 목록"
        accent="CERT"
        nodeRef="SCR-QC-081~082"
        status="PROTOTYPE"
        description="품질 성적서 PDF 발급·재발행·이력 조회·다운로드 (FNC-QC-120~122, 124)"
      />
      <FieldHeader title="필터" moduleRef="FNC-QC-124" />
      <div className="flex flex-wrap gap-3 mb-5">
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>최근 3개월</option><option>최근 30일</option><option>이번 달</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>양식 전체</option><option>KS</option><option>CE</option><option>3S</option>
        </select>
        <select className="bg-surface-container border border-outline-variant/20 text-sm px-3 py-1.5 font-label uppercase tracking-wider">
          <option>상태 전체</option><option>ISSUED</option><option>REISSUED</option><option>DRAFT</option>
        </select>
        <input type="text" placeholder="거래처 검색" className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm" />
        <div className="flex-1" />
        <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 성적서 발행</button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">성적서 <span className="opacity-30 font-light ml-2">| Buffer: 041 Entries</span></h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["성적서 ID","WO ID","부재코드","거래처","양식","발행일시","발행자","상태","액션"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline">
              {CERTS.map((c, i) => (
                <tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 tabular-nums text-primary-accent">{c.id}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{c.woId}</td>
                  <td className="px-4 py-2 font-mono text-xs">{c.partCode}</td>
                  <td className="px-4 py-2 text-xs">{c.client}</td>
                  <td className="px-4 py-2 font-bold">{c.type}</td>
                  <td className="px-4 py-2 tabular-nums text-xs">{c.issuedAt}</td>
                  <td className="px-4 py-2 text-xs opacity-60">{c.issuedBy}</td>
                  <td className="px-4 py-2"><StatusBadge type={STAT[c.status].type} label={c.status} /></td>
                  <td className="px-4 py-2">
                    <button className="bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase px-2 py-1 hover:opacity-90 mr-1">PDF</button>
                    {c.status !== "DRAFT" && <button className="bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-label uppercase px-2 py-1 hover:opacity-90">재발행</button>}
                    {c.status === "DRAFT" && <button className="bg-primary-accent text-black text-xs font-label uppercase px-2 py-1 hover:opacity-90">발행</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
