# HelpDesk AI Assistant

Assistente de triagem de chamados de suporte técnico com IA generativa. O usuário descreve o problema em linguagem natural e a aplicação classifica a **urgência** e a **categoria** (Hardware, Rede, Acessos, Software) e sugere um **diagnóstico inicial** de resolução rápida, para acelerar o atendimento e o cumprimento de SLA.

🔗 **Demo online:** https://helpdesk-ai-assistan-ns2v.bolt.host/

## O problema

Chamados mal descritos geram retrabalho: o analista precisa perguntar de novo, classificar manualmente e priorizar na mão. Este projeto automatiza essa primeira triagem.

## Como funciona

1. O usuário escreve o relato do problema com as próprias palavras.
2. A IA generativa interpreta o texto, com engenharia de prompts, e identifica a urgência e a categoria do chamado.
3. A interface exibe a classificação e sugere um diagnóstico para o analista começar o atendimento.

## Tecnologias

React · TypeScript · Tailwind CSS · Vite · IA Generativa

## Como rodar localmente

```bash
npm install
npm run dev
```

## Contexto

Projeto criado a partir da minha rotina em Service Desk, onde a triagem manual de chamados consome tempo e impacta o SLA. Desenvolvido com apoio do Bolt.

## Autora

Fernanda Damico · [LinkedIn](https://linkedin.com/in/fernanda-damico)
