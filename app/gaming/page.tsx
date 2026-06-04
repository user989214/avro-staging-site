import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"

export const metadata = {
  title: "Esports | AVRO",
  description: "AVRO supports calm, clarity, and composure before gaming, ranked play, and competitive esports sessions.",
}

export default function GamingPage() {
  return <CohortPage data={cohortData.gaming} />
}
