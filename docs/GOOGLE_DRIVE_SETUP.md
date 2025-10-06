# Configuração do Google Drive API

Este guia explica como configurar a integração com o Google Drive para permitir que os arquivos CSV sejam automaticamente salvos na pasta compartilhada do Google Drive.

## 📋 Pré-requisitos

- Conta Google
- Acesso ao [Google Cloud Console](https://console.cloud.google.com/)
- Permissões de administrador no projeto

## 🚀 Passo a Passo

### 1. Criar um Projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar um projeto" no topo da página
3. Clique em "Novo Projeto"
4. Dê um nome ao projeto (ex: "EDA AI Minds CSV Upload")
5. Clique em "Criar"

### 2. Ativar a Google Drive API

1. No menu lateral, vá em **APIs e serviços** > **Biblioteca**
2. Pesquise por "Google Drive API"
3. Clique na "Google Drive API"
4. Clique em **Ativar**

### 3. Criar Credenciais OAuth 2.0

1. No menu lateral, vá em **APIs e serviços** > **Credenciais**
2. Clique em **Criar credenciais** > **ID do cliente OAuth**
3. Se solicitado, configure a tela de consentimento:
   - Clique em "Configurar tela de consentimento"
   - Escolha **Externo** (ou Interno se for um workspace Google)
   - Preencha as informações obrigatórias:
     - Nome do aplicativo
     - E-mail de suporte do usuário
     - E-mail do desenvolvedor
   - Clique em **Salvar e continuar**
   - Em **Escopos**, clique em **Adicionar ou remover escopos**
   - Adicione o escopo: `https://www.googleapis.com/auth/drive.file`
   - Clique em **Salvar e continuar**
   - Em **Usuários de teste**, adicione seu e-mail do Google ⚠️ **IMPORTANTE!**
   - Clique em **Salvar e continuar**

   > ⚠️ **CRÍTICO**: O e-mail que você adicionar aqui DEVE ser o mesmo que você usa para fazer login no navegador. Se você esquecer este passo, receberá o erro "403: access_denied". Veja [GOOGLE_DRIVE_ERROR_403.md](./GOOGLE_DRIVE_ERROR_403.md) para resolver.

4. Volte para **Credenciais** e clique em **Criar credenciais** > **ID do cliente OAuth**
5. Selecione **Aplicativo da Web**
6. Configure:
   - **Nome**: EDA AI Minds Frontend
   - **Origens JavaScript autorizadas**: 
     - `http://localhost:8080`
     - `http://localhost:5173` (para desenvolvimento)
     - Adicione o domínio de produção quando disponível
   - **URIs de redirecionamento autorizados**:
     - `http://localhost:8080`
     - `http://localhost:5173`
7. Clique em **Criar**
8. **Copie o Client ID** que será exibido - você precisará dele

### 4. Criar uma Chave de API

1. Ainda em **Credenciais**, clique em **Criar credenciais** > **Chave de API**
2. Copie a chave de API gerada
3. (Recomendado) Clique em "Restringir chave" e configure:
   - **Restrições de aplicativo**: Selecione "Referenciadores HTTP"
   - Adicione: `http://localhost:8080/*` e `http://localhost:5173/*`
   - **Restrições de API**: Selecione "Restringir chave"
   - Marque apenas **Google Drive API**
4. Clique em **Salvar**

### 5. Obter o ID da Pasta do Google Drive

O ID da pasta já está configurado no projeto:
- **Pasta**: https://drive.google.com/drive/folders/1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M
- **ID**: `1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M`

Se precisar usar outra pasta:
1. Abra a pasta no Google Drive
2. O ID está na URL: `https://drive.google.com/drive/folders/[ID_DA_PASTA]`
3. Copie o ID

### 6. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto (se ainda não existir)
2. Copie o conteúdo de `.env.example`
3. Preencha as variáveis do Google Drive:

```bash
# Google Drive API Configuration
VITE_GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=sua-api-key
VITE_GOOGLE_DRIVE_FOLDER_ID=1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M
```

### 7. Testar a Integração

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse a aplicação no navegador

3. Faça upload de um arquivo CSV

4. No primeiro upload:
   - Uma janela popup do Google será aberta
   - Faça login com sua conta Google
   - Autorize o aplicativo a fazer upload de arquivos
   - O arquivo será enviado para a pasta do Google Drive

5. Verifique se o arquivo apareceu na pasta do Google Drive

## 🔒 Segurança

### Variáveis de Ambiente

- **Nunca** commit o arquivo `.env` no Git
- O arquivo `.env` já está no `.gitignore`
- Use `.env.example` como template

### Client ID e API Key

- O Client ID pode ser público (aparece no frontend)
- A API Key deve ter restrições de domínio configuradas
- Nunca exponha a API Key sem restrições

### Permissões da Pasta

- A pasta do Google Drive deve estar configurada com permissões adequadas
- Usuários autorizados podem fazer upload
- Configure as permissões diretamente no Google Drive

## 🛠️ Troubleshooting

### Erro: "403: access_denied" ou "EDA AI Minds não concluiu o processo de verificação"

**Causa**: Seu e-mail não está na lista de usuários de teste

**Solução**: 
1. Acesse: https://console.cloud.google.com/apis/credentials/consent
2. Na seção "Usuários de teste", clique em "+ ADICIONAR USUÁRIOS"
3. Digite seu e-mail do Google (o mesmo que você usa para login)
4. Clique em "ADICIONAR" e depois em "SALVAR"
5. Aguarde 1-2 minutos e tente novamente

📖 **Guia completo**: [GOOGLE_DRIVE_ERROR_403.md](./GOOGLE_DRIVE_ERROR_403.md)

### Erro: "Origin not allowed"

**Solução**: Adicione o domínio nas "Origens JavaScript autorizadas" nas credenciais OAuth 2.0

### Erro: "API key not valid"

**Solução**: 
1. Verifique se a API Key está correta no `.env`
2. Confirme que a Google Drive API está ativada
3. Verifique as restrições da API Key

### Popup de autenticação bloqueado

**Solução**: Permita popups para o domínio localhost no seu navegador

### Arquivo não aparece na pasta

**Solução**:
1. Verifique o ID da pasta no `.env`
2. Confirme que você tem permissão de escrita na pasta
3. Verifique o console do navegador para erros

### "Invalid folder ID"

**Solução**: 
1. Verifique se o ID da pasta está correto
2. Confirme que a pasta existe e está acessível
3. Teste com uma pasta que você criou

## 📚 Recursos Adicionais

- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google API Console](https://console.cloud.google.com/)

## 🎯 Fluxo de Upload

1. **Usuário** seleciona arquivo CSV
2. **Frontend** envia para o backend (processamento)
3. **Backend** processa e retorna metadados
4. **Frontend** autentica com Google (se necessário)
5. **Frontend** faz upload para o Google Drive
6. **Google Drive** armazena o arquivo na pasta configurada
7. **Usuário** recebe confirmação de sucesso

## 📝 Notas Importantes

- O primeiro upload requer autenticação do usuário
- Após a primeira autenticação, o token é armazenado
- O token expira após algum tempo e exige nova autenticação
- Arquivos são salvos com o nome original
- Se houver nome duplicado, o Google Drive cria uma nova versão

## 🔄 Ambiente de Produção

Quando for para produção:

1. Adicione o domínio de produção nas origens autorizadas
2. Atualize a variável `VITE_GOOGLE_DRIVE_FOLDER_ID` se necessário
3. Configure restrições de API Key para o domínio de produção
4. Considere mover a tela de consentimento de "Testing" para "In production"
5. Implemente renovação automática de tokens se necessário
