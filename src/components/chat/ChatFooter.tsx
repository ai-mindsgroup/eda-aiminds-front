import React from "react";
import { Heart } from "lucide-react";

const ChatFooter = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Desenvolvido com</span>
          <Heart className="h-3 w-3 text-red-500 fill-current" />
          <span>pelo grupo</span>
          <strong className="text-foreground">IA Minds</strong>
        </div>
      </div>
    </footer>
  );
};

export default ChatFooter;