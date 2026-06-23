import { LegalPage } from "@/components/legal-page"

export const metadata = {
  title: "Returns & Refunds | AVRO",
  description: "AVRO's return, refund, and exchange policy.",
}

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns & Refunds"
      lede="We want you to feel good about your order. If something is not right, we are here to help."
      updated="June 2026"
      sections={[
        {
          heading: "Our guarantee",
          body: [
            "If you are not satisfied with your first order, contact us within 30 days of delivery and we will make it right with a replacement or refund.",
          ],
        },
        {
          heading: "How to start a return",
          body: [
            "Email hello@avrolife.com with your order number and a short note about the issue. Our team will respond with next steps as soon as possible.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Approved refunds are issued to your original payment method. Please allow 5–10 business days for the refund to appear, depending on your bank or card issuer.",
          ],
        },
        {
          heading: "Subscriptions",
          body: [
            "You can pause, skip, or cancel a subscription at any time from your account before your next billing date. Orders already processed follow the standard return policy above.",
          ],
        },
        {
          heading: "Contact us",
          body: ["Questions about returns can be sent to hello@avrolife.com."],
        },
      ]}
    />
  )
}
