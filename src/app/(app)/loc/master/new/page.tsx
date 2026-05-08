"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

const inputCls = "w-full bg-[#131313] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]";
const labelCls = "block text-xs font-label uppercase tracking-widest text-white/50 mb-2";

type Mode = "PLANT_YARD" | "ZONE" | "LOT_BULK";

// ── Canvas 유틸 ──────────────────────────────────────────
const W=1100, H=780;
const BOUNDARY: number[][] = [
  [30,60],[200,20],[480,10],[700,30],[900,15],[1060,80],
  [1080,200],[1070,420],[1050,600],[980,720],[800,760],
  [550,770],[300,750],[120,720],[40,580],[20,350],[30,60],
];

function drawPoly(ctx:CanvasRenderingContext2D, pts:number[][]){
  ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.closePath();
}
function polyCenter(pts:number[][]): [number,number]{
  return [pts.reduce((s,p)=>s+p[0],0)/pts.length, pts.reduce((s,p)=>s+p[1],0)/pts.length];
}

function renderZonePreview(
  ctx:CanvasRenderingContext2D, cw:number, ch:number,
  zonePts:number[][], zoneName:string
){
  const dpr=window.devicePixelRatio||1;
  ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,cw,ch);
  const zoom=Math.min(cw/W, ch/H)*0.88;
  const ox=cw/2-(W*zoom)/2, oy=ch/2-(H*zoom)/2;
  ctx.save(); ctx.translate(ox,oy); ctx.scale(zoom,zoom);
  // 배경 녹지
  ctx.fillStyle="#1a2410"; ctx.fillRect(-50,-50,W+100,H+100);
  // 부지
  drawPoly(ctx,BOUNDARY); ctx.fillStyle="#252520"; ctx.fill();
  ctx.strokeStyle="#444"; ctx.lineWidth=3/zoom; ctx.setLineDash([6/zoom,4/zoom]);
  drawPoly(ctx,BOUNDARY); ctx.stroke(); ctx.setLineDash([]);
  // 그리드 질감
  ctx.save(); drawPoly(ctx,BOUNDARY); ctx.clip();
  ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=0.5/zoom;
  for(let x=0;x<W;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.restore();
  // Zone 하이라이트
  if(zonePts.length>=3){
    ctx.fillStyle="rgba(127,119,221,0.25)"; ctx.strokeStyle="#7F77DD"; ctx.lineWidth=3/zoom;
    drawPoly(ctx,zonePts); ctx.fill(); ctx.stroke();
    // 영역 표시 점선 외곽
    ctx.strokeStyle="rgba(127,119,221,0.5)"; ctx.lineWidth=1/zoom; ctx.setLineDash([8/zoom,4/zoom]);
    drawPoly(ctx,zonePts); ctx.stroke(); ctx.setLineDash([]);
    // 꼭짓점 표시
    zonePts.forEach(([x,y])=>{
      ctx.fillStyle="#7F77DD"; ctx.beginPath(); ctx.arc(x,y,4/zoom,0,Math.PI*2); ctx.fill();
    });
    // 이름
    const[cx,cy]=polyCenter(zonePts);
    const fs=16/zoom;
    ctx.fillStyle="#a09ae0"; ctx.font=`bold ${fs}px sans-serif`;
    const tw=ctx.measureText(zoneName||"Zone").width;
    ctx.fillText(zoneName||"Zone",cx-tw/2,cy+fs*0.35);
  }
  ctx.restore();
}

// ── 메인 컴포넌트 ──────────────────────────────────────────
export default function LocMasterNewPage() {
  const [mode, setMode] = useState<Mode>("LOT_BULK");

  // 공통
  const [plant, setPlant] = useState("P3000");
  const [yard,  setYard]  = useState("Y-RAW");
  const [saved, setSaved] = useState(false);

  // ZONE 탭
  const [zoneCode,    setZoneCode]    = useState("");
  const [zoneName,    setZoneName]    = useState("");
  const [coordType,   setCoordType]   = useState<"poly"|"rect">("poly");
  const [ptsText,     setPtsText]     = useState("[[160,210],[420,210],[420,590],[340,590],[300,560],[160,560]]");
  const [rectX,       setRectX]       = useState("160");
  const [rectY,       setRectY]       = useState("210");
  const [rectW,       setRectW]       = useState("260");
  const [rectH,       setRectH]       = useState("380");

  // LOT_BULK 탭
  const [zone,  setZone]  = useState("");
  const [rows,  setRows]  = useState("5");
  const [cols,  setCols]  = useState("6");
  const [cap,   setCap]   = useState("5000");

  // Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  const getZonePts = useCallback(():number[][]=> {
    if(coordType==="poly"){ try{const p=JSON.parse(ptsText);return Array.isArray(p)?p:[];}catch{return[];} }
    const x=Number(rectX),y=Number(rectY),w=Number(rectW),h=Number(rectH);
    return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
  },[coordType,ptsText,rectX,rectY,rectW,rectH]);

  const renderCanvas = useCallback(()=>{
    const canvas=canvasRef.current, wrap=wrapRef.current; if(!canvas||!wrap) return;
    const dpr=window.devicePixelRatio||1;
    const cw=wrap.clientWidth, ch=wrap.clientHeight;
    canvas.width=cw*dpr; canvas.height=ch*dpr;
    canvas.style.width=cw+"px"; canvas.style.height=ch+"px";
    const ctx=canvas.getContext("2d")!;
    renderZonePreview(ctx,cw,ch,getZonePts(),zoneName||zoneCode||"Zone");
  },[getZonePts,zoneName,zoneCode]);

  useEffect(()=>{ if(mode==="ZONE") renderCanvas(); },[mode,renderCanvas]);
  useEffect(()=>{ window.addEventListener("resize",renderCanvas); return()=>window.removeEventListener("resize",renderCanvas); },[renderCanvas]);

  const modeBtn=(m:Mode, label:string)=>(
    <button onClick={()=>{setMode(m);setSaved(false);}}
      className={`px-5 py-2 text-xs font-label uppercase tracking-widest transition-colors ${mode===m?"bg-[#00912F] text-black":"bg-[#1a1a1a] border border-white/10 text-white/50 hover:border-white/30"}`}>
      {label}
    </button>
  );

  const lotCount = mode==="LOT_BULK"?Number(rows)*Number(cols):0;
  const previewIds = mode==="LOT_BULK"
    ? Array.from({length:Math.min(4,lotCount)},(_,i)=>`Y-${plant}-${zone||"A"}-${String(Math.floor(i/Number(cols))+1).padStart(2,"0")}-${String((i%Number(cols))+1).padStart(2,"0")}`)
    : [];

  return (
    <div>
      <PageHeader
        title="위치 등록"
        accent="LOC-002~004"
        nodeRef="SCR-LOC-002"
        status="PROTOTYPE"
        description="Plant·Yard 신규 등록 / Zone 등록(비정형 폴리곤 pts 지원 + Canvas 미리보기) / Lot 일괄 등록."
      />

      <div className="flex gap-2 mb-8">
        {modeBtn("PLANT_YARD","Plant·Yard")}
        {modeBtn("ZONE","Zone")}
        {modeBtn("LOT_BULK","Lot 일괄")}
      </div>

      {/* ── PLANT_YARD ── */}
      {mode==="PLANT_YARD" && (
        <div className="max-w-lg space-y-5">
          <FieldHeader title="A. Plant · Yard 정보" moduleRef="FNC-LOC-002"/>
          <div><label className={labelCls}>Plant</label>
            <select value={plant} onChange={e=>setPlant(e.target.value)} className={inputCls}>
              {["P1000","P2000","P3000"].map(p=><option key={p}>{p}</option>)}
            </select></div>
          <div><label className={labelCls}>Yard 종류</label>
            <select value={yard} onChange={e=>setYard(e.target.value)} className={inputCls}>
              {["Y-RAW","Y-IN","Y-WIP","Y-OUT","Y-DEFECT"].map(y=><option key={y}>{y}</option>)}
            </select></div>
          <div><label className={labelCls}>Yard 명칭</label><input className={inputCls} placeholder="원자재 야적장"/></div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setSaved(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">등록 확정 ▶</button>
          </div>
          {saved && <p className="text-[#00912F] text-xs font-label uppercase tracking-widest">등록 완료</p>}
        </div>
      )}

      {/* ── ZONE ── */}
      {mode==="ZONE" && (
        <div className="flex gap-6">
          {/* 좌: 폼 */}
          <div className="w-80 shrink-0 space-y-5">
            <FieldHeader title="A. Zone 정보" moduleRef="FNC-LOC-003"/>

            <div><label className={labelCls}>Plant · Yard</label>
              <div className="flex gap-2">
                <select value={plant} onChange={e=>setPlant(e.target.value)} className={inputCls}>
                  {["P1000","P2000","P3000"].map(p=><option key={p}>{p}</option>)}
                </select>
                <select value={yard} onChange={e=>setYard(e.target.value)} className={inputCls}>
                  {["Y-RAW","Y-IN","Y-WIP","Y-OUT","Y-DEFECT"].map(y=><option key={y}>{y}</option>)}
                </select>
              </div></div>

            <div><label className={labelCls}>Zone 코드 (1~2자 대문자)</label>
              <input value={zoneCode} onChange={e=>{setZoneCode(e.target.value.toUpperCase());setSaved(false);}} className={inputCls} placeholder="A"/></div>

            <div><label className={labelCls}>Zone 명칭</label>
              <input value={zoneName} onChange={e=>{setZoneName(e.target.value);setSaved(false);}} className={inputCls} placeholder="북측 A 구역"/></div>

            <div>
              <label className={labelCls}>좌표 유형</label>
              <div className="flex gap-3">
                {([["poly","폴리곤 (비정형)"],["rect","직사각형"]] as const).map(([v,lbl])=>(
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={v} checked={coordType===v} onChange={()=>{setCoordType(v);setSaved(false);}} className="accent-[#00912F]"/>
                    <span className="text-xs font-label text-white/60">{lbl}</span>
                  </label>
                ))}
              </div>
            </div>

            {coordType==="poly" ? (
              <div>
                <label className={labelCls}>pts — JSON [[x,y],...]</label>
                <textarea
                  value={ptsText}
                  onChange={e=>{setPtsText(e.target.value);setSaved(false);}}
                  rows={4}
                  className="w-full bg-[#131313] border border-white/10 px-3 py-2 text-[10px] text-white/80 font-mono focus:outline-none focus:border-[#00912F] resize-none"
                />
                <p className="text-[9px] font-label text-white/25 mt-1">최소 3점. 미리보기에서 보라색 폴리곤으로 확인.</p>
              </div>
            ):(
              <div>
                <label className={labelCls}>직사각형 (x, y, w, h)</label>
                <div className="grid grid-cols-4 gap-2">
                  {([["x",rectX,setRectX],["y",rectY,setRectY],["w",rectW,setRectW],["h",rectH,setRectH]] as const).map(([f,v,fn])=>(
                    <div key={f}>
                      <label className={labelCls}>{f}</label>
                      <input type="number" value={v} onChange={e=>{fn(e.target.value);setSaved(false);}} className="w-full bg-[#131313] border border-white/10 px-2 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"/>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] font-label text-white/25 mt-1">저장 시 pts [[x,y],[x+w,y],[x+w,y+h],[x,y+h]]로 변환.</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={()=>{renderCanvas();setSaved(true);}} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
                등록 확정 ▶
              </button>
            </div>
            {saved && <p className="text-[#00912F] text-xs font-label uppercase tracking-widest">Zone {zoneCode} 등록 완료</p>}
          </div>

          {/* 우: Canvas 미리보기 */}
          <div className="flex-1">
            <p className="font-label text-[10px] uppercase tracking-widest text-white/30 mb-2">B. 도면 미리보기 (pts 변경 시 자동 갱신)</p>
            <div ref={wrapRef} className="border border-white/10 bg-[#111] w-full" style={{height:460,position:"relative"}}>
              <canvas ref={canvasRef} style={{display:"block"}}/>
              {getZonePts().length<3 && (
                <p className="absolute inset-0 flex items-center justify-center text-[10px] font-label text-white/20">pts 3점 이상 입력하면 미리보기 표시</p>
              )}
            </div>
            <div className="mt-2 flex gap-4 text-[10px] font-label text-white/30">
              <span>꼭짓점 수: {getZonePts().length}</span>
              {getZonePts().length>=3 && <span className="text-[#7F77DD]">▣ 보라색 = 등록 중인 Zone</span>}
            </div>
          </div>
        </div>
      )}

      {/* ── LOT_BULK ── */}
      {mode==="LOT_BULK" && (
        <div className="max-w-lg space-y-5">
          <FieldHeader title="A. 일괄 등록 설정" moduleRef="FNC-LOC-016"/>
          <div><label className={labelCls}>Plant</label>
            <select value={plant} onChange={e=>setPlant(e.target.value)} className={inputCls}>
              {["P1000","P2000","P3000"].map(p=><option key={p}>{p}</option>)}
            </select></div>
          <div><label className={labelCls}>Yard</label>
            <select value={yard} onChange={e=>setYard(e.target.value)} className={inputCls}>
              {["Y-RAW","Y-IN","Y-WIP","Y-OUT","Y-DEFECT"].map(y=><option key={y}>{y}</option>)}
            </select></div>
          <div><label className={labelCls}>Zone 코드 (예: A, B)</label>
            <input value={zone} onChange={e=>setZone(e.target.value)} className={inputCls} placeholder="A"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>행 수 (Rows)</label><input type="number" value={rows} onChange={e=>setRows(e.target.value)} className={inputCls}/></div>
            <div><label className={labelCls}>열 수 (Cols)</label><input type="number" value={cols} onChange={e=>setCols(e.target.value)} className={inputCls}/></div>
          </div>
          <div><label className={labelCls}>기본 Capacity (m/kg)</label>
            <input type="number" value={cap} onChange={e=>setCap(e.target.value)} className={inputCls}/></div>
          <div className="bg-[#1a1a1a] p-4 border-l-2 border-[#00912F]/40 text-xs font-label">
            <p className="uppercase tracking-widest text-white/40 mb-2">자동생성 미리보기 ({lotCount}개)</p>
            {previewIds.map(id=><p key={id} className="text-[#00912F] py-0.5">{id}</p>)}
            {lotCount>4&&<p className="text-white/30">... +{lotCount-4}개</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setSaved(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
              등록 확정 ▶
            </button>
          </div>
          {saved&&<p className="text-[#00912F] text-xs font-label uppercase tracking-widest">등록 완료 — {lotCount}개 위치 생성됨</p>}
        </div>
      )}
    </div>
  );
}
