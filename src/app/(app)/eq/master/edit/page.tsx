import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

function FormRow({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-label text-xs uppercase tracking-widest opacity-50">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent"
      />
    </div>
  );
}

export default function EQMasterEditPage() {
  return (
    <div className="p-8">
      <PageHeader title="설비 정보 편집" accent="EDIT" nodeRef="SCR-EQ-004" description="설비 마스터 데이터 편집 폼." />
      <FieldHeader title="기본 정보" moduleRef="FR-EQ-004" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <FormRow label="설비 코드"  value="EQ-P3-CUT-01" />
        <FormRow label="설비명"     value="절단기 #1" />
        <FormRow label="설비 유형"  value="절단" />
        <FormRow label="라인"       value="LINE-P3-01" />
        <FormRow label="설치일"     value="2021-03-10" type="date" />
        <FormRow label="담당자"     value="홍길동" />
        <FormRow label="제조사"     value="(주)한국기계" />
        <FormRow label="모델번호"   value="KM-CUT-5000" />
        <FormRow label="PM 주기(일)" value="150" type="number" />
      </div>
      <FieldHeader title="위험 등급 / 비고" moduleRef="FR-EQ-005" />
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">위험 등급</label>
          <select className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent">
            <option>A</option><option>B</option><option>C</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-label text-xs uppercase tracking-widest opacity-50">비고</label>
          <textarea rows={2} className="bg-surface-container border border-outline-variant/20 px-3 py-2 text-sm font-headline focus:outline-none focus:border-primary-accent resize-none" />
        </div>
      </div>
      <div className="flex gap-3">
        <button className="bg-primary-accent text-white font-label font-bold text-xs uppercase tracking-widest px-6 py-2">저장</button>
        <button className="bg-surface-container text-on-surface font-label font-bold text-xs uppercase tracking-widest px-6 py-2">취소</button>
      </div>
    </div>
  );
}
