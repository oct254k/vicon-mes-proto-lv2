import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" — 정적 배포 필요 시 재활성화 (동적 라우트에 generateStaticParams 추가 필요)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
