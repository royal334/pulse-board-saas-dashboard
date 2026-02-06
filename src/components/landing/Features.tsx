"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, BarChart2, Lock, Users, Zap, Globe } from "lucide-react";

const features = [
  {
    title: "Real-time Analytics",
    description:
      "Monitor your key performance indicators in real-time with our advanced dashboard.",
    icon: Activity,
  },
  {
    title: "User Management",
    description:
      "Easily manage your team, assign roles, and control access permissions.",
    icon: Users,
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols to keep your data safe.",
    icon: Lock,
  },
  {
    title: "Advanced Reporting",
    description:
      "Generate detailed reports and export them in various formats for your stakeholders.",
    icon: BarChart2,
  },
  {
    title: "Lightning Fast",
    description:
      "Optimized for performance to ensure zero lag, even with large datasets.",
    icon: Zap,
  },
  {
    title: "Global CDN",
    description:
      "Access your dashboard from anywhere in the world with low latency.",
    icon: Globe,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-primary">succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our dashboard comes packed with all the tools you need to manage
            your SaaS application effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
