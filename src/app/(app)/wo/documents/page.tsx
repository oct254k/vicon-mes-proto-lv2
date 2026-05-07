import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const docData = [
  { docType: "패킹리스트",  refId: "PL-P3000-20260506-001",  created: "2026-05-06 09:45" },
  { docType: "작업지시서",  refId: "WO-P3000-20260506-0007", created: "2026-05-06 09:10" },
  { docType: "작업지시서",  refId: "WO-P3000-20260506-0008", created: "2026-05-06 09:10" },
  { docType: "패킹리스트",  refId: "PL-P3000-20260505-003",  created: "2026-05-05 16:50" },
  { docType: "작업지시서",  refId: "WO-P3000-20260505-0002", created: "2026-05-05 08:00" },
  { docType: "패킹리스트",  refId: "PL-P3000-20260504-002",  created: "2026-05-04 09:20" },
  { docType: "작업지시서",  refId: "WO-P3000-20260504-0001", created: "2026-05-04 09:15" },
];

export default function WODocumentsPage() {
  return (
    <div>
      <PageHeader
        title="출력 문서"
        accent="DOCUMENTS"
        nodeRef="SCR-WO-040"
        status="PROTOTYPE"
        description="작업지시서·패킹리스트 생성 이력 및 PDF 다운로드."
      />

      <FieldHeader title="문서 목록" moduleRef="SCR-WO-040" />
      <section className="bg-[#1a1a1a] mt-4">
        <div className="p-4 bg-white/5 flex justify-between items-center border-l-4 border-[#00912F]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            문서 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(docData.length).padStart(3, "0")} Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#00912F]">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">문서 유형</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">WO / 패킹 ID</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">생성일시</th>
                <th className="px-4 py-2 text-xs font-label uppercase tracking-widest text-white/40">다운로드</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {docData.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-label uppercase tracking-wider font-bold ${
                      row.docType === "작업지시서"
                        ? "bg-[#00912F]/20 text-[#00912F]"
                        : "bg-white/10 text-white/60"
                    }`}>
                      {row.docType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#00912F]">{row.refId}</td>
                  <td className="px-4 py-3 tabular-nums text-white/70">{row.created}</td>
                  <td className="px-4 py-3">
                    <button className="border border-white/20 text-white/60 font-label uppercase tracking-widest text-xs px-3 py-1 hover:border-[#00912F] hover:text-[#00912F] transition-colors">
                      PDF 다운로드
                    </button>
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
