"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const TODAY = new Date("2026-05-06");

function dDay(expiry: string) {
  return Math.ceil((new Date(expiry).getTime() - TODAY.getTime()) / 86400000);
}

const CERTS = [
  { no: "KS-D-3504-2024-001", name: "철근 KS 품질 인증",   material: "SD400",     acquired: "2022-05-01", expiry: "2026-05-10" },
  { no: "KS-D-3515-2024-002", name: "용접봉 KS 인증",       material: "AWS E6013", acquired: "2021-09-15", expiry: "2026-05-12" },
  { no: "KS-D-3698-2024-003", name: "H형강 KS 인증",        material: "SS400",     acquired: "2023-03-01", expiry: "2026-06-30" },
  { no: "KS-F-4716-2024-004", name: "방수시트 KS 인증",     material: "TPO-1.5",   acquired: "2022-11-20", expiry: "2027-11-20" },
  { no: "KS-B-1002-2024-005", name: "볼트·너트 KS 인증",   material: "M16-4.8",   acquired: "2024-01-10", expiry: "2027-01-10" },
];

function getDDayClass(d: number) {
  if (d <= 7)  return "text-error font-bold";
  if (d <= 30) return "text-warning font-bold";
  return "text-on-surface/60";
}

export default function BDCertificationsPage() {
  const imminent = CERTS.filter((c) => dDay(c.expiry) <= 30);

  return (
    <div className="p-8">
      <PageHeader
        title="기준정보 /"
        accent="KS 인증 마스터"
        nodeRef="SCR-BD-080"
        description="KS 인증 등록·갱신·만료 관리"
      />

      {imminent.length > 0 && (
        <div className="mb-6 bg-warning/10 border border-warning/40 p-4 flex items-start gap-3">
          <span className="text-warning font-bold text-lg leading-none">⚠</span>
          <div>
            <p className="text-warning font-headline font-bold text-sm uppercase tracking-widest">만료 임박 경고</p>
            <p className="text-sm text-on-surface/70 mt-1">
              {imminent.length}건의 인증이 30일 이내 만료 예정 —{" "}
              {imminent.map((c) => `${c.no} (D-${dDay(c.expiry)})`).join(", ")}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button className="bg-primary-accent text-white px-4 py-2 text-sm font-label uppercase tracking-wider">
          + 인증 등록
        </button>
      </div>

      <section className="bg-surface-container-lowest">
        <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
          <h3 className="font-headline font-black text-sm uppercase tracking-widest">
            KS 인증 목록{" "}
            <span className="opacity-30 font-light ml-2">| Buffer: {String(CERTS.length).padStart(3, "0")} Entries</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline">
                {["인증번호", "인증명", "Material", "취득일", "만료일", "D-Day", "상태", "액션"].map((h) => (
                  <th key={h} className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-headline text-sm">
              {CERTS.map((c, i) => {
                const d = dDay(c.expiry);
                const isImminent = d <= 30;
                return (
                  <tr key={i} className="border-b border-outline-variant hover:bg-surface-container-highest/20 transition-colors">
                    <td className="px-4 py-2 text-xs tabular-nums">{c.no}</td>
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2 text-xs text-on-surface/60">{c.material}</td>
                    <td className="px-4 py-2 text-xs tabular-nums">{c.acquired}</td>
                    <td className="px-4 py-2 text-xs tabular-nums">{c.expiry}</td>
                    <td className={`px-4 py-2 text-xs tabular-nums ${getDDayClass(d)}`}>D-{d}</td>
                    <td className="px-4 py-2">
                      <StatusBadge
                        type={d <= 7 ? "error" : d <= 30 ? "warning" : "running"}
                        label={d <= 7 ? "긴급" : d <= 30 ? "임박" : "정상"}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        disabled={!isImminent}
                        className={`px-3 py-1 text-xs font-label uppercase tracking-wider transition-colors ${
                          isImminent
                            ? "bg-primary-accent text-white hover:bg-primary-accent/80"
                            : "opacity-20 cursor-not-allowed bg-surface-container text-on-surface/40"
                        }`}
                      >
                        갱신 신청
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
