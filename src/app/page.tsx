import { redirect } from "next/navigation";

// 루트 → OPS 운영현황 대시보드로 기본 이동
export default function RootPage() {
  redirect("/ops");
}
