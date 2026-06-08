// Auto-derived from outputs/02_basic_design/04_ia/domains/IA-*.md (12 IA SSOT files).
// Tree is N-depth (recursive). Domain root nodes are expand-only (no url).
// Leaf nodes always carry a `url`. Intermediate nodes may also carry one when the IA
// defines a URL for that node (e.g. /qc/spc/chart for IA-QC-SPC-CHART which has 4Depth children).

export interface MenuNode {
  id: string;          // IA node id with the leading "IA-" prefix removed (e.g. "WO-ORDERS-RELEASE")
  label: string;       // Korean display label
  url?: string;        // route path; absent for expand-only nodes
  icon?: string;       // Material Symbol name; only on 1Depth domain roots
  role?: string[];     // primary roles (currently omitted everywhere — IA roles are placeholders)
  hidden?: boolean;    // true면 사이드바 트리에서 숨김 (라우트/정의는 유지)
  children?: MenuNode[];
}

// 1Depth = 12 (domain roots). Order: BD → SP → WO → MFG → LOC → QC → EQ → PUR → SHP → USR → OPS → SYS.
export const MENU: MenuNode[] = [
  // ===== BD : 기준정보 =====
  {
    id: "BD",
    label: "기준정보",
    icon: "inventory_2",
    children: [
      {
        id: "BD-PLANT",
        label: "공장·재고 분리 키",
        url: "/bd/plant",
        children: [
          { id: "BD-PLANT-LIST", label: "Plant 마스터 조회·등록", url: "/bd/plant/list" },
          { id: "BD-PLANT-INVENTORY", label: "전사 재고 집계", url: "/bd/plant/inventory-summary" },
        ],
      },
      {
        id: "BD-MATERIAL",
        label: "자재·사양",
        url: "/bd/material",
        children: [
          { id: "BD-MATERIAL-LIST", label: "Material 마스터 조회·등록·필터", url: "/bd/material/list" },
          { id: "BD-MATERIAL-HISTORY", label: "Material 변경 이력 (시계열)", url: "/bd/material/history" },
        ],
      },
      {
        id: "BD-BOMROUTE",
        label: "BOM·Routing·버전",
        url: "/bd/bom-routing",
        children: [
          { id: "BD-BOMROUTE-BOM", label: "BOM 신 버전·시점·펼침", url: "/bd/bom" },
          { id: "BD-BOMROUTE-ROUTING", label: "Routing 신 버전·외주", url: "/bd/routing" },
        ],
      },
      {
        id: "BD-WORKLINE",
        label: "공정라인·세부 공정",
        url: "/bd/workline",
        children: [
          { id: "BD-WORKLINE-LIST", label: "공정라인 마스터·다중 인스턴스", url: "/bd/workline/list" },
          { id: "BD-WORKLINE-STEPS", label: "세부 공정 시퀀스", url: "/bd/workline/steps" },
          { id: "BD-WORKLINE-VIZ", label: "Plant별 공정 흐름도", url: "/bd/workline/visualize" },
        ],
      },
      {
        id: "BD-WC",
        label: "Work Center",
        url: "/bd/workcenter",
        children: [
          { id: "BD-WC-LIST", label: "Work Center 조회·등록", url: "/bd/workcenter/list" },
          { id: "BD-WC-CALENDAR", label: "Work Center 가용 캘린더", url: "/bd/workcenter/calendar" },
        ],
      },
      {
        id: "BD-CUSTOMER",
        label: "거래처·현장·동",
        url: "/bd/customer",
        children: [
          { id: "BD-CUSTOMER-TREE", label: "거래처-현장-동 3단계 트리", url: "/bd/customer/tree" },
        ],
      },
      {
        id: "BD-SUPPLIER",
        label: "공급사·가격·등급",
        url: "/bd/supplier",
        children: [
          { id: "BD-SUPPLIER-LIST", label: "공급사 마스터 조회·등록", url: "/bd/supplier/list" },
          { id: "BD-SUPPLIER-PRICE", label: "공급사×자재 가격·MOQ·우선순위", url: "/bd/supplier/price" },
          { id: "BD-SUPPLIER-GRADE", label: "등급 자동 평가 결과", url: "/bd/supplier/grade" },
        ],
      },
      {
        id: "BD-EQUIPMENT",
        label: "설비·부품",
        url: "/bd/equipment",
        children: [
          { id: "BD-EQUIPMENT-LIST", label: "Equipment 마스터", url: "/bd/equipment/list" },
          { id: "BD-EQUIPMENT-COMPONENT", label: "Component 마스터·usage_unit·교체 사유", url: "/bd/equipment/component" },
        ],
      },
      {
        id: "BD-DEFECT",
        label: "불량항목·카테고리",
        url: "/bd/defect-type",
        children: [
          { id: "BD-DEFECT-LIST", label: "불량항목 마스터·트리", url: "/bd/defect-type/list" },
        ],
      },
      {
        id: "BD-CERT",
        label: "KS 인증",
        url: "/bd/cert",
        children: [
          { id: "BD-CERT-LIST", label: "KS 인증 마스터·갱신", url: "/bd/cert/list" },
          { id: "BD-CERT-MONITOR", label: "만료 모니터링 (D-30/D-7)", url: "/bd/cert/monitor" },
        ],
      },
      {
        id: "BD-COMMON",
        label: "공통 정책·감사·import/export",
        url: "/bd/common",
        children: [
          { id: "BD-COMMON-AUDIT", label: "감사 로그 조회", url: "/bd/common/audit" },
          { id: "BD-COMMON-IMPORT", label: "CSV·Excel 일괄 import", url: "/bd/common/import" },
          { id: "BD-COMMON-EXPORT", label: "CSV·Excel 일괄 export", url: "/bd/common/export" },
        ],
      },
    ],
  },

  // ===== SP : 수주·생산계획·MRP =====
  {
    id: "SP",
    label: "수주·생산계획·MRP",
    icon: "request_quote",
    children: [
      {
        id: "SP-SO",
        label: "수주 입력·관리",
        url: "/sp/so",
        children: [
          { id: "SP-SO-NEW", label: "수주 등록 폼", url: "/sp/so/new" },
          { id: "SP-SO-LIST", label: "수주 목록·검색", url: "/sp/so" },
          { id: "SP-SO-DETAIL", label: "수주 상세·승인·반려·취소", url: "/sp/so/{so_id}" },
          { id: "SP-SO-SHIPPABLE", label: "출하 가능 조회", url: "/sp/so/shippable" },
        ],
      },
      {
        id: "SP-MEMBER",
        label: "부재 리스트(수주 분해)",
        url: "/sp/member",
        children: [
          { id: "SP-MEMBER-BOARD", label: "부재 리스트 보드", url: "/sp/member/board" },
          { id: "SP-MEMBER-UPLOAD", label: "부재 리스트 Excel 업로드", url: "/sp/member/upload" },
        ],
      },
      {
        id: "SP-PLAN",
        label: "생산계획(장기·중기·일일)",
        url: "/sp/plan",
        children: [
          { id: "SP-PLAN-LONG", label: "장기 계획 보드", url: "/sp/plan/long-term" },
          { id: "SP-PLAN-MID", label: "중기 계획 보드", url: "/sp/plan/mid-term" },
          { id: "SP-PLAN-DAILY", label: "일일 계획 보드", url: "/sp/plan/daily" },
          { id: "SP-PLAN-INPUT", label: "일일 계획 입력 폼", url: "/sp/plan/daily/new" },
          { id: "SP-PLAN-FORCE", label: "강제 발행 다이얼로그", url: "/sp/plan/daily/{plan_id}/force" },
          { id: "SP-PLAN-AUDIT", label: "계획 변경 이력", url: "/sp/plan/{plan_id}/audit" },
        ],
      },
      {
        id: "SP-MRP",
        label: "MRP 실행·결과 조회",
        url: "/sp/mrp",
        children: [
          { id: "SP-MRP-RESULT", label: "MRP 결과 상세", url: "/sp/mrp/result" },
          { id: "SP-MRP-RUNS", label: "MRP run 이력", url: "/sp/mrp/runs" },
          { id: "SP-MRP-PR", label: "PR 후보 검토(PUR 연계)", url: "/sp/mrp/pr-candidates" },
        ],
      },
      {
        id: "SP-NOTI",
        label: "SP 알림",
        url: "/sp/noti",
        children: [
          { id: "SP-NOTI-INBOX", label: "알림 인박스", url: "/sp/noti/inbox" },
          { id: "SP-NOTI-RECIPIENT", label: "알림 수신자 마스터", url: "/sp/noti/recipients" },
          { id: "SP-NOTI-HISTORY", label: "이력·재발송", url: "/sp/noti/history" },
        ],
      },
    ],
  },

  // ===== WO : 작업지시·부재·패킹 =====
  {
    id: "WO",
    label: "작업지시·부재·패킹",
    icon: "assignment",
    children: [
      {
        id: "WO-ORDERS",
        label: "작업지시 발행·조회",
        url: "/wo/orders",
        children: [
          { id: "WO-ORDERS-LIST", label: "WO 목록·필터", url: "/wo/orders" },
          { id: "WO-ORDERS-RELEASE", label: "발행·검증·강제발행", url: "/wo/orders/release" },
          { id: "WO-ORDERS-DETAIL", label: "WO 상세·취소·재발행", url: "/wo/orders/{wo_id}" },
          { id: "WO-ORDERS-PRIORITY", label: "우선순위 정렬", url: "/wo/orders/priority" },
          { id: "WO-ORDERS-EXTERNAL", label: "외주 Plant 발행", url: "/wo/orders/external" },
        ],
      },
      {
        id: "WO-MEMBERS",
        label: "부재 코드·도면",
        url: "/wo/members",
        children: [
          { id: "WO-MEMBERS-LIST", label: "부재 코드 목록·정규식 검증", url: "/wo/members" },
          { id: "WO-MEMBERS-DRAWING", label: "도면 등록·연결", url: "/wo/members/drawings" },
          { id: "WO-MEMBERS-BOM", label: "BOM-부재할당", url: "/wo/members/bom-assignment" },
        ],
      },
      {
        id: "WO-PACKING",
        label: "패킹 그룹·라이프사이클",
        url: "/wo/packing",
        children: [
          { id: "WO-PACKING-GROUPS", label: "패킹 그룹 사전 정의", url: "/wo/packing/groups" },
          { id: "WO-PACKING-LIFECYCLE", label: "8단계 보드 (CREATED~SHIPPED)", url: "/wo/packing/lifecycle" },
          { id: "WO-PACKING-HOLD", label: "보류·해제·AGING 모니터", url: "/wo/packing/hold" },
        ],
      },
      {
        id: "WO-LABELS",
        label: "라벨 발행·재인쇄·이력",
        url: "/wo/labels",
        children: [
          { id: "WO-LABELS-PRINT", label: "패킹·슬리퍼 라벨 발행", url: "/wo/labels/print" },
          { id: "WO-LABELS-REPRINT", label: "재인쇄·재발행 큐", url: "/wo/labels/reprint" },
          { id: "WO-LABELS-HISTORY", label: "발행 이력 조회", url: "/wo/labels/history" },
        ],
      },
      { id: "WO-DOCUMENTS", label: "작업지시서·패킹리스트 PDF", url: "/wo/documents" },
      { id: "WO-DASHBOARD", label: "WO·패킹 진척 보드", url: "/wo/dashboard" },
    ],
  },

  // ===== MFG : 생산실행·추적성 =====
  {
    id: "MFG",
    label: "생산실행·추적성",
    icon: "precision_manufacturing",
    children: [
      { id: "MFG-TODAY", label: "오늘의 작업 (PDA 첫 화면)", url: "/mfg/today" },
      {
        id: "MFG-ISSUE",
        label: "자재 투입",
        url: "/mfg/issue",
        children: [
          { id: "MFG-ISSUE-SCAN", label: "자재 라벨 스캔 (PDA)", url: "/mfg/issue/scan" },
          { id: "MFG-ISSUE-OVERRIDE", label: "FIFO 우회 결재", url: "/mfg/issue/override" },
          { id: "MFG-ISSUE-CANCEL", label: "투입 취소", url: "/mfg/issue/cancel" },
          { id: "MFG-ISSUE-HISTORY", label: "투입 이력 조회", url: "/mfg/issue/history" },
        ],
      },
      {
        id: "MFG-PRODUCE",
        label: "부재 완성",
        url: "/mfg/produce",
        children: [
          { id: "MFG-PRODUCE-PROGRESS", label: "공정 진행 스캔 (PDA)", url: "/mfg/produce/progress" },
          { id: "MFG-PRODUCE-OVERRIDE", label: "LOT 게이트 Override", url: "/mfg/produce/override" },
          { id: "MFG-PRODUCE-AUTO", label: "설비 자동 보정", url: "/mfg/produce/auto" },
          { id: "MFG-PRODUCE-CANCEL", label: "완성 취소·결재 (묶음 LOT)", url: "/mfg/produce/cancel" },
          { id: "MFG-PRODUCE-REATTEMPT", label: "재생산 attempt", url: "/mfg/produce/reattempt" },
          { id: "MFG-PRODUCE-HISTORY", label: "완성 이력 조회", url: "/mfg/produce/history" },
        ],
      },
      {
        id: "MFG-TRANSFER",
        label: "공장 간 이동 (TRANSFER)",
        url: "/mfg/transfer",
        children: [
          { id: "MFG-TRANSFER-OUT", label: "출고 스캔 (PDA)", url: "/mfg/transfer/out" },
          { id: "MFG-TRANSFER-IN", label: "입고 스캔 + 도착 위치", url: "/mfg/transfer/in" },
          { id: "MFG-TRANSFER-DISCREPANCY", label: "도착 검수 불일치 결재", url: "/mfg/transfer/discrepancy" },
          { id: "MFG-TRANSFER-CANCEL", label: "TRANSFER_OUT 취소", url: "/mfg/transfer/cancel" },
          { id: "MFG-TRANSFER-HISTORY", label: "TRANSFER 이력 조회", url: "/mfg/transfer/history" },
        ],
      },
      {
        id: "MFG-RECALL",
        label: "LOT 추적·회수 (RECALL)",
        url: "/mfg/recall",
        children: [
          { id: "MFG-RECALL-BACKWARD", label: "역방향 추적 (부재→자재)", url: "/mfg/recall/backward" },
          { id: "MFG-RECALL-FORWARD", label: "순방향 추적 (자재→부재)", url: "/mfg/recall/forward" },
          { id: "MFG-RECALL-WORKFLOW", label: "회수 5단계 워크플로", url: "/mfg/recall/workflow" },
        ],
      },
      {
        id: "MFG-OUTSOURCE",
        label: "외주 공정",
        url: "/mfg/outsource",
        children: [
          { id: "MFG-OUTSOURCE-SEND", label: "외주 출고 스캔", url: "/mfg/outsource/send" },
          { id: "MFG-OUTSOURCE-PROCESS", label: "외주 가공 결과 (DIRECT/PROXY)", url: "/mfg/outsource/process" },
          { id: "MFG-OUTSOURCE-RECEIVE", label: "외주 회수 입고 스캔", url: "/mfg/outsource/receive" },
        ],
      },
    ],
  },

  // ===== LOC : 위치·재고 =====
  {
    id: "LOC",
    label: "위치·재고",
    icon: "warehouse",
    children: [
      {
        id: "LOC-MASTER",
        label: "위치 체계·yard 마스터",
        url: "/loc/master",
        children: [
          { id: "LOC-MASTER-LIST", label: "위치 마스터 목록·검색", url: "/loc/master/list" },
          { id: "LOC-MASTER-NEW", label: "위치 등록·일괄 등록", url: "/loc/master/new" },
          { id: "LOC-MASTER-STATUS", label: "상태 변경·MAINTENANCE·폐기", url: "/loc/master/status" },
        ],
      },
      {
        id: "LOC-YARD-MAP",
        label: "야적장 도면 시각화",
        url: "/loc/yard-map",
        children: [
          { id: "LOC-YARD-MAP-VIEW", label: "실시간 도면 시각화", url: "/loc/yard-map/view" },
          { id: "LOC-YARD-MAP-EDIT", label: "도면 등록·Drag-and-Drop", url: "/loc/yard-map/edit" },
          { id: "LOC-YARD-MAP-OCCUPANCY", label: "점유 현황 보드", url: "/loc/yard-map/occupancy" },
        ],
      },
      {
        id: "LOC-RECEIVE",
        label: "입고",
        url: "/loc/receive",
        children: [
          { id: "LOC-RECEIVE-NEW", label: "입고 등록 (PDA·웹)", url: "/loc/receive/new" },
          { id: "LOC-RECEIVE-LIST", label: "입고 이력 조회", url: "/loc/receive/list" },
          { id: "LOC-RECEIVE-INSPECT", label: "입고 검수·불량 격리", url: "/loc/receive/inspect" },
        ],
      },
      {
        id: "LOC-TRANSFER",
        label: "공장 간 이동 (TRANSFER)",
        url: "/loc/transfer",
        children: [
          { id: "LOC-TRANSFER-OUT", label: "출고 등록 (PDA → MFG cross-cut)", url: "/loc/transfer/out" },
          { id: "LOC-TRANSFER-IN-TRANSIT", label: "in-transit 운송 중 가시화", url: "/loc/transfer/in-transit" },
          { id: "LOC-TRANSFER-ARRIVE", label: "도착·검수 불일치 처리", url: "/loc/transfer/arrive" },
        ],
      },
      {
        id: "LOC-ADJUST",
        label: "재고 조정",
        url: "/loc/adjust",
        children: [
          { id: "LOC-ADJUST-NEW", label: "조정 등록 (권한 가드)", url: "/loc/adjust/new" },
          { id: "LOC-ADJUST-LIST", label: "조정 이력·감사", url: "/loc/adjust/list" },
        ],
      },
      {
        id: "LOC-SCRAP",
        label: "SCRAP·자투리",
        url: "/loc/scrap",
        children: [
          { id: "LOC-SCRAP-NEW", label: "SCRAP 등록", url: "/loc/scrap/new" },
          { id: "LOC-SCRAP-OFFCUT", label: "자투리 풀 (Offcut Pool)", url: "/loc/scrap/offcut" },
          { id: "LOC-SCRAP-DEFECT", label: "불량 격리·폐기 결정", url: "/loc/scrap/defect" },
        ],
      },
      {
        id: "LOC-COUNT",
        label: "정기 실사",
        url: "/loc/count",
        children: [
          { id: "LOC-COUNT-PLAN", label: "실사 주기·계획", url: "/loc/count/plan" },
          { id: "LOC-COUNT-SHEET", label: "카운트 시트 PDA", url: "/loc/count/sheet" },
          { id: "LOC-COUNT-REPORT", label: "차이·정합률 리포트", url: "/loc/count/report" },
        ],
      },
      {
        id: "LOC-INVENTORY",
        label: "재고 조회·이력",
        url: "/loc/inventory",
        children: [
          { id: "LOC-INVENTORY-LOC", label: "위치별 재고", url: "/loc/inventory/by-location" },
          { id: "LOC-INVENTORY-MAT", label: "(Material × Plant) 가용", url: "/loc/inventory/by-material" },
          { id: "LOC-INVENTORY-HIST", label: "트랜잭션 이력", url: "/loc/inventory/history" },
          { id: "LOC-INVENTORY-MOVE", label: "MOVE (동일 Plant 내 이동)", url: "/loc/inventory/move" },
          { id: "LOC-INVENTORY-TRACE", label: "Lot·부재 추적", url: "/loc/inventory/trace" },
        ],
      },
    ],
  },

  // ===== QC : 품질·SPC·불량 (SPC-CHART under SPC has 4Depth children — preserve) =====
  {
    id: "QC",
    label: "품질·불량",
    icon: "verified",
    children: [
      {
        id: "QC-DASH",
        label: "품질 KPI 대시보드",
        url: "/qc/dashboard",
        children: [
          { id: "QC-DASH-MAIN", label: "품질 KPI 메인", url: "/qc/dashboard/main" },
          { id: "QC-DASH-LOSS-SUMMARY", label: "손실 요약 위젯", url: "/qc/dashboard/loss-summary", hidden: true },
        ],
      },
      {
        id: "QC-SPC",
        label: "SPC 측정·관리도",
        url: "/qc/spc",
        hidden: true,
        children: [
          { id: "QC-SPC-MEASURE-PDA", label: "SPC 측정 입력 (PDA)", url: "/qc/spc/measure-pda" },
          {
            id: "QC-SPC-CHART",
            label: "관리도·8 Rules",
            url: "/qc/spc/chart",
            children: [
              { id: "QC-SPC-CHART-DETAIL", label: "관리도 상세·시계열 분석", url: "/qc/spc/chart/detail" },
              { id: "QC-SPC-CHART-RULE-MAP", label: "Rule×WC×Material 액션 매핑", url: "/qc/spc/chart/rule-map" },
            ],
          },
          { id: "QC-SPC-ALERT", label: "SPC 알림 처리 보드", url: "/qc/spc/alert" },
          { id: "QC-SPC-MEASURE-LIST", label: "측정값 조회·시계열", url: "/qc/spc/measure-list" },
        ],
      },
      {
        id: "QC-DEFECT",
        label: "불량 신고·트랜잭션",
        url: "/qc/defect",
        children: [
          { id: "QC-DEFECT-REPORT-PDA", label: "불량 신고 (PDA)", url: "/qc/defect/report-pda" },
          { id: "QC-DEFECT-INSPECT-QUEUE", label: "QC 검사자 결재 큐", url: "/qc/defect/inspect-queue" },
          { id: "QC-DEFECT-MANAGER-BOARD", label: "QC 관리자 결재 보드", url: "/qc/defect/manager-board" },
          { id: "QC-DEFECT-SCRAP-APPROVAL", label: "공장장 SCRAP 최종 결재", url: "/qc/defect/scrap-approval" },
          { id: "QC-DEFECT-LIST", label: "불량 트랜잭션 조회", url: "/qc/defect/list" },
          { id: "QC-DEFECT-WO-REPLEN", label: "WO 동적 보충 라인", url: "/qc/defect/wo-replenishment" },
        ],
      },
      {
        id: "QC-RECALL",
        label: "위험 확산 평가·회수",
        url: "/qc/recall",
        hidden: true,
        children: [
          { id: "QC-RECALL-BOARD", label: "위험 확산 평가 보드", url: "/qc/recall/board" },
          { id: "QC-RECALL-NOTIFY", label: "거래처 통보 회신 큐", url: "/qc/recall/notify" },
          { id: "QC-RECALL-EXEC-ALERT", label: "임원 에스컬레이션 알림", url: "/qc/recall/exec-alert" },
        ],
      },
      {
        id: "QC-LOSS",
        label: "손실 환산·회계",
        url: "/qc/loss",
        hidden: true,
        children: [
          { id: "QC-LOSS-CALC", label: "손실 환산 산출·조회", url: "/qc/loss/calc" },
          { id: "QC-LOSS-WEIGHT-MASTER", label: "시점 가중치 정책 마스터", url: "/qc/loss/weight-master" },
          { id: "QC-LOSS-ACCT-QUEUE", label: "회계 ERP 전송 큐", url: "/qc/loss/accounting-queue" },
        ],
      },
      {
        id: "QC-CERT",
        label: "품질 성적서",
        url: "/qc/certificate",
        children: [
          { id: "QC-CERT-LIST", label: "성적서 발행 이력", url: "/qc/certificate/list" },
          { id: "QC-CERT-TEMPLATE", label: "거래처별 템플릿 마스터", url: "/qc/certificate/template" },
        ],
      },
      {
        id: "QC-MASTER",
        label: "QC 마스터 관리",
        url: "/qc/master",
        children: [
          { id: "QC-MASTER-ITEM", label: "SPC 측정 항목 마스터", url: "/qc/master/item" },
          { id: "QC-MASTER-LIMIT", label: "관리 한계 버전 관리", url: "/qc/master/limit" },
          { id: "QC-MASTER-DEFECT-CODE", label: "9시점·책임·처리 마스터", url: "/qc/master/defect-code" },
        ],
      },
    ],
  },

  // ===== EQ : 설비관리 =====
  {
    id: "EQ",
    label: "설비관리",
    icon: "engineering",
    children: [
      {
        id: "EQ-MASTER",
        label: "설비 마스터",
        url: "/eq/master",
        children: [
          { id: "EQ-MASTER-TREE", label: "4단계 트리뷰", url: "/eq/master/tree" },
          { id: "EQ-MASTER-LINEUP", label: "WC-Equipment 라인업", url: "/eq/master/lineup" },
          { id: "EQ-MASTER-EDIT", label: "설비 등록·편집·폐기", url: "/eq/master/edit" },
          { id: "EQ-MASTER-HISTORY", label: "변경 이력 감사", url: "/eq/master/history" },
        ],
      },
      {
        id: "EQ-RUNTIME",
        label: "가동 데이터",
        url: "/eq/runtime",
        children: [
          { id: "EQ-RUNTIME-LIST", label: "가동 이력 조회", url: "/eq/runtime/list" },
          { id: "EQ-RUNTIME-PARETO", label: "정지유형 통계", url: "/eq/runtime/pareto" },
          { id: "EQ-RUNTIME-THRESHOLD", label: "30/60분 임계값 마스터", url: "/eq/runtime/threshold" },
          { id: "EQ-RUNTIME-PARAM", label: "가공 파라미터 조회", url: "/eq/runtime/process-param" },
        ],
      },
      {
        id: "EQ-PM-SCHEDULE",
        label: "PM 일정 관리",
        url: "/eq/pm-schedule",
        children: [
          { id: "EQ-PM-LIST", label: "일정 목록·캘린더", url: "/eq/pm-schedule/list" },
          { id: "EQ-PM-EDIT", label: "일정 등록·체크리스트 편집", url: "/eq/pm-schedule/edit" },
        ],
      },
      {
        id: "EQ-MAINT-ORDER",
        label: "정비지시",
        url: "/eq/maint-order",
        children: [
          { id: "EQ-MO-CALENDAR", label: "캘린더·작업 큐", url: "/eq/maint-order/calendar" },
          { id: "EQ-MO-DETAIL", label: "정비지시 상세·결과 입력", url: "/eq/maint-order/detail" },
          { id: "EQ-MO-COORD", label: "라인 정지 협의", url: "/eq/maint-order/coord" },
          { id: "EQ-MO-AUDIT", label: "정비지시 감사 로그", url: "/eq/maint-order/audit" },
        ],
      },
      {
        id: "EQ-COMPONENT",
        label: "부품 교체 이력",
        url: "/eq/component",
        children: [
          { id: "EQ-COMP-HISTORY", label: "교체 이력", url: "/eq/component/history" },
          { id: "EQ-COMP-COST", label: "교체 비용 집계", url: "/eq/component/cost" },
          { id: "EQ-COMP-TOPN", label: "Top N 통계", url: "/eq/component/topn" },
        ],
      },
      {
        id: "EQ-OEE",
        label: "OEE/MTBF 분석",
        url: "/eq/oee",
        children: [
          { id: "EQ-OEE-TREND", label: "OEE 트렌드", url: "/eq/oee/trend" },
          { id: "EQ-OEE-COMPARE", label: "Plant·라인 비교", url: "/eq/oee/compare" },
          { id: "EQ-OEE-DRILL", label: "OEE 드릴다운", url: "/eq/oee/drill" },
          { id: "EQ-OEE-MTBF", label: "MTBF KPI 카드", url: "/eq/oee/mtbf" },
          { id: "EQ-OEE-TARGET", label: "OEE 목표값·경보 마스터", url: "/eq/oee/target" },
        ],
      },
      {
        id: "EQ-PDM",
        label: "PdM 예지정비",
        url: "/eq/pdm",
        children: [
          { id: "EQ-PDM-MAP", label: "SPC↔Equipment 매핑 마스터", url: "/eq/pdm/map" },
          { id: "EQ-PDM-LIST", label: "PdM 발의 큐", url: "/eq/pdm/list" },
          { id: "EQ-PDM-TRACE", label: "source_alert 양방향 추적", url: "/eq/pdm/trace" },
        ],
      },
      {
        id: "EQ-PDA",
        label: "설비팀 PDA 워크벤치",
        url: "/eq/pda",
        children: [
          { id: "EQ-PDA-QUEUE", label: "PDA 작업 큐", url: "/eq/pda/queue" },
          { id: "EQ-PDA-CHECKLIST", label: "PDA 체크리스트 입력", url: "/eq/pda/checklist" },
          { id: "EQ-PDA-REPLACE", label: "PDA 부품 교체 등록", url: "/eq/pda/replace" },
          { id: "EQ-PDA-STATUS", label: "PDA Equipment 상태 토글", url: "/eq/pda/status" },
          { id: "EQ-PDA-BM", label: "긴급 BM 신고", url: "/eq/pda/bm-report" },
          { id: "EQ-PDA-RESTART", label: "재가동 게이트", url: "/eq/pda/restart-gate" },
        ],
      },
    ],
  },

  // ===== PUR : 구매·발주 =====
  {
    id: "PUR",
    label: "구매·발주",
    icon: "shopping_cart",
    children: [
      {
        id: "PUR-PR",
        label: "구매요청·PR (1단계)",
        url: "/pur/pr",
        children: [
          { id: "PUR-PR-LIST", label: "PR 워크리스트", url: "/pur/pr/list" },
          { id: "PUR-PR-NEW", label: "수동 PR 등록", url: "/pur/pr/new" },
          { id: "PUR-PR-DETAIL", label: "PR 상세·승인", url: "/pur/pr/{pr_id}" },
        ],
      },
      {
        id: "PUR-SUPPLIER",
        label: "공급사 추천 (3단계)",
        url: "/pur/supplier",
        children: [
          { id: "PUR-SUPPLIER-RECOMMEND", label: "1·2순위 자동 추천", url: "/pur/supplier/recommend" },
          { id: "PUR-SUPPLIER-OVERRIDE", label: "수동 변경·근거 기록", url: "/pur/supplier/override" },
        ],
      },
      {
        id: "PUR-PO",
        label: "PO 발행·통보 (4단계)",
        url: "/pur/po",
        children: [
          { id: "PUR-PO-BOARD", label: "PO 진척 보드", url: "/pur/po/board" },
          { id: "PUR-PO-NEW", label: "PO 발행 결재", url: "/pur/po/new" },
          { id: "PUR-PO-DETAIL", label: "PO 상세·변경·취소", url: "/pur/po/{po_id}" },
          { id: "PUR-PO-NOTIFY", label: "4채널 통보 모니터", url: "/pur/po/notify" },
        ],
      },
      {
        id: "PUR-ACK",
        label: "공급사 답신 (5단계)",
        url: "/pur/ack",
        children: [
          { id: "PUR-ACK-INBOX", label: "답신 인박스 (4유형)", url: "/pur/ack/inbox" },
          { id: "PUR-ACK-COUNTER", label: "COUNTER_PROPOSAL 협상", url: "/pur/ack/counter" },
        ],
      },
      {
        id: "PUR-ASN",
        label: "ASN·사전출하통지 (6단계)",
        url: "/pur/asn",
        children: [
          { id: "PUR-ASN-LIST", label: "ASN 목록·ETA", url: "/pur/asn/list" },
          { id: "PUR-ASN-NEW", label: "수동 ASN 등록", url: "/pur/asn/new" },
          { id: "PUR-ASN-DELAY", label: "도착 지연 알림", url: "/pur/asn/delay" },
        ],
      },
      {
        id: "PUR-RECEIPT",
        label: "입고·Lot·검수 (7단계)",
        url: "/pur/receipt",
        children: [
          { id: "PUR-RECEIPT-PDA", label: "PDA 입고 스캔·검수", url: "/pur/receipt/pda" },
          { id: "PUR-RECEIPT-HISTORY", label: "입고 이력 조회", url: "/pur/receipt/history" },
        ],
      },
      {
        id: "PUR-MATCH",
        label: "3자 대사 (8단계)",
        url: "/pur/match",
        children: [
          { id: "PUR-MATCH-BOARD", label: "매칭 결과 보드", url: "/pur/match/board" },
          { id: "PUR-MATCH-INVOICE", label: "인보이스 등록·수신", url: "/pur/match/invoice" },
          { id: "PUR-MATCH-EXCEPTION", label: "매칭 예외 워크리스트", url: "/pur/match/exception" },
        ],
      },
      {
        id: "PUR-CLAIM",
        label: "부분입고·클레임",
        url: "/pur/claim",
        children: [
          { id: "PUR-CLAIM-BOARD", label: "클레임 워크리스트", url: "/pur/claim/board" },
          { id: "PUR-CLAIM-DETAIL", label: "클레임 처리·보충 PR", url: "/pur/claim/{claim_id}" },
          { id: "PUR-CLAIM-AGING", label: "미입고·과입고 알림", url: "/pur/claim/aging" },
        ],
      },
    ],
  },

  // ===== SHP : 출하 =====
  {
    id: "SHP",
    label: "출하",
    icon: "local_shipping",
    children: [
      {
        id: "SHP-SCHEDULE",
        label: "출하 일정·차량 배차",
        url: "/shp/schedule",
        children: [
          { id: "SHP-SCHEDULE-CALENDAR", label: "출하 일정 캘린더·간트", url: "/shp/schedule/calendar" },
          { id: "SHP-SCHEDULE-NEW", label: "shipment 신규 등록", url: "/shp/schedule/new" },
          { id: "SHP-SCHEDULE-VEHICLE", label: "차량 배차·분할 적재", url: "/shp/schedule/vehicle" },
          { id: "SHP-SCHEDULE-CHANGE", label: "일정 변경·취소 (L3)", url: "/shp/schedule/change" },
        ],
      },
      {
        id: "SHP-PACKING",
        label: "패킹 묶음 작업 (포장 PDA)",
        url: "/shp/packing",
        children: [
          { id: "SHP-PACKING-BOARD", label: "포장 그룹 보드 (PDA)", url: "/shp/packing/board" },
          { id: "SHP-PACKING-SCAN", label: "부재 1:1 검증 스캔", url: "/shp/packing/scan" },
          { id: "SHP-PACKING-HISTORY", label: "그룹 진행률·이력", url: "/shp/packing/history" },
        ],
      },
      {
        id: "SHP-STORED",
        label: "보관·야적 위치 관리",
        url: "/shp/stored",
        children: [
          { id: "SHP-STORED-BOARD", label: "보관 패킹 보드 (준비/보류 전이)", url: "/shp/stored/board" },
          { id: "SHP-STORED-LOCATION", label: "야적 위치 등록·변경", url: "/shp/stored/location" },
          { id: "SHP-STORED-AGING", label: "AGING 모니터링", url: "/shp/stored/aging" },
        ],
      },
      {
        id: "SHP-DOC",
        label: "패킹 라벨·문서 (PDF·라벨)",
        url: "/shp/doc",
        children: [
          { id: "SHP-DOC-LABEL", label: "라벨 발행 모니터", url: "/shp/doc/label" },
          { id: "SHP-DOC-PACKLIST", label: "패킹리스트 PDF·3부 출력", url: "/shp/doc/packlist" },
          { id: "SHP-DOC-ARCHIVE", label: "전자 사본 이력", url: "/shp/doc/archive" },
        ],
      },
      {
        id: "SHP-LOADING",
        label: "차량 적재 LOADED (운전자 PDA)",
        url: "/shp/loading",
        children: [
          { id: "SHP-LOADING-DASHBOARD", label: "운전자 PDA 메인 (3액션)", url: "/shp/loading/dashboard" },
          { id: "SHP-LOADING-SCAN", label: "적재 스캔·합계 중량", url: "/shp/loading/scan" },
          { id: "SHP-LOADING-DEPART", label: "출발 등록·미적재 검증", url: "/shp/loading/depart" },
        ],
      },
      {
        id: "SHP-GATE",
        label: "게이트 RFID·SHIPPED",
        url: "/shp/gate",
        children: [
          { id: "SHP-GATE-MONITOR", label: "RFID 모니터링·LED", url: "/shp/gate/monitor" },
          { id: "SHP-GATE-FALLBACK", label: "L3 수동 폴백", url: "/shp/gate/fallback" },
        ],
      },
      {
        id: "SHP-RECEIVE",
        label: "현장 검수·입고 확인 (모바일 앱)",
        url: "/shp/receive",
        children: [
          { id: "SHP-RECEIVE-MAIN", label: "모바일 메인 — shipment 상세", url: "/shp/receive/main" },
          { id: "SHP-RECEIVE-SCAN", label: "패킹·부재 1:1 스캔", url: "/shp/receive/scan" },
          { id: "SHP-RECEIVE-MISMATCH", label: "불일치 신고·해소 보드", url: "/shp/receive/mismatch" },
          { id: "SHP-RECEIVE-SIGN", label: "전자 서명·수령 확정", url: "/shp/receive/sign" },
        ],
      },
      {
        id: "SHP-NOTIFY",
        label: "출하 알림 (4채널)",
        url: "/shp/notify",
        children: [
          { id: "SHP-NOTIFY-HISTORY", label: "발송 이력 (통합)", url: "/shp/notify/history" },
          { id: "SHP-NOTIFY-CHANNEL", label: "거래처 알림 채널 마스터", url: "/shp/notify/channel" },
          { id: "SHP-NOTIFY-EMAIL", label: "EMAIL 채널 분기", url: "/shp/notify/email" },
          { id: "SHP-NOTIFY-SMS", label: "SMS 채널 분기", url: "/shp/notify/sms" },
          { id: "SHP-NOTIFY-KAKAO", label: "KAKAOTALK 채널 분기", url: "/shp/notify/kakao" },
          { id: "SHP-NOTIFY-INAPP", label: "INAPP (앱 푸시·시스템 알림) 채널 분기", url: "/shp/notify/inapp" },
        ],
      },
    ],
  },

  // ===== USR : 사용자·권한 =====
  {
    id: "USR",
    label: "사용자·권한",
    icon: "groups",
    children: [
      {
        id: "USR-USERS",
        label: "사용자 마스터",
        url: "/usr/users",
        children: [
          { id: "USR-USERS-LIST", label: "사용자 목록", url: "/usr/users" },
          { id: "USR-USERS-NEW", label: "신규 등록", url: "/usr/users/new" },
          { id: "USR-USERS-DETAIL", label: "상세·인증수단·비활성화", url: "/usr/users/{user_id}" },
          { id: "USR-USERS-IMPORT", label: "CSV 일괄 import", url: "/usr/users/import" },
          { id: "USR-USERS-HISTORY", label: "변경 이력", url: "/usr/users/{user_id}/history" },
        ],
      },
      {
        id: "USR-LEVELS",
        label: "권한 레벨·부서 코드",
        url: "/usr/levels",
        children: [
          { id: "USR-LEVELS-LEVEL", label: "권한 레벨 마스터", url: "/usr/levels/permission-level" },
          { id: "USR-LEVELS-DEPT", label: "부서 코드 마스터", url: "/usr/levels/department-code" },
        ],
      },
      {
        id: "USR-AUTH",
        label: "인증·세션·잠금",
        url: "/usr/auth",
        children: [
          { id: "USR-AUTH-PWD", label: "자기 비밀번호 변경", url: "/usr/auth/password" },
          { id: "USR-AUTH-SESSION", label: "내 세션·로그아웃", url: "/usr/auth/session" },
          { id: "USR-AUTH-UNLOCK", label: "PIN 잠금 수동 해제", url: "/usr/auth/unlock" },
          { id: "USR-AUTH-DEVICE", label: "단말 분실 신고", url: "/usr/auth/device-lost" },
        ],
      },
      {
        id: "USR-GRANT",
        label: "권한 부여·결재·회수",
        url: "/usr/grants",
        children: [
          { id: "USR-GRANT-REQ", label: "권한 부여 신청", url: "/usr/grants/request" },
          { id: "USR-GRANT-APPROVAL", label: "권한 결재 인박스", url: "/usr/grants/approval" },
          { id: "USR-GRANT-REVOKE", label: "권한 회수", url: "/usr/grants/revoke" },
          { id: "USR-GRANT-HISTORY", label: "권한 신청·결재 이력", url: "/usr/grants/history" },
        ],
      },
      {
        id: "USR-DELEG",
        label: "임시 위임",
        url: "/usr/delegations",
        children: [
          { id: "USR-DELEG-NEW", label: "위임 등록", url: "/usr/delegations/new" },
          { id: "USR-DELEG-APPROVAL", label: "위임 결재", url: "/usr/delegations/approval" },
          { id: "USR-DELEG-LIST", label: "활성 위임·자동 회수", url: "/usr/delegations" },
          { id: "USR-DELEG-HISTORY", label: "위임 이력", url: "/usr/delegations/history" },
        ],
      },
      {
        id: "USR-QUAL",
        label: "공정 자격",
        url: "/usr/qualifications",
        children: [
          { id: "USR-QUAL-LIST", label: "공정 자격 마스터", url: "/usr/qualifications" },
          { id: "USR-QUAL-NEW", label: "자격 부여", url: "/usr/qualifications/new" },
          { id: "USR-QUAL-EXPIRE", label: "만료 임박·만료 보드", url: "/usr/qualifications/expire" },
        ],
      },
      {
        id: "USR-EXT",
        label: "외부 토큰",
        url: "/usr/external-tokens",
        children: [
          { id: "USR-EXT-ISSUE", label: "토큰 발급", url: "/usr/external-tokens/new" },
          { id: "USR-EXT-LIST", label: "활성 토큰 목록·회수", url: "/usr/external-tokens" },
          { id: "USR-EXT-HISTORY", label: "발급·회수 이력", url: "/usr/external-tokens/history" },
        ],
      },
      {
        id: "USR-MATRIX",
        label: "권한 매트릭스",
        url: "/usr/matrix",
        children: [
          { id: "USR-MATRIX-VIEW", label: "매트릭스 조회", url: "/usr/matrix" },
          { id: "USR-MATRIX-EDIT", label: "매트릭스 변경 초안", url: "/usr/matrix/edit" },
          { id: "USR-MATRIX-IMPACT", label: "변경 영향 평가", url: "/usr/matrix/impact" },
          { id: "USR-MATRIX-APPROVAL", label: "매트릭스 변경 결재 (L4)", url: "/usr/matrix/approval" },
        ],
      },
      {
        id: "USR-AUDIT",
        label: "권한 감사·정합성",
        url: "/usr/audit",
        children: [
          { id: "USR-AUDIT-LOG", label: "감사 로그 검색", url: "/usr/audit/logs" },
          { id: "USR-AUDIT-LEAK", label: "권한 누수 정합성 보드", url: "/usr/audit/leak" },
          { id: "USR-AUDIT-REGRESS", label: "회귀 테스트 결과", url: "/usr/audit/regression" },
        ],
      },
    ],
  },

  // ===== OPS : 운영현황·대시보드 =====
  {
    id: "OPS",
    label: "운영현황·대시보드",
    icon: "dashboard",
    children: [
      { id: "OPS-HOME", label: "개인 홈·즐겨찾기", url: "/ops/home" },
      {
        id: "OPS-LINE",
        label: "라인 상황판",
        url: "/ops/line",
        children: [
          { id: "OPS-LINE-BOARD", label: "WC 단위 라인 상황판", url: "/ops/line/board?wc_id={wc_id}" },
          { id: "OPS-LINE-KIOSK", label: "라인 상황판 키오스크 모드", url: "/ops/line/kiosk?device_id={device_id}&wc_id={wc_id}" },
        ],
      },
      {
        id: "OPS-PLANT",
        label: "Plant 종합 대시보드",
        url: "/ops/plant",
        children: [
          { id: "OPS-PLANT-4Q", label: "Plant 종합 4분면 메인", url: "/ops/plant/4q?plant_id={plant_id}" },
          { id: "OPS-PLANT-PROCESS-LINE", label: "공정라인 카드", url: "/ops/plant/process-line?plant_id={plant_id}" },
          { id: "OPS-PLANT-PROCESS-STEP", label: "공정 단계 진척", url: "/ops/plant/process-step?process_line_id={pl_id}" },
          { id: "OPS-PLANT-INTEGRATED", label: "제작번호·현장명 통합 진척", url: "/ops/plant/integrated-progress?keyword={제작번호 또는 현장명}" },
          { id: "OPS-PLANT-DAILY-REPORT", label: "일일 보고서 발송 모니터", url: "/ops/plant/daily-report" },
        ],
      },
      {
        id: "OPS-MULTI-PLANT",
        label: "다공장 종합",
        url: "/ops/multi-plant",
        children: [
          { id: "OPS-MULTI-COMPARE", label: "Plant 비교 막대그래프", url: "/ops/multi-plant/compare?sort={정렬}&include_outsource={true|false}" },
          { id: "OPS-MULTI-DIGEST", label: "임원 다이제스트 발송 모니터", url: "/ops/multi-plant/digest" },
        ],
      },
      {
        id: "OPS-SO-PROGRESS",
        label: "수주별 진척",
        url: "/ops/so-progress",
        children: [
          { id: "OPS-SO-TREE", label: "거래처·현장·동 트리", url: "/ops/so-progress/tree?customer_id={cid}" },
          { id: "OPS-SO-EXTERNAL", label: "거래처 공유 뷰 (외부 토큰)", url: "/ops/so-progress/external?token={공유 토큰}" },
        ],
      },
      {
        id: "OPS-WO-PROGRESS",
        label: "WO·부재 진척 보드",
        url: "/ops/wo-progress",
        children: [
          { id: "OPS-WO-BOARD", label: "일일 계획·진척 비교 보드", url: "/ops/wo-progress/board?plant_id={plant_id}" },
          { id: "OPS-WO-KANBAN", label: "부재 단위 칸반", url: "/ops/wo-progress/kanban?wo_id={wo_id}" },
        ],
      },
      {
        id: "OPS-COMBINED",
        label: "생산·불량·가동 통합",
        url: "/ops/combined",
        children: [
          { id: "OPS-COMBINED-DUAL-AXIS", label: "OEE × 불량률 동축 표시", url: "/ops/combined/dual-axis?plant_id={plant_id}" },
          { id: "OPS-COMBINED-DRILL", label: "Equipment·WC 단위 드릴다운", url: "/ops/combined/drill?equipment_id={eq_id}" },
        ],
      },
      {
        id: "OPS-INVENTORY",
        label: "재고 종합 시각화",
        url: "/ops/inventory",
        children: [
          { id: "OPS-INV-MATRIX", label: "Plant × Material 매트릭스", url: "/ops/inventory/matrix" },
          { id: "OPS-INV-YARD", label: "야적장 점유율 통합 표시", url: "/ops/inventory/yard" },
          { id: "OPS-INV-SCRAP-POOL", label: "자투리 풀 가시화", url: "/ops/inventory/scrap-pool" },
        ],
      },
      {
        id: "OPS-NOTIFICATION",
        label: "알림 센터",
        url: "/ops/notification",
        children: [
          { id: "OPS-NOTI-INBOX", label: "통합 인박스", url: "/ops/notification/inbox?filter={필터}" },
          { id: "OPS-NOTI-DISPATCH-MONITOR", label: "발송 실패·재시도 모니터", url: "/ops/notification/dispatch-monitor" },
          { id: "OPS-NOTI-CUSTOMER-REPLY", label: "거래처 회신 인박스", url: "/ops/notification/customer-reply" },
        ],
      },
    ],
  },

  // ===== SYS : 시스템관리 =====
  {
    id: "SYS",
    label: "시스템관리",
    icon: "settings",
    children: [
      {
        id: "SYS-NOTICE",
        label: "공지",
        url: "/sys/notice",
        children: [
          { id: "SYS-NOTICE-LIST", label: "공지 목록·등록·수정", url: "/sys/notice/list" },
          { id: "SYS-NOTICE-INBOX", label: "공지 인박스 (모바일·전 사용자)", url: "/sys/notice/inbox" },
        ],
      },
      {
        id: "SYS-MENU",
        label: "메뉴 관리",
        url: "/sys/menu",
        children: [
          { id: "SYS-MENU-TREE", label: "메뉴 트리 편집", url: "/sys/menu/tree" },
          { id: "SYS-MENU-MATRIX", label: "(Level × 부서) 매트릭스", url: "/sys/menu/matrix" },
          { id: "SYS-MENU-FAVORITE", label: "즐겨찾기·최근 사용", url: "/sys/menu/favorite" },
        ],
      },
      {
        id: "SYS-CODE",
        label: "공통 코드",
        url: "/sys/code",
        children: [
          { id: "SYS-CODE-LIST", label: "코드 그룹·코드값", url: "/sys/code/list" },
          { id: "SYS-CODE-APPROVAL", label: "신규 코드값 결재 큐", url: "/sys/code/approval" },
          { id: "SYS-CODE-HISTORY", label: "코드 변경 이력 시점 뷰", url: "/sys/code/history" },
        ],
      },
      {
        id: "SYS-NOTIFY",
        label: "시스템 알림",
        url: "/sys/notify",
        children: [
          { id: "SYS-NOTIFY-CATALOG", label: "알림 카탈로그·채널", url: "/sys/notify/catalog" },
          { id: "SYS-NOTIFY-SUBSCRIPTION", label: "구독 설정 (강제·사용자별)", url: "/sys/notify/subscription" },
          { id: "SYS-NOTIFY-HISTORY", label: "발송 이력·재발송", url: "/sys/notify/history" },
        ],
      },
      {
        id: "SYS-AUDIT",
        label: "감사",
        url: "/sys/audit",
        children: [
          { id: "SYS-AUDIT-LOG", label: "감사 로그 검색", url: "/sys/audit/log" },
          { id: "SYS-AUDIT-SNAPSHOT", label: "마스터 변경 이력 시점 스냅샷", url: "/sys/audit/snapshot" },
          { id: "SYS-AUDIT-EXPORT", label: "로그 다운로드", url: "/sys/audit/export" },
        ],
      },
      {
        id: "SYS-BACKUP",
        label: "백업·복구",
        url: "/sys/backup",
        children: [
          { id: "SYS-BACKUP-POLICY", label: "백업 정책·즉시 트리거", url: "/sys/backup/policy" },
          { id: "SYS-BACKUP-RESTORE", label: "복구·DR 시뮬레이션", url: "/sys/backup/restore" },
          { id: "SYS-BACKUP-MIGRATION", label: "마이그레이션 마법사", url: "/sys/backup/migration" },
        ],
      },
      {
        id: "SYS-EXTERN",
        label: "외부 연동",
        url: "/sys/extern",
        children: [
          { id: "SYS-EXTERN-VAULT", label: "연동 키·Vault", url: "/sys/extern/vault" },
          { id: "SYS-EXTERN-TOKEN", label: "API Token 발급·회수", url: "/sys/extern/token" },
          { id: "SYS-EXTERN-HEALTH", label: "외부 연동 헬스", url: "/sys/extern/health" },
        ],
      },
      {
        id: "SYS-PLANT",
        label: "Plant 정책",
        url: "/sys/plant",
        children: [
          { id: "SYS-PLANT-POLICY", label: "Plant 정책 편집", url: "/sys/plant/policy" },
        ],
      },
      {
        id: "SYS-HEALTH",
        label: "시스템 헬스",
        url: "/sys/health",
        children: [
          { id: "SYS-HEALTH-DASHBOARD", label: "헬스 대시보드 6종", url: "/sys/health/dashboard" },
          { id: "SYS-HEALTH-DBCAT", label: "4 DB 카테고리", url: "/sys/health/dbcat" },
        ],
      },
      {
        id: "SYS-DEVICE",
        label: "단말 라이프사이클",
        url: "/sys/device",
        children: [
          { id: "SYS-DEVICE-LIST", label: "단말 마스터 목록", url: "/sys/device/list" },
          { id: "SYS-DEVICE-LIFECYCLE", label: "분실·재발급·폐기", url: "/sys/device/lifecycle" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 통계 (2026-05-05 IA 진본 기반)
// 1Depth = 12 도메인 / 2Depth = 95 / 3Depth = 285 / 4Depth = 2 (QC-SPC-CHART 산하)
// 총 노드 = 394, URL 보유 잎노드 = 289 (잎 분포: 2Depth 3 + 3Depth 284 + 4Depth 2)
// IA 12 도메인 (BD/SP/WO/MFG/LOC/QC/EQ/PUR/SHP/USR/OPS/SYS) 모든 IA URL 노드 1:1 등재.
// 도메인 루트 12개는 expand-only(url 생략). QC-SPC-CHART 만 4Depth 예외 — IA-QC §3.2 사유 명시.
// 2Depth 잎 = WO-DASHBOARD / MFG-TODAY / OPS-HOME (IA에서 직접 화면을 가진 단일 노드).
// 일부 URL 은 동일 경로 중복 등장 (예: /usr/users 가 USR-USERS 와 USR-USERS-LIST 양쪽) — IA 진본 표기 그대로 보존.
// 파라메트릭 경로(/sp/so/{so_id}, /usr/users/{user_id}/history) 도 IA 표기 그대로. 후속 단계에서 [soId] 등으로 정규화 가능.
// ─────────────────────────────────────────────────────────────────────────────


// Note: stats comment is appended at the end of file after all 12 domains are added.
