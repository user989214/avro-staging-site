import { LegalPage } from "@/components/legal-page"

export const metadata = {
  title: "Terms of Service | AVRO",
  description: "The terms and conditions for using the AVRO website and purchasing our products.",
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lede="These terms govern your use of the AVRO website and your purchase of our products. By using our site, you agree to them."
      updated="June 2026"
      sections={[
        {
          heading: "Use of our site",
          body: [
            "You may use our website for lawful purposes only. You agree not to misuse the site, interfere with its operation, or attempt to access it in any way other than through the interface we provide.",
          ],
        },
        {
          heading: "Orders and payment",
          body: [
            "All orders are subject to acceptance and availability. Prices are shown at checkout and may change at any time. We reserve the right to refuse or cancel any order.",
            "Subscriptions renew automatically at the interval you select until cancelled. You can manage or cancel your subscription at any time from your account.",
          ],
        },
        {
          heading: "Product information",
          body: [
            "AVRO is a dietary supplement drink mix. Statements about our products have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use if you have a medical condition or are pregnant or nursing.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the fullest extent permitted by law, AVRO is not liable for any indirect, incidental, or consequential damages arising from your use of our products or website.",
          ],
        },
        {
          heading: "Contact us",
          body: ["Questions about these terms can be sent to hello@avrolife.com."],
        },
      ]}
    />
  )
}
