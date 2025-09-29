import { useState, useCallback } from "react";
import { Message, ApiResponse } from "@/types/chat";
import { toast } from "@/hooks/use-toast";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | undefined>();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addMessage = useCallback((content: string, role: "user" | "agent", type: Message["type"] = "text") => {
    const message: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      type,
    };
    
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentFile) {
      toast({
        title: "Arquivo necessário",
        description: "Por favor, faça upload de um arquivo CSV primeiro.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    addMessage(content, "user");
    setIsLoading(true);

    try {
      // Simulate API call - In real implementation, replace with actual backend call
      const response = await simulateApiCall(content, currentFile);
      
      // Add agent response
      addMessage(response.message, "agent", response.type);
      
      if (!response.success) {
        toast({
          title: "Erro na análise",
          description: "Houve um problema ao processar sua solicitação.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage(
        "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.",
        "agent",
        "error"
      );
      
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar com o servidor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentFile, addMessage]);

  const handleFileUpload = useCallback((file: File) => {
    setCurrentFile(file);
    
    // Add system message about file upload
    addMessage(
      `Arquivo "${file.name}" carregado com sucesso! Agora você pode fazer perguntas sobre os dados.`,
      "agent"
    );
    
    toast({
      title: "Arquivo carregado",
      description: `${file.name} foi carregado com sucesso.`,
    });
  }, [addMessage]);

  const removeFile = useCallback(() => {
    setCurrentFile(undefined);
    setMessages([]);
    
    toast({
      title: "Arquivo removido",
      description: "O histórico de conversas foi limpo.",
    });
  }, []);

  return {
    messages,
    isLoading,
    currentFile,
    sendMessage,
    handleFileUpload,
    removeFile,
  };
};

// Simulate API response - Replace with actual backend integration
const simulateApiCall = async (message: string, file: File): Promise<ApiResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("gráfico") || lowerMessage.includes("gráficos")) {
    return {
      success: true,
      message: `Analisando o arquivo "${file.name}" para gerar gráficos...\n\nIdentifiquei ${Math.floor(Math.random() * 10) + 5} colunas numéricas que podem ser visualizadas. Recomendo começar com:\n\n• Histograma das variáveis principais\n• Scatter plot para correlações\n• Box plot para identificar outliers\n\nGostaria que eu gere algum gráfico específico?`,
      type: "chart",
    };
  }

  if (lowerMessage.includes("código") || lowerMessage.includes("python")) {
    return {
      success: true,
      message: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Carregando o arquivo CSV
df = pd.read_csv('${file.name}')

# Análise exploratória básica
print("Informações do dataset:")
print(df.info())
print("\\nEstatísticas descritivas:")
print(df.describe())

# Verificando valores faltantes
print("\\nValores faltantes por coluna:")
print(df.isnull().sum())

# Visualização básica
plt.figure(figsize=(12, 8))
df.hist(bins=30)
plt.tight_layout()
plt.show()`,
      type: "code",
    };
  }

  if (lowerMessage.includes("tabela") || lowerMessage.includes("dados")) {
    return {
      success: true,
      message: `Análise da estrutura dos dados em "${file.name}":

📊 Resumo do Dataset:
• Linhas: ${Math.floor(Math.random() * 10000) + 1000}
• Colunas: ${Math.floor(Math.random() * 20) + 5}
• Tamanho: ${(file.size / 1024).toFixed(1)} KB

🔍 Primeiras observações:
• Dados numéricos: ${Math.floor(Math.random() * 10) + 3} colunas
• Dados categóricos: ${Math.floor(Math.random() * 5) + 2} colunas
• Valores únicos detectados em algumas colunas
• Possíveis outliers identificados

Gostaria de ver uma análise mais detalhada de alguma coluna específica?`,
      type: "table",
    };
  }

  return {
    success: true,
    message: `Entendi sua pergunta sobre "${message}". Estou analisando o arquivo "${file.name}" para fornecer insights relevantes.\n\nPosso ajudar você com:\n\n🔍 **Análise Exploratória**\n• Estatísticas descritivas\n• Identificação de padrões\n• Detecção de outliers\n\n📊 **Visualizações**\n• Gráficos de distribuição\n• Correlações entre variáveis\n• Gráficos personalizados\n\n🐍 **Código Python**\n• Scripts para análise\n• Códigos para gráficos\n• Pipelines de processamento\n\nO que você gostaria de explorar primeiro?`,
    type: "text",
  };
};