import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Color Picker - HEX RGB HSL Converter | DevToolBox",
  description: "Free online color picker and converter. Convert between HEX, RGB, and HSL color formats with visual preview.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

