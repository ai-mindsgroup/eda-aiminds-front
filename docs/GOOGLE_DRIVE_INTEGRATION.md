# Integração com Google Drive - Resumo das Mudanças

## 📝 O que foi implementado?

Foi adicionada a funcionalidade de **upload automático para o Google Drive** quando o usuário faz upload de arquivos CSV. Agora, além de processar o arquivo no backend, o sistema também salva uma cópia no Google Drive.

## 🎯 Fluxo de Upload

1. **Usuário** faz upload de um arquivo CSV
2. **Sistema** envia o arquivo para o backend (processamento)
3. **Backend** processa e retorna metadados (linhas, colunas, etc.)
4. **Sistema** solicita autenticação do Google (primeira vez apenas)
5. **Sistema** faz upload do arquivo para o Google Drive
6. **Google Drive** armazena o arquivo na pasta configurada: https://drive.google.com/drive/folders/1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M
7. **Usuário** recebe confirmação de sucesso

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

1. **`src/services/googleDriveService.ts`**
   - Serviço completo para integração com Google Drive API v3
   - Funções de autenticação OAuth 2.0
   - Upload de arquivos com progresso
   - Gerenciamento de tokens de acesso

2. **`docs/GOOGLE_DRIVE_SETUP.md`**
   - Guia completo passo a passo
   - Como criar projeto no Google Cloud Console
   - Como obter credenciais (Client ID e API Key)
   - Configuração de variáveis de ambiente
   - Troubleshooting

### Arquivos Modificados

1. **`src/components/FileUploader.tsx`**
   - Adicionada lógica de upload para Google Drive
   - Indicador de progresso de upload
   - Tratamento de erros do Google Drive
   - Feedback visual para o usuário

2. **`.env.example`**
   - Adicionadas variáveis de ambiente do Google Drive
   - Documentação inline

3. **`.env`**
   - Adicionadas variáveis (com valores placeholder)

4. **`package.json`**
   - Adicionados tipos TypeScript: `@types/gapi` e `@types/gapi.auth2`

5. **`README.md`**
   - Atualizada documentação
   - Adicionada seção de configuração do Google Drive
   - Link para guia detalhado

## 🔧 Configuração Necessária

### ⚠️ IMPORTANTE: Configurar Credenciais

Para que a funcionalidade funcione, você precisa:

1. **Criar um projeto no Google Cloud Console**
2. **Ativar a Google Drive API**
3. **Criar credenciais OAuth 2.0**
4. **Obter um Client ID e API Key**
5. **Configurar as variáveis de ambiente no `.env`**

### 📖 Guia Completo

Siga o guia detalhado em: **`docs/GOOGLE_DRIVE_SETUP.md`**

O guia inclui:
- Screenshots e instruções passo a passo
- Como configurar OAuth 2.0
- Como obter as credenciais
- Como resolver problemas comuns
- Configuração para produção

## 🚀 Como Usar

### 1. Configure as Credenciais

Edite o arquivo `.env` e substitua os placeholders:

```bash
VITE_GOOGLE_CLIENT_ID=SEU-CLIENT-ID.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=SUA-API-KEY
VITE_GOOGLE_DRIVE_FOLDER_ID=172tSjAXXtzrqpml2_IOBeVxe7PDyzSen
```

### 2. Reinicie a aplicação

```bash
npm run dev
```

### 3. Teste o Upload

1. Acesse a aplicação
2. Faça upload de um arquivo CSV
3. Na primeira vez, será solicitada autorização do Google
4. Autorize o aplicativo
5. O arquivo será processado e salvo no Google Drive
6. Verifique na pasta do Google Drive

## 🔒 Segurança

- O Client ID é público (aparece no frontend)
- A API Key deve ter restrições de domínio configuradas
- A autenticação usa OAuth 2.0 (seguro e padrão Google)
- Tokens de acesso são gerenciados automaticamente
- Sem necessidade de armazenar credenciais no backend

## 💡 Comportamento

### Se as credenciais estiverem configuradas:
- ✅ Arquivo é processado pelo backend
- ✅ Arquivo é salvo no Google Drive
- ✅ Usuário recebe confirmação completa

### Se as credenciais NÃO estiverem configuradas:
- ✅ Arquivo é processado pelo backend normalmente
- ⚠️ Upload para Google Drive falha silenciosamente
- ℹ️ Usuário recebe aviso que não foi salvo no Drive

## 🐛 Troubleshooting

### Erro: "Origin not allowed"
**Solução**: Adicione o domínio nas origens autorizadas no Google Cloud Console

### Erro: "API key not valid"
**Solução**: Verifique se a Google Drive API está ativada e se a chave está correta

### Popup bloqueado
**Solução**: Permita popups para localhost no navegador

### Arquivo não aparece no Drive
**Solução**: Verifique se o ID da pasta está correto e se você tem permissão de escrita

## 📚 Recursos Adicionais

- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google API Console](https://console.cloud.google.com/)

## ✅ Próximos Passos

1. **Configure as credenciais** seguindo o guia
2. **Teste o upload** com um arquivo CSV
3. **Verifique** se o arquivo apareceu no Google Drive
4. **Documente** qualquer problema encontrado

## 🎉 Benefícios

- ✅ Backup automático dos arquivos
- ✅ Acesso aos arquivos de qualquer lugar
- ✅ Compartilhamento fácil via Google Drive
- ✅ Histórico de versões do Google Drive
- ✅ Integração transparente para o usuário
- ✅ Não requer servidor adicional

## 📞 Suporte

Se encontrar problemas:
1. Consulte o guia completo em `docs/GOOGLE_DRIVE_SETUP.md`
2. Verifique o console do navegador para erros
3. Confirme que todas as variáveis de ambiente estão configuradas
4. Teste com uma pasta do Google Drive que você criou
