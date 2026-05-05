"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { MENU, type MenuNode } from "@/data/menu";

// 현재 경로가 노드 또는 그 자손에 포함되는지 확인
function isNodeActive(node: MenuNode, pathname: string): boolean {
  if (node.url && (pathname === node.url || pathname.startsWith(node.url + "/"))) return true;
  return node.children?.some((c) => isNodeActive(c, pathname)) ?? false;
}

// 검색어 포함 여부 (라벨 + id)
function matchesSearch(node: MenuNode, q: string): boolean {
  const lower = q.toLowerCase();
  if (node.label.toLowerCase().includes(lower) || node.id.toLowerCase().includes(lower)) return true;
  return node.children?.some((c) => matchesSearch(c, q)) ?? false;
}

// 검색 결과에서 매칭 노드만 포함한 트리 반환
function filterTree(nodes: MenuNode[], q: string): MenuNode[] {
  return nodes
    .filter((n) => matchesSearch(n, q))
    .map((n) => ({
      ...n,
      children: n.children ? filterTree(n.children, q) : undefined,
    }));
}

interface TreeNodeProps {
  node: MenuNode;
  depth: number;          // 0 = 1Depth(도메인), 1 = 2Depth, 2 = 3Depth, ...
  pathname: string;
  forceExpand?: boolean;  // 검색 중에는 전부 펼침
}

function TreeNode({ node, depth, pathname, forceExpand }: TreeNodeProps) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const active = isNodeActive(node, pathname);
  // 기본 상태: 현재 경로 조상이면 펼침, 아니면 접힘
  const [open, setOpen] = useState(active);

  // 경로 변경 시 조상 노드 자동 펼침
  useEffect(() => {
    if (active) setOpen(true);
  }, [pathname, active]);

  const isCurrentPage = node.url === pathname;

  // 인라인 스타일로 depth별 들여쓰기 (Tailwind 동적 클래스 purge 우회)
  const indentPx = depth === 0 ? 16 : depth === 1 ? 28 : 28 + (depth - 1) * 14;
  const indentStyle = { paddingLeft: `${indentPx}px` };

  // depth별 텍스트 크기·opacity
  const textClass =
    depth === 0
      ? "font-label uppercase tracking-[0.1em] font-bold text-sm"
      : depth === 1
      ? "text-sm"
      : "text-xs opacity-90"; // 3Depth+는 살짝 작게

  // 노드 클릭: 자식 있으면 펼치기/접기, 없으면 URL 이동
  const handleToggle = () => {
    if (hasChildren) setOpen((v) => !v);
  };

  const shouldOpen = forceExpand ? true : open;

  return (
    <li>
      {/* 노드 행 */}
      {node.url && !hasChildren ? (
        <Link
          href={node.url}
          style={indentStyle}
          className={[
            "flex items-center gap-2 py-1.5 pr-4 transition-colors duration-150 border-l-2",
            isCurrentPage
              ? "text-primary-accent font-semibold bg-primary-accent/10 border-primary-accent"
              : "text-on-surface/70 hover:text-on-surface hover:bg-white/5 border-transparent",
          ].join(" ")}
        >
          {depth === 0 && node.icon && (
            <span className="material-symbols-outlined text-base leading-none shrink-0">
              {node.icon}
            </span>
          )}
          {/* 3Depth+ 앞에 작은 대시 표시 */}
          {depth >= 2 && (
            <span className={["shrink-0 leading-none", isCurrentPage ? "text-primary-accent" : "text-on-surface/30"].join(" ")}>
              —
            </span>
          )}
          <span className={textClass}>
            {node.label}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleToggle}
          style={indentStyle}
          className={[
            "flex items-center gap-2 w-full py-1.5 pr-4 transition-colors duration-150 border-l-2",
            active
              ? depth === 0
                ? "text-primary-accent border-transparent"
                : "text-on-surface/90 border-transparent"
              : "text-on-surface/70 hover:text-on-surface hover:bg-white/5 border-transparent",
          ].join(" ")}
        >
          {depth === 0 && node.icon && (
            <span className={[
              "material-symbols-outlined text-base leading-none shrink-0",
              active ? "text-primary-accent" : "",
            ].join(" ")}>
              {node.icon}
            </span>
          )}
          {/* 3Depth+ 앞에 작은 대시 표시 */}
          {depth >= 2 && (
            <span className={["shrink-0 leading-none text-xs", active ? "text-primary-accent" : "text-on-surface/30"].join(" ")}>
              —
            </span>
          )}
          <span className={["flex-1 text-left", textClass].join(" ")}>
            {node.label}
          </span>
          {hasChildren && (
            <span className={[
              "material-symbols-outlined text-sm leading-none shrink-0 transition-transform duration-150 opacity-50",
              shouldOpen ? "rotate-180" : "",
            ].join(" ")}>
              expand_more
            </span>
          )}
        </button>
      )}

      {/* 자식 재귀 렌더 */}
      {hasChildren && shouldOpen && (
        <ul>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              pathname={pathname}
              forceExpand={forceExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SideNav() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" 키로 검색창 포커스
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const displayMenu = query.trim()
    ? filterTree(MENU, query.trim())
    : MENU;

  return (
    <aside className="fixed left-0 top-16 z-40 w-72 h-[calc(100vh-64px)] bg-surface-container-lowest border-r border-surface-container-highest/10 flex flex-col">
      {/* 검색 입력 */}
      <div className="px-4 py-3 border-b border-surface-container-highest/10 shrink-0">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-2">
          <span className="material-symbols-outlined text-base text-on-surface/40 leading-none">
            search
          </span>
          <input
            ref={searchRef}
            type="text"
            placeholder="메뉴 검색... (/)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm text-on-surface placeholder:text-on-surface/30 outline-none w-full font-body"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-on-surface/40 hover:text-on-surface">
              <span className="material-symbols-outlined text-sm leading-none">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 메뉴 트리 (스크롤) */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {displayMenu.length === 0 ? (
          <p className="text-center text-on-surface/30 text-xs font-label uppercase tracking-wider py-8">
            검색 결과 없음
          </p>
        ) : (
          <ul>
            {displayMenu.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                depth={0}
                pathname={pathname}
                forceExpand={query.trim().length > 0}
              />
            ))}
          </ul>
        )}
      </nav>

    </aside>
  );
}
