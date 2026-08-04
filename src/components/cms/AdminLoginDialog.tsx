import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

/**
 * Hidden superadmin entry point: click the footer logo four times.
 */
export function useSecretUnlock(clicks = 4, windowMs = 4000) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [last, setLast] = useState(0);

  const register = () => {
    const now = Date.now();
    const next = now - last > windowMs ? 1 : count + 1;
    setLast(now);
    if (next >= clicks) {
      setCount(0);
      setOpen(true);
    } else {
      setCount(next);
    }
  };

  return { open, setOpen, register };
}

export function AdminLoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setError(null);
      setPassword("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError) {
      setError("Those credentials don't match an administrator account.");
      return;
    }
    onClose();
    navigate({ to: "/admin" });
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Administrator sign in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-7 text-card-foreground shadow-lift"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock aria-hidden className="size-4.5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold">Restricted access</h2>
            <p className="text-xs text-muted-foreground">Site administrators only</p>
          </div>
        </div>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Email
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
          />
        </label>

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
          />
        </label>

        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            disabled={busy}
            className="min-h-11 flex-1 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-full border border-border px-4 text-sm font-semibold text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function SecretAdminTrigger({ children }: { children: ReactNode }) {
  const { open, setOpen, register } = useSecretUnlock();
  return (
    <>
      <span onClick={register} className="inline-block cursor-default select-none">
        {children}
      </span>
      <AdminLoginDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
