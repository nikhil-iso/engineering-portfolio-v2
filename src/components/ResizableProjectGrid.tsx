import { useState, useCallback, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { GripVertical, Lock, Unlock, RotateCcw, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────
interface GridItemLayout {
  id: string;
  colSpan: number; // 1–3
}

interface ResizableProjectGridProps {
  storageKey: string;
  items: { id: string; defaultColSpan?: number; node: ReactNode }[];
}

const COLS = 3;
const GAP = 24;
const MIN_SPAN = 1;
const MAX_COL_SPAN = 3;

// ── Helpers ──────────────────────────────────────────────────
function buildDefaultLayout(items: ResizableProjectGridProps["items"]): GridItemLayout[] {
  return items.map((item) => ({
    id: item.id,
    colSpan: Math.min(item.defaultColSpan ?? 1, MAX_COL_SPAN),
  }));
}

function mergeWithSaved(
  items: ResizableProjectGridProps["items"],
  saved: GridItemLayout[] | null
): GridItemLayout[] {
  if (!saved) return buildDefaultLayout(items);
  return items.map((item) => {
    const existing = saved.find((s) => s.id === item.id);
    return {
      id: item.id,
      colSpan: existing?.colSpan ?? Math.min(item.defaultColSpan ?? 1, MAX_COL_SPAN),
    };
  });
}

// ── Component ────────────────────────────────────────────────
const ResizableProjectGrid = ({ storageKey, items }: ResizableProjectGridProps) => {
  const [layout, setLayout] = useState<GridItemLayout[]>(() => buildDefaultLayout(items));
  const [locked, setLocked] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragSourceId, setDragSourceId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load layout from database on mount
  useEffect(() => {
    const loadFromDb = async () => {
      const { data } = await supabase
        .from("grid_layouts")
        .select("layout")
        .eq("id", storageKey)
        .maybeSingle();

      if (data?.layout) {
        setLayout(mergeWithSaved(items, data.layout as unknown as GridItemLayout[]));
      }
    };
    loadFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Check URL param for admin prompt
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).get("admin") === "true" && !isAdmin) {
        setShowPasswordPrompt(true);
      }
    } catch { /* ignore */ }
  }, [isAdmin]);

  // Debounced save to database
  const saveToDb = useCallback(
    (newLayout: GridItemLayout[]) => {
      if (!adminPassword) return;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(async () => {
        const { error } = await supabase.rpc("save_grid_layout" as any, {
          _id: storageKey,
          _layout: JSON.parse(JSON.stringify(newLayout)),
          _admin_password: adminPassword,
        });
        if (error) {
          console.error("Failed to save layout:", error);
          toast.error("Failed to save layout");
        }
      }, 800);
    },
    [adminPassword, storageKey]
  );

  // Verify admin password
  const handlePasswordSubmit = async () => {
    const { data, error } = await supabase.rpc("verify_admin_password" as any, {
      _password: password,
    });
    if (error || !data) {
      toast.error("Incorrect password");
      return;
    }
    setAdminPassword(password);
    setIsAdmin(true);
    setShowPasswordPrompt(false);
    setPassword("");
    toast.success("Admin mode enabled");
  };

  const resetLayout = useCallback(() => {
    const defaults = buildDefaultLayout(items);
    setLayout(defaults);
    saveToDb(defaults);
    toast.success("Layout reset to defaults");
  }, [items, saveToDb]);

  // ── Resize handler (column only) ────────────────────────────
  const startResize = useCallback(
    (id: string, e: React.PointerEvent) => {
      if (locked) return;
      e.preventDefault();
      e.stopPropagation();

      const gridEl = gridRef.current;
      if (!gridEl) return;

      const cardEl = (e.target as HTMLElement).closest("[data-grid-item]") as HTMLElement | null;
      if (!cardEl) return;

      const startX = e.clientX;
      const startRect = cardEl.getBoundingClientRect();
      const entry = layout.find((l) => l.id === id)!;
      const startColSpan = entry.colSpan;

      const gridRect = gridEl.getBoundingClientRect();
      const colWidth = (gridRect.width - GAP * (COLS - 1)) / COLS;

      const onMove = (me: PointerEvent) => {
        const dx = me.clientX - startX;
        setLayout((prev) => {
          const next = prev.map((l) => {
            if (l.id !== id) return l;
            const newWidth = startRect.width + dx;
            let newCol = Math.round(newWidth / (colWidth + GAP));
            newCol = Math.max(MIN_SPAN, Math.min(MAX_COL_SPAN, newCol));
            return { ...l, colSpan: newCol };
          });
          return next;
        });
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        // Save after resize ends
        setLayout((current) => {
          saveToDb(current);
          return current;
        });
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [layout, locked, saveToDb]
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
        saveToDb(ordered);
        return ordered;
      });
      setDragOverId(null);
      setDragSourceId(null);
    },
    [dragSourceId, locked, saveToDb]
  );

  const itemMap = new Map(items.map((item) => [item.id, item]));

  return (
    <div>
      {/* Password prompt modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Admin Access</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Enter password to edit layouts.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Password"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword("");
                }}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin controls — only visible when authenticated */}
      {isAdmin && (
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={resetLayout}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-destructive/40 transition-all duration-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Layout
          </button>
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
      )}

      <div
        ref={gridRef}
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridAutoRows: "auto",
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
              }}
            >
              <div
                className={`h-full w-full transition-all duration-200 ${
                  isDropTarget ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-background rounded-xl" : ""
                } ${!locked ? "select-none" : ""}`}
              >
                {item.node}
              </div>

              {!locked && (
                <>
                  <div className="absolute top-2 left-2 z-20 p-1 rounded bg-card/80 border border-border/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div
                    className="absolute top-0 right-0 w-3 h-full cursor-col-resize z-20 group/handle flex items-center justify-center"
                    onPointerDown={(e) => startResize(entry.id, e)}
                  >
                    <div className="w-1 h-12 rounded-full bg-primary/0 group-hover/handle:bg-primary/60 transition-colors" />
                  </div>

                  <div className="absolute top-2 right-2 z-20 text-[10px] font-mono text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 px-1.5 py-0.5 rounded border border-border/40">
                    {entry.colSpan}w
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
