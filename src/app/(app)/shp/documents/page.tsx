import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const DOC_DATA = [
  { packId: "PKG-20260506-0001", docType: "패킹리스트", createdAt: "2026-05-06 08:00", status: "생성완료" },
  { packId: "PKG-20260506-0001", docType: "부재라벨", createdAt: "2026-05-06 08:01", status: "생성완료" },
  { packId: "PKG-20260506-0001", docType: "슬리퍼라벨", createdAt: "2026-05-06 08:02", status: "재인쇄" },
  { packId: "PKG-20260506-0002", docType: "패킹리스트", createdAt: "2026-05-06 09:15", status: "생성완료" },
  { packId: "PKG-20260506-0002", docType: "부재라벨", createdAt: "2026-05-06 09:16", status: "대기" },
  { packId: "PKG-20260505-0019", docType: "패킹리스트", createdAt: "2026-05-05 16:30", status: "생성완료" },
  { packId: "PKG-20260505-0019", docType: "슬리퍼라벨", createdAt: "2026-05-05 16:31", status: "생성완료" },
];

const STATUS_TYPE: Record<string, "running" | "warning" | "idle"> = {
  "생성완료": "running",
  "재인쇄": "warning",
  "대기": "idle",
};

export default function SHPDocumentsPage() {
  return (
    <div>
      <PageHeader
        title="패킹리스트"
        accent="·라벨"
        nodeRef="SCR-SHP-004"
        status="PROTOTYPE"
        description="패킹 문서 생성 · PDF 출력 · 라벨 재인쇄"
      />

      <div className="bg-surface-container-lowest mt-4">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            패킹 문서 목록
            <span className="opacity-30 font-light ml-2">| Buffer: 007 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">패킹 ID</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">문서 유형</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">생성일시</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">상태</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">액션</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {DOC_DATA.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 font-mono text-xs">{row.packId}</td>
                  <td className="px-4 py-2">{row.docType}</td>
                  <td className="px-4 py-2 tabular-nums text-xs opacity-70">{row.createdAt}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_TYPE[row.status] ?? "idle"} label={row.status} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs font-label uppercase tracking-widest bg-surface-container hover:bg-primary-accent hover:text-white transition-colors border border-outline-variant/20">
                        PDF
                      </button>
                      <button className="px-3 py-1 text-xs font-label uppercase tracking-widest bg-surface-container hover:bg-warning/20 transition-colors border border-outline-variant/20">
                        라벨 재인쇄
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
