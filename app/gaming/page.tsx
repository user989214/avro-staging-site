import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"

export const metadata = {
  title: "Gaming + Online Poker | AVRO",
  description: "AVRO supports calm, clarity, and composure before gaming, ranked play, tournaments, and online poker sessions.",
}

export default function GamingPage() {
  return <CohortPage data={cohortData.gaming} />
}
