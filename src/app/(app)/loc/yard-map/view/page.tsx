"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

// ── 타입 ──────────────────────────────────────────
type SlotStatus = "가용" | "점유" | "만재" | "정비" | "이동대기중";
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

function mkLots(rx:number, ry:number, rw:number, rh:number, cols:number, rows:number, zoneId:string): Lot[] {
  const lots:Lot[] = [], pad=4;
  const lw=(rw-pad*2)/cols, lh=(rh-pad*2)/rows;
  const MATS = ["M-COIL-A","M-COIL-B","M-COIL-C"];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const num=r*cols+c+1;
    const hash=(r*17+c*31)%10;
    const status:SlotStatus = hash<4?"가용":hash<7?"점유":hash<8?"만재":hash<9?"이동대기중":"정비";
    lots.push({
      x:rx+pad+c*lw+1, y:ry+pad+r*lh+1, w:lw-2, h:lh-2,
      occ:status!=="가용"&&status!=="정비",
      num, id:`Y-P3000-${zoneId}-${String(r+1).padStart(2,"0")}-${String(c+1).padStart(2,"0")}`,
      status,
      material: status!=="가용"&&status!=="정비"?MATS[hash%3]:undefined,
      lot: status!=="가용"&&status!=="정비"?`LOT-2026050${hash%9+1}-${String(hash*7+num).padStart(3,"0")}`:undefined,
      qty: status!=="가용"&&status!=="정비"?(hash*500+1000):undefined,
    });
  }
  return lots;
}

const SECTORS_INIT: Sector[] = [
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
  "가용":"#2a2a2a", "점유":"#00912F", "만재":"#f59e0b", "정비":"#ef4444", "이동대기중":"#f97316",
};

// ── 렌더러 ──────────────────────────────────────────
function renderYard(
  ctx: CanvasRenderingContext2D, cw:number, ch:number,
  zoom:number, panX:number, panY:number,
  highlight:string, agingTick:boolean, selectedId:string,
  sectors: Sector[],
  draggingId?: string,
  dragGhost?: { mapX:number; mapY:number; w:number; h:number; status:SlotStatus } | null
) {
  const dpr = window.devicePixelRatio||1;
  ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,cw,ch);
  ctx.save();
  const ox=cw/2+panX-(W*zoom)/2, oy=ch/2+panY-(H*zoom)/2;
  ctx.translate(ox,oy); ctx.scale(zoom,zoom);
  const lod=getLOD(zoom);

  ctx.fillStyle="#1a2410"; ctx.fillRect(-100,-100,W+200,H+200);
  drawPoly(ctx,BOUNDARY); ctx.fillStyle="#252520"; ctx.fill();
  ctx.save(); drawPoly(ctx,BOUNDARY); ctx.clip();
  ctx.strokeStyle="rgba(255,255,255,0.03)"; ctx.lineWidth=0.5/zoom;
  for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.restore();
  ctx.strokeStyle="#444"; ctx.lineWidth=3/zoom; ctx.setLineDash([6/zoom,4/zoom]);
  drawPoly(ctx,BOUNDARY); ctx.stroke(); ctx.setLineDash([]);
  ROADS.forEach(({pts,w})=>{
    ctx.strokeStyle="#333"; ctx.lineWidth=w/zoom; ctx.lineCap="round"; ctx.lineJoin="round";
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke();
    ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.lineWidth=1.5/zoom; ctx.setLineDash([10/zoom,8/zoom]);
    ctx.beginPath(); pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke(); ctx.setLineDash([]);
  });
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
  sectors.forEach(sec=>{
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
        const isDragging=lot.id===draggingId;
        let fill:string, stroke:string;
        if(lot.status==="가용"){ fill=h2r("#2a2a2a",0.9); stroke="#3a3a3a"; }
        else if(lot.status==="점유"){ fill=h2r("#00912F",0.35); stroke="#00912F"; }
        else if(lot.status==="만재"){ fill=h2r("#f59e0b",0.35); stroke="#f59e0b"; }
        else if(lot.status==="정비"){ fill=h2r("#ef4444",0.25); stroke="#ef4444"; }
        else { fill=(agingTick?h2r("#f97316",0.5):h2r("#f97316",0.2)); stroke="#f97316"; }
        ctx.globalAlpha = isDragging ? 0.25 : 1;
        ctx.fillStyle=fill; ctx.strokeStyle=isSel?"#fff":isHL?"#ffe":stroke; ctx.lineWidth=(isSel||isHL)?2/zoom:0.8/zoom;
        ctx.beginPath(); ctx.roundRect(lot.x,lot.y,lot.w,lot.h,1.5); ctx.fill(); ctx.stroke();
        ctx.globalAlpha = 1;
        if(isHL){ ctx.strokeStyle="#fff"; ctx.lineWidth=2/zoom; ctx.beginPath(); ctx.roundRect(lot.x-1/zoom,lot.y-1/zoom,lot.w+2/zoom,lot.h+2/zoom,2); ctx.stroke(); }
        if(lot.w*zoom>18){
          const lfs=Math.min(7/zoom,lot.h*0.38);
          ctx.fillStyle=lot.status==="가용"?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.85)";
          ctx.font=`${lfs}px sans-serif`;
          const n=String(lot.num);
          ctx.fillText(n,lot.x+lot.w/2-ctx.measureText(n).width/2,lot.y+lot.h/2+lfs*0.35);
        }
      });
    });
  });
  // ghost lot (드래그 중)
  if(dragGhost && lod===2){
    const {mapX,mapY,w,h,status}=dragGhost;
    const gx=mapX-w/2, gy=mapY-h/2;
    const ghostFill=STATUS_COLOR[status];
    ctx.save();
    ctx.globalAlpha=0.75;
    ctx.fillStyle=h2r(ghostFill,0.5);
    ctx.strokeStyle="#fff";
    ctx.lineWidth=1.5/zoom;
    ctx.setLineDash([4/zoom,3/zoom]);
    ctx.beginPath(); ctx.roundRect(gx,gy,w,h,1.5); ctx.fill(); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
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

function canvasToMap(cx:number, cy:number, cw:number, ch:number, zoom:number, panX:number, panY:number):[number,number]{
  const ox=cw/2+panX-(W*zoom)/2, oy=ch/2+panY-(H*zoom)/2;
  return [(cx-ox)/zoom,(cy-oy)/zoom];
}

function hitTest(mx:number, my:number, sectors:Sector[]): Lot|null {
  for(const sec of sectors) for(const z of sec.zones) for(const lot of z.lots){
    if(mx>=lot.x&&mx<=lot.x+lot.w&&my>=lot.y&&my<=lot.y+lot.h) return lot;
  }
  return null;
}

function hitTestEmptySlot(mx:number, my:number, excludeId:string, sectors:Sector[]): Lot|null {
  for(const sec of sectors) for(const z of sec.zones) for(const lot of z.lots){
    if(lot.id!==excludeId && lot.status==="가용")
      if(mx>=lot.x&&mx<=lot.x+lot.w&&my>=lot.y&&my<=lot.y+lot.h) return lot;
  }
  return null;
}

function findLotCenter(id:string, sectors:Sector[]):[number,number]|null {
  for(const sec of sectors) for(const z of sec.zones) for(const lot of z.lots){
    if(lot.id===id) return [lot.x+lot.w/2, lot.y+lot.h/2];
  }
  return null;
}

function findZoneForLot(id:string, sectors:Sector[]): {sec:Sector; zone:Zone} | null {
  for(const sec of sectors) for(const zone of sec.zones)
    if(zone.lots.some(l=>l.id===id)) return {sec, zone};
  return null;
}

// deep clone sectors
function cloneSectors(s:Sector[]): Sector[] {
  return s.map(sec=>({
    ...sec,
    zones: sec.zones.map(z=>({...z, lots:z.lots.map(l=>({...l}))}))
  }));
}

// ── 패킹리스트 타입 ──────────────────────────────────────
interface PackingInfo {
  fromId: string; fromZone: string; fromSec: string;
  toId:   string; toZone:   string; toSec:   string;
  lotNo?:string; material?:string; qty?:number;
  movedAt: string;
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
  const [sectors, setSectors] = useState<Sector[]>(()=>cloneSectors(SECTORS_INIT));
  const [packingInfo, setPackingInfo] = useState<PackingInfo|null>(null);
  const [isDraggingLot, setIsDraggingLot] = useState(false);

  const panDragRef  = useRef({active:false,lx:0,ly:0});
  const stateRef = useRef({zoom:0.52,pan:{x:0,y:0}});
  const sectorsRef = useRef<Sector[]>(sectors);
  const dragLotRef = useRef<{lot:Lot}|null>(null);
  const dragGhostRef = useRef<{mapX:number;mapY:number;w:number;h:number;status:SlotStatus}|null>(null);
  const [dragTick, setDragTick] = useState(0);

  useEffect(()=>{ stateRef.current={zoom,pan}; },[zoom,pan]);
  useEffect(()=>{ sectorsRef.current=sectors; },[sectors]);

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
    renderYard(
      ctx,cw,ch,
      stateRef.current.zoom,stateRef.current.pan.x,stateRef.current.pan.y,
      highlight,agingTick,selected?.id??"",
      sectorsRef.current,
      dragLotRef.current?.lot.id,
      dragGhostRef.current
    );
  },[highlight,agingTick,selected]);

  useEffect(()=>{render();},[zoom,pan,render,dragTick]);
  useEffect(()=>{window.addEventListener("resize",render);return()=>window.removeEventListener("resize",render);},[render]);

  // 마우스 이벤트
  useEffect(()=>{
    const wrap=wrapRef.current; if(!wrap) return;

    const onDown=(e:MouseEvent)=>{
      const rect=wrap.getBoundingClientRect();
      const cx=e.clientX-rect.left, cy=e.clientY-rect.top;
      const {zoom:z,pan:p}=stateRef.current;
      const cw=wrap.clientWidth, ch=wrap.clientHeight;

      // LOD2에서만 lot drag 가능
      if(getLOD(z)===2){
        const [mx,my]=canvasToMap(cx,cy,cw,ch,z,p.x,p.y);
        const hit=hitTest(mx,my,sectorsRef.current);
        if(hit && hit.status!=="가용" && hit.status!=="정비"){
          dragLotRef.current={lot:hit};
          dragGhostRef.current={mapX:mx,mapY:my,w:hit.w,h:hit.h,status:hit.status};
          setIsDraggingLot(true);
          return;
        }
      }
      panDragRef.current={active:true,lx:e.clientX,ly:e.clientY};
    };

    const onMove=(e:MouseEvent)=>{
      if(dragLotRef.current){
        const wrap=wrapRef.current; if(!wrap) return;
        const rect=wrap.getBoundingClientRect();
        const cx=e.clientX-rect.left, cy=e.clientY-rect.top;
        const {zoom:z,pan:p}=stateRef.current;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const [mx,my]=canvasToMap(cx,cy,cw,ch,z,p.x,p.y);
        const lot=dragLotRef.current.lot;
        dragGhostRef.current={mapX:mx,mapY:my,w:lot.w,h:lot.h,status:lot.status};
        setDragTick(t=>t+1);
        return;
      }
      if(!panDragRef.current.active) return;
      const dx=e.clientX-panDragRef.current.lx, dy=e.clientY-panDragRef.current.ly;
      panDragRef.current.lx=e.clientX; panDragRef.current.ly=e.clientY;
      setPan(p=>({x:p.x+dx,y:p.y+dy}));
    };

    const onUp=(e:MouseEvent)=>{
      // lot drag 종료
      if(dragLotRef.current){
        const wrap=wrapRef.current; if(!wrap) return;
        const rect=wrap.getBoundingClientRect();
        const cx=e.clientX-rect.left, cy=e.clientY-rect.top;
        const {zoom:z,pan:p}=stateRef.current;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const [mx,my]=canvasToMap(cx,cy,cw,ch,z,p.x,p.y);
        const fromLot=dragLotRef.current.lot;
        const emptyTarget=hitTestEmptySlot(mx,my,fromLot.id,sectorsRef.current);

        dragGhostRef.current=null;
        setDragTick(t=>t+1);

        if(emptyTarget){
          const fromInfo=findZoneForLot(fromLot.id,sectorsRef.current);
          const toInfo=findZoneForLot(emptyTarget.id,sectorsRef.current);
          setPackingInfo({
            fromId:fromLot.id, fromZone:fromInfo?.zone.id??"", fromSec:fromInfo?.sec.label??"",
            toId:emptyTarget.id, toZone:toInfo?.zone.id??"", toSec:toInfo?.sec.label??"",
            lotNo:fromLot.lot, material:fromLot.material, qty:fromLot.qty,
            movedAt: new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}),
          });
        }
        dragLotRef.current=null;
        setIsDraggingLot(false);
        return;
      }

      // pan 종료 + 클릭 판별
      if(!panDragRef.current.active) return;
      const moved=Math.abs(e.clientX-panDragRef.current.lx)+Math.abs(e.clientY-panDragRef.current.ly)<3;
      panDragRef.current.active=false;
      if(!moved){
        const rect=wrap.getBoundingClientRect();
        const cx=e.clientX-rect.left, cy=e.clientY-rect.top;
        const {zoom:z,pan:p}=stateRef.current;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const [mx,my]=canvasToMap(cx,cy,cw,ch,z,p.x,p.y);
        if(getLOD(z)===2){
          const hit=hitTest(mx,my,sectorsRef.current);
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
    let found:Lot|null=null;
    outer:
    for(const sec of sectorsRef.current) for(const z of sec.zones) for(const lot of z.lots){
      if(lot.id.includes(q)||lot.lot?.includes(q)||lot.material?.includes(q)){found=lot;break outer;}
    }
    if(found){
      setHighlight(found.id);
      setSelected(found);
      const center=findLotCenter(found.id,sectorsRef.current);
      if(center){
        const wrap=wrapRef.current; if(!wrap) return;
        const cw=wrap.clientWidth, ch=wrap.clientHeight;
        const {zoom:z}=stateRef.current;
        setPan({x:cw/2-center[0]*z, y:ch/2-center[1]*z});
      }
    } else { setHighlight(""); }
  },[]);

  // 바코드 스캔
  const fileRef = useRef<HTMLInputElement>(null);
  const handleScan = useCallback(async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]; if(!file) return;
    setScanMsg("스캔 중...");
    try{
      if("BarcodeDetector" in window){
        const bd=new (window as any).BarcodeDetector({formats:["qr_code","code_128","code_39","ean_13","data_matrix"]});
        const img=await createImageBitmap(file);
        const results=await bd.detect(img);
        if(results.length>0){ const val=results[0].rawValue; setScanMsg(`스캔 완료: ${val}`); doSearch(val); }
        else setScanMsg("바코드를 찾을 수 없습니다.");
      } else { setScanMsg("BarcodeDetector 미지원 — 아래 검색창에 직접 입력하세요."); }
    } catch{ setScanMsg("스캔 실패 — 직접 입력하세요."); }
    e.target.value="";
  },[doSearch]);

  // lot 이동 실행
  const confirmMove = useCallback(()=>{
    if(!packingInfo) return;
    const {fromId, toId} = packingInfo;
    setSectors(prev=>{
      const next=cloneSectors(prev);
      let fromLot:Lot|null=null, toLot:Lot|null=null;
      for(const sec of next) for(const z of sec.zones) for(const l of z.lots){
        if(l.id===fromId) fromLot=l;
        if(l.id===toId) toLot=l;
      }
      if(!fromLot||!toLot) return prev;
      const {status:fs,material:fm,lot:fl,qty:fq,occ:fo}=fromLot;
      fromLot.status=toLot.status; fromLot.material=toLot.material; fromLot.lot=toLot.lot; fromLot.qty=toLot.qty; fromLot.occ=toLot.occ;
      toLot.status=fs; toLot.material=fm; toLot.lot=fl; toLot.qty=fq; toLot.occ=fo;
      return next;
    });
    setSelected(null);
    setPackingInfo(null);
  },[packingInfo]);

  const lod=getLOD(zoom);
  const pct=Math.round(zoom*100);
  const wrapCursor=isDraggingLot?"grabbing":lod===2?"crosshair":"grab";

  return (
    <div>
      <PageHeader
        title="야적장 도면"
        nodeRef="SCR-LOC-010"
        status="PROTOTYPE"
        description="Canvas LOD 렌더러 — zoom 레벨에 따라 구역→Zone→Lot 자동 전환. Lot 레벨에서 드래그로 위치 이동. 이동 시 패킹리스트 발행."
      />

      {/* 상단 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          value={search}
          onChange={e=>doSearch(e.target.value)}
          placeholder="위치ID / Lot / 자재 검색..."
          className="bg-[#131313] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00912F] w-64"
        />
        <button
          onClick={()=>fileRef.current?.click()}
          className="bg-[#1a1a1a] border border-white/10 text-white/60 font-label uppercase tracking-widest px-4 py-2 text-xs hover:border-[#00912F]/50 transition-colors"
        >
          📷 바코드 스캔
        </button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan} />
        {scanMsg && <span className="text-xs font-label text-[#00912F]">{scanMsg}</span>}

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
        <div ref={wrapRef} className="flex-1 border border-white/10 rounded-sm overflow-hidden" style={{height:520,cursor:wrapCursor,position:"relative"}}>
          <canvas ref={canvasRef} style={{display:"block"}} />
          {lod<2 && (
            <div className="absolute bottom-3 left-3 text-[10px] font-label text-white/30 pointer-events-none">
              줌인하면 Zone → Lot 상세 표시
            </div>
          )}
          {lod===2 && !isDraggingLot && (
            <div className="absolute bottom-3 left-3 text-[10px] font-label text-white/30 pointer-events-none">
              점유 Lot을 드래그해 빈 슬롯으로 이동
            </div>
          )}
        </div>

        {/* 사이드바 */}
        <div className="w-52 shrink-0 space-y-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-4">
            <p className="font-label text-[10px] uppercase tracking-widest text-white/40 mb-3">범례</p>
            {([["가용","#2a2a2a"],["점유","#00912F"],["만재","#f59e0b"],["정비","#ef4444"],["이동대기중","#f97316"]] as [string,string][]).map(([s,c])=>(
              <div key={s} className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-4 rounded-sm border border-white/20" style={{background:c+"44"}}/>
                <span className="text-[10px] font-label text-white/50">{s}</span>
              </div>
            ))}
          </div>

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
              {!selected.material && <p className="text-white/30 text-[10px] font-label">{selected.status==="가용"?"비어있음":"점검 중"}</p>}
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/10 p-4">
              <p className="text-white/20 text-[10px] font-label">Lot을 클릭하면{"\n"}상세 표시</p>
            </div>
          )}

          <a href="/loc/yard-map/edit" className="block text-center bg-[#1a1a1a] border border-white/10 text-white/40 font-label uppercase tracking-widest px-4 py-2 text-[10px] hover:border-[#00912F]/50 transition-colors">
            [편집 모드 ▶]
          </a>
        </div>
      </div>

      {/* 패킹리스트 모달 */}
      {packingInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={()=>{dragLotRef.current=null;setIsDraggingLot(false);setPackingInfo(null);}}>
          <div className="bg-[#1a1a1a] border border-white/20 w-80 shadow-2xl" onClick={e=>e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="font-label text-[11px] uppercase tracking-widest text-[#00912F]">패킹리스트 발행</p>
              <button onClick={()=>{dragLotRef.current=null;setIsDraggingLot(false);setPackingInfo(null);}} className="text-white/30 hover:text-white text-lg leading-none">×</button>
            </div>
            {/* 이동 정보 */}
            <div className="px-5 py-4 border-b border-white/10">
              <p className="font-label text-[9px] uppercase tracking-widest text-white/30 mb-3">이동 정보</p>
              <div className="space-y-2 text-[10px] font-label">
                <div className="flex items-start gap-2">
                  <span className="text-white/30 w-10 shrink-0">From</span>
                  <div>
                    <p className="text-white/80 break-all">{packingInfo.fromId}</p>
                    <p className="text-white/40">{packingInfo.fromSec} › {packingInfo.fromZone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/30">
                  <span className="w-10 shrink-0"/>
                  <span>↓</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/30 w-10 shrink-0">To</span>
                  <div>
                    <p className="text-white/80 break-all">{packingInfo.toId}</p>
                    <p className="text-white/40">{packingInfo.toSec} › {packingInfo.toZone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/30 w-10 shrink-0">일시</span>
                  <span className="text-white/60">{packingInfo.movedAt}</span>
                </div>
              </div>
            </div>
            {/* Lot 정보 */}
            <div className="px-5 py-4 border-b border-white/10">
              <p className="font-label text-[9px] uppercase tracking-widest text-white/30 mb-3">Lot 정보</p>
              {packingInfo.lotNo ? (
                <div className="space-y-2 text-[10px] font-label">
                  <div className="flex gap-2"><span className="text-white/30 w-14 shrink-0">Lot 번호</span><span className="text-white/80">{packingInfo.lotNo}</span></div>
                  <div className="flex gap-2"><span className="text-white/30 w-14 shrink-0">자재</span><span className="text-white/80">{packingInfo.material}</span></div>
                  <div className="flex gap-2"><span className="text-white/30 w-14 shrink-0">수량</span><span className="text-white/80">{packingInfo.qty?.toLocaleString()} m</span></div>
                </div>
              ) : (
                <p className="text-[10px] font-label text-white/30">Lot 정보 없음</p>
              )}
            </div>
            {/* 버튼 */}
            <div className="flex gap-2 px-5 py-4">
              <button onClick={confirmMove} className="flex-1 bg-[#00912F] text-black font-label font-bold uppercase tracking-widest py-3 text-xs hover:opacity-90">
                확인·이동
              </button>
              <button onClick={()=>{dragLotRef.current=null;setIsDraggingLot(false);setPackingInfo(null);}} className="flex-1 bg-[#131313] border border-white/10 text-white/50 font-label uppercase tracking-widest py-3 text-xs hover:border-white/30">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
