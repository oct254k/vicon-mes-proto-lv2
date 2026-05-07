"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const MENU_TREE = [
  { domain: "SYS", label: "시스템 관리", active: true, children: ["공지사항", "메뉴 관리", "코드 마스터"] },
  { domain: "WO", label: "작업 지시", active: true, children: ["작업 목록", "작업 등록", "BOM 확인"] },
  { domain: "QC", label: "품질 관리", active: true, children: ["검사 이력", "불량 등록", "SPC"] },
  { domain: "INV", label: "재고 관리", active: true, children: ["재고 현황", "입출고", "실사"] },
  { domain: "MAINT", label: "설비 유지보수", active: false, children: ["설비 목록", "PM 계획", "작업 이력"] },
  { domain: "PROD", label: "생산 실적", active: true, children: ["실적 조회", "실적 입력", "KPI"] },
  { domain: "MAT", label: "원자재 관리", active: true, children: ["입고 관리", "불출 관리", "공급사"] },
  { domain: "SHIP", label: "출하 관리", active: true, children: ["출하 계획", "출하 실적", "거래처"] },
  { domain: "RPT", label: "보고서", active: true, children: ["생산 보고서", "품질 보고서", "통계"] },
  { domain: "USR", label: "사용자 관리", active: true, children: ["사용자 목록", "역할 관리", "접근 제어"] },
  { domain: "PLN", label: "계획 관리", active: false, children: ["생산 계획", "자재 계획", "설비 계획"] },
  { domain: "CONF", label: "환경 설정", active: true, children: ["일반 설정", "알림 설정", "연동 설정"] },
];

type Tab = "PC" | "MOBILE";

export default function SYSMenusPage() {
  const [tab, setTab] = useState<Tab>("PC");
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(MENU_TREE.map(m => [m.domain, m.active]))
  );
  const [saved, setSaved] = useState(false);

  const toggle = (domain: string) => {
    setStates(prev => ({ ...prev, [domain]: !prev[domain] }));
    setSaved(false);
  };

  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="메뉴" accent="관리" nodeRef="SCR-SYS-020" description="PC/MOBILE 단말별 도메인 메뉴 트리 활성화 관리" />

      <div className="flex gap-0 mb-6">
        {(["PC", "MOBILE"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-2 text-xs font-label uppercase tracking-widest transition-colors ${tab === t ? "bg-[#00912F] text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "MOBILE" && (
        <div className="mb-4 px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20">
          <span className="text-xs text-[#f59e0b] font-label">MOBILE: 공지 INBOX 및 즐겨찾기 메뉴만 노출됩니다.</span>
        </div>
      )}

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F] flex justify-between items-center">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">메뉴 트리 — {tab}</h3>
          <button onClick={() => setSaved(true)}
            className={`px-4 py-1.5 text-xs font-label uppercase tracking-widest transition-colors ${saved ? "bg-[#00912F]/30 text-[#00912F]" : "bg-[#00912F] text-white hover:bg-[#00912F]/80"}`}>
            {saved ? "저장됨" : "저장"}
          </button>
        </div>

        <div className="divide-y divide-outline-variant/5">
          {MENU_TREE.map(menu => (
            <div key={menu.domain}>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-highest/20">
                <span className="w-14 text-xs font-label uppercase tracking-widest text-[#00912F] opacity-70">{menu.domain}</span>
                <span className="flex-1 font-headline text-sm">{menu.label}</span>
                <button onClick={() => toggle(menu.domain)}
                  className={`relative w-10 h-5 transition-colors ${states[menu.domain] ? "bg-[#00912F]" : "bg-surface-container-high"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${states[menu.domain] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className={`w-12 text-right text-xs font-label uppercase ${states[menu.domain] ? "text-[#00912F]" : "text-on-surface-variant opacity-40"}`}>
                  {states[menu.domain] ? "활성" : "비활성"}
                </span>
              </div>
              {states[menu.domain] && (
                <div className="pl-20 pb-2 pt-1 flex flex-wrap gap-2 bg-surface-container-lowest/50">
                  {menu.children.map(child => (
                    <span key={child} className="px-2 py-0.5 text-xs bg-surface-container text-on-surface-variant border border-outline-variant/10">{child}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
