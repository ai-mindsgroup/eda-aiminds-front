import { FileSpreadsheet } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">
              AI Minds - CSV Multi-Agent Analyzer
            </h1>
            <p className="text-sm text-muted-foreground">
              Curso de Agentes Autônomos (I2A2)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;