import DefectDetailClient from "./DefectDetailClient";

export function generateStaticParams() {
  return [{ id: "D-2026-0042" }, { id: "D-2026-0041" }];
}

export default function QCDefectDetailPage({ params }: { params: { id: string } }) {
  return <DefectDetailClient id={params.id} />;
}
