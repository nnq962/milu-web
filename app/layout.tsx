import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion";
import { themeScript } from "@/components/theme";
import { site } from "@/lib/site";
import "./globals.css";

// Nunito, the app's typeface (variable, with Vietnamese; OFL): the same file the app ships.
const nunito = localFont({
  src: "./fonts/Nunito.ttf",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap",
});

const title = `${site.name} · ${site.tagline}`;

export const metadata: Metadata = {
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["Milu", "quản lý chi tiêu", "tài chính cá nhân", "ghi thu chi", "hũ tiết kiệm", "app iPhone"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    title,
    description: site.description,
  },
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
