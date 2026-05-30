import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Diff Checker - Compare Text Online | DevToolBox",
  description: "Free online text diff checker. Compare two texts side-by-side with highlighted differences. Shows added, removed, and unchanged lines.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

