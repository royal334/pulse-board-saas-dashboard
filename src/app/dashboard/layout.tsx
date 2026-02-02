"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/dashboard/AppSidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/sign-in");
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#E5E5E5] dark:bg-slate-900">
        {/* Sidebar skeleton */}
        <aside className="hidden md:flex w-64 flex-col gap-6 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="mt-auto">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </aside>

        {/* Main skeleton */}
        <main className="flex-1">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>
            </div>

            {/* Users/Settings-style cards */}
            <div className="mt-6 space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-10 w-28 rounded-md" />
                </div>
                <div className="mt-5 space-y-3">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
                <Skeleton className="h-6 w-32" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <>

     <SidebarProvider>
     <AppSidebar />
     <main>
          <SidebarTrigger />
          {children}
     </main>
     </SidebarProvider>
  </>;
}
