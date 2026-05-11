"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";

// ── 초기 벡터 데이터 ──────────────────────────────────────
const DEFAULT_BOUNDARY = `[[30,60],[200,20],[480,10],[700,30],[900,15],[1060,80],[1080,200],[1070,420],[1050,600],[980,720],[800,760],[550,770],[300,750],[120,720],[40,580],[20,350],[30,60]]`;

const DEFAULT_BUILDINGS = [
  { type:"poly",   pts:[[150,80],[340,80],[340,200],[280,240],[150,200]], label:"제1공장",  color:"#6b6560" },
  { type:"poly",   pts:[[700,40],[860,40],[880,150],[820,180],[700,160]], label:"제2공장",  color:"#6b6560" },
  { type:"rect",   x:430, y:600, w:180, h:120, label:"물류창고", color:"#7a7268" },
  { type:"circle", cx:620, cy:650, r:45, label:"저장탱크", color:"#6a6560" },
];

const DEFAULT_ROADS = [
  { pts:[[200,20],[220,80],[350,80]], w:28 },
  { pts:[[350,80],[430,80],[430,310]], w:24 },
  { pts:[[880,150],[880,410],[820,430]], w:24 },
];

// ── 유틸 ──────────────────────────────────────────
const W=1100, H=780;
function drawPoly(ctx:CanvasRenderingContext2D, pts:number[][]){
  ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.closePath();
}
function polyCenter(pts:number[][]): [number,number]{
  return [pts.reduce((s,p)=>s+p[0],0)/pts.length, pts.reduce((s,p)=>s+p[1],0)/pts.length];
}

// ── 탭1 Canvas 미리보기 렌더러 ──────────────────────────────────────
function renderPreview(
  ctx:CanvasRenderingContext2D, cw:number, ch:number,
  boundary:number[][], buildings:typeof DEFAULT_BUILDINGS, roads:typeof DEFAULT_ROADS,
  zones:{code:string;pts?:number[][];x?:number;y?:number;w?:number;h?:number}[]
){
  const dpr=window.devicePixelRatio||1;
  ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,cw,ch);
  // 줌 fit
  const zoom=Math.min(cw/W, ch/H)*0.9;
  const ox=cw/2-(W*zoom)/2, oy=ch/2-(H*zoom)/2;
  ctx.save(); ctx.translate(ox,oy); ctx.scale(zoom,zoom);
  // 배경
  ctx.fillStyle="#1a2410"; ctx.fillRect(-50,-50,W+100,H+100);
  // 부지
  if(boundary.length>=3){ drawPoly(ctx,boundary); ctx.fillStyle="#252520"; ctx.fill(); ctx.strokeStyle="#444"; ctx.lineWidth=3/zoom; ctx.setLineDash([6/zoom,4/zoom]); ctx.stroke(); ctx.setLineDash([]); }
  // 도로
  roads.forEach(({pts,w})=>{
    ctx.strokeStyle="#333"; ctx.lineWidth=w/zoom; ctx.lineCap="round";
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke();
  });
  // 건물
  buildings.forEach(b=>{
    ctx.fillStyle=b.color||"#6b6560"; ctx.strokeStyle="#333"; ctx.lineWidth=1.5/zoom;
    if(b.type==="poly"&&(b as any).pts){ drawPoly(ctx,(b as any).pts); ctx.fill(); ctx.stroke(); }
    else if(b.type==="rect"){ const br=b as any; ctx.beginPath(); ctx.roundRect(br.x,br.y,br.w,br.h,3); ctx.fill(); ctx.stroke(); }
    else if(b.type==="circle"){ const bc=b as any; ctx.beginPath(); ctx.arc(bc.cx,bc.cy,bc.r,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
    const fs=9/zoom; ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font=`${fs}px sans-serif`;
    const lbl=(b as any).label||""; const tw=ctx.measureText(lbl).width;
    const [bx,by]=b.type==="poly"?polyCenter((b as any).pts):b.type==="rect"?[(b as any).x+(b as any).w/2,(b as any).y+(b as any).h/2]:[(b as any).cx,(b as any).cy];
    if(bx&&by) ctx.fillText(lbl,bx-tw/2,by+fs*0.4);
  });
  // Zone 오버레이 (탭1에서 표시)
  zones.forEach(z=>{
    const pts=z.pts||(z.x!=null?[[z.x,z.y!],[z.x+z.w!,z.y!],[z.x+z.w!,z.y!+z.h!],[z.x,z.y!+z.h!]]:null);
    if(!pts) return;
    ctx.fillStyle="rgba(127,119,221,0.2)"; ctx.strokeStyle="#7F77DD"; ctx.lineWidth=2/zoom;
    drawPoly(ctx,pts); ctx.fill(); ctx.stroke();
    const [cx,cy]=polyCenter(pts);
    ctx.fillStyle="#a09ae0"; ctx.font=`500 ${10/zoom}px sans-serif`;
    ctx.fillText(z.code,cx-ctx.measureText(z.code).width/2,cy+4/zoom);
  });
  ctx.restore();
}

// ── Zone 행 타입 ──────────────────────────────────────
type ZoneRow = { code:string; name:string; coordType:"poly"|"rect"; pts:string; x:string; y:string; w:string; h:string; };

// ── Lot 셀 타입 (탭2) ──────────────────────────────────────
type SlotStatus="EMPTY"|"OCCUPIED"|"MAINTENANCE"|"DISABLED";
interface Cell{ id:string; status:SlotStatus; }
const CYCLE:SlotStatus[]=["EMPTY","OCCUPIED","MAINTENANCE","DISABLED"];
const CELL_STYLE:Record<SlotStatus,string>={
  EMPTY:"bg-[#1a1a1a] border-2 border-dashed border-white/10 text-white/20",
  OCCUPIED:"bg-[#00912F]/20 border-2 border-[#00912F]/50 text-[#00912F]",
  MAINTENANCE:"bg-[#ef4444]/20 border-2 border-[#ef4444]/30 text-[#ef4444]",
  DISABLED:"bg-[#131313] border-2 border-white/5 text-white/10 opacity-40",
};

const inputCls="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F]";
const labelCls="block text-[10px] font-label uppercase tracking-widest text-white/40 mb-1.5";

// ── 메인 컴포넌트 ──────────────────────────────────────
export default function YardMapEditPage() {
  const [tab, setTab] = useState<0|1>(0);

  // ── 탭1 상태 ──
  const [boundaryText, setBoundaryText] = useState(DEFAULT_BOUNDARY);
  const [buildings, setBuildings] = useState(DEFAULT_BUILDINGS.map(b=>({...b, label:(b as any).label||""})));
  const [roads, setRoads] = useState(DEFAULT_ROADS.map(r=>({...r, ptsText:JSON.stringify(r.pts)})));
  const [zones, setZones] = useState<ZoneRow[]>([
    {code:"A",name:"A 구역",coordType:"poly",pts:"[[160,210],[420,210],[420,590],[160,560]]",x:"160",y:"210",w:"260",h:"380"},
  ]);
  const [saved1, setSaved1] = useState(false);

  // ── 탭2 상태 ──
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(6);
  const [zone, setZone] = useState("A");
  const [cells, setCells] = useState<Cell[]>([]);
  const [saved2, setSaved2] = useState(false);

  // 탭2 셀 초기화
  useEffect(()=>{
    const n=rows*cols;
    setCells(prev=>{
      const next=Array.from({length:n},(_,i)=>prev[i]||{
        id:`Y-P3000-${zone}-${String(Math.floor(i/cols)+1).padStart(2,"0")}-${String((i%cols)+1).padStart(2,"0")}`,
        status:"EMPTY" as SlotStatus,
      });
      return next;
    });
  },[rows,cols,zone]);

  // Canvas 미리보기
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const wrapRef=useRef<HTMLDivElement>(null);

  const renderCanvas=useCallback(()=>{
    const canvas=canvasRef.current, wrap=wrapRef.current; if(!canvas||!wrap) return;
    const dpr=window.devicePixelRatio||1;
    const cw=wrap.clientWidth, ch=wrap.clientHeight;
    canvas.width=cw*dpr; canvas.height=ch*dpr;
    canvas.style.width=cw+"px"; canvas.style.height=ch+"px";
    const ctx=canvas.getContext("2d")!;
    let boundary:number[][]=[];
    try{ boundary=JSON.parse(boundaryText); }catch{boundary=[];}
    const parsedZones=zones.map(z=>{
      if(z.coordType==="poly"){ try{return{code:z.code,pts:JSON.parse(z.pts)};}catch{return{code:z.code};} }
      return{code:z.code,x:Number(z.x),y:Number(z.y),w:Number(z.w),h:Number(z.h)};
    });
    const parsedRoads=roads.map(r=>{ try{return{pts:JSON.parse(r.ptsText),w:r.w};}catch{return{pts:[],w:r.w};} });
    renderPreview(ctx,cw,ch,boundary,buildings as any,parsedRoads,parsedZones);
  },[boundaryText,buildings,roads,zones]);

  useEffect(()=>{ if(tab===0) renderCanvas(); },[tab,renderCanvas]);
  useEffect(()=>{ window.addEventListener("resize",renderCanvas); return()=>window.removeEventListener("resize",renderCanvas); },[renderCanvas]);

  const toggleCell=(id:string)=>{
    setCells(prev=>prev.map(c=>{ if(c.id!==id)return c; const idx=CYCLE.indexOf(c.status); return{...c,status:CYCLE[(idx+1)%CYCLE.length]}; }));
    setSaved2(false);
  };

  const addZone=()=>setZones(prev=>[...prev,{code:`Z${prev.length+1}`,name:"",coordType:"poly",pts:"[]",x:"0",y:"0",w:"100",h:"100"}]);
  const removeZone=(i:number)=>setZones(prev=>prev.filter((_,idx)=>idx!==i));
  const updateZone=(i:number,field:keyof ZoneRow,val:string)=>setZones(prev=>prev.map((z,idx)=>idx===i?{...z,[field]:val}:z));

  const addBuilding=()=>setBuildings(prev=>[...prev,{type:"rect",x:100,y:100,w:80,h:60,label:"신규 건물",color:"#6b6560"}] as any);
  const removeBuilding=(i:number)=>setBuildings(prev=>prev.filter((_,idx)=>idx!==i));

  return (
    <div>
      <PageHeader
        title="도면 편집"
        nodeRef="SCR-LOC-011"
        status="PROTOTYPE"
        description="탭1: 벡터 도면 데이터(BOUNDARY·BUILDINGS·ROADS) 등록 + Canvas 미리보기. 탭2: Zone·Lot 격자 배치."
      />

      {/* 탭 헤더 */}
      <div className="flex gap-0 mb-6 border-b border-white/10">
        {[["탭 1: 벡터 도면 데이터",0],["탭 2: Zone·Lot 배치",1]].map(([lbl,idx])=>(
          <button key={idx} onClick={()=>setTab(idx as 0|1)}
            className={`px-6 py-3 text-xs font-label uppercase tracking-widest transition-colors border-b-2 ${tab===idx?"border-[#00912F] text-[#00912F]":"border-transparent text-white/30 hover:text-white/50"}`}>
            {lbl}
          </button>
        ))}
      </div>

      {/* ── 탭1 ── */}
      {tab===0 && (
        <div className="flex gap-6">
          {/* 좌: 입력 폼 */}
          <div className="w-80 shrink-0 space-y-5">

            {/* BOUNDARY */}
            <div>
              <FieldHeader title="A. 부지 외곽 (BOUNDARY)" moduleRef="FNC-LOC-020"/>
              <label className={labelCls}>pts — JSON 배열 [[x,y],...]</label>
              <textarea
                value={boundaryText}
                onChange={e=>{setBoundaryText(e.target.value);setSaved1(false);}}
                rows={4}
                className="w-full bg-[#131313] border border-white/10 px-3 py-2 text-[10px] text-white/80 font-mono focus:outline-none focus:border-[#00912F] resize-none"
              />
              <p className="text-[9px] font-label text-white/25 mt-1">최소 3점, 닫힌 폴리곤 권장 (첫 점 = 마지막 점)</p>
            </div>

            {/* BUILDINGS */}
            <div>
              <FieldHeader title="B. 건물·구조물 (BUILDINGS)" moduleRef="FNC-LOC-020"/>
              <div className="space-y-2">
                {buildings.map((b,i)=>(
                  <div key={i} className="bg-[#131313] border border-white/10 p-3 text-[10px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label text-white/40 uppercase tracking-widest">{(b as any).label||`건물 ${i+1}`}</span>
                      <button onClick={()=>removeBuilding(i)} className="text-[#ef4444]/60 hover:text-[#ef4444] font-label text-[10px]">삭제</button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className={labelCls}>라벨</label>
                        <input value={(b as any).label} onChange={e=>{const nb=[...buildings];(nb[i] as any).label=e.target.value;setBuildings(nb);setSaved1(false);}} className="bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white w-full focus:outline-none"/>
                      </div>
                      <div>
                        <label className={labelCls}>type</label>
                        <select value={b.type} onChange={e=>{const nb=[...buildings];nb[i]={...nb[i],type:e.target.value};setBuildings(nb);setSaved1(false);}} className="bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white w-full focus:outline-none">
                          {["poly","rect","circle"].map(t=><option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addBuilding} className="w-full py-2 text-[10px] font-label uppercase tracking-widest text-white/30 border border-dashed border-white/10 hover:border-white/30 hover:text-white/50 transition-colors">
                  + 건물 추가
                </button>
              </div>
            </div>

            {/* ROADS */}
            <div>
              <FieldHeader title="C. 도로·통로 (ROADS)" moduleRef="FNC-LOC-020"/>
              <div className="space-y-2">
                {roads.map((r,i)=>(
                  <div key={i} className="bg-[#131313] border border-white/10 p-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-label text-white/40">도로 {i+1} — 선폭 {r.w}px</span>
                      <button onClick={()=>setRoads(prev=>prev.filter((_,idx)=>idx!==i))} className="text-[#ef4444]/60 hover:text-[#ef4444] text-[10px]">삭제</button>
                    </div>
                    <label className={labelCls}>pts [[x,y],...]</label>
                    <input value={r.ptsText} onChange={e=>{const nr=[...roads];nr[i]={...nr[i],ptsText:e.target.value};setRoads(nr);setSaved1(false);}} className="w-full bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white font-mono focus:outline-none"/>
                    <label className={labelCls+" mt-1.5"}>선폭 (px)</label>
                    <input type="number" value={r.w} onChange={e=>{const nr=[...roads];nr[i]={...nr[i],w:Number(e.target.value)};setRoads(nr);setSaved1(false);}} className="w-20 bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white focus:outline-none"/>
                  </div>
                ))}
                <button onClick={()=>setRoads(prev=>[...prev,{pts:[[0,0],[100,100]],w:20,ptsText:"[[0,0],[100,100]]"}])} className="w-full py-2 text-[10px] font-label uppercase tracking-widest text-white/30 border border-dashed border-white/10 hover:border-white/30 hover:text-white/50 transition-colors">
                  + 도로 추가
                </button>
              </div>
            </div>

            {/* Zone 목록 */}
            <div>
              <FieldHeader title="D. Zone 등록" moduleRef="FNC-LOC-021"/>
              <div className="space-y-2">
                {zones.map((z,i)=>(
                  <div key={i} className="bg-[#131313] border border-white/10 p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-label text-[#7F77DD]">Zone {z.code||i+1}</span>
                      <button onClick={()=>removeZone(i)} className="text-[#ef4444]/60 hover:text-[#ef4444] text-[10px]">삭제</button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                      <div><label className={labelCls}>코드</label><input value={z.code} onChange={e=>updateZone(i,"code",e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white focus:outline-none"/></div>
                      <div>
                        <label className={labelCls}>좌표 유형</label>
                        <select value={z.coordType} onChange={e=>updateZone(i,"coordType",e.target.value as "poly"|"rect")} className="w-full bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white focus:outline-none">
                          <option value="poly">폴리곤</option><option value="rect">직사각형</option>
                        </select>
                      </div>
                    </div>
                    {z.coordType==="poly"?(
                      <div><label className={labelCls}>pts</label><input value={z.pts} onChange={e=>updateZone(i,"pts",e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white font-mono focus:outline-none"/></div>
                    ):(
                      <div className="grid grid-cols-4 gap-1">
                        {(["x","y","w","h"] as const).map(f=>(
                          <div key={f}><label className={labelCls}>{f}</label><input type="number" value={z[f]} onChange={e=>updateZone(i,f,e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 px-2 py-1 text-[10px] text-white focus:outline-none"/></div>
                        ))}
      </div>
                    )}
                  </div>
                ))}
                <button onClick={addZone} className="w-full py-2 text-[10px] font-label uppercase tracking-widest text-white/30 border border-dashed border-white/10 hover:border-[#7F77DD]/50 hover:text-white/50 transition-colors">
                  + Zone 추가
                </button>
              </div>
            </div>

            {/* 저장 */}
            <div className="flex gap-2 pt-2">
              <button onClick={()=>{renderCanvas();setSaved1(true);}} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-xs hover:opacity-90">
                저장 ▶
              </button>
              {saved1 && <span className="self-center text-[#00912F] text-[10px] font-label uppercase tracking-widest">저장 완료</span>}
            </div>
          </div>

          {/* 우: Canvas 미리보기 */}
          <div className="flex-1">
            <p className="font-label text-[10px] uppercase tracking-widest text-white/30 mb-2">D. Canvas 미리보기 (실시간)</p>
            <div ref={wrapRef} className="border border-white/10 bg-[#111] w-full" style={{height:480,position:"relative"}}>
              <canvas ref={canvasRef} style={{display:"block"}}/>
              <p className="absolute bottom-2 left-2 text-[9px] font-label text-white/20">BOUNDARY 수정 후 미리보기 자동 갱신</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 탭2 ── */}
      {tab===1 && (
        <div>
          <FieldHeader title="E. Zone·Lot 격자 배치" moduleRef="FNC-LOC-022"/>
          <div className="flex gap-4 mb-5 items-end flex-wrap">
            <div>
              <label className={labelCls}>Zone 코드</label>
              <input value={zone} onChange={e=>setZone(e.target.value)} className="w-20 bg-[#131313] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"/>
            </div>
            {[["행",rows,setRows],["열",cols,setCols]].map(([lbl,val,fn])=>(
              <div key={String(lbl)}>
                <label className={labelCls}>{String(lbl)} 수</label>
                <input type="number" value={Number(val)} onChange={e=>(fn as (n:number)=>void)(Number(e.target.value))} className="w-20 bg-[#131313] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00912F]"/>
              </div>
            ))}
            <p className="text-xs font-label text-white/30 pb-2">총 {rows*cols}개 위치</p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 p-4 mb-4">
            <p className="font-label text-[10px] uppercase tracking-widest text-white/30 mb-3">
              셀 클릭 → 상태 순환 &nbsp;|&nbsp;
              <span className="text-white/20">EMPTY</span> →
              <span className="text-[#00912F] ml-1">OCCUPIED</span> →
              <span className="text-[#ef4444] ml-1">MAINT</span> →
              <span className="text-white/10 ml-1">DISABLED</span>
            </p>
            <div className="grid gap-1.5" style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`}}>
              {cells.map(c=>(
                <button key={c.id} onClick={()=>{toggleCell(c.id);setSaved2(false);}}
                  className={`h-14 flex items-center justify-center text-[10px] font-label font-bold transition-all hover:scale-105 ${CELL_STYLE[c.status]}`}>
                  {c.id.split("-").slice(-2).join("-")}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={()=>setSaved2(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
              배치 저장 ▶
            </button>
            <button className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-6 py-3 text-sm">취소</button>
            {saved2 && <span className="self-center text-[#00912F] text-xs font-label uppercase tracking-widest">저장 완료</span>}
          </div>
        </div>
      )}
    </div>
  );
}
