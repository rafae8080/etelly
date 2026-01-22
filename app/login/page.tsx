"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

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

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert("");

    // Validation
    if (registerPassword.length < 6) {
      setAlert("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setAlert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (registerPhone.length < 10) {
      setAlert("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerName,
            role: "barangay_official",
            phone_number: registerPhone,
          },
        },
      });

      if (error) {
        setAlert(error.message);
      } else if (data.user) {
        setAlert("Registration successful! Please login.");
        setIsSignUp(false);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPhone("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
      }
    } catch (error) {
      setAlert("An error occurred during registration");
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
      <div
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ${
          isSignUp ? "w-3xl min-h-140.5" : "w-3xl min-h-140.5"
        } max-w-[95%]`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-10"
              : "translate-x-0 opacity-0 z-0"
          }`}
        >
          <form
            onSubmit={handleRegister}
            className="bg-white flex flex-col items-center justify-center h-full px-12 text-center py-8 overflow-y-auto"
          >
            <h1 className="font-bold text-3xl mb-2">Create Account</h1>
            <span className="text-xs text-gray-600 mb-4">
              Fill in your details to register
            </span>

            <input
              type="text"
              placeholder="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              disabled={isLoading}
            />

            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              disabled={isLoading}
            />

            <input
              type="tel"
              placeholder="Phone Number (09XXXXXXXXX)"
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              pattern="[0-9]{11}"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              minLength={6}
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded"
              required
              minLength={6}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full border border-red-700 bg-red-600 text-white text-xs font-bold px-11 py-3 uppercase tracking-wider mt-4 transition-transform active:scale-95 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-sm mt-5">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-red-600 font-semibold hover:underline bg-transparent border-none cursor-pointer"
                disabled={isLoading}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "-translate-x-full opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <form
            onSubmit={handleLogin}
            className="bg-white flex flex-col items-center justify-center h-full px-12 text-center"
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

            <p className="text-sm mt-5">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-red-600 font-semibold hover:underline bg-transparent border-none cursor-pointer"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div
            className={`bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <h1 className="font-bold text-3xl mb-2">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wide my-5">
                To keep connected with us please login with your personal info
              </p>
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="rounded-full border-2 border-white bg-transparent text-white text-xs font-bold px-11 py-3 uppercase tracking-wider transition-transform active:scale-95 hover:bg-white hover:text-gray-800"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h1 className="font-bold text-3xl mb-2">Hello, Admin!</h1>
              <p className="text-sm leading-5 tracking-wide my-5">
                Enter your personal details and start managing E-Telly
              </p>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="rounded-full border-2 border-white bg-transparent text-white text-xs font-bold px-11 py-3 uppercase tracking-wider transition-transform active:scale-95 hover:bg-white hover:text-gray-800"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
