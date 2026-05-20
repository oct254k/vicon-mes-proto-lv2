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

const FEATURES = [
  { icon: "monitoring", label: "실시간 생산 모니터링" },
  { icon: "assignment", label: "작업 지시 · 배포 관리" },
  { icon: "local_shipping", label: "출하 · 품질 추적" },
];

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
    <div className="min-h-screen flex">

      {/* ── 좌측 브랜딩 패널 ── */}
      <div className="hidden lg:flex w-1/2 relative flex-col">
        {/* 배경 이미지 */}
        <Image
          src="/vicon_building.png"
          alt="VICON 공장"
          fill
          className="object-cover object-center"
          priority
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/65" />

        {/* 패널 콘텐츠 */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">

          {/* 상단: 로고 */}
          <div className="border-l-4 border-primary-accent pl-5">
            <Image
              src="/sungigroup_logo.png"
              alt="성지그룹"
              width={106}
              height={26}
              className="h-10 w-auto brightness-0 invert"
              priority
            />
          </div>

          {/* 중앙: 시스템명 + 특징 */}
          <div>
            <div className="mb-8">
              <p className="text-xs font-label uppercase tracking-[0.35em] text-primary-accent mb-3">
                Manufacturing Execution System
              </p>
              <h1 className="text-4xl font-headline font-black text-on-surface leading-tight mb-4">
                생산관리시스템
              </h1>
              <div className="w-12 h-0.5 bg-primary-accent" />
            </div>

            <ul className="space-y-4">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-accent text-xl">{f.icon}</span>
                  <span className="text-sm font-label text-on-surface/80">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 하단: 버전 */}
          <p className="text-xs font-label uppercase tracking-widest text-on-surface/30">
            v0.1 · 2026-05-06 · 점검 매주 일 02:00~04:00
          </p>
        </div>
      </div>

      {/* ── 우측 폼 패널 ── */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 py-12">
          <div className="w-full max-w-sm">

            {/* 폼 헤더 */}
            <div className="mb-8">
              <h2 className="text-2xl font-headline font-black text-gray-900 mb-1">로그인</h2>
              <p className="text-sm font-label text-gray-500">
                계정 정보를 입력하여 시스템에 접속하세요
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* 사번 */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-gray-500 mb-2">
                  사번
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => { setUserId(e.target.value); setError(""); }}
                  disabled={locked}
                  placeholder="예) park.planner"
                  className="w-full border-b-2 border-gray-200 px-0 py-2.5 text-sm font-headline text-gray-900 focus:outline-none focus:border-primary-accent disabled:opacity-40 transition-colors bg-transparent"
                />
              </div>

              {/* 비밀번호/PIN */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-gray-500 mb-2">
                  비밀번호 / PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setError(""); }}
                  disabled={locked}
                  placeholder="••••••••"
                  className="w-full border-b-2 border-gray-200 px-0 py-2.5 text-sm font-headline text-gray-900 focus:outline-none focus:border-primary-accent disabled:opacity-40 transition-colors bg-transparent"
                />
              </div>

              {/* 단말 ID */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-gray-500 mb-2">
                  단말 ID <span className="opacity-50">(자동)</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value="WS-PC-008"
                  className="w-full border-b border-gray-100 px-0 py-2.5 text-sm font-headline text-gray-400 opacity-60 cursor-not-allowed bg-transparent"
                />
              </div>

              {/* 잔여 시도 */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-label uppercase tracking-widest text-gray-400">
                  잔여 시도
                </span>
                <span className={`text-xs font-headline tabular-nums font-bold ${attempts <= 2 ? "text-danger" : "text-gray-400"}`}>
                  {attempts} / {MAX_ATTEMPTS}
                </span>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-danger/5 border-l-2 border-danger px-3 py-2">
                  <p className="text-xs font-label text-danger">{error}</p>
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
                className="w-full text-xs font-label uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors py-1"
              >
                SSO 로그인 (미정)
              </button>
            </form>

            {/* 데모 계정 */}
            <div className="mt-8 border border-gray-100 px-4 py-3 bg-gray-50">
              <p className="text-xs font-label uppercase tracking-widest text-gray-400 mb-2">
                데모 계정
              </p>
              <div className="space-y-1">
                {Object.entries(MOCK_USERS).map(([id, u]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setUserId(id); setPin(u.pin); setError(""); setAttempts(MAX_ATTEMPTS); }}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xs font-headline text-primary-accent tabular-nums">{id}</span>
                    <span className="text-xs font-label text-gray-400 ml-2">
                      {u.name} · {u.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs font-label text-gray-300 text-center">
              비밀번호 분실 → 시스템 관리자 문의
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-xs font-label text-gray-300">
            © 2026 성지그룹. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
