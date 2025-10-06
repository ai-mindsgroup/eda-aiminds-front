# 🚀 Configuração Rápida do Google Drive (5 minutos)

## ⚡ Guia Express

### 1️⃣ Criar Projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Clique em **"Selecionar projeto"** → **"Novo Projeto"**
3. Nome: `EDA AI Minds Upload`
4. Clique em **"Criar"**

### 2️⃣ Ativar Google Drive API

1. No menu lateral: **APIs e serviços** → **Biblioteca**
2. Pesquise: `Google Drive API`
3. Clique e depois em **"Ativar"**

### 3️⃣ Configurar Tela de Consentimento

1. **APIs e serviços** → **Tela de consentimento OAuth**
2. Escolha: **Externo** → **Criar**
3. Preencha:
   - **Nome do app**: `EDA AI Minds`
   - **E-mail de suporte**: seu e-mail
   - **E-mail do desenvolvedor**: seu e-mail
4. Clique em **Salvar e continuar**
5. Em **Escopos**, clique em **Adicionar ou remover escopos**
6. Busque e marque: `https://www.googleapis.com/auth/drive.file`
7. **Salvar e continuar**
8. Em **Usuários de teste**, adicione seu e-mail do Google ⚠️ **MUITO IMPORTANTE!**
   - Use o MESMO e-mail que você usa para login no navegador
   - Se esquecer, receberá erro "403: access_denied"
9. **Salvar e continuar** → **Voltar ao painel**

### 4️⃣ Criar Client ID (OAuth 2.0)

1. **APIs e serviços** → **Credenciais**
2. Clique em **+ Criar credenciais** → **ID do cliente OAuth**
3. Tipo: **Aplicativo da Web**
4. Nome: `EDA Frontend`
5. **Origens JavaScript autorizadas**:
   ```
   http://localhost:8080
   http://localhost:5173
   ```
6. **URIs de redirecionamento autorizados**:
   ```
   http://localhost:8080
   http://localhost:5173
   ```
7. Clique em **Criar**
8. ✅ **COPIE O CLIENT ID** (algo como: `123456789-abc...xyz.apps.googleusercontent.com`)

### 5️⃣ Criar API Key

1. **APIs e serviços** → **Credenciais**
2. **+ Criar credenciais** → **Chave de API**
3. ✅ **COPIE A API KEY**
4. (Opcional) Clique em **Restringir chave**:
   - **Restrições de aplicativo**: `Referenciadores HTTP (sites)`
   - Adicione: `http://localhost:8080/*` e `http://localhost:5173/*`
   - **Restrições de API**: Marque apenas `Google Drive API`
   - **Salvar**

### 6️⃣ Configurar Arquivo .env

Abra o arquivo `.env` na raiz do projeto e substitua:

```bash
# Antes (placeholder):
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your-api-key

# Depois (seus valores reais):
VITE_GOOGLE_CLIENT_ID=123456789-abc...xyz.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=AIza...SyABC123
```

**IMPORTANTE**: 
- ❌ NÃO remova as aspas se elas existirem
- ✅ Cole exatamente o que você copiou
- ✅ Mantenha o `VITE_GOOGLE_DRIVE_FOLDER_ID` como está

### 7️⃣ Reiniciar Aplicação

No terminal, pressione `Ctrl+C` e depois:

```bash
npm run dev
```

### 8️⃣ Testar

1. Acesse: http://localhost:8080/
2. Você verá uma mensagem verde: **"Google Drive Configurado ✓"**
3. Faça upload de um arquivo CSV
4. Na primeira vez, autorizará o Google
5. Verifique o arquivo na pasta: https://drive.google.com/drive/folders/1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M

---

## 🆘 Problemas?

### Erro "403: access_denied"

**Causa**: Seu e-mail não está na lista de testadores

**Solução RÁPIDA**:
1. Acesse: https://console.cloud.google.com/apis/credentials/consent
2. Clique em "+ ADICIONAR USUÁRIOS"
3. Digite seu e-mail
4. Salve e aguarde 1-2 minutos

📖 Guia detalhado: [GOOGLE_DRIVE_ERROR_403.md](./GOOGLE_DRIVE_ERROR_403.md)

### Mensagem "Google Drive Não Configurado"

**Causa**: Credenciais ainda com valores placeholder ou inválidos

**Solução**:
1. Verifique se copiou corretamente o Client ID e API Key
2. Certifique-se de que não há espaços extras
3. Reinicie a aplicação (`Ctrl+C` e `npm run dev`)

### "Origin not allowed" ou "API key not valid"

**Causa**: URLs não autorizadas ou API não ativada

**Solução**:
1. Verifique se adicionou `http://localhost:8080` nas origens autorizadas
2. Confirme que a Google Drive API está ativada
3. Aguarde 1-2 minutos para as mudanças propagarem

### Popup do Google bloqueado

**Causa**: Navegador bloqueando popups

**Solução**:
1. Permita popups para localhost no seu navegador
2. Tente novamente o upload

---

## 📋 Checklist Rápido

- [ ] Projeto criado no Google Cloud Console
- [ ] Google Drive API ativada
- [ ] Tela de consentimento configurada
- [ ] Client ID criado e copiado
- [ ] API Key criada e copiada
- [ ] Arquivo `.env` atualizado com valores reais
- [ ] Aplicação reiniciada
- [ ] Mensagem verde aparecendo
- [ ] Upload testado com sucesso

---

## 💡 Dica Pro

Se quiser testar rapidamente **SEM configurar credenciais**:

- A aplicação funcionará normalmente
- Arquivos serão processados pelo backend
- Apenas não serão salvos no Google Drive
- Você verá uma notificação informando isso

---

## 📚 Guia Completo

Para mais detalhes, consulte: **[GOOGLE_DRIVE_SETUP.md](./GOOGLE_DRIVE_SETUP.md)**

---

**Tempo estimado**: ⏱️ 5-10 minutos
**Dificuldade**: 🟢 Fácil
