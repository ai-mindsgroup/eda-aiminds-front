# 🔓 Resolver Erro 403: access_denied

## ❌ Erro Encontrado

```
EDA AI Minds não concluiu o processo de verificação do Google.
Ele está em fase de testes e só pode ser acessado por testadores aprovados.
Erro 403: access_denied
```

## 🎯 Causa

Quando você cria um aplicativo OAuth no Google Cloud Console, ele começa em **modo de teste**. Isso significa que apenas usuários explicitamente adicionados como "testadores" podem usar o aplicativo.

## ✅ Solução Rápida (2 minutos)

### Passo 1: Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Selecione seu projeto: **EDA AI Minds CSV Upload** (ou o nome que você deu)

### Passo 2: Ir para Tela de Consentimento OAuth

1. No menu lateral esquerdo, clique em: **APIs e serviços**
2. Clique em: **Tela de consentimento OAuth**

### Passo 3: Adicionar Usuários de Teste

1. Na seção **"Usuários de teste"**, clique em **"+ ADICIONAR USUÁRIOS"**
2. Digite seu **e-mail do Google** (o mesmo que você usa para fazer login)
3. Clique em **"ADICIONAR"**
4. Clique em **"SALVAR"** no final da página

### Passo 4: Testar Novamente

1. Volte para a aplicação: http://localhost:8080/
2. **Recarregue a página** (F5 ou Ctrl+R)
3. Faça upload de um arquivo CSV novamente
4. Desta vez deve funcionar! ✅

---

## 📸 Guia Visual

### Localização da Tela de Consentimento:

```
Google Cloud Console
  └── APIs e serviços
       └── Tela de consentimento OAuth  ← CLIQUE AQUI
```

### Seção de Usuários de Teste:

```
┌────────────────────────────────────┐
│ 📝 Usuários de teste               │
├────────────────────────────────────┤
│ + ADICIONAR USUÁRIOS     ← CLIQUE  │
│                                     │
│ seu-email@gmail.com                │
│                                     │
└────────────────────────────────────┘
```

---

## 🔄 Soluções Alternativas

### Opção A: Adicionar Múltiplos E-mails (Recomendado)

Se outras pessoas vão usar a aplicação em desenvolvimento:

1. Adicione **todos os e-mails** dos testadores
2. Pode adicionar até **100 usuários** no modo de teste
3. Cada pessoa deve usar o e-mail que foi adicionado

### Opção B: Publicar o App (Para Produção)

Se quiser que qualquer pessoa possa usar:

1. Na **Tela de consentimento OAuth**, clique em **"PUBLICAR APP"**
2. ⚠️ **ATENÇÃO**: Isso requer verificação do Google (pode demorar dias/semanas)
3. **NÃO recomendado** para desenvolvimento local

### Opção C: Usar Conta de Serviço (Avançado)

Para aplicações que não precisam de login do usuário:
- Use uma **Service Account** em vez de OAuth
- Mais complexo, mas não requer autorização do usuário
- Não recomendado para este caso de uso

---

## 🎯 Solução Detalhada (Passo a Passo com Screenshots)

### 1. Google Cloud Console - Home

```
┌─────────────────────────────────────────┐
│  Google Cloud                            │
├─────────────────────────────────────────┤
│  ☰ Menu                                  │
│    │                                     │
│    ├── APIs e serviços          ← AQUI  │
│    │   ├── Painel de controle            │
│    │   ├── Biblioteca                    │
│    │   ├── Credenciais                   │
│    │   └── Tela de consentimento OAuth ← E AQUI
│    │                                     │
└─────────────────────────────────────────┘
```

### 2. Tela de Consentimento OAuth

```
┌────────────────────────────────────────────┐
│ Tela de consentimento OAuth                 │
├────────────────────────────────────────────┤
│ Tipo de usuário: ⚪ Interno ⚫ Externo      │
│                                             │
│ Informações do app                          │
│ Nome do app: EDA AI Minds                   │
│ E-mail de suporte: seu@email.com            │
│                                             │
│ 📝 Usuários de teste                        │
│ ┌─────────────────────────────────────┐    │
│ │ + ADICIONAR USUÁRIOS                │ ← CLIQUE
│ │                                      │    │
│ │ ✉️ seu-email@gmail.com               │    │
│ │ ✉️ outro-email@gmail.com             │    │
│ │                                      │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ [SALVAR]                              ← CLIQUE
└────────────────────────────────────────────┘
```

### 3. Adicionar E-mail

```
┌────────────────────────────────────┐
│ Adicionar usuários de teste        │
├────────────────────────────────────┤
│                                     │
│ Digite os endereços de e-mail:     │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ seu-email@gmail.com         │    │
│ └─────────────────────────────┘    │
│                                     │
│ Pressione Enter para adicionar     │
│                                     │
│          [CANCELAR]  [ADICIONAR]    │
└────────────────────────────────────┘
```

---

## ✅ Checklist

Siga esta ordem:

- [ ] 1. Acessei o Google Cloud Console
- [ ] 2. Selecionei meu projeto
- [ ] 3. Fui em "APIs e serviços" > "Tela de consentimento OAuth"
- [ ] 4. Cliquei em "+ ADICIONAR USUÁRIOS"
- [ ] 5. Digitei meu e-mail do Google
- [ ] 6. Cliquei em "ADICIONAR"
- [ ] 7. Cliquei em "SALVAR" no final da página
- [ ] 8. Aguardei 1-2 minutos
- [ ] 9. Recarreguei a aplicação (F5)
- [ ] 10. Tentei fazer upload novamente

---

## 🔍 Verificar Se Funcionou

### Antes (Erro):
```
❌ Erro 403: access_denied
EDA AI Minds não concluiu o processo de verificação...
```

### Depois (Sucesso):
```
✅ Popup do Google abre
✅ Mostra: "EDA AI Minds quer acessar sua Conta do Google"
✅ Botão "Permitir" disponível
✅ Após clicar: Popup fecha
✅ Upload é concluído com sucesso
```

---

## 🆘 Problemas Comuns

### Problema 1: "Ainda dá erro 403"

**Soluções**:
1. ✅ Aguarde 1-2 minutos após adicionar o e-mail
2. ✅ Limpe o cache do navegador (Ctrl+Shift+Del)
3. ✅ Tente em uma aba anônima/privada
4. ✅ Verifique se adicionou o e-mail EXATO que usa para login

### Problema 2: "Não encontro 'Tela de consentimento OAuth'"

**Solução**:
```
Google Cloud Console
  → Menu (☰)
    → APIs e serviços
      → Tela de consentimento OAuth
```

### Problema 3: "Adicionei mas continua dando erro"

**Soluções**:
1. ✅ Verifique se você está logado com o e-mail correto no navegador
2. ✅ Saia e entre novamente na sua conta Google
3. ✅ Revogue o acesso anterior:
   - Acesse: https://myaccount.google.com/permissions
   - Remova "EDA AI Minds"
   - Tente novamente

### Problema 4: "Não consigo adicionar meu e-mail"

**Causa**: Pode estar usando um workspace Google (empresa/escola)

**Solução**:
- Use um e-mail Gmail pessoal (@gmail.com)
- OU configure o tipo como "Interno" (se for workspace)

---

## 💡 Dica Pro

### Para Desenvolvimento:

```bash
# Use sempre o mesmo e-mail do Google para testar
# Exemplo:
TESTE_EMAIL=seu-email-pessoal@gmail.com
```

### Adicione no README do projeto:

```markdown
## 🧪 Testadores Autorizados

Para testar a aplicação, seu e-mail deve estar na lista:
- seu-email@gmail.com
- outro-testador@gmail.com

Para solicitar acesso, entre em contato com o desenvolvedor.
```

---

## 📊 Estados do Aplicativo OAuth

| Estado | Descrição | Quem Pode Usar |
|--------|-----------|----------------|
| **Testando** | Estado inicial | Apenas testadores adicionados |
| **Em produção** | Após verificação | Qualquer usuário do Google |
| **Precisa de verificação** | App público complexo | Requer revisão do Google |

**Estado Atual**: 🔶 **TESTANDO** ← Você está aqui

**Próximo Passo**: Adicionar seu e-mail como testador

---

## 🎯 Resumo Executivo

### O Que Fazer AGORA:

1. **Acesse**: https://console.cloud.google.com/apis/credentials/consent
2. **Adicione**: Seu e-mail na seção "Usuários de teste"
3. **Salve**: Clique em "SALVAR"
4. **Teste**: Recarregue a aplicação e tente novamente

### Tempo Estimado:
⏱️ **2 minutos**

### Dificuldade:
🟢 **Muito Fácil**

---

## 🔗 Links Úteis

- **Console do Google Cloud**: https://console.cloud.google.com/
- **Tela de Consentimento OAuth**: https://console.cloud.google.com/apis/credentials/consent
- **Suas Permissões Google**: https://myaccount.google.com/permissions
- **Documentação OAuth**: https://developers.google.com/identity/protocols/oauth2

---

## ✅ Próxima Ação

**ADICIONE SEU E-MAIL COMO TESTADOR AGORA!**

1. Abra: https://console.cloud.google.com/apis/credentials/consent
2. Clique em "+ ADICIONAR USUÁRIOS"
3. Digite seu e-mail
4. Salve
5. Volte e teste!

**Deve funcionar em 2 minutos!** 🎉
