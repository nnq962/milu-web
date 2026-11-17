import type { Metadata } from "next";
import { LegalView } from "@/components/legal-view";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.entries[0].paragraphs[0],
};

export default function PrivacyPage() {
  return <LegalView document={privacy} />;
}
