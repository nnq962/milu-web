import type { Metadata } from "next";
import { LegalView } from "@/components/legal-view";
import { terms } from "@/lib/legal";
import { openGraph, site } from "@/lib/site";

const path = "/dieu-khoan";
const description = terms.entries[1].paragraphs[0];

export const metadata: Metadata = {
  title: terms.title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraph, title: `${terms.title} · ${site.name}`, description, url: path },
};

export default function TermsPage() {
  return <LegalView document={terms} />;
}
