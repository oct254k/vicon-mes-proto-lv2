"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

// ── 타입 ──────────────────────────────────────────
type SlotStatus = "EMPTY" | "OCCUPIED" | "FULL" | "MAINTENANCE" | "AGING";
interface Lot { x:number; y:number; w:number; h:number; occ:boolean; num:number; id:string; status:SlotStatus; material?:string; lot?:string; qty?:number; }
interface Zone { id:string; pts:number[][]; lots:Lot[]; }
interface Sector { id:string; label:string; pts:number[][]; zones:Zone[]; }

// ── 상수 ──────────────────────────────────────────
const W = 1100, H = 780;

const BOUNDARY: number[][] = [
  [30,60],[200,20],[480,10],[700,30],[900,15],[1060,80],
  [1080,200],[1070,420],[1050,600],[980,720],[800,760],
  [550,770],[300,750],[120,720],[40,580],[20,350],[30,60],
];

const BUILDINGS = [
  { type:"poly", pts:[[150,80],[340,80],[340,200],[280,240],[150,200]], label:"제1공장", color:"#6b6560" },
  { type:"poly", pts:[[700,40],[860,40],[880,150],[820,180],[700,160]], label:"제2공장", color:"#6b6560" },
  { type:"poly", pts:[[820,430],[980,410],[1000,560],[940,600],[820,580]], label:"제3공장", color:"#6b6560" },
  { type:"rect", x:430, y:600, w:180, h:120, label:"물류창고", color:"#7a7268" },
  { type:"rect", x:50,  y:580, w:100, h:100, label:"관리동",  color:"#8a8075" },
  { type:"circle", cx:620, cy:650, r:45, label:"저장탱크", color:"#6a6560" },
];

const ROADS = [
  { pts:[[200,20],[220,80],[350,80]], w:28 },
  { pts:[[350,80],[430,80],[430,310],[460,310]], w:24 },
  { pts:[[430,310],[430,600]], w:22 },
  { pts:[[880,150],[880,410],[820,430]], w:24 },
  { pts:[[700,160],[700,600],[620,605]], w:20 },
  { pts:[[350,80],[700,40]], w:20 },
];

// 목데이터 Lot 생성
function mkLots(rx:number, ry:number, rw:number, rh:number, cols:number, rows:number, zoneId:string): Lot[] {
  const lots:Lot[] = [], pad=4;
  const lw=(rw-pad*2)/cols, lh=(rh-pad*2)/rows;
  const MATS = ["M-COIL-A","M-COIL-B","M-COIL-C"];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const num=r*cols+c+1;
    const hash=(r*17+c*31)%10;
    const status:SlotStatus = hash<4?"EMPTY":hash<7?"OCCUPIED":hash<8?"FULL":hash<9?"AGING":"MAINTENANCE";
    lots.push({
      x:rx+pad+c*lw+1, y:ry+pad+r*lh+1, w:lw-2, h:lh-2,
      occ:status!=="EMPTY"&&status!=="MAINTENANCE",
      num, id:`Y-P3000-${zoneId}-${String(r+1).padStart(2,"0")}-${String(c+1).padStart(2,"0")}`,
      status,
      material: status!=="EMPTY"&&status!=="MAINTENANCE"?MATS[hash%3]:undefined,
      lot: status!=="EMPTY"&&status!=="MAINTENANCE"?`LOT-2026050${hash%9+1}-${String(hash*7+num).padStart(3,"0")}`:undefined,
      qty: status!=="EMPTY"&&status!=="MAINTENANCE"?(hash*500+1000):undefined,
    });
  }
  return lots;
}

const SECTORS: Sector[] = [
  { id:"A", label:"A 구역", pts:[[160,210],[420,210],[420,590],[340,590],[300,560],[160,560]], zones:[
    { id:"A-1", pts:[[170,220],[290,220],[290,380],[170,380]], lots:mkLots(170,220,120,160,3,4,"A-1") },
    { id:"A-2", pts:[[300,220],[415,220],[415,380],[300,380]], lots:mkLots(300,220,115,160,3,4,"A-2") },
    { id:"A-3", pts:[[170,395],[415,395],[415,580],[300,560],[170,560]], lots:mkLots(170,395,245,170,5,3,"A-3") },
  ]},
  { id:"B", label:"B 구역", pts:[[540,40],[690,40],[690,160],[700,160],[700,300],[540,300]], zones:[
    { id:"B-1", pts:[[550,50],[680,50],[680,170],[550,170]], lots:mkLots(550,50,130,120,3,3,"B-1") },
    { id:"B-2", pts:[[550,185],[690,185],[690,290],[550,290]], lots:mkLots(550,185,140,105,3,2,"B-2") },
  ]},
  { id:"C", label:"C 구역", pts:[[540,320],[810,320],[810,420],[700,430],[700,590],[540,590]], zones:[
    { id:"C-1", pts:[[550,330],[700,330],[700,420],[550,420]], lots:mkLots(550,330,150,90,4,2,"C-1") },
    { id:"C-2", pts:[[550,435],[690,435],[690,580],[550,580]], lots:mkLots(550,435,140,145,3,3,"C-2") },
  ]},
  { id:"D", label:"D 구역", pts:[[900,180],[1040,180],[1060,350],[1040,420],[900,420]], zones:[
    { id:"D-1", pts:[[910,190],[1030,190],[1045,310],[910,310]], lots:mkLots(910,190,130,120,3,3,"D-1") },
    { id:"D-2", pts:[[910,325],[1040,325],[1030,410],[910,410]], lots:mkLots(910,325,130,85,3,2,"D-2") },
  ]},
  { id:"E", label:"E 구역", pts:[[100,640],[390,640],[390,740],[120,740],[80,700]], zones:[
    { id:"E-1", pts:[[110,650],[270,650],[270,730],[110,730]], lots:mkLots(110,650,160,80,4,2,"E-1") },
    { id:"E-2", pts:[[280,650],[385,650],[385,730],[280,730]], lots:mkLots(280,650,105,80,3,2,"E-2") },
  ]},
];

// ── 유틸 ──────────────────────────────────────────
function h2r(hex:string, a:number) {
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function drawPoly(ctx:CanvasRenderingContext2D, pts:number[][]) {
  ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.closePath();
}
function polyCenter(pts:number[][]): [number,number] {
  return [pts.reduce((s,p)=>s+p[0],0)/pts.length, pts.reduce((s,p)=>s+p[1],0)/pts.length];
}
function getLOD(z:number) { return z<0.44?0:z<0.9?1:2; }

const LOD_LABELS = ["🗺 구역 레벨","📦 Zone 레벨","🔲 Lot 레벨"];
const LOD_COLORS = ["#7F77DD","#1D9E75","#378ADD"];

const STATUS_COLOR: Record<SlotStatus,string> = {
  EMPTY:"#2a2a2a", OCCUPIED:"#00912F", FULL:"#f59e0b", MAINTENANCE:"#ef4444", AGING:"#f97316",
};

// ── 렌더러 ──────────────────────────────────────────
function renderYard(
  ctx: CanvasRenderingContext2D, cw:number, ch:number,
  zoom:number, panX:number, panY:number,
  highlight:string, agingTick:boolean, selectedId:string
) {
  const dpr = window.devicePixelRatio||1;
  ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,cw,ch);
  ctx.save();
  const ox=cw/2+panX-(W*zoom)/2, oy=ch/2+panY-(H*zoom)/2;
  ctx.translate(ox,oy); ctx.scale(zoom,zoom);
  const lod=getLOD(zoom);

  // 외부 녹지
  ctx.fillStyle="#1a2410"; ctx.fillRect(-100,-100,W+200,H+200);
  // 부지 지면
  drawPoly(ctx,BOUNDARY); ctx.fillStyle="#252520"; ctx.fill();
  // 그리드 질감
  ctx.save(); drawPoly(ctx,BOUNDARY); ctx.clip();
  ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=0.5/zoom;
  for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.restore();
  // 외곽 펜스
  ctx.strokeStyle="#444"; ctx.lineWidth=3/zoom; ctx.setLineDash([6/zoom,4/zoom]);
  drawPoly(ctx,BOUNDARY); ctx.stroke(); ctx.setLineDash([]);
  // 도로
  ROADS.forEach(({pts,w})=>{
    ctx.strokeStyle="#333"; ctx.lineWidth=w/zoom; ctx.lineCap="round"; ctx.lineJoin="round";
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke();
    ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.lineWidth=1.5/zoom; ctx.setLineDash([10/zoom,8/zoom]);
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke(); ctx.setLineDash([]);
  });
  // 건물
  BUILDINGS.forEach(b=>{
    ctx.fillStyle=b.color; ctx.strokeStyle="#333"; ctx.lineWidth=1.5/zoom;
    if(b.type==="poly"){ drawPoly(ctx,(b as any).pts); ctx.fill(); ctx.stroke(); }
    else if(b.type==="rect"){ const br=b as any; ctx.beginPath(); ctx.roundRect(br.x,br.y,br.w,br.h,3); ctx.fill(); ctx.stroke(); }
    else if(b.type==="circle"){ const bc=b as any; ctx.beginPath(); ctx.arc(bc.cx,bc.cy,bc.r,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
    if(zoom>0.35){
      const fs=9/zoom; ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font=`${fs}px sans-serif`;
      const lbl=(b as any).label; const tw=ctx.measureText(lbl).width;
      const [bx,by]=b.type==="poly"?polyCenter((b as any).pts):b.type==="rect"?[(b as any).x+(b as any).w/2,(b as any).y+(b as any).h/2]:[(b as any).cx,(b as any).cy];
      ctx.fillText(lbl,bx-tw/2,by+fs*0.4);
    }
  });
  // Sector / Zone / Lot
  SECTORS.forEach(sec=>{
    ctx.fillStyle=h2r("#7F77DD",0.18); ctx.strokeStyle="#7F77DD"; ctx.lineWidth=2.5/zoom;
    drawPoly(ctx,sec.pts); ctx.fill(); ctx.stroke();
    const [cx,cy]=polyCenter(sec.pts);
    const fs=lod===0?18/zoom:12/zoom;
    ctx.fillStyle="#a09ae0"; ctx.font=`500 ${fs}px sans-serif`;
    ctx.fillText(sec.label,cx-ctx.measureText(sec.label).width/2,cy+fs*0.35);
    if(lod>=1) sec.zones.forEach(z=>{
      ctx.fillStyle=h2r("#1D9E75",0.18); ctx.strokeStyle="#1D9E75"; ctx.lineWidth=1.5/zoom;
      drawPoly(ctx,z.pts); ctx.fill(); ctx.stroke();
      const zfs=9/zoom; ctx.fillStyle="#1D9E75"; ctx.font=`500 ${zfs}px sans-serif`;
      ctx.fillText(z.id,z.pts[0][0]+4,z.pts[0][1]+zfs+2/zoom);
      if(lod===2) z.lots.forEach(lot=>{
        const isHL=!!(highlight&&lot.id===highlight);
        const isSel=lot.id===selectedId;
        let fill:string, stroke:string;
        if(lot.status==="EMPTY"){ fill=h2r("#2a2a2a",0.9); stroke="#3a3a3a"; }
        else if(lot.status==="OCCUPIED"){ fill=h2r("#00912F",0.35); stroke="#00912F"; }
        else if(lot.status==="FULL"){ fill=h2r("#f59e0b",0.35); stroke="#f59e0b"; }
        else if(lot.status==="MAINTENANCE"){ fill=h2r("#ef4444",0.25); stroke="#ef4444"; }
        else { fill=(agingTick?h2r("#f97316",0.5):h2r("#f97316",0.2)); stroke="#f97316"; }
        ctx.fillStyle=fill; ctx.strokeStyle=isSel?"#fff":isHL?"#ffe":stroke; ctx.lineWidth=(isSel||isHL)?2/zoom:0.8/zoom;
        ctx.beginPath(); ctx.roundRect(lot.x,lot.y,lot.w,lot.h,1.5); ctx.fill(); ctx.stroke();
        if(isHL){ ctx.strokeStyle="#fff"; ctx.lineWidth=2/zoom; ctx.beginPath(); ctx.roundRect(lot.x-1/zoom,lot.y-1/zoom,lot.w+2/zoom,lot.h+2/zoom,2); ctx.stroke(); }
        if(lot.w*zoom>18){
          const lfs=Math.min(7/zoom,lot.h*0.38);
          ctx.fillStyle=lot.status==="EMPTY"?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.85)";
          ctx.font=`${lfs}px sans-serif`;
          const n=String(lot.num);
          ctx.fillText(n,lot.x+lot.w/2-ctx.measureText(n).width/2,lot.y+lot.h/2+lfs*0.35);
        }
      });
    });
  });
  // 게이트
  ctx.fillStyle="#c8b97a"; ctx.strokeStyle="#8a7a3a"; ctx.lineWidth=2/zoom;
  ctx.beginPath(); ctx.roundRect(180,10,80,18,3); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#3a2a0a"; ctx.font=`bold ${8/zoom}px sans-serif`; ctx.fillText("MAIN GATE",192,22/zoom);
  // 나침반
  const[ncx,ncy,nr]=[W-40,50,18];
  ctx.fillStyle="rgba(30,30,30,0.85)"; ctx.beginPath(); ctx.arc(ncx,ncy,nr,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle="#555"; ctx.lineWidth=1/zoom; ctx.beginPath(); ctx.arc(ncx,ncy,nr,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle="#f97316"; ctx.font=`bold ${9/zoom}px sans-serif`; ctx.fillText("N",ncx-3/zoom,ncy-5/zoom);
  ctx.strokeStyle="#f97316"; ctx.lineWidth=1.5/zoom;
  ctx.beginPath(); ctx.moveTo(ncx,ncy-14); ctx.lineTo(ncx,ncy+14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ncx-10,ncy); ctx.lineTo(ncx+10,ncy); ctx.stroke();
  ctx.restore();
}

// 좌표 역변환 (canvas px → 도면 px)
function canvasToMap(cx:number, cy:number, cw:number, ch:number, zoom:number, panX:number, panY:number):[number,number]{
  const ox=cw/2+panX-(W*zoom)/2, oy=ch/2+panY-(H*zoom)/2;
  return [(cx-ox)/zoom,(cy-oy)/zoom];
}

function hitTest(mx:number, my:number): Lot|null {
  for(const sec of SECTORS) for(const z of sec.zones) for(const lot of z.lots){
    if(mx>=lot.x&&mx<=lot.x+lot.w&&my>=lot.y&&my<=lot.y+lot.h) return lot;
  }
  return null;
}

// 특정 lot ID → 도면 좌표 중심
function findLotCenter(id:string):[number,number]|null {
  for(const sec of SECTORS) for(const z of sec.zones) for(const lot of z.lots){
    if(lot.id===id) return [lot.x+lot.w/2, lot.y+lot.h/2];
  }
  return null;
}

// ── 컴포넌트 ──────────────────────────────────────────
export default function YardMapViewPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [zoom, setZoom]     = useState(0.52);
  const [pan,  setPan]      = useState({x:0,y:0});
  const [selected, setSelected] = useState<Lot|null>(null);
  const [highlight, setHighlight] = useState("");
  const [search, setSearch] = useState("");
  const [scanMsg, setScanMsg] = useState("");
  const [agingTick, setAgingTick] = useState(false);
  const dragRef  = useRef({active:false,lx:0,ly:0});
  const stateRef = useRef({zoom:0.52,pan:{x:0,y:0}});

  useEffect(()=>{ stateRef.current={zoom,pan}; },[zoom,pan]);

  // AGING 깜빡임 1Hz
  useEffect(()=>{
    const t=setInterval(()=>setAgingTick(v=>!v),1000);
    return()=>clearInterval(t);
  },[]);

  const render = useCallback(()=>{
    const canvas=canvasRef.current, wrap=wrapRef.current;
    if(!canvas||!wrap) return;
    const dpr=window.devicePixelRatio||1;
    const cw=wrap.clientWidth, ch=wrap.clientHeight;
    canvas.width=cw*dpr; canvas.height=ch*dpr;
    canvas.style.width=cw+"px"; canvas.style.height=ch+"px";
    const ctx=canvas.getContext("2d")!;
    renderYard(ctx,cw,ch,stateRef.current.zoom,stateRef.current.pan.x,stateRef.current.pan.y,highlight,agingTick,selected?.id??"");
  },[highlight,agingTick,selected]);

  useEffect(()=>{render();},[zoom,pan,render]);
  useEffect(()=>{window.addEventListener("resize",render);return()=>window.removeEventListener("resize",render);},[render]);

  // 마우스 이벤트
  useEffect(()=>{
    const wrap=wrapRef.current; if(!wrap) return;
    const onDown=(e:MouseEvent)=>{dragRef.current={active:true,lx:e.clientX,ly:e.clientY};};
    const onMove=(e:MouseEvent)=>{
      if(!dragRef.current.active) return;
      const dx=e.clientX-dragRef.current.lx, dy=e.clientY-dragRef.current.ly;
      dragRef.current.lx=e.clientX; dragRef.current.ly=e.clientY;
      setPan(p=>({x:p.x+dx,y:p.y+dy}));
    };
    const onUp=(e:MouseEvent)=>{
      if(!dragRef.current.active) return;
      const moved=Math.abs(e.clientX-dragRef.current.lx)+Math.abs(e.clientY-dragRef.current.ly)<3;
      dragRef.current.active=false;
      if(!moved) {
        // 클릭 → hit test
        const rect=wrap.getBoundingClientRect();
        const cx=e.clientX-rect.left, cy=e.clientY-rect.top;
        const {zoom:z,pan:p}=stateRef.current;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const [mx,my]=canvasToMap(cx,cy,cw,ch,z,p.x,p.y);
        if(getLOD(z)===2){
          const hit=hitTest(mx,my);
          setSelected(hit);
        }
      }
    };
    const onWheel=(e:WheelEvent)=>{e.preventDefault();setZoom(z=>Math.max(0.2,Math.min(3,z-e.deltaY*0.001)));};
    wrap.addEventListener("mousedown",onDown);
    window.addEventListener("mousemove",onMove);
    window.addEventListener("mouseup",onUp);
    wrap.addEventListener("wheel",onWheel,{passive:false});
    return()=>{
      wrap.removeEventListener("mousedown",onDown);
      window.removeEventListener("mousemove",onMove);
      window.removeEventListener("mouseup",onUp);
      wrap.removeEventListener("wheel",onWheel);
    };
  },[]);

  // 검색 → 하이라이트 + Pan
  const doSearch = useCallback((q:string)=>{
    setSearch(q);
    if(!q){setHighlight("");return;}
    // ID 직접 또는 lot_no 포함 검색
    let found:Lot|null=null;
    outer:
    for(const sec of SECTORS) for(const z of sec.zones) for(const lot of z.lots){
      if(lot.id.includes(q)||lot.lot?.includes(q)||lot.material?.includes(q)){found=lot;break outer;}
    }
    if(found){
      setHighlight(found.id);
      setSelected(found);
      // Pan to center
      const center=findLotCenter(found.id);
      if(center){
        const wrap=wrapRef.current; if(!wrap) return;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const {zoom:z}=stateRef.current;
        setPan({x:cw/2-center[0]*z, y:ch/2-center[1]*z});
      }
    } else { setHighlight(""); }
  },[]);

  // 바코드 스캔 (BarcodeDetector API)
  const fileRef = useRef<HTMLInputElement>(null);
  const handleScan = useCallback(async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]; if(!file) return;
    setScanMsg("스캔 중...");
    try{
      if("BarcodeDetector" in window){
        const bd=new (window as any).BarcodeDetector({formats:["qr_code","code_128","code_39","ean_13","data_matrix"]});
        const img=await createImageBitmap(file);
        const results=await bd.detect(img);
        if(results.length>0){
          const val=results[0].rawValue;
          setScanMsg(`스캔 완료: ${val}`);
          doSearch(val);
        } else { setScanMsg("바코드를 찾을 수 없습니다."); }
      } else {
        // BarcodeDetector 미지원 → 파일명에서 ID 추출 시도 또는 안내
        setScanMsg("BarcodeDetector 미지원 — 아래 검색창에 직접 입력하세요.");
      }
    } catch(err){ setScanMsg("스캔 실패 — 직접 입력하세요."); }
    e.target.value="";
  },[doSearch]);

  const lod=getLOD(zoom);
  const pct=Math.round(zoom*100);

  return (
    <div>
      <PageHeader
        title="야적장 도면"
        nodeRef="SCR-LOC-010"
        status="PROTOTYPE"
        description="Canvas LOD 렌더러 — zoom 레벨에 따라 구역→Zone→Lot 자동 전환. 드래그 Pan / 휠 Zoom. Lot 클릭 상세."
      />

      {/* 상단 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* 검색 */}
        <input
          value={search}
          onChange={e=>doSearch(e.target.value)}
          placeholder="위치ID / Lot / 자재 검색..."
          className="bg-[#131313] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F] w-64"
        />
        {/* 바코드 스캔 버튼 */}
        <button
          onClick={()=>fileRef.current?.click()}
          className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-4 py-2 text-xs hover:border-[#00912F]/50 transition-colors"
        >
          📷 바코드 스캔
        </button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan} />
        {scanMsg && <span className="text-xs font-label text-[#00912F]">{scanMsg}</span>}

        {/* zoom */}
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={()=>setZoom(z=>Math.max(0.2,z-0.15))} className="bg-[#1a1a1a] border border-white/10 text-white/60 px-3 py-2 text-sm hover:border-white/30">−</button>
          <input type="range" min={20} max={300} value={pct} onChange={e=>setZoom(Number(e.target.value)/100)} className="w-28" />
          <button onClick={()=>setZoom(z=>Math.min(3,z+0.15))} className="bg-[#1a1a1a] border border-white/10 text-white/60 px-3 py-2 text-sm hover:border-white/30">+</button>
          <span className="text-xs font-label text-white/40 w-10">{pct}%</span>
          <button onClick={()=>{setZoom(0.52);setPan({x:0,y:0});}} className="bg-[#1a1a1a] border border-white/10 text-white/50 font-label uppercase tracking-widest px-3 py-2 text-xs hover:border-white/30">초기화</button>
          <span className="text-xs font-label px-3 py-1 rounded" style={{background:h2r(LOD_COLORS[lod],0.15),color:LOD_COLORS[lod],border:`1px solid ${h2r(LOD_COLORS[lod],0.35)}`}}>
            {LOD_LABELS[lod]}
          </span>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex gap-4">
        {/* 캔버스 */}
        <div ref={wrapRef} className="flex-1 border border-white/10 rounded-sm overflow-hidden" style={{height:520,cursor:"grab",position:"relative"}}>
          <canvas ref={canvasRef} style={{display:"block"}} />
          {lod<2 && (
            <div className="absolute bottom-3 left-3 text-[10px] font-label text-white/30 pointer-events-none">
              줌인하면 Zone → Lot 상세 표시
            </div>
          )}
        </div>

        {/* 사이드바 */}
        <div className="w-52 shrink-0 space-y-4">
          {/* 범례 */}
          <div className="bg-[#1a1a1a] border border-white/10 p-4">
            <p className="font-label text-[10px] uppercase tracking-widest text-white/40 mb-3">범례</p>
            {([["EMPTY","#2a2a2a"],["OCCUPIED","#00912F"],["FULL","#f59e0b"],["MAINTENANCE","#ef4444"],["AGING","#f97316"]] as [string,string][]).map(([s,c])=>(
              <div key={s} className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-4 rounded-sm border border-white/20" style={{background:c+"44"}}/>
                <span className="text-[10px] font-label text-white/50">{s}</span>
              </div>
            ))}
          </div>

          {/* 선택 상세 */}
          {selected ? (
            <div className="bg-[#1a1a1a] border border-white/10 p-4">
              <p className="font-label text-[10px] uppercase tracking-widest mb-2" style={{color:STATUS_COLOR[selected.status]}}>{selected.status}</p>
              <p className="text-white text-xs font-bold font-label mb-3 break-all">{selected.id}</p>
              {selected.material && (
                <div className="space-y-2 text-[10px] font-label text-white/50">
                  <div><span className="text-white/30">자재</span><p className="text-white/80 mt-0.5">{selected.material}</p></div>
                  <div><span className="text-white/30">Lot</span><p className="text-white/80 mt-0.5">{selected.lot}</p></div>
                  <div><span className="text-white/30">수량</span><p className="text-white/80 mt-0.5">{selected.qty?.toLocaleString()} m</p></div>
                </div>
              )}
              {!selected.material && <p className="text-white/30 text-[10px] font-label">{selected.status==="EMPTY"?"비어있음":"점검 중"}</p>}
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/10 p-4">
              <p className="text-white/20 text-[10px] font-label">Lot을 클릭하면{"\n"}상세 표시</p>
            </div>
          )}

          {/* 편집 모드 링크 */}
          <a href="/loc/yard-map/edit" className="block text-center bg-[#1a1a1a] border border-white/10 text-white/40 font-label uppercase tracking-widest px-4 py-2 text-[10px] hover:border-[#00912F]/50 transition-colors">
            [편집 모드 ▶]
          </a>
        </div>
      </div>
    </div>
  );
}
