import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Timestamp Converter - Unix Timestamp Tool | DevToolBox",
  description: "Free online Unix timestamp converter. Convert between timestamps and human-readable dates. Live updating current timestamp.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

