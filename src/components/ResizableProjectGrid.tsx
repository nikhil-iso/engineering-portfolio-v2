import { useState, useCallback, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { GripVertical, Lock, Unlock } from "lucide-react";

// ── Types ────────────────────────────────────────────────────
interface GridItemLayout {
  id: string;
  colSpan: number; // 1–3
  rowSpan: number; // 1–3
}

interface ResizableProjectGridProps {
  storageKey: string;
  items: { id: string; defaultColSpan?: number; node: ReactNode }[];
}

const COLS = 3;
const ROW_BASE_PX = 260; // base height of 1 row-span unit
const GAP = 24;
const MIN_SPAN = 1;
const MAX_COL_SPAN = 3;
const MAX_ROW_SPAN = 3;

// ── Helpers ──────────────────────────────────────────────────
function loadLayout(key: string): GridItemLayout[] | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLayout(key: string, layout: GridItemLayout[]) {
  localStorage.setItem(key, JSON.stringify(layout));
}

function buildInitialLayout(
  items: ResizableProjectGridProps["items"],
  saved: GridItemLayout[] | null
): GridItemLayout[] {
  return items.map((item) => {
    const existing = saved?.find((s) => s.id === item.id);
    return {
      id: item.id,
      colSpan: existing?.colSpan ?? Math.min(item.defaultColSpan ?? 1, MAX_COL_SPAN),
      rowSpan: existing?.rowSpan ?? 1,
    };
  });
}

// ── Component ────────────────────────────────────────────────
const ResizableProjectGrid = ({ storageKey, items }: ResizableProjectGridProps) => {
  const saved = useRef(loadLayout(storageKey));
  const [layout, setLayout] = useState<GridItemLayout[]>(() =>
    buildInitialLayout(items, saved.current)
  );
  const [locked, setLocked] = useState(true);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragSourceId, setDragSourceId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Persist on change
  useEffect(() => {
    saveLayout(storageKey, layout);
  }, [layout, storageKey]);

  // Sync if items list changes
  useEffect(() => {
    setLayout((prev) => buildInitialLayout(items, prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // ── Resize handler (pointer-based) ─────────────────────────
  const startResize = useCallback(
    (id: string, direction: "col" | "row" | "both", e: React.PointerEvent) => {
      if (locked) return;
      e.preventDefault();
      e.stopPropagation();

      const gridEl = gridRef.current;
      if (!gridEl) return;

      const cardEl = (e.target as HTMLElement).closest("[data-grid-item]") as HTMLElement | null;
      if (!cardEl) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startRect = cardEl.getBoundingClientRect();
      const entry = layout.find((l) => l.id === id)!;
      const startColSpan = entry.colSpan;
      const startRowSpan = entry.rowSpan;

      // Compute column width from grid
      const gridRect = gridEl.getBoundingClientRect();
      const colWidth = (gridRect.width - GAP * (COLS - 1)) / COLS;

      const onMove = (me: PointerEvent) => {
        const dx = me.clientX - startX;
        const dy = me.clientY - startY;

        setLayout((prev) =>
          prev.map((l) => {
            if (l.id !== id) return l;
            let newCol = startColSpan;
            let newRow = startRowSpan;

            if (direction === "col" || direction === "both") {
              const newWidth = startRect.width + dx;
              newCol = Math.round(newWidth / (colWidth + GAP));
              newCol = Math.max(MIN_SPAN, Math.min(MAX_COL_SPAN, newCol));
            }
            if (direction === "row" || direction === "both") {
              const newHeight = startRect.height + dy;
              newRow = Math.round(newHeight / (ROW_BASE_PX + GAP));
              newRow = Math.max(MIN_SPAN, Math.min(MAX_ROW_SPAN, newRow));
            }
            return { ...l, colSpan: newCol, rowSpan: newRow };
          })
        );
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [layout, locked]
  );

  // ── Drag-to-reorder handlers ──────────────────────────────
  const handleDragStart = useCallback(
    (id: string) => {
      if (locked) return;
      setDragSourceId(id);
    },
    [locked]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      if (locked) return;
      e.preventDefault();
      setDragOverId(id);
    },
    [locked]
  );

  const handleDrop = useCallback(
    (targetId: string) => {
      if (locked || !dragSourceId || dragSourceId === targetId) {
        setDragOverId(null);
        setDragSourceId(null);
        return;
      }
      setLayout((prev) => {
        const ordered = [...prev];
        const srcIdx = ordered.findIndex((l) => l.id === dragSourceId);
        const tgtIdx = ordered.findIndex((l) => l.id === targetId);
        if (srcIdx === -1 || tgtIdx === -1) return prev;
        const [moved] = ordered.splice(srcIdx, 1);
        ordered.splice(tgtIdx, 0, moved);
        return ordered;
      });
      setDragOverId(null);
      setDragSourceId(null);
    },
    [dragSourceId, locked]
  );

  // Map items by id for lookup
  const itemMap = new Map(items.map((item) => [item.id, item]));

  return (
    <div>
      {/* Lock toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLocked((l) => !l)}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
            locked
              ? "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              : "border-primary/60 text-primary bg-primary/10"
          }`}
        >
          {locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          {locked ? "Unlock Layout" : "Editing Layout"}
        </button>
      </div>

      <div
        ref={gridRef}
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridAutoRows: `${ROW_BASE_PX}px`,
        }}
      >
        {layout.map((entry) => {
          const item = itemMap.get(entry.id);
          if (!item) return null;
          const isDropTarget = dragOverId === entry.id && dragSourceId !== entry.id;

          return (
            <motion.div
              key={entry.id}
              data-grid-item
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              draggable={!locked}
              onDragStart={() => handleDragStart(entry.id)}
              onDragOver={(e: any) => handleDragOver(e, entry.id)}
              onDragEnd={() => {
                setDragOverId(null);
                setDragSourceId(null);
              }}
              onDrop={() => handleDrop(entry.id)}
              className="relative group"
              style={{
                gridColumn: `span ${entry.colSpan}`,
                gridRow: `span ${entry.rowSpan}`,
              }}
            >
              {/* Card content — fills the cell */}
              <div
                className={`h-full w-full transition-all duration-200 ${
                  isDropTarget ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-background rounded-xl" : ""
                } ${!locked ? "select-none" : ""}`}
              >
                {item.node}
              </div>

              {/* ── Resize handles (only when unlocked) ─── */}
              {!locked && (
                <>
                  {/* Drag grip */}
                  <div className="absolute top-2 left-2 z-20 p-1 rounded bg-card/80 border border-border/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Right edge */}
                  <div
                    className="absolute top-0 right-0 w-3 h-full cursor-col-resize z-20 group/handle flex items-center justify-center"
                    onPointerDown={(e) => startResize(entry.id, "col", e)}
                  >
                    <div className="w-1 h-12 rounded-full bg-primary/0 group-hover/handle:bg-primary/60 transition-colors" />
                  </div>

                  {/* Bottom edge */}
                  <div
                    className="absolute bottom-0 left-0 h-3 w-full cursor-row-resize z-20 group/handle flex items-center justify-center"
                    onPointerDown={(e) => startResize(entry.id, "row", e)}
                  >
                    <div className="h-1 w-12 rounded-full bg-primary/0 group-hover/handle:bg-primary/60 transition-colors" />
                  </div>

                  {/* Corner handle */}
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-30 group/handle flex items-end justify-end"
                    onPointerDown={(e) => startResize(entry.id, "both", e)}
                  >
                    <div className="w-3 h-3 rounded-sm border-r-2 border-b-2 border-primary/0 group-hover/handle:border-primary/60 transition-colors mb-0.5 mr-0.5" />
                  </div>

                  {/* Size indicator */}
                  <div className="absolute top-2 right-2 z-20 text-[10px] font-mono text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-1.5 py-0.5 rounded border border-border/40">
                    {entry.colSpan}×{entry.rowSpan}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ResizableProjectGrid;
