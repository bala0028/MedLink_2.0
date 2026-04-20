"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, Hospital } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // To handle callback URL if the user was redirected from a protected page
  // Note: in Next.js 14 app router, useSearchParams requires a Suspense boundary if statically generated,
  // but it's safe to use without suspense in client components that don't depend on static generation in most cases.
  // We'll wrap the form in Suspense later if needed, but NextAuth signIn default redirect ignores callbackUrl if we redirect manually.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        // Use hard navigation to guarantee the dashboard mounts with full session state
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f7f9fb] flex font-sans overflow-hidden">
      {/* Left side: Editorial Visual Sanctuary */}
      <div className="hidden lg:flex flex-col w-1/2 text-white p-10 xl:p-16 justify-between relative overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0 bg-[#001f28]">
          <img 
            src="/login_image.jpg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }} 
            alt="Medical Healthcare"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          {/* Soft Blue and Teal Gradient Overlay - The Clinical Sanctuary signature */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-[#00647c]/70 to-[#001f28]/95 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3 text-xl font-semibold mb-6 tracking-wide text-cyan-50">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <Hospital className="h-6 w-6 text-cyan-300" strokeWidth={1.5} />
            </div>
            MedLink
          </div>
          <h1 className="text-6xl font-extrabold tracking-tighter mt-24 mb-8 leading-[1.1] text-white">
            Advancing <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
              Healthcare
            </span> <br/>
            Through Clarity.
          </h1>
          <p className="text-xl text-cyan-100/80 max-w-md font-medium leading-relaxed">
            A premium digital environment designed to instill confidence and streamline patient care with breathable precision.
          </p>
        </div>
        
        {/* Atmospheric Depth / Ambient Shadows */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-full h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2 mt-8 animate-in fade-in duration-1000 delay-300">
          <p className="text-sm font-medium text-cyan-200/60 uppercase tracking-widest">Trust & Precision</p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-cyan-50/80">&copy; 2026 MedLink Healthcare Network</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
                <span className="text-xs font-semibold text-teal-100">HIPAA COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Glassmorphic Interface */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-y-auto h-full hidden-scrollbar">
        {/* Soft background ambient light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fb] to-[#eceef0] z-0"></div>
        
        <div className="w-full max-w-[420px] space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
          
          <div className="flex items-center gap-3 text-2xl font-bold mb-8 lg:hidden justify-center text-[#191c1e]">
            <div className="p-2.5 bg-[#00647c] rounded-2xl shadow-lg shadow-[#00647c]/20">
              <Hospital className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            MedLink
          </div>

          <div className="text-center mb-8 space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#191c1e] font-sans">Welcome back</h2>
            <p className="text-[#54647a] font-medium text-lg">Securely access the clinical portal</p>
          </div>

          <Card className="border-0 shadow-[0_24px_48px_-12px_rgba(0,31,40,0.08)] bg-white/70 backdrop-blur-2xl rounded-[1.5rem] overflow-hidden ring-1 ring-[#bdc8ce]/30">
            {/* The Gradient Rule - signature texture */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00647c] via-[#0891B2] to-[#2DD4BF]"></div>
            
            <CardHeader className="pt-6 px-8 pb-1">
              <CardTitle className="text-lg font-bold text-[#191c1e] tracking-tight">Sign In</CardTitle>
            </CardHeader>
            
            <CardContent className="p-8 pt-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {error && (
                  <div className="p-4 rounded-2xl bg-[#ffdad6]/50 border border-[#ffdad6] text-sm text-[#93000a] font-medium flex items-center shadow-sm">
                    <div className="w-1.5 h-full bg-[#ba1a1a] rounded-full mr-3 shrink-0 self-stretch"></div>
                    {error}
                  </div>
                )}

                <div className="space-y-2.5 group">
                  <label className="text-sm font-bold text-[#3e484d] tracking-wide" htmlFor="email">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="doctor@medlink.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-3xl border-transparent px-4 py-4 font-medium text-[#191c1e] placeholder:text-[#6e797e] bg-[#f2f4f6] hover:bg-[#eceef0] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#00647c]/30 focus-visible:shadow-[0_4px_16px_rgba(0,100,124,0.08)] transition-all duration-300"
                  />
                </div>

                <div className="space-y-2.5 group">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#3e484d] tracking-wide" htmlFor="password">
                      Password
                    </label>
                    <a href="#" className="text-sm font-bold text-[#00647c] hover:text-[#007f9d] transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-3xl border-transparent px-4 py-4 font-medium text-[#191c1e] bg-[#f2f4f6] hover:bg-[#eceef0] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#00647c]/30 focus-visible:shadow-[0_4px_16px_rgba(0,100,124,0.08)] transition-all duration-300 tracking-[0.2em] text-lg"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full rounded-2xl py-5 mt-2 text-[15px] font-bold text-white bg-gradient-to-br from-[#00647c] to-[#007f9d] shadow-[0_8px_20px_-6px_rgba(0,100,124,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(0,100,124,0.4)] hover:brightness-110 border-0 transition-all active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-2xl"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                       Login
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-4 pt-6 text-center text-xs font-semibold text-[#6e797e]">
            <p className="flex items-center gap-2 px-4 py-2 bg-[#f2f4f6] rounded-full border border-[#e0e3e5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00685c] inline-block animate-pulse"></span>
              Enterprise Grade Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
