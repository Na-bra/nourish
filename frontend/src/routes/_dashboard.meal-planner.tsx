import { createFileRoute } from "@tanstack/react-router";
import { useState, Fragment } from "react";
import { Heart, Printer, Plus, GripVertical, X, ChevronLeft, ChevronRight } from "lucide-react";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { recipes } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/_dashboard/meal-planner")({ component: MealPlanner });

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mealTypes = ["Breakfast", "Lunch", "Dinner"] as const;

type Slot = { id: string; recipeId: string; portion: number };
type Plan = Record<string, Record<string, Slot[]>>;

function makeInitial(): Plan {
  const plan: Plan = {};
  days.forEach((d, di) => {
    plan[d] = {};
    mealTypes.forEach((m, mi) => {
      const r = recipes[(di + mi) % recipes.length];
      plan[d][m] = [{ id: `${d}-${m}-${r.id}`, recipeId: r.id, portion: 1 }];
    });
  });
  return plan;
}

function MealPlanner() {
  const [plan, setPlan] = useState<Plan>(makeInitial);
  const { favorites, toggleFavorite } = useApp();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const [day, meal] = (active.id as string).split("|");
    const items = plan[day][meal];
    const oldIdx = items.findIndex(i => i.id === active.id.toString().split("|")[2]);
    const newIdx = items.findIndex(i => i.id === over.id.toString().split("|")[2]);
    if (oldIdx === -1 || newIdx === -1) return;
    setPlan({ ...plan, [day]: { ...plan[day], [meal]: arrayMove(items, oldIdx, newIdx) } });
  };

  const removeSlot = (day: string, meal: string, id: string) => {
    setPlan({ ...plan, [day]: { ...plan[day], [meal]: plan[day][meal].filter(s => s.id !== id) } });
  };
  const addRandom = (day: string, meal: string) => {
    const r = recipes[Math.floor(Math.random() * recipes.length)];
    const id = `${day}-${meal}-${r.id}-${Date.now()}`;
    setPlan({ ...plan, [day]: { ...plan[day], [meal]: [...plan[day][meal], { id, recipeId: r.id, portion: 1 }] } });
  };
  const changePortion = (day: string, meal: string, id: string, d: number) => {
    setPlan({ ...plan, [day]: { ...plan[day], [meal]: plan[day][meal].map(s => s.id === id ? { ...s, portion: Math.max(0.5, Math.min(4, s.portion + d)) } : s) } });
  };

  const dayCalories = (day: string) => mealTypes.reduce((sum, m) =>
    sum + plan[day][m].reduce((s, slot) => s + (recipes.find(r => r.id === slot.recipeId)!.calories * slot.portion), 0), 0);

  return (
    <>
      <PageHeader title="Weekly meal planner" subtitle="Drag to reorder. Click ＋ to add. Print for the fridge."
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" className="rounded-full">This week</Button>
            <Button variant="outline" className="rounded-full"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" className="rounded-full" onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" /> Print</Button>
          </div>
        } />

      <div className="overflow-x-auto p-4 md:p-8">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div className="grid min-w-[1100px] grid-cols-[100px_repeat(7,1fr)] gap-3">
            <div />
            {days.map(d => (
              <div key={d} className="px-2 text-center">
                <div className="font-display text-sm font-semibold">{d}</div>
                <div className="text-xs text-muted-foreground">{Math.round(dayCalories(d))} kcal</div>
              </div>
            ))}
            {mealTypes.map(meal => (
              <Fragment key={meal}>
                <div className="flex items-center font-display text-sm font-semibold text-muted-foreground">{meal}</div>
                {days.map(day => (
                  <Card key={`${day}-${meal}`} className="min-h-[140px] p-2">
                    <SortableContext items={plan[day][meal].map(s => `${day}|${meal}|${s.id}`)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-2">
                        {plan[day][meal].map(slot => {
                          const r = recipes.find(x => x.id === slot.recipeId)!;
                          return <SlotCard key={slot.id} id={`${day}|${meal}|${slot.id}`} recipe={r} portion={slot.portion}
                            fav={favorites.includes(r.id)} onFav={() => toggleFavorite(r.id)}
                            onRemove={() => removeSlot(day, meal, slot.id)}
                            onPortion={(d: number) => changePortion(day, meal, slot.id, d)} />;
                        })}
                      </div>
                    </SortableContext>
                    <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => addRandom(day, meal)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </DndContext>
      </div>
    </>
  );
}

function SlotCard({ id, recipe, portion, fav, onFav, onRemove, onPortion }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="group relative rounded-lg border bg-card p-2 text-xs">
      <div className="flex items-start gap-1.5">
        <button {...attributes} {...listeners} className="mt-0.5 cursor-grab text-muted-foreground active:cursor-grabbing">
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <span className="text-base leading-none">{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">{recipe.name}</div>
          <div className="text-[10px] text-muted-foreground">{Math.round(recipe.calories * portion)} kcal</div>
        </div>
        <button onClick={onRemove} className="opacity-0 transition group-hover:opacity-100"><X className="h-3 w-3" /></button>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button onClick={() => onPortion(-0.5)} className="grid h-5 w-5 place-items-center rounded border hover:bg-muted">-</button>
          <span className="text-[10px] font-medium">{portion}x</span>
          <button onClick={() => onPortion(0.5)} className="grid h-5 w-5 place-items-center rounded border hover:bg-muted">+</button>
        </div>
        <button onClick={onFav}>
          <Heart className={`h-3.5 w-3.5 ${fav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
      </div>
    </div>
  );
}
