import { AlertTriangle, History, Inbox, Loader2 } from 'lucide-react';
import { UrgencyBadge } from '@/components/UrgencyBadge';
import { CATEGORY_ICONS } from '@/lib/ticket-display';
import type { Ticket } from '@/types/ticket';

interface TicketHistoryProps {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  selectedId: string | null;
  onSelect: (ticket: Ticket) => void;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export function TicketHistory({ tickets, isLoading, error, selectedId, onSelect }: TicketHistoryProps) {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
      <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-slate-900">Últimos chamados</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {tickets.length}
        </span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 px-5 py-12 text-sm text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Carregando histórico...
          </div>
        )}

        {!isLoading && error && (
          <div className="m-4 flex gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
            <p>Não foi possível carregar o histórico. Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !error && tickets.length === 0 && (
          <div className="flex flex-col items-center px-5 py-12 text-center">
            <Inbox className="h-8 w-8 text-slate-400" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-slate-700">Nenhum chamado triado ainda</p>
            <p className="mt-1 text-xs leading-normal text-slate-500">Os chamados analisados aparecerão aqui.</p>
          </div>
        )}

        {!isLoading && !error && tickets.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {tickets.map((ticket) => {
              const CategoryIcon = CATEGORY_ICONS[ticket.category];
              const isSelected = ticket.id === selectedId;
              return (
                <li key={ticket.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(ticket)}
                    aria-pressed={isSelected}
                    className={`group w-full px-5 py-4 text-left transition hover:bg-slate-50 ${
                      isSelected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-slate-200">
                        <CategoryIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <p className="line-clamp-2 text-sm font-medium leading-normal text-slate-900">
                          {ticket.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <UrgencyBadge urgency={ticket.urgency} />
                          <span className="text-xs text-slate-500">
                            {ticket.category} · {dateFormatter.format(new Date(ticket.created_at))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
