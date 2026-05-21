"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK_USERS = [
  { userId: "EMP1042", name: "김계직", plant: "P3000", level: "L2", departments: "PRD,SHP", authMethods: "PIN/RFID", status: "ACTIVE" as const, empType: "정규", lastLogin: "2026-05-04 14:22" },
  { userId: "EMP1058", name: "박작업", plant: "P3000", level: "L1", departments: "PRD", authMethods: "PIN/지문", status: "ACTIVE" as const, empType: "정규", lastLogin: "2026-05-05 07:55" },
  { userId: "EMP2011", name: "이품질", plant: "P2000", level: "L2", departments: "QC", authMethods: "PIN", status: "LOCKED" as const, empType: "도급", lastLogin: "—" },
  { userId: "EMP9001", name: "최관리", plant: "—", level: "L4", departments: "SYS", authMethods: "PIN/RFID", status: "ACTIVE" as const, empType: "정규", lastLogin: "2026-05-05 09:01" },
  { userId: "EMP3030", name: "정출하", plant: "P3000", level: "L2", departments: "SHP", authMethods: "PIN", status: "INACTIVE" as const, empType: "정규", lastLogin: "—" },
];

const STATUS_MAP = { ACTIVE: "running", LOCKED: "warning", INACTIVE: "idle" } as const;
const SL: Record<string, string> = { ACTIVE:"활성", LOCKED:"잠금", INACTIVE:"비활성" };
const DEPT: Record<string, string> = { PRD:"생산", QC:"품질", WHS:"창고", MNT:"정비", SHP:"출하", SLS:"영업", SYS:"시스템" };

export default function USRUsersPage() {
  return (
    <div>
      <PageHeader title="사용자 마스터" nodeRef="SCR-USR-001" status="PROTOTYPE" description="사용자 목록 조회·필터·신규 등록 진입점" />

      {/* 필터 영역 */}
      <div className="bg-surface-container-low border-l-4 border-primary-accent p-4 mb-4">
        <FieldHeader title="A. 필터" moduleRef="FNC-USR-001/005/027" />
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">사번/이름</label>
            <input className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface w-44 outline-none focus:border-primary-accent" placeholder="검색어 입력" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">권한 레벨</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option>L1</option><option>L2</option><option>L3</option><option>L4</option><option value="EXTERNAL">외부</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">부서</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option>전체</option><option value="PRD">생산</option><option value="QC">품질</option><option value="WHS">창고</option><option value="MNT">정비</option><option value="SHP">출하</option><option value="SLS">영업</option><option value="SYS">시스템</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-label uppercase tracking-widest opacity-50">상태</label>
            <select className="bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface outline-none focus:border-primary-accent">
              <option value="ACTIVE">활성</option><option value="LOCKED">잠금</option><option value="INACTIVE">비활성</option><option>전체</option>
            </select>
          </div>
          <button className="px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">검색</button>
          <button className="px-4 py-1.5 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">초기화</button>
          <a href="/usr/users/new" className="ml-auto px-4 py-1.5 bg-primary-accent text-white text-xs font-label uppercase tracking-widest font-bold">+ 신규 등록</a>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">B. 사용자 목록 <span className="opacity-30 font-light ml-2">| 137건</span></h3>
          <span className="text-xs font-label opacity-40">FNC-USR-001</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["사용자 ID", "이름", "권한 레벨", "부서", "인증수단", "상태", "고용형태", "최근 로그인"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {MOCK_USERS.map((u, i) => (
                <tr key={i} className={`border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors cursor-pointer ${u.status === "LOCKED" ? "bg-warning/5" : ""}`}>
                  <td className="px-4 py-2 text-primary-accent font-bold tabular-nums">{u.userId}</td>
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2 tabular-nums">{u.level}</td>
                  <td className="px-4 py-2">{u.departments.split(',').map(d=>DEPT[d.trim()]||d).join(', ')}</td>
                  <td className="px-4 py-2 text-xs opacity-70">{u.authMethods}</td>
                  <td className="px-4 py-2">
                    <StatusBadge type={STATUS_MAP[u.status]} label={SL[u.status] ?? u.status} />
                    {u.status === "LOCKED" && <span className="ml-1 text-warning">🔒</span>}
                  </td>
                  <td className="px-4 py-2 text-xs opacity-70">{u.empType}</td>
                  <td className="px-4 py-2 text-xs tabular-nums opacity-60">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 flex items-center gap-2 text-xs font-label opacity-40 border-t border-outline-variant">
          <span>137건 / 페이지 1 of 7</span>
          {["<","1","2","3","...","7",">"].map((p, i) => (
            <button key={i} className="px-2 py-0.5 hover:text-primary-accent">{p}</button>
          ))}
        </div>
      </div>
      <p className="text-xs opacity-40 font-label mt-2">ⓘ 행 클릭 → 상세. 잠금 상태 🔒 → 잠금 해제</p>
    </div>
  );
}
