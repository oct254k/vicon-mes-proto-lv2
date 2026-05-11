import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const KS_TEMPLATES = [
  { id: "TPL-KS-001", name: "KS D 3503 일반구조용 압연강재", client: "전체", fields: "재질·인장강도·항복점·연신율", updatedAt: "2026-03-01", active: "활성" },
  { id: "TPL-KS-002", name: "KS D 3515 용접구조용 압연강재", client: "현대건설", fields: "재질·인장강도·항복점·충격시험", updatedAt: "2026-04-10", active: "활성" },
];

const CE_TEMPLATES = [
  { id: "TPL-CE-001", name: "CE EN 10025-2", client: "전체", fields: "재질·항복강도·인장강도·충격인성", updatedAt: "2026-02-15", active: "활성" },
  { id: "TPL-CE-002", name: "CE EN 10210-1 구조용 중공형강", client: "GS건설", fields: "재질·치수·단면특성·표면", updatedAt: "2026-01-20", active: "활성" },
];

const S3_TEMPLATES = [
  { id: "TPL-3S-001", name: "3S 자체 품질 성적서 v2", client: "전체", fields: "부재코드·LOT·측정값·공차·판정", updatedAt: "2026-05-01", active: "활성" },
];

const COLS = [
  { key: "id", label: "템플릿 ID" },
  { key: "name", label: "양식명" },
  { key: "client", label: "적용 거래처" },
  { key: "fields", label: "필드 구성" },
  { key: "updatedAt", label: "최근 수정" },
  { key: "active", label: "상태" },
];

const TABS = [
  { label: "KS (국가표준)", data: KS_TEMPLATES, count: 2 },
  { label: "CE (유럽 인증)", data: CE_TEMPLATES, count: 2 },
  { label: "3S (자체 규격)", data: S3_TEMPLATES, count: 1 },
];

export default function QCCertificateTemplatePage() {
  return (
    <div>
      <PageHeader
        title="성적서 템플릿"
        accent="양식 마스터"
        nodeRef="SCR-QC-083"
        status="PROTOTYPE"
        description="KS / CE / 3S 거래처별 성적서 양식 마스터 (FNC-QC-123)"
      />

      <div className="flex gap-0 mb-6 border-b border-outline-variant/10">
        {TABS.map((t, i) => (
          <div key={t.label} className={`px-5 py-2.5 font-label uppercase tracking-widest text-xs cursor-pointer ${i === 0 ? "border-b-2 border-primary-accent text-primary-accent" : "text-on-surface/50 hover:text-on-surface"}`}>
            {t.label} <span className="ml-1 opacity-60">({t.count})</span>
          </div>
        ))}
      </div>

      {TABS.map((t, tabIdx) => (
        <div key={t.label} className={tabIdx !== 0 ? "hidden" : ""}>
          <div className="flex justify-end mb-4">
            <button className="bg-primary-accent text-black text-sm font-label uppercase px-4 py-1.5 font-bold hover:opacity-90">+ 템플릿 추가</button>
          </div>
          <DataTable
            title={`${t.label} 양식 — ${t.count}건`}
            columns={COLS}
            data={t.data}
            bufferCount={t.count}
          />
        </div>
      ))}

      <div className="mt-6 bg-surface-container-low border-l-4 border-outline-variant/20 p-4">
        <p className="font-label text-xs uppercase tracking-widest opacity-50 mb-2">탭 전환 안내</p>
        <p className="text-xs opacity-50 font-body">KS 탭이 기본 표시됩니다. CE·3S 탭은 실제 구현 시 상태 관리로 전환. 행 클릭 → 양식 편집.</p>
      </div>
    </div>
  );
}
