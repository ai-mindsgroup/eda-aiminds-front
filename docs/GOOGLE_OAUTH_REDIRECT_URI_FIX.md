# 🔧 Correção: Erro 400 redirect_uri_mismatch

## 🐛 Erro

```
Erro 400: redirect_uri_mismatch

Não é possível fazer login no app porque ele não obedece à política do OAuth 2.0 do Google.

Detalhes da solicitação: 
origin=http://srv774816.hstgr.cloud:8580
flowName=GeneralOAuthFlow
```

## 🎯 Causa

O Google OAuth está rejeitando porque a URL `http://srv774816.hstgr.cloud:8580` não está registrada como origem autorizada no projeto do Google Cloud Console.

## ✅ Solução

### **Passo a Passo Completo:**

### 1. **Acesse Google Cloud Console**

🔗 https://console.cloud.google.com/apis/credentials

### 2. **Selecione seu projeto** 
- Projeto: "EDA AI Minds" (ou o nome do seu projeto)

### 3. **Edite o OAuth 2.0 Client ID**

Encontre seu Client ID:
```
799957098210-j9uh5li2pnuf2p03m3dat7uslkm793a3.apps.googleusercontent.com
```

Clique no **ícone de editar (lápis)** ✏️

### 4. **Adicione as Origens JavaScript Autorizadas**

Na seção **"Origens JavaScript autorizadas"**, adicione:

```
http://localhost:8080
http://srv774816.hstgr.cloud:8580
```

**⚠️ IMPORTANTE:** 
- Não adicione `/` no final
- Apenas o protocolo + domínio + porta

### 5. **Adicione URIs de Redirecionamento** (se necessário)

Na seção **"URIs de redirecionamento autorizados"**, adicione:

```
http://localhost:8080
http://srv774816.hstgr.cloud:8580
```

### 6. **Salve as alterações**

Clique em **"SALVAR"** no final da página.

⏱️ **Aguarde 5-10 minutos** para as mudanças propagarem nos servidores do Google.

### 7. **Limpe o cache do navegador**

```
1. Abra DevTools (F12)
2. Clique com botão direito no botão de recarregar
3. Selecione "Limpar cache e fazer hard reload"
```

Ou use: `Ctrl + Shift + Delete` → Limpar cache

### 8. **Teste novamente**

Tente fazer login com o Google Drive novamente.

---

## 📸 Guia Visual

### **Tela de Credenciais:**

```
Google Cloud Console
└── APIs e Serviços
    └── Credenciais
        └── IDs do cliente OAuth 2.0
            └── [Seu Client ID]
                ├── Origens JavaScript autorizadas
                │   ├── http://localhost:8080
                │   └── http://srv774816.hstgr.cloud:8580
                │
                └── URIs de redirecionamento autorizados
                    ├── http://localhost:8080
                    └── http://srv774816.hstgr.cloud:8580
```

---

## ⚠️ Problemas Comuns

### **1. "Ainda dando erro após 5 minutos"**

**Solução:**
- Aguarde mais tempo (até 15 minutos)
- Limpe completamente o cache do navegador
- Tente em aba anônima/privada
- Faça logout do Google e login novamente

### **2. "Erro: invalid_client"**

**Causa:** Client ID incorreto no `.env`

**Solução:** Verifique se o `VITE_GOOGLE_CLIENT_ID` no `.env` está correto:
```bash
VITE_GOOGLE_CLIENT_ID=799957098210-j9uh5li2pnuf2p03m3dat7uslkm793a3.apps.googleusercontent.com
```

### **3. "Erro 403: access_denied"**

**Causa:** Diferente do erro 400. Veja: `docs/RESOLVER_ERRO_403_AGORA.md`

**Solução:** Adicione seu e-mail como usuário de teste

### **4. "Erro com HTTPS"**

**Problema:** Google Drive API prefere HTTPS

**Solução Temporária:** HTTP funciona em desenvolvimento, mas para produção use HTTPS

**Solução Permanente:** Configure SSL no VPS (veja `docs/VPS_API_SETUP.md`)

---

## 🔒 Considerações de Segurança

### **⚠️ HTTP em Produção**

Atualmente usando: `http://srv774816.hstgr.cloud:8580`

**Riscos:**
- ❌ Dados não criptografados
- ❌ Tokens OAuth expostos
- ❌ Alguns navegadores podem bloquear

**Recomendação:** Configure HTTPS antes de usar em produção

### **✅ Como Adicionar HTTPS**

Veja guia completo em: `docs/VPS_API_SETUP.md` seção "Como Adicionar HTTPS"

Resumo rápido:
```bash
# 1. Configure domínio (ex: eda-api.seudomain.com)
# 2. Instale Let's Encrypt
sudo apt install certbot python3-certbot-nginx

# 3. Obtenha certificado
sudo certbot --nginx -d eda-api.seudomain.com

# 4. Atualize .env
VITE_API_URL=https://eda-api.seudomain.com

# 5. Atualize Google Cloud Console
# Adicione: https://eda-api.seudomain.com
```

---

## 🧪 Testando

### **1. Verifique se as origens foram adicionadas:**

```bash
# No Google Cloud Console, você deve ver:

Origens JavaScript autorizadas:
✅ http://localhost:8080
✅ http://srv774816.hstgr.cloud:8580

URIs de redirecionamento autorizados:
✅ http://localhost:8080
✅ http://srv774816.hstgr.cloud:8580
```

### **2. Teste no navegador:**

```javascript
// Abra DevTools (F12) > Console
console.log('Origin:', window.location.origin);
// Deve mostrar: http://srv774816.hstgr.cloud:8580
```

### **3. Tente autenticar:**

1. Clique em "Conectar Google Drive" ou faça upload de CSV
2. Deve abrir popup do Google
3. Selecione sua conta
4. ✅ Deve funcionar sem erro 400

---

## 📋 Checklist

- [ ] Acessei https://console.cloud.google.com/apis/credentials
- [ ] Selecionei o projeto correto
- [ ] Editei o OAuth 2.0 Client ID
- [ ] Adicionei `http://srv774816.hstgr.cloud:8580` nas origens JavaScript
- [ ] Adicionei `http://srv774816.hstgr.cloud:8580` nos URIs de redirecionamento
- [ ] Salvei as alterações
- [ ] Aguardei 5-10 minutos
- [ ] Limpei o cache do navegador
- [ ] Testei novamente

---

## 🔗 Origens que devem estar cadastradas

Para funcionar em todos os ambientes:

### **Desenvolvimento Local:**
```
http://localhost:8080
http://localhost:5173  (se usar Vite padrão)
http://127.0.0.1:8080
```

### **VPS:**
```
http://srv774816.hstgr.cloud:8580
```

### **Produção (quando tiver HTTPS):**
```
https://api.seudomain.com
https://app.seudomain.com
```

---

## 📚 Documentação Relacionada

- [RESOLVER_ERRO_403_AGORA.md](./RESOLVER_ERRO_403_AGORA.md) - Erro 403: access_denied
- [VPS_API_SETUP.md](./VPS_API_SETUP.md) - Configuração de VPS e HTTPS
- [GOOGLE_DRIVE_SETUP.md](./GOOGLE_DRIVE_SETUP.md) - Setup completo do Google Drive
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - Documentação oficial

---

## 🎯 Resumo

**Problema:** URL do VPS não autorizada no Google OAuth  
**Solução:** Adicionar `http://srv774816.hstgr.cloud:8580` no Google Cloud Console  
**Tempo:** 5-10 minutos após configurar  
**Próximo passo:** Considere adicionar HTTPS  

---

**Status**: 📝 Aguardando configuração no Google Cloud Console  
**Data**: 09/10/2025  
**Prioridade**: 🔴 Alta (Bloqueia autenticação)
