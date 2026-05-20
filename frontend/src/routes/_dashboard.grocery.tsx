import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer, Share2, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { recipes } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/grocery")({ component: Grocery });

const groceryCategories: Record<string, { name: string; qty: string }[]> = {
  "Produce": [
    { name: "Cherry tomatoes", qty: "2 cups" },
    { name: "Cucumber", qty: "1" },
    { name: "Avocado", qty: "2" },
    { name: "Spinach", qty: "4 cups" },
    { name: "Sweet potato", qty: "4" },
    { name: "Banana", qty: "6" },
    { name: "Blueberries", qty: "2 cups" },
  ],
  "Proteins": [
    { name: "Salmon fillet", qty: "400g" },
    { name: "Chicken breast", qty: "600g" },
    { name: "Eggs", qty: "1 dozen" },
  ],
  "Grains & Bakery": [
    { name: "Quinoa", qty: "1 bag" },
    { name: "Brown rice", qty: "1 bag" },
    { name: "Sourdough bread", qty: "1 loaf" },
    { name: "Rolled oats", qty: "1 container" },
  ],
  "Dairy": [
    { name: "Greek yogurt", qty: "2 tubs" },
    { name: "Almond milk", qty: "1 carton" },
  ],
  "Pantry": [
    { name: "Tahini", qty: "1 jar" },
    { name: "Olive oil", qty: "1 bottle" },
    { name: "Soy sauce", qty: "1 bottle" },
    { name: "Almonds", qty: "1 bag" },
  ],
};

function Grocery() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const total = Object.values(groceryCategories).flat().length;
  const toggle = (k: string) => {
    const next = new Set(checked);
    next.has(k) ? next.delete(k) : next.add(k);
    setChecked(next);
  };

  return (
    <>
      <PageHeader title="Grocery list" subtitle={`${checked.size} of ${total} items checked • generated from this week's meal plan`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full"><RefreshCw className="mr-1 h-4 w-4" /> Regenerate</Button>
            <Button variant="outline" className="rounded-full" onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" /> Print</Button>
            <Button className="rounded-full"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
          </div>
        } />
      <div className="grid gap-6 p-4 md:grid-cols-2 md:p-8 lg:grid-cols-3">
        {Object.entries(groceryCategories).map(([cat, items]) => (
          <Card key={cat} className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display font-semibold">{cat}</h3>
              <Badge variant="secondary" className="rounded-full">{items.length}</Badge>
            </div>
            <ul className="space-y-1.5">
              {items.map(item => {
                const key = `${cat}-${item.name}`;
                const isChecked = checked.has(key);
                return (
                  <li key={key}>
                    <button onClick={() => toggle(key)} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted">
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition ${isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                        {isChecked && <Check className="h-3 w-3" />}
                      </span>
                      <span className={`flex-1 text-sm ${isChecked ? "text-muted-foreground line-through" : ""}`}>{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.qty}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
