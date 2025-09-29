import React, { useState, useRef, useEffect } from "react";
import { Send, Square } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const canSend = message.trim() && !isLoading && !disabled;

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                disabled 
                  ? "Faça upload de um arquivo CSV para começar..." 
                  : "Digite sua pergunta sobre os dados CSV..."
              }
              disabled={disabled || isLoading}
              className="w-full resize-none rounded-xl border border-input-border bg-input px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50 min-h-[48px] max-h-32"
              rows={1}
            />
            
            {/* Character count */}
            {message.length > 0 && (
              <div className="absolute bottom-1 right-12 text-xs text-muted-foreground">
                {message.length}
              </div>
            )}
          </div>
          
          <motion.button
            type="submit"
            disabled={!canSend}
            whileHover={{ scale: canSend ? 1.02 : 1 }}
            whileTap={{ scale: canSend ? 0.98 : 1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
              canSend
                ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-md hover:shadow-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Square className="h-4 w-4" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </motion.button>
        </form>
        
        {/* Usage hint */}
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-muted-foreground text-center">
            {disabled 
              ? "Carregue um arquivo CSV para começar a análise"
              : "Digite sua pergunta e pressione Enter • Shift+Enter para nova linha"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;