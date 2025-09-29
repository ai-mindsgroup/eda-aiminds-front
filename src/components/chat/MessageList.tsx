import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types/chat";
import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  const [copied, setCopied] = useState(false);
  
  const isUser = message.role === "user";

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (message.type) {
      case "code":
        return (
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Python Code
              </span>
              <button
                onClick={() => handleCopy(message.content)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground" />
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap">{message.content}</pre>
          </div>
        );
      case "table":
        return (
          <div className="bg-muted/30 rounded-lg p-4 overflow-x-auto">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Data Table
            </div>
            <div className="text-sm">{message.content}</div>
          </div>
        );
      case "chart":
        return (
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Chart Analysis
            </div>
            <div className="text-sm">{message.content}</div>
          </div>
        );
      case "error":
        return (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="text-xs text-destructive uppercase tracking-wider mb-2">
              Error
            </div>
            <div className="text-sm text-destructive">{message.content}</div>
          </div>
        );
      default:
        return <div className="whitespace-pre-wrap">{message.content}</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-4xl ${
        isUser ? "ml-auto" : "mr-auto"
      }`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      }`}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      
      <div className={`flex-1 ${isUser ? "text-right" : "text-left"}`}>
        <div className={`inline-block max-w-full rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? "message-user" 
            : "message-agent"
        }`}>
          {renderContent()}
        </div>
        <div className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 max-w-4xl mr-auto"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
      <Bot className="h-4 w-4" />
    </div>
    <div className="message-agent rounded-2xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
        <span className="text-sm text-muted-foreground">Analisando...</span>
      </div>
    </div>
  </motion.div>
);

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <AnimatePresence>
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bot className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Bem-vindo ao CSV Multi-Agent Analyzer
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Faça upload de um arquivo CSV e comece a fazer perguntas sobre seus dados. 
              Posso gerar análises, gráficos e códigos Python para você.
            </p>
          </motion.div>
        )}
        
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
        
        {isLoading && <LoadingIndicator />}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;