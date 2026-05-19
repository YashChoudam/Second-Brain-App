import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { loginUser, signupUser } from "../api";

interface AuthPageProps {
  mode: "login" | "signup";
}

export function AuthPage(props: AuthPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = props.mode === "signup";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await signupUser({ email, username, password });
        navigate("/login");
        return;
      }

      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2">
          <Brain size={26} className="text-purple-600" />
          <h1 className="text-xl font-bold text-gray-900">Second Brain</h1>
        </div>

        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          {isSignup ? "Create account" : "Login"}
        </h2>

        <div className="flex flex-col gap-4">
          {isSignup && (
            <Input
              label="Username"
              value={username}
              placeholder="yash"
              onChange={setUsername}
            />
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={setEmail}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={setPassword}
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6">
          <Button
            variant="primary"
            size="lg"
            text={loading ? "Please wait" : isSignup ? "Sign Up" : "Login"}
            onclick={() => {}}
          />
        </div>

        <p className="mt-5 text-sm text-gray-600">
          {isSignup ? "Already have an account? " : "New here? "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            {isSignup ? "Login" : "Create account"}
          </Link>
        </p>
      </form>
    </div>
  );
}
