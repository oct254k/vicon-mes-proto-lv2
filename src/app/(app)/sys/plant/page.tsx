"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

type FlagKey = "rfid_enabled" | "fifo_strict" | "qr_scan_only" | "external_allowed";

interface PlantConfig {
  id: string;
  name: string;
  tz: string;
  currency: string;
  shift: string;
  flags: Record<FlagKey, boolean>;
}

const FLAG_LABELS: Record<FlagKey, string> = {
  rfid_enabled: "RFID 스캔 사용",
  fifo_strict: "FIFO 엄격 적용",
  qr_scan_only: "QR 스캔 전용",
  external_allowed: "외부 단말 허용",
};

const INITIAL: PlantConfig[] = [
  { id: "P1000", name: "제1공장", tz: "Asia/Seoul", currency: "KRW", shift: "D/N", flags: { rfid_enabled: true, fifo_strict: true, qr_scan_only: false, external_allowed: false } },
  { id: "P2000", name: "제2공장", tz: "Asia/Seoul", currency: "KRW", shift: "D/E/N", flags: { rfid_enabled: false, fifo_strict: true, qr_scan_only: true, external_allowed: false } },
  { id: "P3000", name: "제3공장", tz: "Asia/Seoul", currency: "KRW", shift: "D", flags: { rfid_enabled: true, fifo_strict: false, qr_scan_only: false, external_allowed: true } },
];

export default function SYSPlantPage() {
  const [plants, setPlants] = useState<PlantConfig[]>(INITIAL);
  const [saved, setSaved] = useState(false);

  const toggleFlag = (plantId: string, flag: FlagKey) => {
    setPlants(prev => prev.map(p =>
      p.id === plantId ? { ...p, flags: { ...p.flags, [flag]: !p.flags[flag] } } : p
    ));
    setSaved(false);
  };

  return (
    <div className="p-8 bg-[#131313] min-h-screen text-on-surface">
      <PageHeader title="Plant" accent="정책 설정" nodeRef="SCR-SYS-080" description="공장별 운영 옵션 토글 및 일자·통화·교대 정책 관리" />

      <div className="flex justify-end mb-4">
        <button onClick={() => setSaved(true)}
          className={`px-4 py-2 text-xs font-label uppercase tracking-widest transition-colors ${saved ? "bg-[#00912F]/30 text-[#00912F]" : "bg-[#00912F] text-white hover:bg-[#00912F]/80"}`}>
          {saved ? "저장됨" : "저장"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {plants.map(plant => (
          <section key={plant.id} className="bg-surface-container-lowest border border-outline-variant/10">
            <div className="p-4 bg-surface-container-highest/30 border-l-4 border-[#00912F] flex items-center gap-4">
              <span className="font-headline font-black text-base uppercase tracking-widest text-[#00912F]">{plant.id}</span>
              <span className="font-headline text-sm text-on-surface">{plant.name}</span>
              <span className="ml-auto text-xs text-on-surface-variant opacity-50 font-label">TZ: {plant.tz} | {plant.currency} | Shift: {plant.shift}</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {(Object.keys(FLAG_LABELS) as FlagKey[]).map(flag => (
                <div key={flag} className="flex items-center gap-3 p-3 bg-surface-container hover:bg-surface-container-high transition-colors">
                  <button onClick={() => toggleFlag(plant.id, flag)}
                    className={`relative w-10 h-5 flex-shrink-0 transition-colors ${plant.flags[flag] ? "bg-[#00912F]" : "bg-surface-container-highest"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${plant.flags[flag] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-sm font-headline flex-1">{FLAG_LABELS[flag]}</span>
                  <span className={`text-xs font-label uppercase ${plant.flags[flag] ? "text-[#00912F]" : "text-on-surface-variant opacity-40"}`}>
                    {plant.flags[flag] ? "ON" : "OFF"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
