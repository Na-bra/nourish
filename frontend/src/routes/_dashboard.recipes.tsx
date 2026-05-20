import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Clock, Users, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { recipes } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/_dashboard/recipes")({ component: Recipes });

function Recipes() {
  const { favorites, toggleFavorite, bookmarks, toggleBookmark } = useApp();
  return (
    <>
      <PageHeader title="Recipes" subtitle="Hand-picked, dietitian-approved meals." />
      <div className="grid gap-5 p-4 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
        {recipes.map(r => (
          <Card key={r.id} className="group overflow-hidden p-0 transition-shadow hover:shadow-soft">
            <Link to="/recipes/$id" params={{ id: r.id }} className="block">
              <div className="relative grid aspect-[4/3] place-items-center text-7xl gradient-hero">
                {r.emoji}
                <div className="absolute right-3 top-3 flex gap-1.5">
                  <button onClick={(e) => { e.preventDefault(); toggleBookmark(r.id); }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110">
                    <Bookmark className={`h-4 w-4 ${bookmarks.includes(r.id) ? "fill-foreground" : ""}`} />
                  </button>
                  <button onClick={(e) => { e.preventDefault(); toggleFavorite(r.id); }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110">
                    <Heart className={`h-4 w-4 ${favorites.includes(r.id) ? "fill-destructive text-destructive" : ""}`} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map(t => <Badge key={t} variant="secondary" className="rounded-full text-xs">{t}</Badge>)}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{r.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.time} min</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.servings}</span>
                  <span className="ml-auto font-semibold text-foreground">{r.calories} kcal</span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
