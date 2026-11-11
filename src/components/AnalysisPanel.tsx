import { AlertTriangle, CheckCircle2, ClipboardList, Sparkles } from 'lucide-react';
import { UrgencyBadge } from '@/components/UrgencyBadge';
import { CATEGORY_ICONS } from '@/lib/ticket-display';
import type { AnalysisView } from '@/types/ticket';

interface AnalysisPanelProps {
  analysis: AnalysisView | null;
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  if (!analysis) {
    return (
      <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Sparkles className="h-6 w-6 text-slate-500" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-slate-800">Aguardando um chamado</h2>
        <p className="mt-1 max-w-sm text-sm leading-normal text-slate-600">
          Descreva um problema acima e clique em Analisar com IA para ver a categoria, a urgência e os passos sugeridos.
        </p>
      </section>
    );
  }

  const { description, result, saved } = analysis;
  const CategoryIcon = CATEGORY_ICONS[result.category];

  return (
    <section className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
            <CategoryIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Categoria</p>
            <p className="text-base font-semibold text-slate-900">{result.category}</p>
          </div>
        </div>
        <UrgencyBadge urgency={result.urgency} />
      </div>

      <div className="space-y-6 px-6 py-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Resumo executivo</h3>
          <p className="mt-2 text-sm leading-normal text-slate-700">{result.summary}</p>
          <blockquote className="mt-3 rounded-lg border-l-4 border-blue-500 bg-blue-50/60 px-4 py-3 text-sm italic leading-normal text-slate-700">
            "{description}"
          </blockquote>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ClipboardList className="h-4 w-4 text-blue-600" aria-hidden="true" />
            Passos sugeridos para o analista
          </h3>
          <ol className="mt-3 space-y-3">
            {result.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-normal text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {saved ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            Chamado triado e registrado no histórico.
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            A análise foi concluída, mas não foi possível salvar este chamado no histórico.
          </div>
        )}
      </div>
    </section>
  );
}
