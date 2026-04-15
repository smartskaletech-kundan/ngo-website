import { useNavigate } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

export function adminLogout(navigate: ReturnType<typeof useNavigate>) {
  sessionStorage.removeItem("admin_auth");
  navigate({ to: "/xn--manage-anumaya-81h/login" });
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setAllowed(true);
    } else {
      navigate({ to: "/xn--manage-anumaya-81h/login" });
    }
    setChecked(true);
  }, [navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <Leaf
            className="w-12 h-12 text-primary mx-auto mb-4 animate-spin"
            style={{ animationDuration: "2s" }}
            aria-hidden="true"
          />
          <p className="text-muted-foreground font-body">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}
