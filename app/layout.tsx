import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion";
import { themeScript } from "@/components/theme";
import { openGraph, site } from "@/lib/site";
import "./globals.css";

// Nunito, the app's typeface (variable, with Vietnamese; OFL): the file the app ships, packed
// as WOFF2 by scripts/sync-assets.sh.
const nunito = localFont({
  src: "./fonts/Nunito.woff2",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap",
});

const title = `${site.name} · ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["Milu", "quản lý chi tiêu", "tài chính cá nhân", "ghi thu chi", "hũ tiết kiệm", "app iPhone"],
  openGraph: { ...openGraph, title, description: site.description },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: site.name },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#bee8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#23485b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-theme="light" className={`${nunito.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
