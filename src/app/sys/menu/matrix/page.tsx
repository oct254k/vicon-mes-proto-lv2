import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const ROLES = ["SYS-ADMIN","SYS-OPERATOR","SYS-AUDITOR","PROD-MANAGER","USER"];
const MENUS = ["공지 목록","메뉴 트리","코드 마스터","감사 로그","백업 정책","외부 연동","Plant 정책","헬스 대시보드"];

const MATRIX: Record<string, Record<string, string>> = {
  "공지 목록":    { "SYS-ADMIN":"RW","SYS-OPERATOR":"RW","SYS-AUDITOR":"R","PROD-MANAGER":"R","USER":"R" },
  "메뉴 트리":   { "SYS-ADMIN":"RW","SYS-OPERATOR":"—","SYS-AUDITOR":"R","PROD-MANAGER":"—","USER":"—" },
  "코드 마스터": { "SYS-ADMIN":"RW","SYS-OPERATOR":"RW","SYS-AUDITOR":"R","PROD-MANAGER":"—","USER":"—" },
  "감사 로그":   { "SYS-ADMIN":"R","SYS-OPERATOR":"R","SYS-AUDITOR":"R","PROD-MANAGER":"—","USER":"—" },
  "백업 정책":   { "SYS-ADMIN":"RW","SYS-OPERATOR":"R","SYS-AUDITOR":"—","PROD-MANAGER":"—","USER":"—" },
  "외부 연동":   { "SYS-ADMIN":"RW","SYS-OPERATOR":"R","SYS-AUDITOR":"—","PROD-MANAGER":"—","USER":"—" },
  "Plant 정책":  { "SYS-ADMIN":"RW","SYS-OPERATOR":"R","SYS-AUDITOR":"—","PROD-MANAGER":"—","USER":"—" },
  "헬스 대시보드":{ "SYS-ADMIN":"R","SYS-OPERATOR":"R","SYS-AUDITOR":"—","PROD-MANAGER":"—","USER":"—" },
};

export default function MenuMatrixPage() {
  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="메뉴 권한 매트릭스" accent="MATRIX" nodeRef="SCR-SYS-021" status="PROTOTYPE"
        description="메뉴 × 역할 권한 매트릭스 — R(읽기) RW(읽기·쓰기) — (FNC-SYS-021·025)" />
      <FieldHeader title="메뉴 × 역할 매트릭스" moduleRef="FNC-SYS-021" />
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-surface-container-lowest">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              <th className="px-4 py-2 font-label uppercase text-xs opacity-50 font-semibold min-w-[140px]">메뉴</th>
              {ROLES.map(r => (
                <th key={r} className="px-4 py-2 font-label uppercase text-xs opacity-50 font-semibold text-center">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {MENUS.map(menu => (
              <tr key={menu} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors">
                <td className="px-4 py-2 text-xs font-label">{menu}</td>
                {ROLES.map(role => {
                  const val = MATRIX[menu]?.[role] ?? "—";
                  return (
                    <td key={role} className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 text-xs font-label uppercase ${val === "RW" ? "bg-[#00912F]/20 text-[#00912F]" : val === "R" ? "bg-surface-container text-on-surface-variant" : "opacity-20 text-on-surface-variant"}`}>
                        {val}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
