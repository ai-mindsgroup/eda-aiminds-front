# 🔧 Correção de Timeout no Upload de Arquivos

## 🐛 Problema

**Erro**: `AxiosError: timeout of 30000ms exceeded`

**Situação**: Upload de arquivos CSV grandes excedia o timeout padrão de 30 segundos.

```json
{
    "message": "timeout of 30000ms exceeded",
    "code": "ECONNABORTED"
}
```

## 🎯 Causa Raiz

1. **Timeout muito curto**: 30 segundos (30000ms) não é suficiente para:
   - Arquivos CSV com muitas linhas (>100k linhas)
   - Conexões lentas
   - Processamento intensivo no backend

2. **Falta de feedback**: Usuário não sabia o progresso do upload

3. **Mensagens de erro genéricas**: Não explicava claramente o problema

## ✅ Solução Implementada

### 1. **Aumentado Timeout Global** (`src/lib/axios.ts`)

```typescript
// ANTES:
timeout: 30000, // 30 segundos

// DEPOIS:
timeout: 120000, // 2 minutos
```

### 2. **Timeout Específico para Upload** (`src/components/FileUploader.tsx`)

```typescript
const response = await axios.post<UploadResponse>('/csv/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 300000, // 5 minutos para arquivos CSV grandes
  onUploadProgress: (progressEvent) => {
    if (progressEvent.total) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadProgress(`Enviando para o servidor... ${percentCompleted}%`);
    }
  },
});
```

### 3. **Barra de Progresso Visual**

Agora o usuário vê:
- `"Enviando para o servidor... 25%"`
- `"Enviando para o servidor... 50%"`
- `"Enviando para o servidor... 100%"`

### 4. **Mensagens de Erro Aprimoradas**

```typescript
if (error.code === 'ECONNABORTED') {
  errorTitle = 'Tempo limite excedido';
  errorText = 'O arquivo é muito grande ou o servidor está demorando muito. Tente um arquivo menor ou aguarde alguns minutos.';
} else if (error.code === 'ERR_NETWORK') {
  errorTitle = 'Erro de conexão';
  errorText = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
}
```

## 📊 Comparação de Timeouts

| Operação | Antes | Depois | Justificativa |
|----------|-------|--------|---------------|
| Requisições gerais | 30s | 2min | APIs podem ser lentas |
| Upload de CSV | 30s | 5min | Arquivos grandes + processamento |
| Health check | 30s | 2s | Precisa ser rápido |

## 🎯 Capacidade Estimada

Com os novos timeouts, o sistema suporta:

| Tamanho do Arquivo | Tempo Estimado | Status |
|-------------------|----------------|--------|
| < 1 MB | 1-5s | ✅ Rápido |
| 1-10 MB | 5-30s | ✅ Normal |
| 10-50 MB | 30-120s | ✅ OK |
| 50-200 MB | 2-5min | ⚠️ Lento mas funcional |
| > 200 MB | > 5min | ❌ Pode falhar |

## 💡 Recomendações para o Backend

Para melhorar ainda mais o desempenho:

### 1. **Processamento Assíncrono**

```python
# Ao invés de processar tudo no upload:
@app.post("/csv/upload")
async def upload_csv(file: UploadFile):
    # Salva o arquivo
    file_id = save_file(file)
    
    # Inicia processamento em background
    background_tasks.add_task(process_csv, file_id)
    
    # Retorna imediatamente
    return {"file_id": file_id, "status": "processing"}
```

### 2. **Streaming de Dados**

```python
# Processa linha por linha ao invés de carregar tudo na memória
import pandas as pd

for chunk in pd.read_csv(file, chunksize=10000):
    process_chunk(chunk)
```

### 3. **Compressão**

```python
# Aceita arquivos .csv.gz
import gzip

if file.filename.endswith('.gz'):
    with gzip.open(file.file) as f:
        df = pd.read_csv(f)
```

### 4. **Limite de Tamanho**

```python
from fastapi import File, UploadFile, HTTPException

MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

@app.post("/csv/upload")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(413, "File too large")
```

## 🧪 Como Testar

### 1. **Arquivo Pequeno** (< 1 MB)
```bash
# Deve ser rápido (< 5s)
curl -X POST http://localhost:8000/csv/upload \
  -F "file=@small.csv"
```

### 2. **Arquivo Médio** (10 MB)
```bash
# Deve funcionar (< 30s)
curl -X POST http://localhost:8000/csv/upload \
  -F "file=@medium.csv"
```

### 3. **Arquivo Grande** (50 MB)
```bash
# Deve funcionar mas demorar (1-2min)
curl -X POST http://localhost:8000/csv/upload \
  -F "file=@large.csv"
```

## 🔍 Troubleshooting

### Ainda dando timeout?

**1. Verifique o tamanho do arquivo:**
```javascript
console.log('Tamanho do arquivo:', file.size / 1024 / 1024, 'MB');
```

**2. Verifique a velocidade da conexão:**
```bash
# Windows PowerShell
Test-Connection -ComputerName srv774816.hstgr.cloud -Count 4
```

**3. Aumente o timeout ainda mais:**
```typescript
// Em src/components/FileUploader.tsx
timeout: 600000, // 10 minutos
```

**4. Verifique logs do backend:**
- O backend pode estar travando no processamento
- Memória insuficiente
- Processamento muito lento

### Backend está demorando muito?

**1. Perfil de performance:**
```python
import cProfile
cProfile.run('process_csv(file)')
```

**2. Monitore uso de recursos:**
```bash
# CPU e memória
htop

# Disk I/O
iotop
```

**3. Otimize operações lentas:**
- Use `pandas` com `dtype` especificado
- Evite `.apply()` quando possível
- Use operações vetorizadas

## 📚 Referências

- [Axios Timeout Configuration](https://axios-http.com/docs/req_config)
- [Handling Large Files in FastAPI](https://fastapi.tiangolo.com/tutorial/request-files/)
- [Pandas Performance](https://pandas.pydata.org/docs/user_guide/enhancingperf.html)

---

**Status**: ✅ Corrigido
**Data**: 09/10/2025
**Versão**: 1.0
