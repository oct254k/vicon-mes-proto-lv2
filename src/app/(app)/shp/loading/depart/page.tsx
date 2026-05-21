"use client";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const SHP = { id:"SHP-P3000-20260507-001", customer:"P1000 제1 이천공장", dest:"이천1공장", plate:"VH-25TON-003", driver:"외부운전자 (EXTERNAL 토큰)", totalPkg:2, loadedPkg:2, totalWeight:"4,250 kg" };

export default function DepartPage() {
  const [departed, setDeparted] = useState(false);
  const allLoaded = SHP.loadedPkg === SHP.totalPkg;
  return (
    <div className="max-w-sm mx-auto">
      <PageHeader title="출발 확인" nodeRef="IA-SHP-LOADING-DEPART" status="PROTOTYPE"
        description="출발 누락 검증 후 SHIPPED 전이 (EXTERNAL 토큰 · FNC-SHP-052/054)" />
      <FieldHeader title="출하 정보" moduleRef={SHP.id} />
      <div className="bg-surface-container p-5 mb-4 space-y-2">
        {[{l:"출하 ID",v:SHP.id},{l:"고객",v:SHP.customer},{l:"목적지",v:SHP.dest},{l:"차량번호",v:SHP.plate},{l:"운전자",v:SHP.driver},{l:"총중량",v:SHP.totalWeight}].map(f=>(
          <div key={f.l} className="flex justify-between text-sm">
            <span className="font-label text-xs uppercase opacity-50">{f.l}</span>
            <span className="font-bold">{f.v}</span>
          </div>
        ))}
      </div>
      <FieldHeader title="적재 검증" moduleRef={`${SHP.loadedPkg}/${SHP.totalPkg} PKG`} />
      <div className={`p-4 mb-6 border ${allLoaded?"bg-primary-accent/10 border-primary-accent/40":"bg-warning/10 border-warning/40"}`}>
        {allLoaded ? (
          <p className="text-sm font-label text-primary-accent">전체 {SHP.totalPkg}개 PKG 적재 완료 — 출발 가능</p>
        ) : (
          <p className="text-sm font-label text-warning">⚠ {SHP.totalPkg-SHP.loadedPkg}개 PKG 미적재 — 출발 불가</p>
        )}
      </div>
      {departed ? (
        <div className="text-center">
          <StatusBadge type="running" label="SHIPPED — 출발 확인 완료" />
          <p className="text-xs font-label opacity-40 mt-2">게이트 RFID 자동 감지 대기 중</p>
        </div>
      ) : (
        <button onClick={()=>allLoaded&&setDeparted(true)} disabled={!allLoaded}
          className="w-full bg-primary-accent text-white py-5 text-base font-headline font-black uppercase tracking-widest disabled:opacity-30">
          출발 확인 · SHIPPED ▶
        </button>
      )}
    </div>
  );
}
