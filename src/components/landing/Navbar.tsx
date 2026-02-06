"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
          P
        </div>
        <span className="text-xl font-bold tracking-tight">PulseBoard</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          href="#features"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#pricing"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="#about"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
