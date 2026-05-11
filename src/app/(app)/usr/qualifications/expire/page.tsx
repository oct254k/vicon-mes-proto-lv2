import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const EXPIRE_LIST = [
  { qualId: "QL-EMP1042-WLD", userId: "EMP1042", name: "김계직", opCode: "OP-WLD-001", opName: "용접", expireDate: "2026-05-20", daysLeft: 14, status: "warning" as const },
  { qualId: "QL-EMP1058-CRN", userId: "EMP1058", name: "박작업", opCode: "OP-CRN-001", opName: "크레인 조작", expireDate: "2026-05-25", daysLeft: 19, status: "warning" as const },
  { qualId: "QL-EMP2011-INS", userId: "EMP2011", name: "이품질", opCode: "OP-INS-001", opName: "검사", expireDate: "2026-06-01", daysLeft: 26, status: "warning" as const },
  { qualId: "QL-EMP3030-PKG", userId: "EMP3030", name: "정출하", opCode: "OP-PKG-001", opName: "포장", expireDate: "2026-06-03", daysLeft: 28, status: "warning" as const },
  { qualId: "QL-EMP1099-PRE", userId: "EMP1099", name: "홍길동", opCode: "OP-PRE-001", opName: "프레스", expireDate: "2026-05-08", daysLeft: 2, status: "error" as const },
];

export default function QualificationExpirePage() {
  return (
    <div>
      <PageHeader title="자격 만료 임박 보드" nodeRef="SCR-USR-052" status="PROTOTYPE" description="만료 30일 이내 자격 경고 목록. 갱신 안내. 만료 후 해당 공정 실행 즉시 차단." />

      <div className="bg-surface-container-low border-l-4 border-[#f59e0b] p-4 mb-4 flex items-center gap-4">
        <StatusBadge type="warning" label="EXPIRE ALERT" />
        <span className="text-xs font-body text-on-surface/60">만료 임박 자격 {EXPIRE_LIST.length}건 — 즉시 갱신 조치 필요. 만료 후 공정 실행 차단.</span>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-[#f59e0b]">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">만료 임박 자격 목록 <span className="opacity-30 font-light ml-2">| {EXPIRE_LIST.length}건</span></h3>
          <FieldHeader title="" moduleRef="FNC-USR-071/072" />
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {["자격 ID", "사번", "이름", "공정 코드", "공정명", "만료일", "잔여일", "상태", "갱신"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {EXPIRE_LIST.map((q, i) => (
              <tr key={i} className={`border-b border-outline-variant/5 hover:bg-surface-container-highest/20 ${q.status === "error" ? "bg-error/5" : "bg-[#f59e0b]/5"}`}>
                <td className="px-4 py-2 tabular-nums text-xs opacity-70">{q.qualId}</td>
                <td className="px-4 py-2 tabular-nums">{q.userId}</td>
                <td className="px-4 py-2">{q.name}</td>
                <td className="px-4 py-2 text-xs opacity-70">{q.opCode}</td>
                <td className="px-4 py-2">{q.opName}</td>
                <td className="px-4 py-2 tabular-nums text-xs">{q.expireDate}</td>
                <td className={`px-4 py-2 tabular-nums font-bold ${q.daysLeft <= 7 ? "text-error" : "text-[#f59e0b]"}`}>{q.daysLeft}일</td>
                <td className="px-4 py-2"><StatusBadge type={q.status} label={q.status === "error" ? "URGENT" : "SOON"} /></td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">갱신 신청</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 잔여 7일 이하는 긴급(URGENT). 만료 시 공정 실행 즉시 차단. 갱신 신청 → 자격 부여 폼 이동.</p>
    </div>
  );
}
