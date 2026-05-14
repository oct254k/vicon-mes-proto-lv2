import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ASN_DATA = [
  { asnNo: "ASN-2026-0031", po: "PO-2026-0039", supplier: "삼양스틸", shipDate: "2026-05-04", eta: "2026-05-07", status: "RECEIVED" },
  { asnNo: "ASN-2026-0032", po: "PO-2026-0041", supplier: "(주)한국강재", shipDate: "2026-05-05", eta: "2026-05-08", status: "IN_TRANSIT" },
  { asnNo: "ASN-2026-0033", po: "PO-2026-0042", supplier: "동양특수강", shipDate: "2026-05-03", eta: "2026-05-06", status: "DELAYED" },
  { asnNo: "ASN-2026-0034", po: "PO-2026-0044", supplier: "(주)한국강재", shipDate: "2026-05-06", eta: "2026-05-09", status: "IN_TRANSIT" },
  { asnNo: "ASN-2026-0035", po: "PO-2026-0045", supplier: "신흥금속(주)", shipDate: "2026-05-07", eta: "2026-05-08", status: "SCHEDULED" },
];

const STATUS_MAP: Record<string, { type: "running" | "warning" | "idle" | "stopped"; label: string }> = {
  RECEIVED:   { type: "running", label: "RECEIVED" },
  IN_TRANSIT: { type: "idle", label: "IN TRANSIT" },
  DELAYED:    { type: "warning", label: "DELAYED" },
  SCHEDULED:  { type: "idle", label: "예정" },
};

function isEtaUrgent(eta: string) {
  const etaDate = new Date(eta);
  const today = new Date("2026-05-06");
  const diff = (etaDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 3;
}

export default function PURAsnPage() {
  return (
    <div>
      <PageHeader
        title="ASN"
        accent="사전출하통지"
        nodeRef="SCR-PUR-014"
        status="PROTOTYPE"
        description="공급사 사전 출하 통지 수신 · ETA 관리"
      />

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-6 py-2 text-xs font-label uppercase tracking-widest hover:bg-primary-accent/90 transition-colors">
          + 수동 ASN 등록
        </button>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            ASN 목록
            <span className="opacity-30 font-light ml-2">| Buffer: 005 Entries</span>
          </h3>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">refresh</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">ASN 번호</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">PO</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">공급사</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">출하일</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">ETA</th>
                <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">상태</th>
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {ASN_DATA.map((row, i) => {
                const urgent = isEtaUrgent(row.eta) || row.status === "DELAYED";
                return (
                  <tr
                    key={i}
                    className={`border-b border-outline-variant transition-colors ${
                      urgent
                        ? "bg-warning/5 hover:bg-warning/10"
                        : "hover:bg-surface-container-highest/20"
                    }`}
                  >
                    <td className="px-4 py-2 font-mono text-xs">{row.asnNo}</td>
                    <td className="px-4 py-2 font-mono text-xs opacity-70">{row.po}</td>
                    <td className="px-4 py-2">{row.supplier}</td>
                    <td className="px-4 py-2 tabular-nums text-xs">{row.shipDate}</td>
                    <td className={`px-4 py-2 tabular-nums text-xs font-bold ${urgent ? "text-warning" : ""}`}>
                      {row.eta}
                      {urgent && <span className="ml-1 text-[10px]">⚠</span>}
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge
                        type={STATUS_MAP[row.status]?.type ?? "idle"}
                        label={STATUS_MAP[row.status]?.label ?? row.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
