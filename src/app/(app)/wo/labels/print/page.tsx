"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

type LabelType = "MEMBER" | "PACKING" | "SLIPPER";

const LABEL_TYPES: { value: LabelType; label: string; desc: string }[] = [
  { value: "MEMBER",  label: "부재 라벨",   desc: "개별 부재 단위 — 바코드 + QR" },
  { value: "PACKING", label: "패킹 라벨",   desc: "패킹 그룹 단위 — 묶음 식별" },
  { value: "SLIPPER", label: "슬리퍼 라벨", desc: "데크 슬리퍼 13종 — KS 게이트" },
];

// 목데이터 매핑
const MEMBER_INFO: Record<string, { type: string; len: string; wo: string; pkg: string; wc: string }> = {
  "B01-1-G22C-C-171": { type: "C형", len: "6,000mm", wo: "WO-P3000-20260506-0007", pkg: "PKG-001", wc: "WC-신선-01" },
  "B01-1-G22C-S-172": { type: "S형", len: "6,000mm", wo: "WO-P3000-20260506-0007", pkg: "PKG-001", wc: "WC-신선-01" },
  "B01-2-G22C-C-201": { type: "C형", len: "9,000mm", wo: "WO-P3000-20260506-0008", pkg: "PKG-002", wc: "WC-신선-01" },
};
const PACKING_INFO: Record<string, { wo: string; count: number; weight: string; dest: string }> = {
  "PKG-WO-P3000-20260506-0007-001": { wo: "WO-P3000-20260506-0007", count: 12, weight: "2,450 kg", dest: "P1000 제1 이천공장" },
  "PKG-WO-P3000-20260506-0007-002": { wo: "WO-P3000-20260506-0007", count:  8, weight: "1,800 kg", dest: "P1000 제1 이천공장" },
};
const SLIPPER_TYPES = ["G22C-SLIPPER-TYPE-01","G22C-SLIPPER-TYPE-03","G22C-SLIPPER-TYPE-05","G22C-SLIPPER-TYPE-08"];
const KS_CERTIFIED  = ["G22C-SLIPPER-TYPE-01","G22C-SLIPPER-TYPE-03"]; // 05, 08는 BLOCKED

// 간단 바코드 패턴 (CSS)
function Barcode({ value }: { value: string }) {
  // 문자열 기반으로 0/1 패턴 생성 (시뮬레이션)
  const bars = value.split("").flatMap((c) => {
    const n = c.charCodeAt(0) % 8;
    return [1, n > 4 ? 2 : 1, n > 2 ? 1 : 2, 1];
  }).slice(0, 52);
  return (
    <div className="flex items-end gap-px h-10">
      {bars.map((w, i) => (
        <div key={i} className="bg-black" style={{ width: `${w * 2}px`, height: i % 5 === 0 ? "100%" : "80%" }} />
      ))}
    </div>
  );
}

// QR 플레이스홀더
function QRPlaceholder({ size = 64 }: { size?: number }) {
  return (
    <div className="border-2 border-black bg-white p-1" style={{ width: size, height: size }}>
      <div className="w-full h-full grid" style={{ gridTemplateColumns: "repeat(7,1fr)", gap: "1px" }}>
        {Array.from({ length: 49 }).map((_, i) => {
          const corner = [0,1,2,7,8,9,14,6,13,20,36,37,38,43,44,45,42,41,40,48,47,46];
          return (
            <div key={i} className={corner.includes(i) || Math.random() > 0.55 ? "bg-black" : "bg-white"} />
          );
        })}
      </div>
    </div>
  );
}

// 라벨 미리보기 컴포넌트
function LabelPreview({ type, target }: { type: LabelType; target: string }) {
  if (!target) {
    return (
      <div className="border-2 border-dashed border-outline-variant/30 flex items-center justify-center h-64 text-on-surface/30">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl block mb-2">label</span>
          <p className="text-xs font-label uppercase tracking-widest">대상 선택 시 미리보기</p>
        </div>
      </div>
    );
  }

  if (type === "MEMBER") {
    const info = MEMBER_INFO[target] ?? { type: "—", len: "—", wo: "—", pkg: "—", wc: "—" };
    return (
      <div className="bg-white text-black p-4 border-2 border-black font-headline" style={{ width: 320 }}>
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">VICON MES</p>
            <p className="text-xs font-black uppercase">부재 라벨 · MEMBER</p>
          </div>
          <QRPlaceholder size={52} />
        </div>
        {/* 부재 코드 */}
        <p className="text-[10px] text-gray-500 uppercase mb-0.5">부재 코드</p>
        <p className="text-sm font-black tracking-tight mb-2">{target}</p>
        {/* 바코드 */}
        <div className="mb-2">
          <Barcode value={target} />
          <p className="text-[9px] text-center text-gray-500 mt-0.5 font-mono">{target}</p>
        </div>
        {/* 상세 */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-gray-300 pt-2 text-[10px]">
          <div><span className="text-gray-400">타입</span><br/><span className="font-bold">{info.type}</span></div>
          <div><span className="text-gray-400">길이</span><br/><span className="font-bold">{info.len}</span></div>
          <div><span className="text-gray-400">WO</span><br/><span className="font-bold font-mono text-[9px]">{info.wo}</span></div>
          <div><span className="text-gray-400">WC</span><br/><span className="font-bold">{info.wc}</span></div>
        </div>
        <div className="border-t border-gray-300 mt-2 pt-1 text-[9px] text-gray-400 flex justify-between">
          <span>P3000 제3 이천공장</span>
          <span>2026-05-06</span>
        </div>
      </div>
    );
  }

  if (type === "PACKING") {
    const info = PACKING_INFO[target] ?? { wo: "—", count: 0, weight: "—", dest: "—" };
    const pkgNo = target.slice(-3);
    return (
      <div className="bg-white text-black p-4 border-2 border-black font-headline" style={{ width: 320 }}>
        <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">VICON MES</p>
            <p className="text-xs font-black uppercase">패킹 라벨 · PACKING</p>
          </div>
          <QRPlaceholder size={52} />
        </div>
        <p className="text-[10px] text-gray-500 uppercase mb-0.5">패킹 ID</p>
        <p className="text-[11px] font-black tracking-tight mb-2 break-all">{target}</p>
        <div className="mb-2">
          <Barcode value={pkgNo} />
          <p className="text-[9px] text-center text-gray-500 mt-0.5 font-mono">{target.slice(-12)}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-gray-300 pt-2 text-[10px]">
          <div><span className="text-gray-400">WO</span><br/><span className="font-bold font-mono text-[9px]">{info.wo}</span></div>
          <div><span className="text-gray-400">부재 수</span><br/><span className="font-bold text-base">{info.count}건</span></div>
          <div><span className="text-gray-400">총 중량</span><br/><span className="font-bold">{info.weight}</span></div>
          <div><span className="text-gray-400">수신처</span><br/><span className="font-bold text-[9px]">{info.dest}</span></div>
        </div>
        <div className="border-t border-gray-300 mt-2 pt-1 text-[9px] text-gray-400 flex justify-between">
          <span>P3000 제3 이천공장</span>
          <span>2026-05-06</span>
        </div>
      </div>
    );
  }

  // SLIPPER
  const isCertified = KS_CERTIFIED.includes(target);
  return (
    <div className={`bg-white text-black p-4 border-4 font-headline ${isCertified ? "border-black" : "border-green-800"}`} style={{ width: 320 }}>
      <div className="flex justify-between items-start mb-3 pb-2 border-b-2 border-black">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">VICON MES</p>
          <p className="text-xs font-black uppercase">슬리퍼 라벨 · SLIPPER</p>
        </div>
        {isCertified
          ? <QRPlaceholder size={52} />
          : <div className="w-14 h-14 bg-green-100 border-2 border-green-800 flex items-center justify-center">
              <span className="text-green-800 font-black text-[10px] text-center leading-tight">KS<br/>BLOCKED</span>
            </div>
        }
      </div>
      <p className="text-[10px] text-gray-500 uppercase mb-0.5">슬리퍼 타입</p>
      <p className="text-sm font-black tracking-tight mb-2">{target}</p>
      <div className="mb-2">
        <Barcode value={target.slice(-4)} />
      </div>
      {isCertified ? (
        <div className="border border-green-600 bg-green-50 p-2 text-[10px] text-green-800 font-bold text-center">
          ✓ KS 인증 유효 — 발행 가능
        </div>
      ) : (
        <div className="border-2 border-green-800 bg-green-50 p-2 text-[10px] text-green-800 font-bold text-center">
          ✗ KS 인증 미등재 — 발행 차단 (BLOCKED)
        </div>
      )}
      <div className="border-t border-gray-300 mt-2 pt-1 text-[9px] text-gray-400 flex justify-between">
        <span>P3000 제3 이천공장</span>
        <span>2026-05-06</span>
      </div>
    </div>
  );
}

export default function LabelPrintPage() {
  const [labelType, setLabelType]   = useState<LabelType>("MEMBER");
  const [target, setTarget]         = useState("");
  const [copies, setCopies]         = useState(1);
  const [printing, setPrinting]     = useState(false);
  const [done, setDone]             = useState(false);
  const [showPreview, setShowPreview] = useState(false);  // 미리보기 토글

  const options = labelType === "PACKING" ? Object.keys(PACKING_INFO)
                : labelType === "SLIPPER" ? SLIPPER_TYPES
                : Object.keys(MEMBER_INFO);

  const isBlocked = labelType === "SLIPPER" && target && !KS_CERTIFIED.includes(target);

  const handlePreview = () => setShowPreview(true);

  const handlePrint = () => {
    if (isBlocked) return;
    setPrinting(true);
    setTimeout(() => { setPrinting(false); setDone(true); setShowPreview(false); }, 1200);
  };

  return (
    <main className="p-8 bg-surface min-h-screen text-on-surface">
      <PageHeader title="라벨" accent="발행" nodeRef="SCR-WO-030"
        description="부재·패킹·슬리퍼 라벨 발행 — 미리보기 확인 후 발행. FNC-WO-010,012,019" />

      {/* 라벨 유형 선택 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {LABEL_TYPES.map((lt) => (
          <button key={lt.value}
            onClick={() => { setLabelType(lt.value); setTarget(""); setDone(false); }}
            className={`p-4 text-left border-l-4 transition-colors
              ${labelType === lt.value
                ? "border-primary-accent bg-surface-container"
                : "border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container"}`}>
            <p className="font-headline font-black text-sm uppercase tracking-tight mb-1">{lt.label}</p>
            <p className="text-xs opacity-50 font-label">{lt.desc}</p>
          </button>
        ))}
      </div>

      {done ? (
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-6 mb-6 max-w-2xl">
          <p className="font-headline font-black text-sm uppercase tracking-widest text-primary-accent">발행 완료</p>
          <p className="text-xs opacity-70 mt-1">{target} — {copies}매 발행 처리됨. 발행 이력에 자동 기록.</p>
          <button onClick={() => setDone(false)}
            className="mt-4 px-4 py-2 bg-surface-container text-xs font-label uppercase tracking-widest hover:bg-surface-container-high">
            추가 발행
          </button>
        </div>
      ) : (
        <div className="flex gap-8 items-start">

          {/* 발행 폼 */}
          <div className="w-80 bg-surface-container-lowest p-6 space-y-5 shrink-0">
            <div>
              <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-2">
                {labelType === "PACKING" ? "패킹 ID" : labelType === "SLIPPER" ? "슬리퍼 타입" : "부재 코드"} *
              </label>
              <select value={target}
                onChange={(e) => { setTarget(e.target.value); setShowPreview(false); setDone(false); }}
                className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none">
                <option value="">선택하세요</option>
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-label uppercase tracking-widest opacity-50 mb-2">발행 매수</label>
              <input type="number" value={copies}
                onChange={(e) => setCopies(Math.max(1, Math.min(10, Number(e.target.value))))}
                min={1} max={10}
                className="w-full bg-surface-container px-3 py-2 text-sm font-headline border border-outline-variant/20 focus:border-primary-accent focus:outline-none" />
            </div>

            {isBlocked && (
              <div className="bg-error-container/20 border-l-2 border-error px-3 py-2">
                <p className="text-xs font-label text-error font-bold uppercase tracking-wider">
                  ✗ KS 인증 미등재 — 발행 차단
                </p>
                <p className="text-[10px] text-error/70 mt-0.5">BD 도메인에서 KS 인증 등재 후 재시도</p>
              </div>
            )}

            {/* 버튼 그룹 */}
            <div className="flex gap-2">
              {/* 미리보기 버튼 */}
              <button
                onClick={handlePreview}
                disabled={!target}
                className="flex-1 py-3 text-xs font-label uppercase tracking-widest font-bold border transition-colors
                  disabled:opacity-30 disabled:cursor-not-allowed
                  enabled:border-primary-accent enabled:text-primary-accent enabled:hover:bg-primary-accent/10">
                <span className="material-symbols-outlined text-sm align-middle mr-1">preview</span>
                미리보기
              </button>
              {/* 발행 버튼 */}
              <button onClick={handlePrint}
                disabled={!target || printing || !!isBlocked}
                className={`flex-1 py-3 text-xs font-label uppercase tracking-widest font-bold transition-colors
                  ${isBlocked
                    ? "bg-error-container text-error cursor-not-allowed opacity-60"
                    : !target || printing
                    ? "bg-surface-container text-on-surface/30 cursor-not-allowed"
                    : "bg-primary-accent text-black hover:opacity-90"}`}>
                {printing ? "발행 중..." : isBlocked ? "차단됨" : `발행 (${copies}매)`}
              </button>
            </div>
          </div>

          {/* 라벨 미리보기 패널 — 미리보기 버튼 클릭 후 표시 */}
          {showPreview ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-xs font-label uppercase tracking-widest text-primary-accent">
                  라벨 미리보기
                </p>
                <span className="text-xs font-mono text-on-surface-variant opacity-60">{target}</span>
                <button onClick={() => setShowPreview(false)}
                  className="ml-auto text-on-surface-variant opacity-40 hover:opacity-80">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <LabelPreview type={labelType} target={target} />
              <p className="text-[10px] font-label text-on-surface-variant opacity-40 mt-2">
                ※ 실제 출력은 프린터 드라이버 형식과 다를 수 있습니다
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-80 h-64 bg-surface-container-lowest border-2 border-dashed border-outline-variant/20 text-on-surface/20">
              <div className="text-center">
                <span className="material-symbols-outlined text-5xl block mb-2">label</span>
                <p className="text-xs font-label uppercase tracking-widest">
                  {target ? "미리보기 버튼을 누르세요" : "대상을 먼저 선택하세요"}
                </p>
              </div>
            </div>
          )}

        </div>
      )}
    </main>
  );
}
