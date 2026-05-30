import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Markdown Preview - Live Editor | DevToolBox",
  description: "Free online Markdown editor with live preview. Write Markdown and see rendered output in real-time. Export HTML.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

