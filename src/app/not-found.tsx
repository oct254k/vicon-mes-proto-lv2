"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
      {/* 상단 구분선 */}
      <div className="w-1 h-16 bg-primary-accent mb-8" />

      {/* 코드 + 메시지 */}
      <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface/30 mb-2">
        화면 미구현
      </p>
      <h1 className="text-6xl font-black tracking-tighter font-headline text-primary-accent mb-4 tabular-nums">
        404
      </h1>
      <p className="font-headline font-bold text-xl mb-2">
        화면 구현 예정
      </p>
      <p className="text-on-surface/50 text-sm font-body mb-8 text-center max-w-sm">
        이 화면은 아직 구현되지 않았습니다.<br />
        화면설계서(SCR)는 작성되어 있으며 개발 대기 중입니다.
      </p>

      {/* 경로 표시 */}
      <div className="bg-surface-container border-l-4 border-outline-variant/40 px-4 py-2 mb-8 w-full max-w-sm">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface/30 mb-1">요청 경로</p>
        <p className="font-mono text-sm text-on-surface/70">{pathname}</p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="border border-outline-variant/30 text-on-surface/70 px-5 py-2 text-sm font-label uppercase tracking-wider hover:bg-surface-container transition-colors"
        >
          ← 이전 화면
        </button>
        <Link
          href="/ops"
          className="bg-primary-accent text-white px-5 py-2 text-sm font-label uppercase tracking-wider hover:bg-primary/80 transition-colors"
        >
          대시보드 홈
        </Link>
      </div>

      {/* 하단 힌트 */}
      <p className="text-on-surface/20 text-xs font-label uppercase tracking-widest mt-12">
        ETO MES · vison_lve · PROTOTYPE
      </p>
    </div>
  );
}
