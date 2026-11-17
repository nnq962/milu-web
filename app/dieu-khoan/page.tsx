import type { Metadata } from "next";
import { LegalView } from "@/components/legal-view";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.entries[1].paragraphs[0],
};

export default function TermsPage() {
  return <LegalView document={terms} />;
}
