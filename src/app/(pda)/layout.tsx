import { TelemetryStrip } from "@/components/layout/TelemetryStrip";

export default function PdaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <main className="flex-1 overflow-y-auto pb-4">
        {children}
      </main>
      <TelemetryStrip />
    </div>
  );
}
