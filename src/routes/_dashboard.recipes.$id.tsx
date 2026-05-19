import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Heart, Clock, Users, Bookmark, ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recipes } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/_dashboard/recipes/$id")({ component: RecipeDetail });

function RecipeDetail() {
  const { id } = useParams({ from: "/_dashboard/recipes/$id" });
  const r = recipes.find(x => x.id === id);
  const { favorites, toggleFavorite, bookmarks, toggleBookmark } = useApp();

  if (!r) return (
    <div className="p-8">
      <p>Recipe not found.</p>
      <Button asChild className="mt-4"><Link to="/recipes">Back</Link></Button>
    </div>
  );

  return (
    <div>
      <div className="relative grid aspect-[16/6] place-items-center text-9xl gradient-hero">
        {r.emoji}
        <Button asChild variant="secondary" className="absolute left-4 top-4 rounded-full">
          <Link to="/recipes"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>
        </Button>
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-1.5">{r.tags.map(t => <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>)}</div>
            <h1 className="mt-3 font-display text-4xl font-bold">{r.name}</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">{r.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => toggleBookmark(r.id)}>
              <Bookmark className={`mr-1 h-4 w-4 ${bookmarks.includes(r.id) ? "fill-foreground" : ""}`} />
              {bookmarks.includes(r.id) ? "Saved" : "Save"}
            </Button>
            <Button className="rounded-full" onClick={() => toggleFavorite(r.id)}>
              <Heart className={`mr-1 h-4 w-4 ${favorites.includes(r.id) ? "fill-current" : ""}`} />
              {favorites.includes(r.id) ? "Favorited" : "Favorite"}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <Stat icon={Clock} label="Time" value={`${r.time} min`} />
          <Stat icon={Users} label="Servings" value={`${r.servings}`} />
          <Stat icon={Flame} label="Calories" value={`${r.calories}`} />
          <Stat label="Difficulty" value={r.difficulty} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-1">
            <h3 className="font-display text-lg font-semibold">Ingredients</h3>
            <ul className="mt-4 space-y-2">
              {r.ingredients.map((i, idx) => (
                <li key={idx} className="flex items-start gap-2 border-b py-2 text-sm last:border-0">
                  <span className="text-primary">•</span>
                  <span className="flex-1">{i.food}</span>
                  <span className="text-muted-foreground">{i.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-muted p-4">
              <h4 className="text-sm font-semibold">Nutrition (per serving)</h4>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div><div className="font-display text-lg font-bold">{r.macros.protein}g</div><div className="text-xs text-muted-foreground">Protein</div></div>
                <div><div className="font-display text-lg font-bold">{r.macros.carbs}g</div><div className="text-xs text-muted-foreground">Carbs</div></div>
                <div><div className="font-display text-lg font-bold">{r.macros.fat}g</div><div className="text-xs text-muted-foreground">Fat</div></div>
              </div>
            </div>
          </Card>
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Instructions</h3>
            <ol className="mt-4 space-y-4">
              {r.steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <p className="pt-1">{s}</p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <Card className="p-4 text-center">
      {Icon && <Icon className="mx-auto mb-1 h-5 w-5 text-primary" />}
      <div className="font-display text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </Card>
  );
}
