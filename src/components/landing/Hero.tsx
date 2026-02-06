"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Features Available
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            Analytics that helps your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
              startup grow faster
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            PulseBoard gives you the insights you need to make data-driven
            decisions. Secure, scalable, and designed for modern teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview / Abstract Visual */}
        <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[500px] items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <BarChart3 className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-sm">Interactive Charts</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground border-x border-border/50">
              <Zap className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-sm">Real-time Data</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <Shield className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-sm">Enterprise Security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
    </section>
  );
}
