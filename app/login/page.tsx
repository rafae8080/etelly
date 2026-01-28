"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        setAlert(error.message);
      } else if (data.user) {
        setAlert("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setAlert("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-800 via-gray-900 to-black relative py-8">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/images/navotas.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 bg-white px-6 py-3 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-md">
          <p className="text-gray-900 font-medium">{alert}</p>
          <button
            onClick={() => setAlert("")}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
      )}

      {/* Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex h-120">
        {/* Sign In Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center text-center"
          >
            <h1 className="font-bold text-3xl mb-2">Login</h1>
            <span className="text-xs text-gray-600 mb-6">
              Use your account credentials
            </span>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full border border-red-700 bg-red-600 text-white text-xs font-bold px-11 py-3 uppercase tracking-wider mt-4 transition-transform active:scale-95 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white flex items-center justify-center flex-col p-10">
          <img
            src="/images/logo.png"
            alt="E-Telly Logo"
            className="w-32 h-40 mb-4"
          />
          <h1 className="font-bold text-3xl mb-2">E-TELLY</h1>
          <p className="text-sm leading-5 tracking-wide text-center">
            Disaster preparedness and community resource sharing
          </p>
        </div>
      </div>
    </div>
  );
}
