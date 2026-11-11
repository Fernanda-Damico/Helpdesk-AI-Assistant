# 🎧 HelpDesk AI Assistant

> Aplicação web para triagem automatizada e inteligente de chamados de TI utilizando Inteligência Artificial Generativa (LLM).

---

## 📌 Sobre o Projeto

O **HelpDesk AI Assistant** foi desenvolvido para otimizar o fluxo de atendimento N1/N2 em equipas de suporte e TI. A aplicação recebe relatos de incidentes em linguagem natural, processa o contexto através de um modelo LLM e gera instantaneamente:
- **Categorização Automática:** Identificação do tipo de incidente (Software, Hardware, Redes, Acessos).
- **Classificação de Criticidade:** Definida de forma dinâmica de acordo com o impacto relatado.
- **Resumo Executivo:** Síntese do chamado para agilizar a leitura do analista.
- **Script de Resolução (Troubleshooting):** Passo a passo técnico sugerido para a solução rápida do problema.

---

## 🛠️ Tecnologias Utilizadas

- **Front-End:** React.js, TypeScript, Tailwind CSS, Vite
- **Inteligência Artificial:** Google Gemini API (Engenharia de Prompts e respostas estruturadas em JSON)
- **Backend & Serverless:** Edge Functions para consumo seguro da API de IA
- **Banco de Dados:** Supabase (Persistência do histórico de chamados em tempo real)

---

## 🔒 Arquitetura e Segurança

A integração com a API do Google Gemini é realizada através de um ambiente serverless seguro no backend, garantindo que as chaves de API (`AI_API_KEY`) fiquem ocultas do cliente (browser) e protegidas contra exposição pública.

---

## 🚀 Como Executar o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/Fernanda-Damico/Helpdesk-AI-Assistant.git](https://github.com/Fernanda-Damico/Helpdesk-AI-Assistant.git)
   cd Helpdesk-AI-Assistant
