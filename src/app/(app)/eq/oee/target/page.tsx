import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const rows = [
  { eqCode: "EQ-P3-CUT-01",   availTarget: "93", perfTarget: "97", qualTarget: "99.5", oeeTarget: "90" },
  { eqCode: "EQ-P3-CUT-02",   availTarget: "91", perfTarget: "95", qualTarget: "99.0", oeeTarget: "86" },
  { eqCode: "EQ-P3-PRESS-01", availTarget: "92", perfTarget: "95", qualTarget: "99.5", oeeTarget: "87" },
  { eqCode: "EQ-P3-WELD-01",  availTarget: "95", perfTarget: "97", qualTarget: "100",  oeeTarget: "92" },
  { eqCode: "EQ-P4-ASM-01",   availTarget: "90", perfTarget: "94", qualTarget: "99.0", oeeTarget: "85" },
];

export default function EQOeeTargetPage() {
  return (
    <div className="p-8">
      <PageHeader title="OEE 목표 설정" accent="TARGET" nodeRef="SCR-EQ-074" description="설비별 OEE 및 구성 요소 목표값 설정 폼." />
      <FieldHeader title="설비별 OEE 목표 입력" moduleRef="FR-EQ-074" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-headline border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["설비 코드","가용성 목표(%)","성능 목표(%)","품질 목표(%)","OEE 목표(%)"].map((h) => (
                <th key={h} className="px-4 py-2 font-label text-xs uppercase tracking-widest opacity-50 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.eqCode} className="border-b border-outline-variant">
                <td className="px-4 py-2 font-bold">{r.eqCode}</td>
                {([r.availTarget, r.perfTarget, r.qualTarget] as string[]).map((v, i) => (
                  <td key={i} className="px-4 py-2">
                    <input defaultValue={v} type="number" className="bg-surface-container border border-outline-variant/20 px-2 py-1 w-20 text-sm font-headline focus:outline-none focus:border-primary-accent tabular-nums" />
                  </td>
                ))}
                <td className="px-4 py-2">
                  <input defaultValue={r.oeeTarget} type="number" className="bg-surface-container border border-primary-accent px-2 py-1 w-20 text-sm font-headline font-black focus:outline-none text-primary-accent tabular-nums" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 mt-6">
        <button className="bg-primary-accent text-white font-label font-bold text-xs uppercase tracking-widest px-6 py-2">저장</button>
        <button className="bg-surface-container text-on-surface font-label font-bold text-xs uppercase tracking-widest px-6 py-2">취소</button>
      </div>
    </div>
  );
}
