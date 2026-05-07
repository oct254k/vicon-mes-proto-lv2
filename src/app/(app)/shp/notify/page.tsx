import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

export default function NotifyLandingPage() {
  const cards = [
    { label:"채널 설정", href:"/shp/notify/channel", desc:"거래처 알림 채널 마스터 (FNC-SHP-085)", scr:"SCR-SHP-071" },
    { label:"발송 이력", href:"/shp/notify/history", desc:"5종×5채널 알림 드릴다운 (FNC-SHP-084)", scr:"SCR-SHP-072" },
    { label:"이메일 발송", href:"/shp/notify/email", desc:"EMAIL 채널 발송 폼", scr:"CH-EMAIL" },
    { label:"SMS 발송", href:"/shp/notify/sms", desc:"SMS 채널 발송 폼", scr:"CH-SMS" },
    { label:"카카오톡", href:"/shp/notify/kakao", desc:"KAKAOTALK 채널 발송 폼", scr:"CH-KAKAO" },
    { label:"인앱 알림", href:"/shp/notify/inapp", desc:"INAPP 채널 발송 폼", scr:"CH-INAPP" },
  ];
  return (
    <div>
      <PageHeader title="출하 알림" accent="NOTIFY" nodeRef="IA-SHP-NOTIFY" status="PROTOTYPE"
        description="5종 알림 (DEPART/ETA_NEAR/SCHEDULE_CHANGE/RECEIVED_DONE/MISMATCH) × 5채널 (EMAIL/SMS/KAKAOTALK/INAPP/LINEBOARD) 통합 관리 (FNC-SHP-080~085)" />
      <FieldHeader title="알림 유형 5종" moduleRef="FNC-SHP-081~084" />
      <div className="flex gap-2 mb-8 flex-wrap text-xs font-label">
        {["DEPART","ETA_NEAR","SCHEDULE_CHANGE","RECEIVED_DONE","MISMATCH"].map(t=>(
          <span key={t} className="px-3 py-1 bg-surface-container border border-primary-accent/40 text-primary-accent">{t}</span>
        ))}
      </div>
      <FieldHeader title="화면 목록" moduleRef="6 SCR" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(c=>(
          <a key={c.href} href={c.href}
            className="bg-surface-container-low border-l-4 border-primary-accent p-4 block hover:bg-surface-container transition-colors">
            <p className="text-xs font-label text-primary-accent uppercase tracking-widest mb-1">{c.scr}</p>
            <p className="font-headline font-black text-sm mb-1">{c.label}</p>
            <p className="text-xs text-on-surface/50">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
