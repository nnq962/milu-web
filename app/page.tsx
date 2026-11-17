import { Bento } from "@/components/bento";
import { Download } from "@/components/download";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { MeetMilu } from "@/components/meet-milu";
import { Pricing } from "@/components/pricing";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <Bento />
        <MeetMilu />
        <Privacy />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <SiteFooter />
    </>
  );
}
