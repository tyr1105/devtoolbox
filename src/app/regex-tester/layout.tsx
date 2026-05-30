import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online | DevToolBox",
  description: "Free online regex tester with real-time matching, group capture highlighting, and visual match display. Supports all JavaScript regex flags.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

