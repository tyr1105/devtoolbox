import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hash Generator - MD5 SHA-256 SHA-512 | DevToolBox",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly. All processing in your browser.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

