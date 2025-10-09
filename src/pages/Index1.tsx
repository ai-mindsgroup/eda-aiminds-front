import { useState, CSSProperties } from 'react';
import MetricsBar from '@/components/MetricsBar';
import FileUploader from '@/components/FileUploader';
import ChatInterface from '@/components/ChatInterface';
import FilesList from '@/components/FilesList';
import HealthStatus from '@/components/HealthStatus';
import GoogleDriveStatus from '@/components/GoogleDriveStatus';
import { Brain, Upload, MessageCircle, FileText, BarChart3, Settings, Database, Cpu } from 'lucide-react';

type ActiveTab = 'dados' | 'analise' | 'chat' | 'arquivos';

const Index = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [currentFileId, setCurrentFileId] = useState<string | undefined>();
  const [currentFileName, setCurrentFileName] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dados');

  const handleUploadSuccess = (fileId: string, fileName: string): void => {
    setRefreshKey((prev) => prev + 1);
    setCurrentFileId(fileId);
    setCurrentFileName(fileName);
    setActiveTab('chat');
  };

  const primaryGradient: CSSProperties = {
    background: 'linear-gradient(135deg, #f97316 0%, #a855f7 100%)',
  };

  const secondaryGradient: CSSProperties = {
    background: 'linear-gradient(135deg, #fb923c, #c084fc)',
  };

  const cardStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(249, 115, 22, 0.15)',
    backdropFilter: 'blur(10px)',
  };

  const tabStyle = (isActive: boolean): string => 
    `flex items-center space-x-2 px-6 py-3 rounded-t-lg transition-all ${
      isActive 
        ? 'bg-white text-orange-700 border-t-2 border-l-2 border-r-2 border-orange-200' 
        : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Fixo */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="p-3 rounded-xl shadow-lg"
                  style={primaryGradient}
                >
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">EDA AI Minds</h1>
                  <p className="text-sm text-gray-600">Plataforma de Análise de Dados Inteligente</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <HealthStatus />
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Cpu className="h-4 w-4 text-orange-600" />
                  <span>IA Ativa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação por Abas */}
          <nav className="flex space-x-1 px-6">
            <button 
              onClick={() => setActiveTab('dados')}
              className={tabStyle(activeTab === 'dados')}
            >
              <Upload className="h-4 w-4" />
              <span className="font-medium">Dados</span>
            </button>
            <button 
              onClick={() => setActiveTab('analise')}
              className={tabStyle(activeTab === 'analise')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Análise</span>
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={tabStyle(activeTab === 'chat')}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">Chat IA</span>
            </button>
            <button 
              onClick={() => setActiveTab('arquivos')}
              className={tabStyle(activeTab === 'arquivos')}
            >
              <FileText className="h-4 w-4" />
              <span className="font-medium">Arquivos</span>
            </button>
          </nav>
        </header>

        {/* Conteúdo Principal */}
        <main className="p-6">
          
          {/* Aba de Dados */}
          {activeTab === 'dados' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section 
                  className="rounded-xl p-6 shadow-lg"
                  style={cardStyle}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div 
                      className="p-2 rounded-lg"
                      style={secondaryGradient}
                    >
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Importar Dados</h2>
                      <p className="text-sm text-gray-600">Envie seus arquivos CSV para análise</p>
                    </div>
                  </div>
                  <GoogleDriveStatus />
                  <FileUploader onUploadSuccess={handleUploadSuccess} />
                </section>

                <section 
                  className="rounded-xl p-6 shadow-lg"
                  style={cardStyle}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Configurações</h2>
                      <p className="text-sm text-gray-600">Personalize sua experiência</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Processamento Automático</span>
                      <div className="w-10 h-6 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Análise em Tempo Real</span>
                      <div className="w-10 h-6 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </section>
              </div>

              <div 
                className="rounded-xl p-6 shadow-lg"
                style={cardStyle}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Status do Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                    <Database className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-800">Banco de Dados</p>
                      <p className="text-sm text-gray-600">Conectado</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                    <Cpu className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">Motor de IA</p>
                      <p className="text-sm text-gray-600">Operacional</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                    <Brain className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-800">Processamento</p>
                      <p className="text-sm text-gray-600">Ativo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba de Análise */}
          {activeTab === 'analise' && (
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={cardStyle}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={secondaryGradient}
                  >
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Dashboard de Análise</h2>
                    <p className="text-sm text-gray-600">Métricas e insights dos seus dados</p>
                  </div>
                </div>
                {currentFileName && (
                  <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-orange-700">
                      Analisando: {currentFileName}
                    </span>
                  </div>
                )}
              </div>
              <MetricsBar key={`metrics-${refreshKey}`} />
            </section>
          )}

          {/* Aba de Chat */}
          {activeTab === 'chat' && (
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={cardStyle}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  className="p-2 rounded-lg"
                  style={secondaryGradient}
                >
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Assistente de IA</h2>
                  <p className="text-sm text-gray-600">
                    {currentFileName 
                      ? `Converse sobre o arquivo: ${currentFileName}` 
                      : 'Faça perguntas sobre seus dados'
                    }
                  </p>
                </div>
              </div>
              <ChatInterface fileId={currentFileId} fileName={currentFileName} />
            </section>
          )}

          {/* Aba de Arquivos */}
          {activeTab === 'arquivos' && (
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={cardStyle}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Arquivos Processados</h2>
                  <p className="text-sm text-gray-600">Histórico completo de análises</p>
                </div>
              </div>
              <FilesList refreshTrigger={refreshKey} />
            </section>
          )}
        </main>

        {/* Rodapé */}
        <footer className="border-t border-orange-100 bg-white/80 backdrop-blur-sm py-4">
          <div className="px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-700 font-medium">
                EDA AI Minds • Análise Exploratória de Dados com Inteligência Artificial
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2 md:mt-0">
                <div className="flex items-center space-x-1">
                  <Cpu className="h-4 w-4 text-orange-600" />
                  <span>Processamento IA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Database className="h-4 w-4 text-purple-600" />
                  <span>Análise de Dados</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;