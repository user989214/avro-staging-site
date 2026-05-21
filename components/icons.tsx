import { cn } from "@/lib/utils"
import {
  Leaf,
  FlaskConical,
  Shield,
  ShieldCheck,
  Brain,
  Target,
  Zap,
  GlassWater,
  Users,
  Clock,
  Star,
  Search,
  Flag,
  Monitor,
  CreditCard,
  Smile,
  Sun,
  Microscope,
  Sprout,
  Wheat,
  BadgeCheck,
  Beaker,
  Waves,
  BookOpen,
  Heart,
  Scale,
  Briefcase,
  Gamepad2,
  Wine,
  Gauge,
  Lightbulb,
  Activity,
  Volume2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Timer,
  Droplet,
  Coffee,
  Moon,
  Atom,
  Pill,
  HeartPulse,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

interface IconProps {
  className?: string
}

// Map every site-wide icon name to a single lucide-react icon. Keeping all
// icons in one library guarantees identical stroke weight, corner radius, and
// visual rhythm across the homepage, PDPs, science page, and quality grids.
export const iconMap = {
  // Foundational / state
  leaf: Leaf,
  flask: FlaskConical,
  beaker: Beaker,
  shield: Shield,
  "shield-check": ShieldCheck,
  brain: Brain,
  target: Target,
  bolt: Zap,
  zap: Zap,
  smile: Smile,
  sun: Sun,
  moon: Moon,
  waves: Waves,
  atom: Atom,
  heart: Heart,
  "heart-pulse": HeartPulse,
  pill: Pill,

  // Ritual + flow
  cup: GlassWater,
  droplet: Droplet,
  clock: Clock,
  timer: Timer,
  star: Star,
  sparkles: Sparkles,
  check: CheckCircle2,
  "check-circle": CheckCircle2,
  coffee: Coffee,

  // Lifestyle / moments
  users: Users,
  flag: Flag,
  monitor: Monitor,
  briefcase: Briefcase,
  gamepad: Gamepad2,
  wine: Wine,
  card: CreditCard,

  // Comparison / proof
  search: Search,
  gauge: Gauge,
  lightbulb: Lightbulb,
  activity: Activity,
  volume: Volume2,
  trending: TrendingUp,
  scale: Scale,
  book: BookOpen,

  // Quality badges (calm-first ingredient + manufacturing trust row)
  microscope: Microscope,
  sprout: Sprout,
  wheat: Wheat,
  "badge-check": BadgeCheck,
  
  // Navigation
  arrowRight: ArrowRight,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap

export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const LucideComp = iconMap[name]
  // Default sizing + stroke matches the editorial thin-line look used across
  // AVRO reference pages. Consumers can override via className.
  return (
    <LucideComp
      aria-hidden="true"
      strokeWidth={1.6}
      className={cn("w-6 h-6", className)}
    />
  )
}

// Back-compat named exports — some files still import individual icon
// components directly. Each is a thin wrapper around the unified `Icon`.
const makeNamed = (name: IconName) =>
  function NamedIcon({ className }: IconProps) {
    return <Icon name={name} className={className} />
  }

export const LeafIcon = makeNamed("leaf")
export const FlaskIcon = makeNamed("flask")
export const ShieldIcon = makeNamed("shield")
export const BrainIcon = makeNamed("brain")
export const TargetIcon = makeNamed("target")
export const BoltIcon = makeNamed("bolt")
export const CupIcon = makeNamed("cup")
export const UsersIcon = makeNamed("users")
export const ClockIcon = makeNamed("clock")
export const StarIcon = makeNamed("star")
export const SearchIcon = makeNamed("search")
export const FlagIcon = makeNamed("flag")
export const MonitorIcon = makeNamed("monitor")
export const CardIcon = makeNamed("card")
