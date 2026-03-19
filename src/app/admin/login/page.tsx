"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });
      
      if (signInError) {
        setError(signInError.message || "Invalid credentials");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">theDBot Admin</h1>
          <p className="text-gray-400">Sign in to manage tasks and projects</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm text-center">{error}</div>}
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="admin@thedbot.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
