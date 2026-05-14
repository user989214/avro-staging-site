import { cn } from "@/lib/utils"

interface IconProps {
  className?: string
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" />
      <path d="M5 19 19 5" />
    </svg>
  )
}

export function FlaskIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 3h6" />
      <path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
    </svg>
  )
}

export function BrainIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3" />
      <path d="M15 5a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3" />
      <path d="M9 5c1.8 0 3 1.2 3 3v11" />
      <path d="M15 5c-1.8 0-3 1.2-3 3" />
    </svg>
  )
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M22 2 12 12" />
    </svg>
  )
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />
    </svg>
  )
}

export function CupIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7 3h10l-1 18H8L7 3Z" />
      <path d="M8 8h8" />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
      <circle cx="12" cy="8" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.8" />
      <path d="M2 21v-2a4 4 0 0 1 3-3.8" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function FlagIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 21V4" />
      <path d="M6 4h11l-2 4 2 4H6" />
    </svg>
  )
}

export function MonitorIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 16v5" />
    </svg>
  )
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg
      className={cn("w-6 h-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h4" />
      <path d="M7 13h10" />
    </svg>
  )
}

export const iconMap = {
  leaf: LeafIcon,
  flask: FlaskIcon,
  shield: ShieldIcon,
  brain: BrainIcon,
  target: TargetIcon,
  bolt: BoltIcon,
  cup: CupIcon,
  users: UsersIcon,
  clock: ClockIcon,
  star: StarIcon,
  search: SearchIcon,
  flag: FlagIcon,
  monitor: MonitorIcon,
  card: CardIcon,
}

export type IconName = keyof typeof iconMap

export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const IconComponent = iconMap[name]
  return <IconComponent className={className} />
}
