import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/page/legal";

export const metadata: Metadata = { title: "Terms of Service" };

/** Draft terms for using the website. Review with legal before launch. */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="18 October 2026"
      sections={[
        {
          h: "Using this site",
          p: [`This website is operated by ${site.name}. By using it you agree to these terms. If you don't agree, please don't use the site.`],
        },
        {
          h: "Content",
          p: [
            "Articles, reports and case studies are provided for general information. Results described in case studies reflect specific brands and circumstances and are not a guarantee of future results.",
            "Figures labelled as illustrative or sample data are examples, not client results.",
          ],
        },
        {
          h: "Intellectual property",
          p: ["Unless stated otherwise, the content, design and logos on this site belong to MIL Digital or the respective brand owners. Client logos are shown with their permission and remain their property."],
        },
        {
          h: "Consultations",
          p: ["The free consultation is an initial conversation with no obligation. Any paid engagement is governed by a separate written agreement."],
        },
        {
          h: "Links",
          p: ["We may link to other websites, such as WhatsApp, Instagram or Google Maps. We are not responsible for their content or privacy practices."],
        },
        {
          h: "Liability",
          p: ["We work to keep the site accurate and available, but provide it as is. To the extent permitted by law, we are not liable for losses arising from its use."],
        },
        {
          h: "Contact",
          p: [`Questions about these terms: WhatsApp ${site.whatsappDisplay}, or visit us at ${site.address}.`],
        },
      ]}
    />
  );
}
