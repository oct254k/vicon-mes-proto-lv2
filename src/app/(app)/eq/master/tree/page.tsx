import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const tree = [
  {
    site: "SITE-KR-01", plants: [
      {
        plant: "PLANT-P3000", lines: [
          { line: "LINE-P3-01", eqs: ["EQ-P3-CUT-01", "EQ-P3-CUT-02"] },
          { line: "LINE-P3-02", eqs: ["EQ-P3-PRESS-01", "EQ-P3-WELD-01"] },
        ],
      },
      {
        plant: "PLANT-P4000", lines: [
          { line: "LINE-P4-01", eqs: ["EQ-P4-ASM-01"] },
        ],
      },
    ],
  },
];

export default function EQMasterTreePage() {
  return (
    <div className="p-8">
      <PageHeader title="설비 계층 트리" accent="TREE" nodeRef="SCR-EQ-001" description="Site › Plant › Line › Equipment 4단계 계층 구조." />
      <FieldHeader title="계층 구조" moduleRef="FR-EQ-001" />
      <div className="space-y-4">
        {tree.map((s) => (
          <div key={s.site} className="border-l-4 border-primary-accent pl-4">
            <p className="font-headline font-black text-sm uppercase tracking-widest mb-3 text-primary-accent">{s.site}</p>
            {s.plants.map((p) => (
              <div key={p.plant} className="ml-4 mb-3 border-l border-outline-variant/20 pl-4">
                <p className="font-headline font-bold text-sm mb-2">{p.plant}</p>
                {p.lines.map((l) => (
                  <div key={l.line} className="ml-4 mb-2 border-l border-outline-variant/10 pl-4">
                    <p className="font-label text-xs uppercase tracking-widest opacity-60 mb-1">{l.line}</p>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {l.eqs.map((eq) => (
                        <div key={eq} className="bg-surface-container-low px-3 py-1 flex items-center gap-2">
                          <StatusBadge type="running" label="가동 중" />
                          <span className="font-headline text-xs">{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
