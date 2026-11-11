import type { LucideIcon } from 'lucide-react';
import { AppWindow, CircleHelp, KeyRound, Monitor, Wifi } from 'lucide-react';
import type { Category, Urgency } from '@/types/ticket';

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Rede: Wifi,
  Hardware: Monitor,
  'Acessos/Credenciais': KeyRound,
  Software: AppWindow,
  Outros: CircleHelp,
};

export const URGENCY_STYLES: Record<Urgency, { badge: string; dot: string }> = {
  Baixa: {
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dot: 'bg-emerald-500',
  },
  Média: {
    badge: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    dot: 'bg-amber-400',
  },
  Alta: {
    badge: 'bg-red-50 text-red-700 ring-red-600/20',
    dot: 'bg-red-500',
  },
};
