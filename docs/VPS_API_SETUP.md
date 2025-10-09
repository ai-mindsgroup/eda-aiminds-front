# 🌐 Configuração de API em VPS/Produção

## 📋 Resumo

Este guia explica como configurar o frontend para conectar com a API rodando em um VPS ou servidor remoto.

## ⚙️ Configuração Rápida

### 1. **Edite o arquivo `.env`**

```bash
# Backend API Configuration
VITE_API_URL=http://srv774816.hstgr.cloud:8580
```

### 2. **Reinicie o servidor de desenvolvimento**

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
npm run dev
```

✅ Pronto! O frontend agora se conecta ao VPS.

---

## 🔍 Como Funciona

O sistema de detecção de backend (`src/lib/axios.ts`) funciona assim:

### Ordem de Prioridade:

```
1. VITE_API_URL (variável de ambiente) ← PRIORIDADE
2. http://localhost:8001 (porta padrão)
3. http://localhost:8000 (porta alternativa)
```

### Fluxo de Detecção:

```typescript
// 1. Verifica se VITE_API_URL está configurado
if (API_URL_FROM_ENV) {
  try {
    // Tenta se conectar na URL configurada
    const response = await axios.get(`${API_URL_FROM_ENV}/health`);
    if (response.status === 200) {
      console.log(`✅ Backend detectado: ${API_URL_FROM_ENV}`);
      return API_URL_FROM_ENV;
    }
  } catch (error) {
    // Se falhar, tenta localhost
    console.log(`❌ URL configurada não disponível, tentando localhost...`);
  }
}

// 2. Se não configurado ou falhou, tenta localhost
const ports = [8001, 8000];
for (const port of ports) {
  // Tenta cada porta...
}
```

---

## 🌍 Cenários de Uso

### **Desenvolvimento Local**

```bash
# .env
# Sem configuração ou:
VITE_API_URL=http://localhost:8001
```

✅ Conecta ao backend local na porta 8001

### **Desenvolvimento com Backend Remoto**

```bash
# .env
VITE_API_URL=http://srv774816.hstgr.cloud:8580
```

✅ Frontend local conecta ao backend no VPS

### **Produção (Frontend + Backend no VPS)**

```bash
# .env
VITE_API_URL=http://srv774816.hstgr.cloud:8580
```

✅ Ambos no mesmo servidor ou servidores diferentes

### **Produção com HTTPS**

```bash
# .env
VITE_API_URL=https://api.seudomain.com
```

✅ Conexão segura com certificado SSL

---

## 🔒 Considerações de Segurança

### ⚠️ **HTTP vs HTTPS**

Atualmente usando: `http://srv774816.hstgr.cloud:8580`

**Problemas:**
- ❌ Dados não criptografados
- ❌ Navegadores modernos podem bloquear
- ❌ Google Drive API pode não funcionar (requer HTTPS)

**Recomendação:** Configure SSL/HTTPS

### 🛡️ **Como Adicionar HTTPS**

#### Opção 1: Nginx + Let's Encrypt (Recomendado)

```bash
# No VPS, instale certbot
sudo apt install certbot python3-certbot-nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/eda-api

server {
    listen 80;
    server_name api.seudomain.com;

    location / {
        proxy_pass http://localhost:8580;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Obtenha certificado SSL
sudo certbot --nginx -d api.seudomain.com

# Reinicie nginx
sudo systemctl restart nginx
```

Depois atualize `.env`:
```bash
VITE_API_URL=https://api.seudomain.com
```

#### Opção 2: Cloudflare Tunnel (Mais Fácil)

1. Crie conta no Cloudflare
2. Adicione seu domínio
3. Configure tunnel:
   ```bash
   cloudflared tunnel create eda-api
   cloudflared tunnel route dns eda-api api.seudomain.com
   cloudflared tunnel run --url http://localhost:8580 eda-api
   ```
4. Atualize `.env`:
   ```bash
   VITE_API_URL=https://api.seudomain.com
   ```

---

## 🧪 Testando a Conexão

### 1. **Teste direto no navegador**

```
http://srv774816.hstgr.cloud:8580/health
```

**Resposta esperada:**
```json
{
  "status": "healthy"
}
```

### 2. **Teste via terminal**

```bash
# Windows PowerShell
curl http://srv774816.hstgr.cloud:8580/health

# Ou
Invoke-WebRequest http://srv774816.hstgr.cloud:8580/health
```

### 3. **Verifique no console do navegador**

```javascript
// Abra DevTools (F12) > Console
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### 4. **Monitore logs do axios**

```
// No console do navegador, você verá:
✅ Backend detectado na URL configurada: http://srv774816.hstgr.cloud:8580
```

---

## 🐛 Troubleshooting

### **Erro: "Backend não detectado"**

**Causa:** API não está respondendo no `/health`

**Solução:**
1. Verifique se o backend está rodando:
   ```bash
   ssh user@srv774816.hstgr.cloud
   ps aux | grep python
   ```

2. Verifique logs do backend:
   ```bash
   tail -f /var/log/eda-api.log
   ```

3. Teste o endpoint:
   ```bash
   curl http://localhost:8580/health
   ```

### **Erro: CORS**

**Sintoma:** `Access-Control-Allow-Origin` error

**Solução:** Configure CORS no backend:

```python
# main.py (FastAPI)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://srv774816.hstgr.cloud:8580",
        # Adicione seu domínio de produção aqui
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **Erro: Timeout mesmo com novo timeout**

**Causa:** Firewall ou proxy bloqueando

**Solução:**
1. Verifique firewall do VPS:
   ```bash
   sudo ufw status
   sudo ufw allow 8580/tcp
   ```

2. Verifique se a porta está aberta:
   ```bash
   sudo netstat -tlnp | grep 8580
   ```

### **Erro: Certificado SSL inválido**

**Causa:** HTTPS configurado incorretamente

**Solução:**
```bash
# Renove certificado Let's Encrypt
sudo certbot renew

# Verifique validade
openssl s_client -connect api.seudomain.com:443
```

---

## 📊 Comparação: Local vs VPS

| Aspecto | Local | VPS |
|---------|-------|-----|
| URL | http://localhost:8001 | http://srv774816.hstgr.cloud:8580 |
| Velocidade | ⚡ Muito rápido | 🐌 Depende da latência |
| Disponibilidade | 🏠 Só quando seu PC está ligado | ☁️ 24/7 |
| Segurança | ✅ Rede local | ⚠️ Exposto na internet |
| Custo | 💰 Grátis | 💰💰 Custo do VPS |
| SSL | ❌ Não necessário | ✅ Necessário |

---

## 🚀 Deploy Completo (Recomendações)

Para um deploy profissional:

### **Frontend**
- Deploy no **Vercel**, **Netlify** ou **Cloudflare Pages**
- Configure `VITE_API_URL` nas variáveis de ambiente da plataforma
- Build otimizado: `npm run build`

### **Backend**
- Use **Docker** para facilitar deploy
- Configure **nginx** como reverse proxy
- Adicione **SSL/HTTPS** com Let's Encrypt
- Configure **PM2** ou **systemd** para manter API rodando
- Configure **rate limiting** para prevenir abuso

### **Exemplo de Deploy Completo**

```
https://eda-aiminds.com (Frontend - Vercel)
           ↓
https://api.eda-aiminds.com (Backend - VPS)
           ↓
        Nginx + SSL
           ↓
    FastAPI (localhost:8580)
```

---

## 📝 Checklist de Produção

- [ ] Backend rodando no VPS
- [ ] Porta aberta no firewall
- [ ] `/health` endpoint funcionando
- [ ] CORS configurado corretamente
- [ ] SSL/HTTPS configurado
- [ ] `VITE_API_URL` configurado no `.env`
- [ ] Frontend testado localmente com VPS
- [ ] Logs configurados
- [ ] Monitoramento ativo (opcional)
- [ ] Backup configurado (opcional)

---

## 🔗 Links Úteis

- [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

---

**Status**: ✅ Configurado
**Data**: 09/10/2025
**API**: http://srv774816.hstgr.cloud:8580
