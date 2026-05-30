import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Placeholder Text | DevToolBox",
  description: "Free online Lorem Ipsum generator. Generate placeholder text in paragraphs, sentences, or words. Classic start option.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

