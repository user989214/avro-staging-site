import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"
import { ThemeProvider } from "@/lib/theme-context"

export const metadata = {
  title: "Social / Non Alcohol | AVRO",
  description: "AVRO is a calm, clear, alcohol-free social ritual for dinners, gatherings, events, and evening routines.",
}

export default function SocialPage() {
  return (
    <ThemeProvider mode="zero-proof">
      <CohortPage data={cohortData.social} />
    </ThemeProvider>
  )
}
