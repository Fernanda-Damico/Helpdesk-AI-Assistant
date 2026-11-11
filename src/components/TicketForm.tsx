import { useState, type FormEvent } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

const EXAMPLES = [
  'Meu Outlook não sincroniza e diz erro de credenciais',
  'A impressora do 3º andar quebrou e não imprime nada',
  'Minha VPN cai toda hora ao acessar o sistema financeiro',
];

interface TicketFormProps {
  isAnalyzing: boolean;
  onAnalyze: (description: string) => void;
}

export function TicketForm({ isAnalyzing, onAnalyze }: TicketFormProps) {
  const [description, setDescription] = useState('');
  const trimmed = description.trim();
  const canSubmit = trimmed.length >= MIN_LENGTH && !isAnalyzing;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    onAnalyze(trimmed);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Descreva o problema</h2>
        <p className="mt-1 text-sm leading-normal text-slate-600">
          Conte o que aconteceu, quem está afetado e qualquer mensagem de erro exibida.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="ticket-description" className="sr-only">
          Descrição do problema
        </label>
        <textarea
          id="ticket-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={MAX_LENGTH}
          rows={5}
          disabled={isAnalyzing}
          placeholder="Ex.: Meu Outlook não sincroniza e diz erro de credenciais desde a manhã..."
          className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base leading-normal text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setDescription(example)}
              disabled={isAnalyzing}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-slate-500">
            {trimmed.length < MIN_LENGTH
              ? `Escreva pelo menos ${MIN_LENGTH} caracteres para analisar.`
              : `${description.length}/${MAX_LENGTH} caracteres`}
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {isAnalyzing ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            )}
            {isAnalyzing ? 'Analisando...' : 'Analisar com IA'}
          </button>
        </div>
      </form>
    </section>
  );
}
