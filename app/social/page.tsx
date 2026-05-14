import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"

export const metadata = {
  title: "Social / Non Alcohol | AVRO",
  description: "AVRO is a calm, clear, alcohol-free social ritual for dinners, gatherings, events, and evening routines.",
}

export default function SocialPage() {
  return <CohortPage data={cohortData.social} />
}
