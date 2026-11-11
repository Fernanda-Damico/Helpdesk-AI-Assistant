import { URGENCY_STYLES } from '@/lib/ticket-display';
import type { Urgency } from '@/types/ticket';

interface UrgencyBadgeProps {
  urgency: Urgency;
}

export function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  const style = URGENCY_STYLES[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
      Urgência {urgency}
    </span>
  );
}
