import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"

export const metadata = {
  title: "Golf | AVRO",
  description: "AVRO supports calm, clarity, and composure before golf moments where state matters.",
}

export default function GolfPage() {
  return <CohortPage data={cohortData.golf} />
}
