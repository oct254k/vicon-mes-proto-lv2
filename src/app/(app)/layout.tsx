import { TopNav } from "@/components/layout/TopNav";
import { SideNav } from "@/components/layout/SideNav";
import { TelemetryStrip } from "@/components/layout/TelemetryStrip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <TopNav />
      <SideNav />
      <main className="ml-72 mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto">
        {children}
      </main>
      <TelemetryStrip />
    </div>
  );
}
