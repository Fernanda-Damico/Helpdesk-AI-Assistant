import type { Category, TriageResult, Urgency } from '@/types/ticket';

interface Topic {
  label: string;
  category: Category;
  keywords: { term: string; weight: number }[];
  steps: string[];
}

const TOPICS: Topic[] = [
  {
    label: 'Credenciais e acesso ao sistema',
    category: 'Acessos/Credenciais',
    keywords: [
      { term: 'credencia', weight: 3 },
      { term: 'senha', weight: 2 },
      { term: 'login', weight: 2 },
      { term: 'autentica', weight: 2 },
      { term: 'acesso negado', weight: 2 },
      { term: 'bloquead', weight: 1 },
      { term: 'conta', weight: 1 },
      { term: 'permissao', weight: 1 },
      { term: 'mfa', weight: 1 },
      { term: 'token', weight: 1 },
    ],
    steps: [
      'Confirmar no diretório de usuários se a conta está ativa e não bloqueada por tentativas de senha.',
      'Redefinir a senha pelo painel administrativo e orientar o colaborador a usar a nova senha temporária.',
      'Verificar se o segundo fator de autenticação (MFA) está vinculado ao dispositivo correto.',
      'Limpar as credenciais salvas no gerenciador de credenciais do Windows e autenticar novamente.',
      'Validar o acesso ao sistema solicitado e confirmar com o colaborador antes de encerrar o chamado.',
    ],
  },
  {
    label: 'E-mail e sincronização do Outlook',
    category: 'Software',
    keywords: [
      { term: 'outlook', weight: 2 },
      { term: 'e-mail', weight: 2 },
      { term: 'email', weight: 2 },
      { term: 'caixa de entrada', weight: 2 },
      { term: 'exchange', weight: 2 },
      { term: 'sincroniz', weight: 1 },
      { term: 'calendario', weight: 1 },
    ],
    steps: [
      'Confirmar que o computador tem conexão estável com a internet e a VPN, se aplicável.',
      'Verificar se o Outlook não está em modo offline (Enviar/Receber > Trabalhar Offline).',
      'Checar o status do serviço de e-mail na página de saúde do Microsoft 365.',
      'Remover e recriar o perfil da conta no Outlook, reconfigurando-a com as credenciais atuais.',
      'Se o erro persistir, verificar a conta no painel do Exchange e a política de senhas aplicada.',
    ],
  },
  {
    label: 'Impressoras e impressão',
    category: 'Hardware',
    keywords: [
      { term: 'impressora', weight: 3 },
      { term: 'imprim', weight: 2 },
      { term: 'impressao', weight: 2 },
      { term: 'toner', weight: 2 },
      { term: 'spool', weight: 2 },
      { term: 'scanner', weight: 1 },
      { term: 'papel', weight: 1 },
    ],
    steps: [
      'Confirmar se a impressora está ligada, com papel, toner e sem atolamentos no painel.',
      'Verificar na fila de impressão do computador se há documentos presos e limpar a fila.',
      'Reiniciar o serviço de spooler de impressão no computador do colaborador.',
      'Testar a impressão com uma página de teste direto pelo painel da impressora.',
      'Se o equipamento não responder na rede, verificar o cabo e o endereço IP da impressora.',
    ],
  },
  {
    label: 'Conectividade de rede e internet',
    category: 'Rede',
    keywords: [
      { term: 'rede', weight: 2 },
      { term: 'internet', weight: 2 },
      { term: 'wi-fi', weight: 2 },
      { term: 'wifi', weight: 2 },
      { term: 'vpn', weight: 2 },
      { term: 'conexao', weight: 2 },
      { term: 'sinal', weight: 1 },
      { term: 'dns', weight: 2 },
      { term: 'cabo de rede', weight: 2 },
      { term: 'site', weight: 1 },
    ],
    steps: [
      'Verificar se o problema afeta apenas um computador ou toda a equipe, para isolar a causa.',
      'Confirmar o status do cabo de rede ou do sinal Wi-Fi e reconectar o equipamento.',
      'Executar o teste de conectividade e checar o endereço IP e o DNS obtidos pelo computador.',
      'Reiniciar o cliente VPN e validar a autenticação com as credenciais do colaborador.',
      'Se o problema for geral, acionar a equipe de infraestrutura de rede com o local e o horário.',
    ],
  },
  {
    label: 'Defeito em equipamento',
    category: 'Hardware',
    keywords: [
      { term: 'computador', weight: 2 },
      { term: 'notebook', weight: 2 },
      { term: 'monitor', weight: 2 },
      { term: 'teclado', weight: 2 },
      { term: 'mouse', weight: 2 },
      { term: 'tela', weight: 1 },
      { term: 'bateria', weight: 2 },
      { term: 'carregador', weight: 2 },
      { term: 'headset', weight: 2 },
      { term: 'quebr', weight: 2 },
      { term: 'nao liga', weight: 3 },
      { term: 'fisic', weight: 1 },
    ],
    steps: [
      'Confirmar com o colaborador os sintomas visíveis e se houve queda ou derramamento de líquido.',
      'Verificar a alimentação elétrica, o cabo de força e a conexão dos periféricos.',
      'Reiniciar o equipamento em modo de segurança para descartar falha de software.',
      'Se o defeito for físico, abrir a troca de equipamento e registrar o número de patrimônio.',
      'Entregar um equipamento reserva, se disponível, para não interromper o trabalho.',
    ],
  },
  {
    label: 'Falha em aplicativo ou sistema',
    category: 'Software',
    keywords: [
      { term: 'sistema', weight: 2 },
      { term: 'programa', weight: 2 },
      { term: 'aplicativo', weight: 2 },
      { term: 'erro', weight: 1 },
      { term: 'trava', weight: 2 },
      { term: 'crash', weight: 2 },
      { term: 'instal', weight: 2 },
      { term: 'atualiz', weight: 2 },
      { term: 'teams', weight: 2 },
      { term: 'excel', weight: 2 },
      { term: 'word', weight: 2 },
      { term: 'navegador', weight: 2 },
      { term: 'chrome', weight: 2 },
    ],
    steps: [
      'Reproduzir o problema e anotar a mensagem de erro exata e o horário em que ocorreu.',
      'Fechar o aplicativo por completo e abri-lo novamente, limpando o cache quando possível.',
      'Verificar se há atualizações pendentes do aplicativo e do sistema operacional.',
      'Reinstalar ou reparar o aplicativo pelo painel de programas do Windows.',
      'Se o erro persistir, abrir chamado para o fornecedor com o log e a versão instalada.',
    ],
  },
];

const GENERIC_STEPS = [
  'Entrar em contato com o colaborador para confirmar detalhes do problema e o impacto no trabalho.',
  'Reproduzir o cenário relatado e registrar prints ou mensagens de erro.',
  'Reiniciar o equipamento e verificar se o problema persiste.',
  'Pesquisar a base de conhecimento para casos semelhantes já resolvidos.',
  'Escalar para o time especializado se não houver solução em até uma hora.',
];

const HIGH_URGENCY_TERMS = [
  'parou', 'parado', 'nao funciona', 'nao consigo', 'urgente', 'todos', 'equipe',
  'setor', 'andar', 'departamento', 'cliente', 'reuniao', 'prazo', 'fora do ar',
  'quebrou', 'bloqueado', 'sem acesso', 'paralis', 'critic', 'nada imprime',
  'nao liga', 'sem internet', 'vazamento', 'invasao', 'phishing', 'virus',
];

const MEDIUM_URGENCY_TERMS = [
  'lento', 'lentidao', 'intermitente', 'as vezes', 'erro', 'falha', 'sincroniz',
  'trava', 'oscila', 'cai', 'caindo', 'demora', 'parcial',
];

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function scoreTopic(text: string, topic: Topic): number {
  return topic.keywords.reduce(
    (total, { term, weight }) => (text.includes(term) ? total + weight : total),
    0,
  );
}

function detectUrgency(text: string): Urgency {
  if (HIGH_URGENCY_TERMS.some((term) => text.includes(term))) return 'Alta';
  if (MEDIUM_URGENCY_TERMS.some((term) => text.includes(term))) return 'Média';
  return 'Baixa';
}

const URGENCY_IMPACT: Record<Urgency, string> = {
  Alta: 'Impacto elevado: o relato indica interrupção de trabalho ou de mais de uma pessoa.',
  Média: 'Impacto moderado: o problema causa lentidão ou falhas que atrapalham, mas não bloqueiam totalmente.',
  Baixa: 'Impacto baixo: o relato parece um problema isolado, sem bloqueio aparente.',
};

export function analyzeTicket(description: string): TriageResult {
  const text = normalize(description);

  let bestTopic: Topic | null = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    const score = scoreTopic(text, topic);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  const urgency = detectUrgency(text);
  const category: Category = bestTopic ? bestTopic.category : 'Outros';
  const subject = bestTopic ? bestTopic.label : 'Solicitação geral de TI';

  return {
    category,
    urgency,
    summary: `Chamado de ${category.toLowerCase()} relacionado a "${subject}". ${URGENCY_IMPACT[urgency]}`,
    steps: bestTopic ? bestTopic.steps : GENERIC_STEPS,
  };
}
