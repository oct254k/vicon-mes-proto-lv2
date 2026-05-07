"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MOCK_USERS: Record<string, { pin: string; name: string; plant: string; role: string }> = {
  "park.planner": { pin: "Demo1234!", name: "박계획", plant: "P3000 제3 이천공장 (데크)", role: "PLANNER" },
  "kim.worker":   { pin: "Demo1234!", name: "김작업", plant: "P3000 제3 이천공장 (데크)", role: "WORKER" },
  "lee.pack":     { pin: "Demo1234!", name: "이포장", plant: "P3000 제3 이천공장 (데크)", role: "PACKAGER" },
  "choi.ship":    { pin: "Demo1234!", name: "최출하", plant: "P3000 제3 이천공장 (데크)", role: "SHP-STAFF" },
};

const MAX_ATTEMPTS = 5;

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [pin, setPin] = useState("");
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;

    const user = MOCK_USERS[userId];
    if (user && user.pin === pin) {
      setError("");
      router.push("/ops");
    } else {
      const next = attempts - 1;
      setAttempts(next);
      if (next <= 0) {
        setLocked(true);
        setError("PIN 5회 오류 — 계정이 잠겼습니다. 관리자에게 문의하세요.");
      } else {
        setError(`사번 또는 PIN이 올바르지 않습니다. 잔여 시도 ${next}회.`);
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">

      {/* 로고 */}
      <div className="mb-10 border-l-4 border-primary-accent pl-5">
        <Image
          src="/sungigroup_logo.png"
          alt="성지그룹"
          width={106}
          height={26}
          className="h-9 w-auto brightness-0 invert mb-1"
          priority
        />
        <div className="text-xs font-label uppercase tracking-[0.35em] text-primary-accent">
          MES · 데크 3공장
        </div>
      </div>

      {/* 로그인 카드 */}
      <div className="w-full max-w-sm bg-surface-container">

        {/* 카드 헤더 */}
        <div className="px-6 py-4 bg-surface-container-highest/30 border-l-4 border-primary-accent">
          <span className="font-headline font-black text-sm uppercase tracking-widest text-white">
            로그인
          </span>
          <span className="ml-3 text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant opacity-50">
            SCR-USR-020
          </span>
        </div>

        <form onSubmit={handleLogin} className="px-6 py-6 space-y-5">

          {/* 사번 */}
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              사번
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => { setUserId(e.target.value); setError(""); }}
              disabled={locked}
              placeholder="예) park.planner"
              className="w-full bg-surface-container-lowest border-b-2 border-outline/30 px-3 py-2.5 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent disabled:opacity-40 transition-colors"
            />
          </div>

          {/* 비밀번호/PIN */}
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              비밀번호 / PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(""); }}
              disabled={locked}
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest border-b-2 border-outline/30 px-3 py-2.5 text-sm font-headline text-on-surface focus:outline-none focus:border-primary-accent disabled:opacity-40 transition-colors"
            />
          </div>

          {/* 단말 ID (자동) */}
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              단말 ID <span className="opacity-50">(자동)</span>
            </label>
            <input
              type="text"
              readOnly
              value="WS-PC-008"
              className="w-full bg-surface-container-lowest/50 border-b border-outline/10 px-3 py-2.5 text-sm font-headline text-on-surface opacity-40 cursor-not-allowed"
            />
          </div>

          {/* 잔여 시도 */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50">
              잔여 시도
            </span>
            <span className={`text-xs font-headline tabular-nums font-bold ${attempts <= 2 ? "text-error" : "text-on-surface-variant"}`}>
              {attempts} / {MAX_ATTEMPTS}
            </span>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="bg-error-container/20 border-l-2 border-error px-3 py-2">
              <p className="text-xs font-label text-error">{error}</p>
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={locked}
            className="w-full bg-primary-accent text-white font-label font-bold uppercase tracking-widest py-3 text-sm hover:bg-primary-accent/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            로그인 ▶
          </button>

          {/* SSO */}
          <button
            type="button"
            className="w-full text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-40 hover:opacity-70 transition-opacity py-1"
          >
            SSO 로그인 (미정)
          </button>
        </form>

        {/* 카드 푸터 */}
        <div className="px-6 pb-5">
          <p className="text-xs font-label text-on-surface-variant opacity-30 tracking-wide">
            비밀번호 분실 → 시스템 관리자 문의
          </p>
        </div>
      </div>

      {/* 데모 안내 */}
      <div className="mt-8 w-full max-w-sm bg-surface-container-lowest border border-outline-variant/10 px-4 py-3">
        <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">
          데모 계정
        </p>
        <div className="space-y-1">
          {Object.entries(MOCK_USERS).map(([id, u]) => (
            <button
              key={id}
              type="button"
              onClick={() => { setUserId(id); setPin(u.pin); setError(""); setAttempts(MAX_ATTEMPTS); }}
              className="w-full text-left px-2 py-1 hover:bg-surface-container-highest/20 transition-colors"
            >
              <span className="text-xs font-headline text-primary-accent tabular-nums">{id}</span>
              <span className="text-xs font-label text-on-surface-variant opacity-50 ml-2">
                {u.name} · {u.role} · {u.plant}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 버전 */}
      <p className="mt-6 text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-20">
        v0.1 · 2026-05-06 · 점검 매주 일 02:00~04:00
      </p>
    </div>
  );
}
