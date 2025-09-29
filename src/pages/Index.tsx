import ChatHeader from "@/components/chat/ChatHeader";
import ChatFooter from "@/components/chat/ChatFooter";
import FileUpload from "@/components/chat/FileUpload";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const {
    messages,
    isLoading,
    currentFile,
    sendMessage,
    handleFileUpload,
    removeFile,
  } = useChat();

  return (
    <div className="flex flex-col h-screen" style={{backgroundColor: 'white', background: 'white'}}>
      <ChatHeader />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* File Upload Section */}
          <div className="flex-shrink-0 px-4 pt-4">
            <FileUpload
              onFileUpload={handleFileUpload}
              currentFile={currentFile}
              onRemoveFile={removeFile}
            />
          </div>
          
          {/* Messages */}
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
        
        {/* Chat Input */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          disabled={!currentFile}
        />
      </main>
      
      <ChatFooter />
    </div>
  );
};

export default Index;
