import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { foods } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/food-database")({ component: FoodDB });

function FoodDB() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = ["All", ...Array.from(new Set(foods.map(f => f.category)))];
  const filtered = useMemo(() => foods.filter(f =>
    (cat === "All" || f.category === cat) && f.name.toLowerCase().includes(q.toLowerCase())
  ), [q, cat]);

  return (
    <>
      <PageHeader title="Food database" subtitle="Search 100,000+ foods with detailed nutrition facts." />
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search foods…" value={q} onChange={e => setQ(e.target.value)} className="pl-10" />
          </div>
          <Button variant="outline"><Filter className="mr-1 h-4 w-4" /> Filters</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(f => (
            <Card key={f.id} className="p-5 transition-shadow hover:shadow-soft">
              <div className="flex items-start gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-secondary text-3xl">{f.emoji}</div>
                <div className="flex-1">
                  <div className="font-display font-semibold">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.serving} • {f.category}</div>
                  <div className="mt-1 font-display text-lg font-bold">{f.calories} <span className="text-xs font-normal text-muted-foreground">kcal</span></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <Macro label="P" v={f.macros.protein} color="var(--chart-1)" />
                <Macro label="C" v={f.macros.carbs} color="var(--chart-2)" />
                <Macro label="F" v={f.macros.fat} color="var(--chart-4)" />
              </div>
            </Card>
          ))}
          {!filtered.length && <p className="col-span-full py-12 text-center text-muted-foreground">No foods found.</p>}
        </div>
      </div>
    </>
  );
}

function Macro({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="rounded-lg bg-muted p-2">
      <div className="text-[10px] uppercase text-muted-foreground" style={{ color }}>{label}</div>
      <div className="font-semibold">{v}g</div>
    </div>
  );
}
