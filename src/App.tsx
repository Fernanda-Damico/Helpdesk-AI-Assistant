import { useEffect, useState } from 'react';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { Header } from '@/components/Header';
import { TicketForm } from '@/components/TicketForm';
import { TicketHistory } from '@/components/TicketHistory';
import { analyzeTicket } from '@/lib/triage';
import { fetchRecentTickets, saveTicket } from '@/lib/tickets';
import type { AnalysisView, Ticket } from '@/types/ticket';

const ANALYSIS_DELAY_MS = 900;
const HISTORY_LIMIT = 20;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [history, setHistory] = useState<Ticket[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisView | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    let active = true;
    fetchRecentTickets()
      .then((tickets) => {
        if (active) setHistory(tickets);
      })
      .catch((error: unknown) => {
        if (active) setHistoryError(error instanceof Error ? error.message : 'Erro desconhecido');
      })
      .finally(() => {
        if (active) setHistoryLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleAnalyze(description: string) {
    setIsAnalyzing(true);
    await wait(ANALYSIS_DELAY_MS);
    const result = analyzeTicket(description);

    try {
      const saved = await saveTicket(description, result);
      setHistory((previous) => [saved, ...previous].slice(0, HISTORY_LIMIT));
      setHistoryError(null);
      setSelectedId(saved.id);
      setAnalysis({ description, result, saved: true });
    } catch {
      setSelectedId(null);
      setAnalysis({ description, result, saved: false });
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleSelectTicket(ticket: Ticket) {
    setSelectedId(ticket.id);
    setAnalysis({ description: ticket.description, result: ticket, saved: true });
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 antialiased">
      <Header />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-3 lg:gap-8 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <TicketForm isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />
          <AnalysisPanel analysis={analysis} />
        </div>
        <div className="lg:col-span-1">
          <TicketHistory
            tickets={history}
            isLoading={historyLoading}
            error={historyError}
            selectedId={selectedId}
            onSelect={handleSelectTicket}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
