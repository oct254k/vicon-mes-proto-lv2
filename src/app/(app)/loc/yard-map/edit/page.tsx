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
  const zoom=Math.min(cw/W, ch/H)*0.9;
  const ox=cw/2-(W*zoom)/2, oy=ch/2-(H*zoom)/2;
  ctx.save(); ctx.translate(ox,oy); ctx.scale(zoom,zoom);
  ctx.fillStyle="#1a2410"; ctx.fillRect(-50,-50,W+100,H+100);
  if(boundary.length>=3){ drawPoly(ctx,boundary); ctx.fillStyle="#252520"; ctx.fill(); ctx.strokeStyle="#444"; ctx.lineWidth=3/zoom; ctx.setLineDash([6/zoom,4/zoom]); ctx.stroke(); ctx.setLineDash([]); }
  roads.forEach(({pts,w})=>{
    ctx.strokeStyle="#333"; ctx.lineWidth=w/zoom; ctx.lineCap="round";
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke();
  });
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
type SlotStatus = "EMPTY"|"OCCUPIED"|"MAINTENANCE"|"DISABLED";
interface Cell {
  id: string;
  status: SlotStatus;
  lotNo?: string;
  material?: string;
  qty?: number;
}

const CELL_STYLE: Record<SlotStatus,string> = {
  EMPTY:       "bg-[#1a1a1a] border-2 border-dashed border-white/10 text-white/20",
  OCCUPIED:    "bg-[#00912F]/20 border-2 border-[#00912F]/50 text-[#00912F]",
  MAINTENANCE: "bg-[#ef4444]/20 border-2 border-[#ef4444]/30 text-[#ef4444]",
  DISABLED:    "bg-[#131313] border-2 border-white/5 text-white/10 opacity-40",
};

// 탭2 Zone 목록 (view/page.tsx의 SECTORS_INIT과 동일 구조)
const ZONE_DEFS: { id:string; label:string; cols:number; rows:number }[] = [
  {id:"A-1",label:"A 구역 / A-1",cols:3,rows:4},
  {id:"A-2",label:"A 구역 / A-2",cols:3,rows:4},
  {id:"A-3",label:"A 구역 / A-3",cols:5,rows:3},
  {id:"B-1",label:"B 구역 / B-1",cols:3,rows:3},
  {id:"B-2",label:"B 구역 / B-2",cols:3,rows:2},
  {id:"C-1",label:"C 구역 / C-1",cols:4,rows:2},
  {id:"C-2",label:"C 구역 / C-2",cols:3,rows:3},
  {id:"D-1",label:"D 구역 / D-1",cols:3,rows:3},
  {id:"D-2",label:"D 구역 / D-2",cols:3,rows:2},
  {id:"E-1",label:"E 구역 / E-1",cols:4,rows:2},
  {id:"E-2",label:"E 구역 / E-2",cols:3,rows:2},
];

// Zone별 초기 목 데이터 생성
function mkCells(zoneId:string, cols:number, rows:number): Cell[] {
  const MATS=["M-COIL-A","M-COIL-B","M-COIL-C"];
  return Array.from({length:rows*cols},(_,i)=>{
    const r=Math.floor(i/cols), c=i%cols;
    const hash=(r*17+c*31)%10;
    const status:SlotStatus = hash<4?"EMPTY":hash<7?"OCCUPIED":hash<8?"OCCUPIED":"EMPTY";
    return {
      id:`Y-P3000-${zoneId}-${String(r+1).padStart(2,"0")}-${String(c+1).padStart(2,"0")}`,
      status,
      lotNo: status==="OCCUPIED"?`LOT-2026050${hash%9+1}-${String(hash*7+i+1).padStart(3,"0")}`:undefined,
      material: status==="OCCUPIED"?MATS[hash%3]:undefined,
      qty: status==="OCCUPIED"?(hash*500+1000):undefined,
    };
  });
}

const inputCls="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F]";
const labelCls="block text-[10px] font-label uppercase tracking-widest text-white/40 mb-1.5";
const STATUS_OPTIONS: SlotStatus[] = ["EMPTY","OCCUPIED","MAINTENANCE","DISABLED"];

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
  const [selectedZoneId, setSelectedZoneId] = useState("A-1");
  const zoneDef = ZONE_DEFS.find(z=>z.id===selectedZoneId)!;

  // Zone별 cells를 Map으로 관리
  const [allCells, setAllCells] = useState<Map<string,Cell[]>>(()=>{
    const m=new Map<string,Cell[]>();
    ZONE_DEFS.forEach(z=>m.set(z.id, mkCells(z.id,z.cols,z.rows)));
    return m;
  });
  const cells = allCells.get(selectedZoneId) ?? [];

  const updateCells = useCallback((zoneId:string, updater:(prev:Cell[])=>Cell[])=>{
    setAllCells(prev=>{
      const next=new Map(prev);
      next.set(zoneId, updater(next.get(zoneId)??[]));
      return next;
    });
  },[]);

  const [selectedCellId, setSelectedCellId] = useState<string|null>(null);
  const selectedCell = cells.find(c=>c.id===selectedCellId)??null;

  // 드래그 상태
  const dragIndexRef = useRef<number|null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number|null>(null);
  const [saved2, setSaved2] = useState(false);

  // 탭2 상세 편집 (우측 패널)
  const [editStatus, setEditStatus] = useState<SlotStatus>("EMPTY");
  const [editLotNo, setEditLotNo] = useState("");
  const [editMaterial, setEditMaterial] = useState("");
  const [editQty, setEditQty] = useState("");

  useEffect(()=>{
    if(selectedCell){
      setEditStatus(selectedCell.status);
      setEditLotNo(selectedCell.lotNo??"");
      setEditMaterial(selectedCell.material??"");
      setEditQty(selectedCell.qty!=null?String(selectedCell.qty):"");
    }
  },[selectedCellId, selectedZoneId]);

  const saveCellEdit = ()=>{
    if(!selectedCellId) return;
    updateCells(selectedZoneId, prev=>prev.map(c=>{
      if(c.id!==selectedCellId) return c;
      const isOcc=editStatus==="OCCUPIED";
      return {
        ...c,
        status:editStatus,
        lotNo:isOcc&&editLotNo?editLotNo:undefined,
        material:isOcc&&editMaterial?editMaterial:undefined,
        qty:isOcc&&editQty?Number(editQty):undefined,
      };
    }));
    setSaved2(true);
  };

  const clearCellEdit = ()=>{
    if(!selectedCellId) return;
    updateCells(selectedZoneId, prev=>prev.map(c=>c.id===selectedCellId?{id:c.id,status:"EMPTY"}:c));
    setSelectedCellId(null);
    setSaved2(true);
  };

  // 드래그 앤 드롭 (같은 Zone 내 슬롯 교환)
  const handleDragStart=(idx:number)=>{ dragIndexRef.current=idx; };
  const handleDragOver=(e:React.DragEvent, idx:number)=>{ e.preventDefault(); setDragOverIndex(idx); };
  const handleDrop=(e:React.DragEvent, toIdx:number)=>{
    e.preventDefault();
    const fromIdx=dragIndexRef.current;
    if(fromIdx==null||fromIdx===toIdx){ dragIndexRef.current=null; setDragOverIndex(null); return; }
    updateCells(selectedZoneId, prev=>{
      const next=[...prev];
      const {status:fs,lotNo:fl,material:fm,qty:fq}=next[fromIdx];
      const {status:ts,lotNo:tl,material:tm,qty:tq}=next[toIdx];
      next[fromIdx]={...next[fromIdx],status:ts,lotNo:tl,material:tm,qty:tq};
      next[toIdx]={...next[toIdx],status:fs,lotNo:fl,material:fm,qty:fq};
      return next;
    });
    dragIndexRef.current=null;
    setDragOverIndex(null);
    setSaved2(false);
  };
  const handleDragEnd=()=>{ dragIndexRef.current=null; setDragOverIndex(null); };

  // Zone 변경 시 선택 셀 초기화
  const handleZoneChange=(id:string)=>{ setSelectedZoneId(id); setSelectedCellId(null); setSaved2(false); };

  // KPI
  const totalSlots = cells.length;
  const occupiedSlots = cells.filter(c=>c.status==="OCCUPIED"||c.status==="MAINTENANCE").length;
  const occupiedOnly = cells.filter(c=>c.status==="OCCUPIED").length;
  const emptySlots = cells.filter(c=>c.status==="EMPTY").length;
  const maintSlots = cells.filter(c=>c.status==="MAINTENANCE").length;
  const occupancyPct = totalSlots>0?Math.round(occupiedSlots/totalSlots*100):0;

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
        description="탭1: 벡터 도면 데이터(BOUNDARY·BUILDINGS·ROADS) 등록 + Canvas 미리보기. 탭2: Zone별 Lot 슬롯 드래그 배치."
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
          <div className="w-80 shrink-0 space-y-5">
            <div>
              <FieldHeader title="A. 부지 외곽 (BOUNDARY)" moduleRef="FNC-LOC-020"/>
              <label className={labelCls}>pts — JSON 배열 [[x,y],...]</label>
              <textarea value={boundaryText} onChange={e=>{setBoundaryText(e.target.value);setSaved1(false);}} rows={4}
                className="w-full bg-[#131313] border border-white/10 px-3 py-2 text-[10px] text-white/80 font-mono focus:outline-none focus:border-[#00912F] resize-none"/>
              <p className="text-[9px] font-label text-white/25 mt-1">최소 3점, 닫힌 폴리곤 권장</p>
            </div>
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
                  </div>
                ))}
                <button onClick={()=>setRoads(prev=>[...prev,{pts:[[0,0],[100,100]],w:20,ptsText:"[[0,0],[100,100]]"}])} className="w-full py-2 text-[10px] font-label uppercase tracking-widest text-white/30 border border-dashed border-white/10 hover:border-white/30 hover:text-white/50 transition-colors">
                  + 도로 추가
                </button>
              </div>
            </div>
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
            <div className="flex gap-2 pt-2">
              <button onClick={()=>{renderCanvas();setSaved1(true);}} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-xs hover:opacity-90">
                저장 ▶
              </button>
              {saved1 && <span className="self-center text-[#00912F] text-[10px] font-label uppercase tracking-widest">저장 완료</span>}
            </div>
          </div>
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
        <div className="flex gap-6">
          {/* 좌: 그리드 영역 */}
          <div className="flex-1 min-w-0">
            <FieldHeader title="E. Zone·Lot 슬롯 배치" moduleRef="FNC-LOC-022"/>

            {/* Zone 선택 */}
            <div className="flex items-center gap-4 mb-4">
              <div>
                <label className={labelCls}>Zone 선택</label>
                <select
                  value={selectedZoneId}
                  onChange={e=>handleZoneChange(e.target.value)}
                  className="bg-[#131313] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F]"
                >
                  {ZONE_DEFS.map(z=>(
                    <option key={z.id} value={z.id}>{z.id} — {z.label}</option>
                  ))}
                </select>
              </div>
              <div className="self-end pb-0.5">
                <p className="text-[10px] font-label text-white/30">
                  {zoneDef.rows}행 × {zoneDef.cols}열 = 총 {totalSlots}슬롯
                </p>
              </div>
            </div>

            {/* KPI 요약 */}
            <div className="flex items-center gap-4 mb-4 px-4 py-3 bg-[#131313] border border-white/10 text-[10px] font-label">
              <span className="text-white/40">총 {totalSlots}슬롯</span>
              <span className="text-white/10">│</span>
              <span className="text-[#00912F]">점유 {occupiedOnly} ({occupancyPct}%)</span>
              <span className="text-white/10">│</span>
              <span className="text-white/40">빈칸 {emptySlots}</span>
              <span className="text-white/10">│</span>
              <span className="text-[#ef4444]">점검 {maintSlots}</span>
              <div className="ml-auto w-32 h-1.5 bg-[#1a1a1a]">
                <div className="h-full bg-[#00912F] transition-all" style={{width:`${occupancyPct}%`}}/>
              </div>
            </div>

            {/* 드래그 안내 */}
            <p className="text-[9px] font-label text-white/25 mb-3 uppercase tracking-widest">
              셀 드래그 → 슬롯 교환 &nbsp;|&nbsp; 셀 클릭 → 우측 상세 편집
            </p>

            {/* 슬롯 그리드 */}
            <div className="bg-[#1a1a1a] border border-white/10 p-4">
              <div
                className="grid gap-2"
                style={{gridTemplateColumns:`repeat(${zoneDef.cols},minmax(0,1fr))`}}
              >
                {cells.map((c, idx)=>{
                  const isDragOver = dragOverIndex===idx;
                  const isSelected = c.id===selectedCellId;
                  const shortId = c.id.split("-").slice(-2).join("-");
                  return (
                    <div
                      key={c.id}
                      draggable
                      onDragStart={()=>handleDragStart(idx)}
                      onDragOver={e=>handleDragOver(e,idx)}
                      onDrop={e=>handleDrop(e,idx)}
                      onDragEnd={handleDragEnd}
                      onClick={()=>{ setSelectedCellId(c.id); setSaved2(false); }}
                      className={[
                        "h-16 flex flex-col items-center justify-center text-[9px] font-label font-bold transition-all cursor-grab active:cursor-grabbing select-none",
                        CELL_STYLE[c.status],
                        isSelected?"outline outline-2 outline-white/60 outline-offset-0":"",
                        isDragOver?"scale-105 brightness-125":"hover:scale-105",
                      ].join(" ")}
                    >
                      <span className="text-[9px] opacity-60">{shortId}</span>
                      {c.status==="OCCUPIED" && c.lotNo && (
                        <span className="text-[8px] text-[#00912F]/80 mt-0.5 truncate max-w-full px-1">{c.lotNo.slice(-8)}</span>
                      )}
                      {c.status==="MAINTENANCE" && (
                        <span className="text-[8px] text-[#ef4444]/60 mt-0.5">점검</span>
                      )}
                      {c.status==="DISABLED" && (
                        <span className="text-[8px] text-white/20 mt-0.5">비활성</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={()=>setSaved2(true)} className="bg-[#00912F] text-black font-label font-bold uppercase tracking-widest px-6 py-3 text-sm hover:opacity-90">
                배치 저장 ▶
              </button>
              {saved2 && <span className="self-center text-[#00912F] text-xs font-label uppercase tracking-widest">저장 완료</span>}
            </div>
          </div>

          {/* 우: 셀 상세 편집 패널 */}
          <div className="w-60 shrink-0">
            <FieldHeader title="F. 슬롯 상세 편집" moduleRef="FNC-LOC-023"/>
            {selectedCell ? (
              <div className="bg-[#131313] border border-white/10 p-4 space-y-4">
                <div>
                  <p className="font-label text-[9px] uppercase tracking-widest text-white/30 mb-1">위치 ID</p>
                  <p className="text-white text-[11px] font-label font-bold break-all">{selectedCell.id}</p>
                </div>

                <div>
                  <label className={labelCls}>상태</label>
                  <select
                    value={editStatus}
                    onChange={e=>setEditStatus(e.target.value as SlotStatus)}
                    className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F]"
                  >
                    {STATUS_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {editStatus==="OCCUPIED" && (
                  <>
                    <div>
                      <label className={labelCls}>Lot 번호</label>
                      <input
                        value={editLotNo}
                        onChange={e=>setEditLotNo(e.target.value)}
                        placeholder="LOT-20260501-001"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>자재 코드</label>
                      <input
                        value={editMaterial}
                        onChange={e=>setEditMaterial(e.target.value)}
                        placeholder="M-COIL-A"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>수량 (m)</label>
                      <input
                        type="number"
                        value={editQty}
                        onChange={e=>setEditQty(e.target.value)}
                        placeholder="1500"
                        className={inputCls}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={saveCellEdit}
                    className="flex-1 bg-[#00912F] text-black font-label font-bold uppercase tracking-widest py-2 text-[10px] hover:opacity-90"
                  >
                    저장
                  </button>
                  <button
                    onClick={clearCellEdit}
                    className="flex-1 bg-[#131313] border border-white/10 text-white/40 font-label uppercase tracking-widest py-2 text-[10px] hover:border-white/30"
                  >
                    초기화
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#131313] border border-white/10 p-4">
                <p className="text-white/20 text-[10px] font-label">슬롯을 클릭하면{"\n"}상세 편집 가능</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
