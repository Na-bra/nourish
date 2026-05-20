import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, Flame, Trophy, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { weightProgress, achievements, habits, weeklyProgress } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/_dashboard/progress")({ component: Progress });

function Progress() {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
  const bmiCat = bmi < 18.5 ? { label: "Underweight", color: "var(--info)" }
    : bmi < 25 ? { label: "Healthy", color: "var(--success)" }
    : bmi < 30 ? { label: "Overweight", color: "var(--warning)" }
    : { label: "Obese", color: "var(--destructive)" };

  return (
    <>
      <PageHeader title="Progress" subtitle="Track habits, streaks, and the trends that matter." />
      <div className="space-y-6 p-4 md:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h3 className="mb-4 font-display text-lg font-semibold">Weight trend (8 weeks)</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={weightProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="weight" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 5, fill: "var(--chart-1)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-1 flex items-center gap-2 font-display text-lg font-semibold"><Calculator className="h-5 w-5 text-primary" /> BMI Calculator</h3>
            <div className="mt-4 space-y-3">
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={e => setWeight(+e.target.value || 0)} className="mt-1" /></div>
              <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={e => setHeight(+e.target.value || 0)} className="mt-1" /></div>
            </div>
            <div className="mt-6 rounded-2xl border-2 p-5 text-center" style={{ borderColor: bmiCat.color }}>
              <div className="font-display text-5xl font-bold">{isFinite(bmi) ? bmi : "—"}</div>
              <div className="mt-1 text-sm font-medium" style={{ color: bmiCat.color }}>{bmiCat.label}</div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold"><Flame className="h-5 w-5 text-[color:var(--warning)]" /> Daily habits</h3>
            <div className="space-y-3">
              {habits.map(h => (
                <div key={h.id} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <div className="text-sm font-medium">{h.name}</div>
                    <div className="text-xs text-muted-foreground">🔥 {h.streak} day streak</div>
                  </div>
                  <Badge variant={h.today ? "default" : "secondary"} className="rounded-full">
                    {h.today ? "Done" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold"><Target className="h-5 w-5 text-primary" /> Weekly calories vs target</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="target" stroke="var(--muted-foreground)" strokeDasharray="4 4" fill="transparent" />
                  <Area type="monotone" dataKey="calories" stroke="var(--chart-2)" strokeWidth={2.5} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold"><Trophy className="h-5 w-5 text-[color:var(--warning)]" /> Achievements</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {achievements.map(a => (
              <div key={a.id} className={`rounded-2xl border-2 p-4 text-center transition ${a.unlocked ? "border-primary/30 bg-primary/5" : "border-dashed opacity-50"}`}>
                <div className="text-4xl">{a.icon}</div>
                <div className="mt-2 text-sm font-semibold">{a.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{a.description}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
