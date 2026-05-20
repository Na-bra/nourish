import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

type Form = { email: string; password: string };

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>();
  const navigate = useNavigate();
  const onSubmit = async (_: Form) => {
    await new Promise(r => setTimeout(r, 600));
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your journey."
      footer={<>Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@nourish.app" className="mt-1.5" {...register("email", { required: "Required" })} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6 chars" } })} />
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
