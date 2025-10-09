# 🔧 Correção: Erro 404 - Endpoint não encontrado

## 🐛 Erro

```
AxiosError: Request failed with status code 404
POST http://srv774816.hstgr.cloud:8580/csv/upload
```

## 🎯 Causa

O endpoint `/csv/upload` não existe ou está em um caminho diferente no backend rodando no VPS.

## ✅ Soluções Possíveis

### **Solução 1: Verificar endpoints disponíveis**

1. **Teste o endpoint de documentação da API:**
   ```bash
   # Acesse no navegador:
   http://srv774816.hstgr.cloud:8580/docs
   
   # Ou via curl:
   curl http://srv774816.hstgr.cloud:8580/docs
   ```

2. **Se usar FastAPI, deve ver a documentação interativa (Swagger UI)**

3. **Procure o endpoint correto para upload de CSV**
   - Pode ser: `/upload`, `/api/csv/upload`, `/v1/csv/upload`, etc.

### **Solução 2: Verificar se o backend está rodando corretamente**

```bash
# SSH no VPS
ssh user@srv774816.hstgr.cloud

# Verifique se o processo está rodando
ps aux | grep python
ps aux | grep uvicorn
ps aux | grep gunicorn

# Verifique logs
tail -f /var/log/eda-api.log
# ou
journalctl -u eda-api -f

# Teste localmente no VPS
curl http://localhost:8580/health
curl http://localhost:8580/csv/upload
```

### **Solução 3: Endpoints podem estar em caminhos diferentes**

Possíveis variações:

| Endpoint no Frontend | Possível Endpoint no Backend |
|---------------------|------------------------------|
| `/csv/upload` | `/upload` |
| `/csv/upload` | `/api/csv/upload` |
| `/csv/upload` | `/api/v1/csv/upload` |
| `/csv/upload` | `/files/upload` |
| `/dashboard/metrics` | `/metrics` |
| `/dashboard/metrics` | `/api/metrics` |

### **Solução 4: Adicionar prefixo da API**

Se a API tem um prefixo como `/api`, ajuste o `.env`:

```bash
# .env
# Em vez de:
VITE_API_URL=http://srv774816.hstgr.cloud:8580

# Use:
VITE_API_URL=http://srv774816.hstgr.cloud:8580/api
```

### **Solução 5: Verificar se backend tem os endpoints necessários**

O backend precisa implementar:

```python
# main.py (FastAPI)
from fastapi import FastAPI, UploadFile, File

app = FastAPI()

# Endpoint de upload
@app.post("/csv/upload")
async def upload_csv(file: UploadFile = File(...)):
    # Processar arquivo
    return {
        "file_id": "123",
        "filename": file.filename,
        "rows": 1000,
        "columns": 10,
        "message": "Upload successful"
    }

# Endpoint de métricas
@app.get("/dashboard/metrics")
async def get_metrics():
    return {
        "total_files": 5,
        "total_rows": 10000,
        "total_columns": 15,
        "status": "Ativo"
    }

# Endpoint de health check
@app.get("/health")
async def health():
    return {"status": "healthy"}

# Endpoint de listar arquivos
@app.get("/csv/files")
async def list_files():
    return {
        "files": []
    }
```

---

## 🔍 Diagnóstico Passo a Passo

### **1. Verificar se a API está respondendo:**

```bash
curl http://srv774816.hstgr.cloud:8580/health
```

**Resultado esperado:**
```json
{"status": "healthy"}
```

**Se der erro:** Backend não está rodando ou porta incorreta

### **2. Listar todos os endpoints:**

```bash
# Se FastAPI:
curl http://srv774816.hstgr.cloud:8580/openapi.json | jq '.paths | keys'
```

**Resultado esperado:**
```json
[
  "/csv/upload",
  "/csv/files",
  "/dashboard/metrics",
  "/health"
]
```

### **3. Testar upload manualmente:**

```bash
# Crie um arquivo CSV de teste
echo "col1,col2,col3
1,2,3
4,5,6" > test.csv

# Tente fazer upload
curl -X POST http://srv774816.hstgr.cloud:8580/csv/upload \
  -F "file=@test.csv" \
  -v
```

**Se der 404:** Endpoint não existe  
**Se der 405:** Método não permitido (pode ser GET em vez de POST)  
**Se der 422:** Formato incorreto (esperando outro campo)

---

## 🛠️ Correções no Frontend (Temporárias)

### **Se o endpoint for diferente:**

Atualize `src/components/FileUploader.tsx`:

```typescript
// Em vez de:
const response = await axios.post<UploadResponse>('/csv/upload', formData, {

// Use o endpoint correto:
const response = await axios.post<UploadResponse>('/upload', formData, {
// ou
const response = await axios.post<UploadResponse>('/api/csv/upload', formData, {
```

### **Se precisar de um prefixo global:**

Atualize `.env`:

```bash
# Adicione o prefixo da API
VITE_API_URL=http://srv774816.hstgr.cloud:8580/api
```

---

## 📋 Checklist de Diagnóstico

Execute em ordem:

- [ ] **1. Backend está rodando?**
  ```bash
  curl http://srv774816.hstgr.cloud:8580/health
  ```

- [ ] **2. Porta está correta?** (8580)

- [ ] **3. Firewall permite acesso?**
  ```bash
  sudo ufw status
  sudo ufw allow 8580/tcp
  ```

- [ ] **4. Processo está ativo?**
  ```bash
  ps aux | grep python
  ```

- [ ] **5. Logs mostram erros?**
  ```bash
  tail -f /var/log/eda-api.log
  ```

- [ ] **6. Documentação da API acessível?**
  ```
  http://srv774816.hstgr.cloud:8580/docs
  ```

- [ ] **7. Endpoint `/csv/upload` existe?**
  - Verificar em `/docs` ou `/openapi.json`

- [ ] **8. CORS configurado?**
  - Backend precisa permitir origem do frontend

---

## 🚀 Como Iniciar o Backend no VPS

Se o backend não estiver rodando:

### **Opção 1: Com Uvicorn (Desenvolvimento)**

```bash
# SSH no VPS
ssh user@srv774816.hstgr.cloud

# Navegue até o diretório do projeto
cd /path/to/backend

# Ative o ambiente virtual
source venv/bin/activate

# Inicie o servidor
uvicorn main:app --host 0.0.0.0 --port 8580 --reload
```

### **Opção 2: Com PM2 (Produção)**

```bash
# Instale PM2 se não tiver
npm install -g pm2

# Inicie o backend
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8580" --name eda-api

# Salve configuração
pm2 save

# Configure para iniciar no boot
pm2 startup
```

### **Opção 3: Com Systemd (Produção)**

```bash
# Crie o arquivo de serviço
sudo nano /etc/systemd/system/eda-api.service

# Conteúdo:
[Unit]
Description=EDA API Service
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/backend
ExecStart=/path/to/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8580
Restart=always

[Install]
WantedBy=multi-user.target

# Habilite e inicie
sudo systemctl enable eda-api
sudo systemctl start eda-api
sudo systemctl status eda-api
```

---

## 🔗 Endpoints Esperados

Frontend espera estes endpoints:

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/health` | GET | Health check |
| `/csv/upload` | POST | Upload de arquivo CSV |
| `/csv/files` | GET | Listar arquivos |
| `/csv/files/{file_id}` | GET | Detalhes de um arquivo |
| `/dashboard/metrics` | GET | Métricas do dashboard |
| `/chat` | POST | Enviar mensagem para o chat |

---

## 📚 Documentação Relacionada

- [VPS_API_SETUP.md](./VPS_API_SETUP.md) - Configuração da API no VPS
- [BACKEND_FIX_INSTRUCTIONS.md](./BACKEND_FIX_INSTRUCTIONS.md) - Correções do backend
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

---

## 💡 Dica Rápida

**Descobrir qual endpoint usar:**

1. Acesse: `http://srv774816.hstgr.cloud:8580/docs`
2. Procure por "upload" ou "csv"
3. Veja o caminho exato do endpoint
4. Atualize o código do frontend com o caminho correto

---

**Status**: ⚠️ Aguardando verificação do backend  
**Data**: 09/10/2025  
**Prioridade**: 🔴 Alta (Bloqueia upload de arquivos)
