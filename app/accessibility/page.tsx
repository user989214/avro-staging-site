import { LegalPage } from "@/components/legal-page"

export const metadata = {
  title: "Accessibility | AVRO",
  description: "AVRO's commitment to making our website accessible to everyone.",
}

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      lede="We are committed to making AVRO accessible to as many people as possible, regardless of ability or technology."
      updated="June 2026"
      sections={[
        {
          heading: "Our commitment",
          body: [
            "We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We continually review our site to improve the experience for users of assistive technologies.",
          ],
        },
        {
          heading: "What we do",
          body: [
            "We use semantic HTML, descriptive alt text for meaningful images, sufficient color contrast, keyboard-navigable controls, and clear focus states throughout the site.",
          ],
        },
        {
          heading: "Ongoing improvement",
          body: [
            "Accessibility is an ongoing effort. We test regularly and address issues as we find them or as they are reported to us.",
          ],
        },
        {
          heading: "Feedback",
          body: [
            "If you encounter a barrier or have a suggestion, please email hello@avrolife.com and we will do our best to address it promptly.",
          ],
        },
      ]}
    />
  )
}
