import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"

export const metadata = {
  title: "Work / Tech | AVRO",
  description: "AVRO supports calm, clarity, and composure before deep work, meetings, presentations, and long workdays.",
}

export default function WorkPage() {
  return <CohortPage data={cohortData.work} />
}
