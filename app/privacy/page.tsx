import { LegalPage } from "@/components/legal-page"

export const metadata = {
  title: "Privacy Policy | AVRO",
  description:
    "How AVRO collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede="We respect your privacy. This policy explains what information we collect, how we use it, and the choices you have."
      updated="June 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect information you provide directly, such as your name, email address, shipping address, and payment details when you place an order, create an account, or subscribe to our newsletter.",
            "We also automatically collect certain technical information when you visit our site, including your device type, browser, and pages viewed, through cookies and similar technologies.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use your information to process orders, manage subscriptions, provide customer support, send updates you have opted into, and improve our products and website experience.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Sharing your information",
          body: [
            "We share information only with service providers who help us operate our business — such as payment processors, shipping carriers, and email platforms — and only to the extent necessary to provide their services.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can unsubscribe from marketing emails at any time using the link in any message. You may also request access to, correction of, or deletion of your personal information by contacting us.",
          ],
        },
        {
          heading: "Contact us",
          body: [
            "Questions about this policy can be sent to hello@avrolife.com.",
          ],
        },
      ]}
    />
  )
}
