import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, ChefHat, Sparkles, Target, BarChart3, ShoppingBasket, Check, Star, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useApp } from "@/context/AppContext";
import { testimonials, pricingTiers, faqs } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);

  const features = [
    { icon: ChefHat, title: "Personalized Meal Plans", desc: "Weekly plans tailored to your goals, allergies, and preferences." },
    { icon: Activity, title: "Calorie & Macro Tracking", desc: "Effortless logging with a 100k+ food database." },
    { icon: Target, title: "Goal-Based Coaching", desc: "Whether you cut, bulk, or maintain — we adapt to you." },
    { icon: BarChart3, title: "Progress Analytics", desc: "Beautiful charts for weight, habits, and nutrition trends." },
    { icon: ShoppingBasket, title: "Smart Grocery Lists", desc: "Auto-generated, categorized, and checklist-ready." },
    { icon: Sparkles, title: "Recipes You'll Love", desc: "Curated by dietitians, sorted by your tastes." },
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold">Nourish</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Stories</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" asChild className="hidden md:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/signup">Get started</Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {open && (
          <div className="border-t bg-background md:hidden">
            <nav className="container mx-auto flex flex-col gap-3 px-4 py-4">
              <a href="#features" onClick={() => setOpen(false)}>Features</a>
              <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
              <a href="#testimonials" onClick={() => setOpen(false)}>Stories</a>
              <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
              <Link to="/login">Sign in</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-6 w-fit rounded-full px-3 py-1">
              <Sparkles className="mr-1 h-3 w-3" /> Powered by science, designed for life
            </Badge>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Eat better. <span className="bg-gradient-to-r from-primary to-[color:var(--chart-2)] bg-clip-text text-transparent">Live brighter.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Personalized nutrition that adapts to your goals, schedule, and pantry. Plan meals, track macros, and feel your best — all in one calm app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full shadow-glow">
                <Link to="/signup">Start free — no card</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/dashboard">View live demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["👩", "🧑", "👨", "👩‍🦱"].map((e, i) => (
                  <div key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-background bg-secondary text-sm">{e}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-foreground">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-[color:var(--warning)] text-[color:var(--warning)]" />)}
                </div>
                <span>Loved by 200k+ healthy humans</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <Card className="overflow-hidden p-6 shadow-glow">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Today</div>
                  <div className="font-display text-xl font-semibold">Good morning, Alex</div>
                </div>
                <Badge className="rounded-full bg-[color:var(--success)] text-primary-foreground">On track</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Calories", value: "1,420", goal: "/ 2,000", color: "var(--chart-1)" },
                  { label: "Protein", value: "92g", goal: "/ 140g", color: "var(--chart-2)" },
                  { label: "Water", value: "1.4L", goal: "/ 2.5L", color: "var(--chart-3)" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-muted p-3">
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                    <div className="mt-1 font-display text-lg font-bold">{m.value}<span className="text-xs font-normal text-muted-foreground">{m.goal}</span></div>
                    <div className="mt-2 h-1.5 rounded-full bg-background">
                      <div className="h-full rounded-full" style={{ width: "70%", backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { meal: "Breakfast", item: "Berry Protein Smoothie", kcal: 290, emoji: "🥤" },
                  { meal: "Lunch", item: "Mediterranean Salmon Bowl", kcal: 520, emoji: "🥗" },
                  { meal: "Snack", item: "Greek yogurt + almonds", kcal: 240, emoji: "🥛" },
                ].map((m) => (
                  <div key={m.meal} className="flex items-center justify-between rounded-xl border bg-card p-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-xl">{m.emoji}</div>
                      <div>
                        <div className="text-xs text-muted-foreground">{m.meal}</div>
                        <div className="text-sm font-medium">{m.item}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{m.kcal} kcal</div>
                  </div>
                ))}
              </div>
            </Card>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-4 -top-4 hidden rounded-2xl bg-card p-3 shadow-soft md:block">
              <div className="text-xs text-muted-foreground">Streak</div>
              <div className="font-display text-2xl font-bold">🔥 12 days</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Features</Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Everything you need. Nothing you don't.</h2>
          <p className="mt-4 text-muted-foreground">A complete nutrition system in one calm, focused interface.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full p-6 transition-shadow hover:shadow-soft">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full">Stories</Badge>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Real results, real lives.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="mb-4 flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-[color:var(--warning)] text-[color:var(--warning)]" />)}
                </div>
                <p className="text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-lg">{t.avatar}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Pricing</Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Simple, transparent plans.</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={`relative p-8 ${tier.popular ? "border-primary shadow-glow" : ""}`}>
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">Most popular</Badge>
              )}
              <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-5xl font-bold">${tier.price}</span>
                <span className="mb-2 text-muted-foreground">/{tier.period}</span>
              </div>
              <Button asChild className="mt-6 w-full rounded-full" variant={tier.popular ? "default" : "outline"}>
                <Link to="/signup">{tier.cta}</Link>
              </Button>
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/30 py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 rounded-full">FAQ</Badge>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Questions, answered.</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-b">
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <Card className="overflow-hidden p-12 text-center gradient-primary text-primary-foreground">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Your healthiest self starts today.</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Join 200,000+ people building lasting habits with Nourish.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full">
            <Link to="/signup">Start your free trial</Link>
          </Button>
        </Card>
      </section>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg gradient-primary text-primary-foreground">
              <ChefHat className="h-4 w-4" />
            </div>
            <span className="font-display font-semibold">Nourish</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Nourish. Eat well, feel well.</p>
        </div>
      </footer>
    </div>
  );
}
