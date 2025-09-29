# IA Minds - CSV Multi-Agent Analyzer

Uma interface moderna de chat para análise de dados CSV usando agentes de IA, desenvolvida para o **Curso de Agentes Autônomos (I2A2)**.

## 🚀 Características

- **Interface tipo ChatGPT**: Design limpo e moderno com cores relacionadas a planilhas
- **Upload de CSV**: Área dedicada para upload de arquivos CSV com drag & drop
- **Multi-agente**: Suporte para diferentes tipos de análise e agentes especializados
- **Visualizações diversas**: Gráficos interativos, tabelas e códigos Python
- **Responsivo**: Interface adaptável para desktop e mobile
- **Animações suaves**: Transições elegantes usando Framer Motion

## 🎨 Design System

O projeto utiliza um design system moderno com cores inspiradas em planilhas:

- **Verde principal** (`--primary`): Inspirado no Excel para ações principais
- **Azul dados** (`--secondary`): Para elementos relacionados a dados
- **Laranja CSV** (`--accent`): Para destaques e elementos de upload
- **Gradientes suaves**: Para efeitos visuais elegantes

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **Shadcn/ui** para componentes base
- **Lucide React** para ícones

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

### ✅ Implementadas

- [x] Interface de chat estilo ChatGPT
- [x] Upload de arquivos CSV com drag & drop
- [x] Área de mensagens rolável com scroll infinito
- [x] Campo de entrada fixo na parte inferior
- [x] Cabeçalho com branding IA Minds / I2A2
- [x] Rodapé discreto com crédito do grupo
- [x] Design responsivo e moderno
- [x] Animações leves para entrada de mensagens
- [x] Estrutura modular de componentes
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
  --primary: 142 76% 36%;      /* Verde principal */
  --secondary: 217 91% 60%;    /* Azul dados */
  --accent: 25 95% 53%;        /* Laranja CSV */
  /* ... outras cores */
}
```

### Componentes

Todos os componentes seguem o padrão Shadcn/ui e podem ser facilmente customizados.

## 👥 Contribuição

Desenvolvido pelo grupo **IA Minds** para o Curso de Agentes Autônomos (I2A2).

### Equipe

- Interface moderna inspirada no ChatGPT
- Sistema de design focado em análise de dados
- Arquitetura modular e escalável

## 📄 Licença

Este projeto faz parte do curso I2A2 do grupo IA Minds.

---

💡 **Dica**: Para melhor experiência, use arquivos CSV bem estruturados com cabeçalhos claros e dados consistentes.
