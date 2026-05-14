import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const IMPACT_USERS = [
  { userId: "EMP1042", name: "김계직", level: "L2", dept: "PRD,SHP", affectedCells: "WHS/DELETE 신규", menus: "창고 삭제 메뉴", txns: "LOC-DELETE" },
  { userId: "EMP1058", name: "박작업", level: "L1", dept: "PRD", affectedCells: "PRD/CREATE 신규", menus: "생산 등록 메뉴", txns: "MFG-CREATE" },
  { userId: "EMP2011", name: "이품질", level: "L2", dept: "QC", affectedCells: "PRD/CREATE 신규", menus: "생산 등록 메뉴", txns: "MFG-CREATE" },
];

const IMPACT_MENUS = [
  { menuId: "MNU-LOC-DELETE", menuName: "창고 삭제", domain: "LOC", affectedLevel: "L2", userCount: "27명", riskLevel: "중" },
  { menuId: "MNU-MFG-CREATE", menuName: "생산 등록", domain: "MFG", affectedLevel: "L1", userCount: "84명", riskLevel: "고" },
  { menuId: "MNU-SLS-CREATE", menuName: "영업 등록", domain: "SLS", affectedLevel: "L3", userCount: "6명", riskLevel: "저" },
];

const USER_COLS = [
  { key: "userId", label: "사번" },
  { key: "name", label: "이름" },
  { key: "level", label: "레벨" },
  { key: "dept", label: "부서" },
  { key: "affectedCells", label: "변경 셀" },
  { key: "menus", label: "영향 메뉴" },
  { key: "txns", label: "영향 트랜잭션" },
];

const MENU_COLS = [
  { key: "menuId", label: "메뉴 ID" },
  { key: "menuName", label: "메뉴명" },
  { key: "domain", label: "도메인" },
  { key: "affectedLevel", label: "영향 레벨" },
  { key: "userCount", label: "영향 인원" },
  { key: "riskLevel", label: "위험도" },
];

export default function MatrixImpactPage() {
  return (
    <div>
      <PageHeader title="매트릭스 변경 영향 평가" nodeRef="SCR-USR-072" status="PROTOTYPE" description="권한 매트릭스 변경 초안의 영향 사용자·메뉴·트랜잭션 자동 분석 결과." />

      <div className="bg-surface-container-low border-l-4 border-warning p-4 mb-4">
        <FieldHeader title="A. 영향 요약" moduleRef="FNC-USR-093/103" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">영향 사용자</p><p className="text-warning font-bold text-2xl">117<span className="text-sm font-normal opacity-50 ml-1">명</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">영향 메뉴</p><p className="font-bold text-2xl">3<span className="text-sm font-normal opacity-50 ml-1">개</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">영향 트랜잭션</p><p className="font-bold text-2xl">3<span className="text-sm font-normal opacity-50 ml-1">종</span></p></div>
          <div><p className="text-xs opacity-50 font-label uppercase tracking-widest mb-1">회귀 테스트</p><p className="text-primary-accent font-bold text-2xl">0<span className="text-sm font-normal opacity-50 ml-1">건 실패</span></p></div>
        </div>
      </div>

      <div className="mb-6">
        <DataTable title="B. 영향 사용자 목록 (샘플 3건)" columns={USER_COLS} data={IMPACT_USERS} bufferCount={117} />
      </div>

      <div className="mb-6">
        <DataTable title="C. 영향 메뉴·트랜잭션" columns={MENU_COLS} data={IMPACT_MENUS} bufferCount={3} />
      </div>

      <div className="flex gap-3">
        <a href="/usr/matrix/approval" className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">L4 결재 신청</a>
        <a href="/usr/matrix/edit" className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">편집으로 돌아가기</a>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 회귀 테스트 실패 건 존재 시 L4 결재 신청 불가.</p>
    </div>
  );
}
