import { Cloud, AlertCircle, CheckCircle } from 'lucide-react';
import { hasValidCredentials } from '@/services/googleDriveService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const GoogleDriveStatus = () => {
  const isConfigured = hasValidCredentials();

  if (isConfigured) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Google Drive Configurado</AlertTitle>
        <AlertDescription className="text-green-700">
          Os arquivos serão automaticamente salvos no Google Drive após o upload.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900">Google Drive Não Configurado</AlertTitle>
      <AlertDescription className="text-amber-700">
        Os arquivos serão processados normalmente, mas não serão salvos no Google Drive.
        <br />
        <a 
          href="/docs/GOOGLE_DRIVE_SETUP.md" 
          target="_blank"
          className="underline font-medium hover:text-amber-900"
        >
          Clique aqui para configurar
        </a>
      </AlertDescription>
    </Alert>
  );
};

export default GoogleDriveStatus;
