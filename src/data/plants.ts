// 실제 공장 마스터 데이터 (2026-05-06 기준)

export interface Plant {
  code: string;
  name: string;
  shortName: string;
  product: string; // 생산품
  address: string;
}

export interface ProcessStep {
  seq: number;
  name: string;
  operations: string[];
}

export interface ProcessLine {
  plantCode: string;
  lineCode: string;
  lineName: string;
  steps: ProcessStep[];
}

// ── Plant 마스터 ──────────────────────────────────────────
export const PLANTS: Plant[] = [
  {
    code: "P1100",
    name: "제1-1 이천공장",
    shortName: "이천1-1",
    product: "보데크",
    address: "경기도 이천시 모가면 전상미로 1531",
  },
  {
    code: "P1200",
    name: "제1-2 이천공장",
    shortName: "이천1-2",
    product: "알루미늄폼",
    address: "경기도 이천시 모가면 전상미로 1531",
  },
  {
    code: "P2000",
    name: "제2 이천공장",
    shortName: "이천2",
    product: "알루미늄폼",
    address: "경기도 이천시 모가면 대월로 106",
  },
  {
    code: "P3000",
    name: "제3 이천공장",
    shortName: "이천3",
    product: "데크",
    address: "경기도 이천시 설성면 원설로 220",
  },
  {
    code: "P4000",
    name: "제4 안성공장",
    shortName: "안성4",
    product: "가설재",
    address: "경기도 안성시 일죽면 일생로 138",
  },
];

// ── 공정라인 마스터 ──────────────────────────────────────────
export const PROCESS_LINES: ProcessLine[] = [
  // ── 제3공장 (P3000) ────────────────────────
  {
    plantCode: "P3000",
    lineCode: "PL-P3000-01",
    lineName: "신선공정",
    steps: [
      { seq: 1, name: "원자재(선재)공급", operations: ["입고 검수", "LOT 발행"] },
      { seq: 2, name: "원자재(선재)투입", operations: ["코일 세팅", "ISSUE 스캔"] },
      { seq: 3, name: "가공(인발)",       operations: ["신선 인발", "직경 검사"] },
      { seq: 4, name: "포장 및 적재",     operations: ["결속", "라벨 부착", "야적 등록"] },
    ],
  },
  {
    plantCode: "P3000",
    lineCode: "PL-P3000-02",
    lineName: "TG공정",
    steps: [
      { seq: 1, name: "철선공급",     operations: ["입고 검수"] },
      { seq: 2, name: "철선투입",     operations: ["코일 ISSUE"] },
      { seq: 3, name: "철선용접",     operations: ["저항 용접", "인장 검사"] },
      { seq: 4, name: "절단 및 적재", operations: ["길이 절단", "라벨 부착", "야적"] },
    ],
  },
  {
    plantCode: "P3000",
    lineCode: "PL-P3000-03",
    lineName: "포밍공정",
    steps: [
      { seq: 1, name: "원자재(G1강판)투입", operations: ["코일 ISSUE", "두께 검사"] },
      { seq: 2, name: "강판 성형",          operations: ["롤 포밍"] },
      { seq: 3, name: "강판 절단",          operations: ["정척 절단", "치수 검사"] },
      { seq: 4, name: "강판 적재",          operations: ["번들링", "야적 등록"] },
    ],
  },
  {
    plantCode: "P3000",
    lineCode: "PL-P3000-04",
    lineName: "데크플레이트공정",
    steps: [
      { seq: 1, name: "TG투입",            operations: ["TG ISSUE"] },
      { seq: 2, name: "데크플레이트 가합", operations: ["가합 세팅", "간격 검사"] },
      { seq: 3, name: "데크플레이트 본합", operations: ["점용접", "인장 검사"] },
      { seq: 4, name: "적재 및 포장",      operations: ["번들링", "라벨 부착", "야적"] },
    ],
  },

  // ── 제2공장 (P2000) ────────────────────────
  {
    plantCode: "P2000",
    lineCode: "PL-P2000-01",
    lineName: "절단공정",
    steps: [
      { seq: 1, name: "1차 절단(원자재)", operations: ["원판 ISSUE", "1차 절단"] },
      { seq: 2, name: "2차 절단(총 길이)", operations: ["정척 절단", "치수 검사"] },
    ],
  },
  {
    plantCode: "P2000",
    lineCode: "PL-P2000-02",
    lineName: "조립공정",
    steps: [
      { seq: 1, name: "단열재 구멍 가공", operations: ["천공"] },
      { seq: 2, name: "강판 볼팅",        operations: ["볼트 체결", "토크 검사"] },
      { seq: 3, name: "스페이서 결합",    operations: ["스페이서 삽입"] },
    ],
  },
  {
    plantCode: "P2000",
    lineCode: "PL-P2000-03",
    lineName: "용접공정",
    steps: [
      { seq: 1, name: "본격 용접",   operations: ["MIG 용접", "비드 검사"] },
      { seq: 2, name: "체결부 결합", operations: ["리벳", "인장 검사"] },
    ],
  },
  {
    plantCode: "P2000",
    lineCode: "PL-P2000-04",
    lineName: "포장공정",
    steps: [
      { seq: 1, name: "출고단위 포장", operations: ["번들링", "라벨 부착", "출하 검사"] },
    ],
  },

  // ── 제1-1공장 (P1100) — 보데크 ─────────────
  {
    plantCode: "P1100",
    lineCode: "PL-P1100-01",
    lineName: "포밍공정",
    steps: [
      { seq: 1, name: "원자재(강판)투입", operations: ["코일 ISSUE"] },
      { seq: 2, name: "원자재(강판)성형", operations: ["롤 포밍"] },
      { seq: 3, name: "원자재(강판)절단", operations: ["절단", "치수 검사"] },
      { seq: 4, name: "포장 및 적재",     operations: ["번들링", "야적"] },
    ],
  },
  {
    plantCode: "P1100",
    lineCode: "PL-P1100-02",
    lineName: "용접공정",
    steps: [
      { seq: 1, name: "강판고정",   operations: ["지그 세팅"] },
      { seq: 2, name: "강판 용접",  operations: ["CO2 용접", "비드 검사"] },
      { seq: 3, name: "스터럽 용접", operations: ["저항 용접"] },
      { seq: 4, name: "포장 및 적재", operations: ["라벨 부착", "야적"] },
    ],
  },

  // ── 제1-2공장 (P1200) — 알루미늄폼 ────────
  {
    plantCode: "P1200",
    lineCode: "PL-P1200-01",
    lineName: "포밍공정",
    steps: [
      { seq: 1, name: "원자재(강판)투입", operations: ["코일 ISSUE"] },
      { seq: 2, name: "원자재(강판)성형", operations: ["롤 포밍"] },
      { seq: 3, name: "원자재(강판)절단", operations: ["절단"] },
      { seq: 4, name: "포장 및 적재",     operations: ["번들링"] },
    ],
  },
  {
    plantCode: "P1200",
    lineCode: "PL-P1200-02",
    lineName: "용접공정",
    steps: [
      { seq: 1, name: "강판고정",    operations: ["지그 세팅"] },
      { seq: 2, name: "강판 용접",   operations: ["CO2 용접"] },
      { seq: 3, name: "스터럽 용접", operations: ["저항 용접"] },
      { seq: 4, name: "포장 및 적재", operations: ["라벨 부착", "야적"] },
    ],
  },
];

// ── 헬퍼 ──────────────────────────────────────────────────
export function getPlantByCode(code: string): Plant | undefined {
  return PLANTS.find((p) => p.code === code);
}

export function getProcessLinesByPlant(plantCode: string): ProcessLine[] {
  return PROCESS_LINES.filter((l) => l.plantCode === plantCode);
}

// 공장 드롭다운용 배열
export const PLANT_OPTIONS = PLANTS.map((p) => ({
  value: p.code,
  label: `${p.code} ${p.name} (${p.product})`,
  shortLabel: `${p.shortName} — ${p.product}`,
}));
