import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Leaf, Lock } from "lucide-react";
import { useState } from "react";

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Admin@anumaya",
};

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
      ) {
        sessionStorage.setItem("admin_auth", "true");
        router.navigate({ to: "/xn--manage-anumaya-81h" });
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.20 0.08 145) 0%, oklch(0.30 0.12 145) 40%, oklch(0.25 0.10 145) 100%)",
      }}
      data-ocid="admin.login.page"
    >
      {/* Decorative background leaves */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: "#A5D6A7" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#A5D6A7" }}
        />
      </div>

      {/* Login card */}
      <div
        className="relative w-full max-w-md rounded-2xl p-8 shadow-2xl animate-fade-in-up"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(165,214,167,0.25)",
        }}
        data-ocid="admin.login.card"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{
              background: "rgba(46,125,50,0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Leaf className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white leading-tight">
            Admin Login
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(165,214,167,0.8)" }}
          >
            MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN — Content Panel
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          data-ocid="admin.login.form"
        >
          {/* Username */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-username"
              className="block text-sm font-semibold font-body"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              autoComplete="username"
              required
              data-ocid="admin.login.username_input"
              className="w-full rounded-xl px-4 py-3 text-sm font-body outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(165,214,167,0.30)",
                color: "white",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(165,214,167,0.70)";
                e.target.style.background = "rgba(255,255,255,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(165,214,167,0.30)";
                e.target.style.background = "rgba(255,255,255,0.10)";
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold font-body"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                data-ocid="admin.login.password_input"
                className="w-full rounded-xl px-4 py-3 pr-12 text-sm font-body outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(165,214,167,0.30)",
                  color: "white",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(165,214,167,0.70)";
                  e.target.style.background = "rgba(255,255,255,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(165,214,167,0.30)";
                  e.target.style.background = "rgba(255,255,255,0.10)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                data-ocid="admin.login.toggle_password"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors duration-150"
                style={{ color: "rgba(165,214,167,0.7)" }}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.30)",
                color: "#fca5a5",
              }}
              data-ocid="admin.login.error_state"
              role="alert"
            >
              <Lock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !username || !password}
            data-ocid="admin.login.submit_button"
            className="w-full py-3 rounded-xl font-semibold font-body text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? "rgba(46,125,50,0.5)"
                : "linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(46,125,50,0.4)",
            }}
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* Footer note */}
        <p
          className="text-center text-xs font-body mt-6"
          style={{ color: "rgba(165,214,167,0.5)" }}
        >
          Secure admin access · MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN
        </p>
      </div>
    </div>
  );
}
