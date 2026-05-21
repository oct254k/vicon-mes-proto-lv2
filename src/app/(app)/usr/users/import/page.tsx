"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_RESULT = [
  { row: "2", userId: "EMP1100", name: "김신규", result: "OK", note: "—" },
  { row: "3", userId: "EMP1101", name: "이신규", result: "OK", note: "—" },
  { row: "4", userId: "EMP1042", name: "김계직", result: "SKIP", note: "사번 중복" },
  { row: "5", userId: "", name: "", result: "ERR", note: "사번 누락" },
];

const BADGE: Record<string, "running" | "warning" | "error"> = { OK: "running", SKIP: "warning", ERR: "error" };

export default function UsersImportPage() {
  return (
    <div>
      <PageHeader title="CSV 일괄 Import" nodeRef="SCR-USR-004" status="PROTOTYPE" description="표준 CSV 양식으로 사용자 일괄 등록. 표준 컬럼: userId, name, email, plant, level, departments, empType, authMethods" />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 파일 업로드" moduleRef="FNC-USR-006" />
        <div className="border-2 border-dashed border-outline-variant/30 p-10 text-center mb-4">
          <p className="text-on-surface/40 text-sm font-body mb-3">CSV 파일을 이곳에 드래그 또는 클릭하여 선택</p>
          <input type="file" accept=".csv" className="hidden" id="csvFile" />
          <label htmlFor="csvFile" className="px-6 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold cursor-pointer">파일 선택</label>
        </div>
        <div className="flex items-center gap-4 text-xs font-label opacity-50">
          <span>허용 형식: .csv (UTF-8)</span>
          <span>|</span>
          <span>최대 500행</span>
          <a href="#" className="text-primary-accent underline">표준 양식 다운로드</a>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 검증 옵션" moduleRef="FNC-USR-006" />
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-[#00912F]" />
            <span>중복 사번 건너뜀 (SKIP)</span>
          </label>
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-[#00912F]" />
            <span>오류 행 리포트 포함</span>
          </label>
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" className="accent-[#00912F]" />
            <span>테스트 실행 (미반영)</span>
          </label>
        </div>
        <div className="flex gap-3 mt-4">
          <button className="px-6 py-2 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">Import 실행</button>
          <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">초기화</button>
        </div>
      </div>

      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">C. Import 결과 <span className="opacity-30 font-light ml-2">| 4행 처리 · OK 2 · SKIP 1 · ERR 1</span></h3>
          <button className="text-xs font-label opacity-40 underline">결과 CSV 다운로드</button>
        </div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container border-b border-outline">
              {["행", "사번", "이름", "결과", "비고"].map((h) => (
                <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline">
            {MOCK_RESULT.map((r, i) => (
              <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20">
                <td className="px-4 py-2 tabular-nums opacity-50">{r.row}</td>
                <td className="px-4 py-2 tabular-nums">{r.userId}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2"><StatusBadge type={BADGE[r.result]} label={r.result} /></td>
                <td className="px-4 py-2 text-xs opacity-60">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
