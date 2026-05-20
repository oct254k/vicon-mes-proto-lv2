import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const weeks = [
  { label: "W18", oee: 84, avail: 90, perf: 94, qual: 99 },
  { label: "W19", oee: 87, avail: 92, perf: 96, qual: 99 },
  { label: "W20", oee: 82, avail: 88, perf: 94, qual: 99 },
  { label: "W21", oee: 89, avail: 94, perf: 96, qual: 99 },
  { label: "W22", oee: 91, avail: 95, perf: 97, qual: 99 },
];

function Bar({ val, color }: { val: number; color: string }) {
  return (
    <div className="flex items-end gap-1 h-24">
      <div className="w-full flex flex-col justify-end h-full">
        <div className={`${color} w-full`} style={{ height: `${val}%` }} />
      </div>
    </div>
  );
}

export default function EQOeeTrendPage() {
  return (
    <div className="p-8">
      <PageHeader title="OEE 추이" accent="TREND" nodeRef="SCR-EQ-071" description="주간 OEE 추이 차트 (CSS 막대 기반)." />
      <FieldHeader title="주간 OEE 추이 (W18 ~ W22)" moduleRef="FR-EQ-071" />
      <div className="grid grid-cols-5 gap-2 mb-4">
        {weeks.map((w) => (
          <div key={w.label} className="flex flex-col gap-1">
            <div className="grid grid-cols-3 gap-px h-24">
              <Bar val={w.avail} color="bg-[#86efac]" />
              <Bar val={w.perf}  color="bg-[#4ade80]" />
              <Bar val={w.oee}   color="bg-primary-accent" />
            </div>
            <p className="text-center font-label text-xs opacity-50 mt-1">{w.label}</p>
            <p className="text-center font-headline font-black text-sm text-primary-accent">{w.oee}%</p>
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-2">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#86efac]" /><span className="font-label text-xs">가용성</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#4ade80]" /><span className="font-label text-xs">성능</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-accent" /><span className="font-label text-xs">OEE</span></div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm font-headline border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["주차","가용성","성능","품질","OEE"].map((h) => (
                <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.label} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2">{w.label}</td>
                <td className="px-4 py-2 tabular-nums">{w.avail}%</td>
                <td className="px-4 py-2 tabular-nums">{w.perf}%</td>
                <td className="px-4 py-2 tabular-nums">{w.qual}%</td>
                <td className="px-4 py-2 tabular-nums text-primary-accent font-black">{w.oee}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
