import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

interface Order {
  soId: string;
  customer: string;
  site: string;
  totalMembers: number;
  woIssued: number;
  prodDone: number;
  packingDone: number;
  shipped: number;
  rate: number;
}

const ORDERS: Order[] = [
  { soId: "SO-2026-0123", customer: "(주)건설", site: "강남현장 A동", totalMembers: 120, woIssued: 120, prodDone: 120, packingDone: 120, shipped: 0, rate: 100 },
  { soId: "SO-2026-0124", customer: "(주)건설", site: "강남현장 B동", totalMembers: 80, woIssued: 80, prodDone: 62, packingDone: 30, shipped: 0, rate: 78 },
  { soId: "SO-2026-0125", customer: "(주)건설", site: "분당현장 1동", totalMembers: 200, woIssued: 200, prodDone: 50, packingDone: 0, shipped: 0, rate: 25 },
  { soId: "SO-2026-0130", customer: "(주)시공", site: "송도현장 C동", totalMembers: 60, woIssued: 60, prodDone: 45, packingDone: 40, shipped: 40, rate: 75 },
  { soId: "SO-2026-0145", customer: "(주)종합건설", site: "판교현장 1동", totalMembers: 150, woIssued: 90, prodDone: 20, packingDone: 0, shipped: 0, rate: 13 },
];

function ProgressBar({ rate }: { rate: number }) {
  const color = rate >= 80 ? "bg-primary-accent/60" : rate >= 50 ? "bg-[#f59e0b]/60" : "bg-error/60";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-surface-container-highest">
        <div className={`h-2 ${color}`} style={{ width: `${rate}%` }} />
      </div>
      <span className="text-xs tabular-nums font-black w-8 text-right text-on-surface">{rate}%</span>
    </div>
  );
}

export default function OPSOrdersProgressPage() {
  return (
    <div className="p-6 bg-surface min-h-screen">
      <PageHeader
        title="수주별 진척"
        accent="ORDERS"
        nodeRef="SCR-OPS-040"
        description="거래처 / 현장 / 동 단위 수주 진척 현황 · 5분 갱신"
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>거래처 전체</option>
            <option>(주)건설</option>
            <option>(주)시공</option>
          </select>
          <select className="bg-surface-container border border-outline-variant/20 text-on-surface text-sm px-3 py-1.5 font-label">
            <option>기간 ~ 2026-05-31</option>
          </select>
        </div>
        <span className="text-xs font-label text-on-surface-variant">마지막 갱신 14:32 ⟳ 5분</span>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <FieldHeader title="수주별 진척 목록" moduleRef="FNC-OPS-050" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/10">
                {["수주번호", "거래처", "현장", "총 부재", "WO발행", "생산완료", "패킹완료", "출하", "진척률"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {ORDERS.map((o) => (
                <tr key={o.soId} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                  <td className="px-4 py-2 text-primary-accent font-black tabular-nums">{o.soId}</td>
                  <td className="px-4 py-2 tabular-nums">{o.customer}</td>
                  <td className="px-4 py-2 tabular-nums">{o.site}</td>
                  <td className="px-4 py-2 tabular-nums">{o.totalMembers}</td>
                  <td className="px-4 py-2 tabular-nums">{o.woIssued}</td>
                  <td className="px-4 py-2 tabular-nums">{o.prodDone}</td>
                  <td className="px-4 py-2 tabular-nums">{o.packingDone}</td>
                  <td className="px-4 py-2 tabular-nums">{o.shipped}</td>
                  <td className="px-4 py-2">
                    <ProgressBar rate={o.rate} />
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
