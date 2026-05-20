import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({ component: Forgot });

function Forgot() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string }>();
  const [sent, setSent] = useState(false);
  const onSubmit = async () => { await new Promise(r => setTimeout(r, 500)); setSent(true); };
  return (
    <AuthShell title="Reset password" subtitle="We'll email you a secure reset link."
      footer={<>Remembered it? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></>}>
      {sent ? (
        <div className="rounded-2xl border bg-card p-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-6 w-6" /></div>
          <h3 className="mt-4 font-display text-lg font-semibold">Check your inbox</h3>
          <p className="mt-1 text-sm text-muted-foreground">If an account exists, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5" {...register("email", { required: true })} />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
