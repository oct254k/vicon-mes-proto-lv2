"use client";

import { useState } from "react";

export default function USRAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    alert("로그인 처리 — 프로토타입");
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-block border-l-4 border-[#00912F] pl-4 text-left mb-2">
            <h1 className="text-3xl font-black tracking-tighter uppercase font-headline leading-none text-on-surface">
              VICON
            </h1>
            <span className="text-xs font-label uppercase tracking-[0.3em] text-[#00912F]">MES v2</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-surface-elevated p-8 space-y-5">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-outline/20 px-4 py-3 text-sm text-on-surface font-body focus:outline-none focus:border-[#00912F]"
              placeholder="user@vicon.co.kr"
            />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-on-surface/50 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-outline/20 px-4 py-3 text-sm text-on-surface font-body focus:outline-none focus:border-[#00912F]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00912F] text-white font-label font-bold uppercase tracking-widest py-3 text-sm hover:bg-[#00912F]/80 transition-colors"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-xs text-on-surface/30 font-label mt-6 tracking-widest uppercase">
          프로토타입 — 아무 값이나 입력 후 로그인
        </p>
      </div>
    </div>
  );
}
