import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "SaaS Dashboard",
  description: "PulseBoard is a modern SaaS analytics dashboard built with Next.js and Firebase, featuring secure authentication, user management, real-time data, and a clean, responsive UI designed for scalable startup applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(nunito.className, "font-sans")}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
