import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cron Expression Builder - Schedule Builder | DevToolBox",
  description: "Free online cron expression builder. Visual cron scheduler with presets, human-readable descriptions, and next run time calculator.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

