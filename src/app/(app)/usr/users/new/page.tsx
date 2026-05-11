"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const INPUT = "bg-surface-container border border-outline-variant/20 px-3 py-1.5 text-sm font-body text-on-surface w-full outline-none focus:border-primary-accent";
const LABEL = "text-xs font-label uppercase tracking-widest opacity-50 mb-1 block";

export default function UserNewPage() {
  return (
    <div>
      <PageHeader title="사용자 신규 등록" nodeRef="SCR-USR-002" status="PROTOTYPE" description="사번·plant·권한 레벨·부서·인증수단·고용형태 등록" />

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="A. 기본 정보" moduleRef="FNC-USR-001/002" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
          <div><label className={LABEL}>사번 (User ID)</label><input className={INPUT} defaultValue="EMP1099" /></div>
          <div><label className={LABEL}>이름</label><input className={INPUT} defaultValue="홍길동" /></div>
          <div><label className={LABEL}>이메일</label><input className={INPUT} type="email" defaultValue="hong.gd@vicon.local" /></div>
          <div><label className={LABEL}>Plant</label>
            <select className={INPUT}><option>P3000</option><option>P2000</option><option>P1000</option></select>
          </div>
          <div><label className={LABEL}>고용형태</label>
            <select className={INPUT}><option>정규</option><option>도급</option><option>파견</option><option>외주</option></select>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="B. 권한·부서" moduleRef="FNC-USR-020/005" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><label className={LABEL}>권한 레벨</label>
            <select className={INPUT}><option>L1 WORKER</option><option>L2 STAFF</option><option>L3 MANAGER</option><option>L4 ADMIN</option><option>EXTERNAL</option></select>
          </div>
          <div className="col-span-2">
            <label className={LABEL}>부서 (다중 선택)</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {["PRD","QC","WHS","MNT","SHP","SLS","SYS"].map((d) => (
                <label key={d} className="flex items-center gap-1 text-sm font-body cursor-pointer">
                  <input type="checkbox" defaultChecked={d === "PRD"} className="accent-[#00912F]" />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border-l-4 border-primary-accent p-6 mb-4">
        <FieldHeader title="C. 인증수단" moduleRef="FNC-USR-002" />
        <div className="flex flex-wrap gap-4">
          {["PIN","RFID","FINGERPRINT","TOKEN"].map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" defaultChecked={m === "PIN"} className="accent-[#00912F]" />
              <span>{m}</span>
            </label>
          ))}
        </div>
        <p className="text-xs opacity-40 font-label mt-2">ⓘ PIN 초기값은 사번 뒤 4자리. 최초 로그인 시 변경 강제.</p>
      </div>

      <div className="flex gap-3 mt-2">
        <button className="px-6 py-2 bg-primary-accent text-black text-xs font-label uppercase tracking-widest font-bold">등록</button>
        <button className="px-6 py-2 bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label uppercase tracking-widest">취소</button>
      </div>
    </div>
  );
}
