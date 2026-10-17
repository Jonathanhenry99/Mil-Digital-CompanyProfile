import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/page/legal";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: true } };

/** Draft privacy policy describing what this site actually collects. Review with legal before launch. */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="18 October 2026"
      sections={[
        {
          h: "Who we are",
          p: [`${site.name} is a digital marketing consultant and agency based at ${site.address}. This policy explains how we handle personal data collected through this website.`],
        },
        {
          h: "What we collect",
          p: [
            "When you send a brief or contact form we collect your name, email, WhatsApp number, brand name, industry, location, budget range, the services you are interested in and your message.",
            "If you take the brand quiz and then send a brief, your quiz answers are attached to it. Report downloads and the ATLAS waitlist collect your name, email and company. Job applications collect your name, email, phone, CV or portfolio link and message.",
          ],
        },
        {
          h: "How we use it",
          p: [
            "We use your details only to respond to your request: to schedule a consultation, send a report, invite you to ATLAS, or review your application. We do not sell your data.",
          ],
        },
        {
          h: "Where it is stored",
          p: ["Submissions are stored in our content management system on secure cloud infrastructure and are accessible only to the MIL team members who need them."],
        },
        {
          h: "How long we keep it",
          p: ["We keep enquiries and applications for as long as needed to handle them and for a reasonable period afterwards, unless you ask us to delete them sooner."],
        },
        {
          h: "Your rights",
          p: [
            "Under Indonesia's Personal Data Protection Law (UU No. 27 Tahun 2022) you can ask to access, correct or delete your data, or withdraw consent. Contact us on WhatsApp at " +
              site.whatsappDisplay +
              " and we will respond promptly.",
          ],
        },
        {
          h: "Changes",
          p: ["We may update this policy. The date at the top shows when it last changed."],
        },
      ]}
    />
  );
}
