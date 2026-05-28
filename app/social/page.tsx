"use client"

import { cohortData } from "@/lib/data"
import { CohortPage } from "@/components/cohort-page"
import { usePageTheme } from "@/lib/theme-context"

export default function SocialPage() {
  // Set theme mode for this page - Header/Footer will pick it up
  usePageTheme("zero-proof")

  return <CohortPage data={cohortData.social} />
}
