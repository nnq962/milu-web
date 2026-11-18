import type { Metadata } from "next";
import { LegalView } from "@/components/legal-view";
import { privacy } from "@/lib/legal";
import { openGraph, site } from "@/lib/site";

const path = "/quyen-rieng-tu";
const description = privacy.entries[0].paragraphs[0];

export const metadata: Metadata = {
  title: privacy.title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraph, title: `${privacy.title} · ${site.name}`, description, url: path },
};

export default function PrivacyPage() {
  return <LegalView document={privacy} />;
}
