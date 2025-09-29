# AI Minds - CSV Multi-Agent Analyzer

<div align="center">

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.23-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

</div>

Uma interface moderna de chat para análise de dados CSV usando agentes de IA, desenvolvida para o **Curso de Agentes Autônomos (I2A2)**.

## 🚀 Características

- **Interface Profissional**: Design limpo e moderno com paleta de cores elegante e acessível
- **Upload de CSV**: Área dedicada para upload de arquivos CSV com drag & drop intuitivo
- **Multi-agente**: Suporte para diferentes tipos de análise e agentes especializados em dados
- **Visualizações Diversas**: Gráficos interativos, tabelas dinâmicas e códigos Python
- **Sistema de Notificações**: Feedback visual claro com cores semânticas (verde/azul/vermelho)
- **Responsivo**: Interface adaptável para desktop e mobile com excelente usabilidade
- **Animações Suaves**: Transições elegantes usando Framer Motion
- **Acessibilidade**: Conformidade com diretrizes WCAG para máxima inclusão

## 🎨 Design System

O projeto utiliza um design system moderno e profissional com cores cuidadosamente selecionadas:

### Paleta de Cores Principal

- **Verde Profissional** (`--primary`): Verde suave e sofisticado (#16a34a) para ações principais
- **Azul Navy** (`--secondary`): Azul escuro elegante (#1f2937) para elementos secundários  
- **Azul-Cinza Sutil** (`--accent`): Tons neutros (#f1f5f9) para destaques discretos
- **Backgrounds Limpos**: Branco puro e tons de cinza muito claros para máxima legibilidade

### Sistema de Notificações

- **Verde**: Para sucessos (ex: "Arquivo carregado")
- **Azul**: Para informações neutras (ex: "Arquivo removido")
- **Vermelho**: Para erros e alertas
- **Branco/Cinza**: Para conteúdo geral

### Características Visuais

- **Contraste Otimizado**: Melhor legibilidade para uso prolongado
- **Hierarquia Clara**: Cores que não competem com o conteúdo
- **Acessibilidade**: Compliance com diretrizes WCAG
- **Profissionalismo**: Adequado para ambientes corporativos

## 🛠️ Tecnologias

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

</div>

### Stack Principal

- **⚛️ React 18** + **📘 TypeScript** - Framework e tipagem estática
- **⚡ Vite** - Build tool ultra-rápido para desenvolvimento
- **🎨 Tailwind CSS** - Framework CSS utilitário para estilização
- **🎭 Framer Motion** - Biblioteca de animações fluidas
- **🧩 Shadcn/ui** - Componentes acessíveis baseados em Radix UI
- **🎯 Lucide React** - Biblioteca de ícones SVG moderna
- **📋 React Hook Form** - Gerenciamento de formulários
- **🗂️ Class Variance Authority** - Utilitário para variantes de componentes

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatHeader.tsx      # Cabeçalho com branding
│   │   ├── ChatFooter.tsx      # Rodapé com créditos
│   │   ├── FileUpload.tsx      # Área de upload de CSV
│   │   ├── MessageList.tsx     # Lista de mensagens
│   │   └── ChatInput.tsx       # Campo de entrada
│   └── ui/                     # Componentes Shadcn/ui
├── hooks/
│   └── useChat.ts              # Hook personalizado para gerenciar chat
├── types/
│   └── chat.ts                 # Tipos TypeScript
└── pages/
    └── Index.tsx               # Página principal
```

## 🚀 Instalação e Uso

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-Compatible-CB3837?style=flat&logo=npm&logoColor=white)
![yarn](https://img.shields.io/badge/yarn-Compatible-2C8EBB?style=flat&logo=yarn&logoColor=white)

</div>

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Navegue para o diretório
cd csv-multi-agent-analyzer

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📋 Como Usar

1. **Upload do CSV**: 
   - Arraste e solte um arquivo CSV na área de upload
   - Ou clique para selecionar um arquivo (máximo 10MB)

2. **Fazer Perguntas**:
   - Digite perguntas sobre seus dados no campo de entrada
   - Exemplos: "Gere um gráfico de correlação", "Mostre estatísticas descritivas"

3. **Ver Resultados**:
   - Receba análises em texto, código Python, gráficos e tabelas
   - Copie códigos gerados para usar em seus projetos

## 🔧 Integração com Backend

O frontend está preparado para integração com backend Python via API routes:

### Endpoint Esperado

```
POST /api/chat
Content-Type: application/json

{
  "message": "Gere um gráfico de distribuição",
  "file_data": "dados do CSV",
  "file_name": "dados.csv"
}
```

### Resposta Esperada

```json
{
  "success": true,
  "message": "Análise gerada com sucesso",
  "type": "chart|code|table|text",
  "data": {...}
}
```

## 🎯 Funcionalidades

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Interface de chat estilo ChatGPT com design profissional
- [x] Upload de arquivos CSV com drag & drop intuitivo
- [x] Sistema de notificações semânticas (verde/azul/vermelho)
- [x] Área de mensagens rolável com scroll infinito
- [x] Campo de entrada fixo na parte inferior
- [x] Cabeçalho com branding AI Minds / I2A2
- [x] Rodapé discreto com crédito do grupo
- [x] Design responsivo e acessível (WCAG compliance)
- [x] Paleta de cores profissional e elegante
- [x] Animações leves para entrada de mensagens
- [x] Estrutura modular de componentes
- [x] Otimização de contraste e legibilidade
- [x] Remoção completa de dependências desnecessárias
- [x] Sistema de cores neutras e suaves
- [x] Preparação para streaming de tokens

### 🔄 Integração Futura

- [ ] Conexão real com backend Python
- [ ] Streaming de respostas em tempo real
- [ ] Cache de conversas
- [ ] Exportação de análises
- [ ] Múltiplos arquivos CSV simultâneos

## 🎨 Customização

### Cores

Edite `src/index.css` para personalizar as cores:

```css
:root {
  --primary: 142 71% 45%;      /* Verde profissional */
  --secondary: 217 32% 17%;    /* Azul navy */
  --accent: 217 12% 84%;       /* Azul-cinza sutil */
  --background: 249 250 251;   /* Fundo limpo */
  /* ... outras cores */
}
```

### Componentes

Todos os componentes seguem o padrão Shadcn/ui e podem ser facilmente customizados.

## 📜 Histórico do Projeto

Este projeto foi inicialmente criado utilizando a plataforma **Lovable** como base de desenvolvimento, aproveitando sua estrutura moderna com React, TypeScript e Tailwind CSS. 

Posteriormente, foi completamente **adaptado e customizado** pelo grupo **AI Minds** para atender aos requisitos específicos do **Curso de Agentes Autônomas (I2A2)**, incluindo:

### Melhorias Implementadas

- **🎨 Design System Profissional**: Substituição completa da paleta de cores por tons mais elegantes e adequados para uso corporativo
- **🔧 Remoção de Dependências**: Eliminação do lovable-tagger e outras dependências desnecessárias
- **✨ UX/UI Otimizado**: Implementação de sistema de notificações com cores semânticas (verde para sucesso, azul para info, vermelho para erros)
- **♿ Acessibilidade**: Melhoria do contraste e legibilidade seguindo diretrizes WCAG
- **🏷️ Branding Personalizado**: Adaptação completa para identidade visual do grupo AI Minds

### Tecnologias Mantidas
- **React 18** + **TypeScript** para desenvolvimento robusto
- **Vite** para build otimizado
- **Tailwind CSS** para estilização eficiente
- **Shadcn/ui** para componentes consistentes

## 👥 Contribuição

Desenvolvido pelo grupo **AI Minds** para o Curso de Agentes Autônomos (I2A2).

### Equipe

- Interface moderna inspirada no ChatGPT
- Sistema de design focado em análise de dados
- Arquitetura modular e escalável

## � Estatísticas do Projeto

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/gitgu/csv-mind-chat?style=flat&logo=github)
![GitHub language count](https://img.shields.io/github/languages/count/gitgu/csv-mind-chat?style=flat&logo=github)
![GitHub top language](https://img.shields.io/github/languages/top/gitgu/csv-mind-chat?style=flat&logo=typescript)

</div>

## �📄 Licença

Este projeto faz parte do curso I2A2 do grupo AI Minds.

---

<div align="center">

**💡 Dica**: Para melhor experiência, use arquivos CSV bem estruturados com cabeçalhos claros e dados consistentes.

**Made with ❤️ by AI Minds Team**

</div>
