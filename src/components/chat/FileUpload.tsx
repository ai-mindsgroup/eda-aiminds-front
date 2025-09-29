import React, { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  currentFile?: File;
  onRemoveFile: () => void;
}

const FileUpload = ({ onFileUpload, currentFile, onRemoveFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = Array.from(e.dataTransfer.files);
      const csvFile = files.find(file => file.name.endsWith('.csv'));
      
      if (csvFile) {
        onFileUpload(csvFile);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.name.endsWith('.csv')) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="mb-4">
      <AnimatePresence>
        {currentFile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{currentFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(currentFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={onRemoveFile}
              className="p-1 hover:bg-destructive/10 rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`upload-zone rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragOver ? "border-primary bg-primary/5" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">
                Arraste um arquivo CSV ou clique para selecionar
              </p>
              <p className="text-sm text-muted-foreground">
                Suporta arquivos CSV de até 10MB
              </p>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;