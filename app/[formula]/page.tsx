import { notFound } from "next/navigation"

const validFormulas = ["calm", "focus", "energy"] as const

export async function generateStaticParams() {
  return validFormulas.map((formula) => ({ formula }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ formula: string }>
}) {
  const { formula } = await params
  if (!validFormulas.includes(formula as (typeof validFormulas)[number])) {
    notFound()
  }
  return <main style={{ padding: 80 }}>Minimal {formula}</main>
}
