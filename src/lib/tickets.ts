import { supabase } from '@/lib/supabase';
import type { Ticket, TriageResult } from '@/types/ticket';

const HISTORY_LIMIT = 20;

export async function fetchRecentTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('id, description, category, urgency, summary, steps, created_at')
    .order('created_at', { ascending: false })
    .limit(HISTORY_LIMIT);

  if (error) throw new Error(error.message);
  if (!Array.isArray(data)) throw new Error('Resposta inesperada ao carregar o histórico.');
  return data as Ticket[];
}

export async function saveTicket(description: string, result: TriageResult): Promise<Ticket> {
  const { data, error } = await supabase
    .from('support_tickets')
    .insert({ description, ...result })
    .select('id, description, category, urgency, summary, steps, created_at')
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Não foi possível confirmar o registro do chamado.');
  return data as Ticket;
}
