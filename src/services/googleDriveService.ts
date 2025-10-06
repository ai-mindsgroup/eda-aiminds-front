/**
 * Google Drive Service
 * Serviço para upload de arquivos para o Google Drive usando a API v3
 * Usa Google Identity Services (GIS) - mais moderno e sem problemas de CSP
 */

// Configurações do Google Drive
const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || '1TZRAYnvGAQt--Dp3jWuPEV36bVVLpv2M';

// Scopes necessários para upload
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// Estado da aplicação
const state = {
  tokenClient: null as TokenClient | null,
  accessToken: null as string | null,
  gsiLoaded: false,
};

/**
 * Verifica se as credenciais do Google Drive estão configuradas
 */
export const hasValidCredentials = (): boolean => {
  const hasClientId = GOOGLE_CLIENT_ID && 
    GOOGLE_CLIENT_ID !== 'your-client-id.apps.googleusercontent.com' &&
    GOOGLE_CLIENT_ID.trim() !== '';
  
  const hasApiKey = GOOGLE_DRIVE_API_KEY && 
    GOOGLE_DRIVE_API_KEY !== 'your-api-key' &&
    GOOGLE_DRIVE_API_KEY.trim() !== '';

  return !!(hasClientId && hasApiKey);
};

/**
 * Carrega o Google Identity Services (GIS)
 */
const loadGoogleIdentityServices = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (state.gsiLoaded) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      state.gsiLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Falha ao carregar Google Identity Services'));
    document.head.appendChild(script);
  });
};

/**
 * Inicializa o cliente de token OAuth
 */
const initializeTokenClient = (): void => {
  if (!hasValidCredentials()) {
    throw new Error('Credenciais do Google Drive não configuradas');
  }

  if (state.tokenClient || !window.google?.accounts?.oauth2) return;

  state.tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID!,
    scope: SCOPES,
    callback: '', // Será definido dinamicamente
  });
};

/**
 * Autentica o usuário com o Google usando GIS
 */
export const authenticateGoogle = async (): Promise<string> => {
  try {
    // Carrega o Google Identity Services
    await loadGoogleIdentityServices();
    
    // Inicializa o cliente de token
    initializeTokenClient();

    // Retorna uma Promise que será resolvida quando o token for obtido
    return new Promise((resolve, reject) => {
      try {
        if (!state.tokenClient) {
          reject(new Error('Token client não inicializado'));
          return;
        }

        state.tokenClient.callback = (response: TokenResponse) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          state.accessToken = response.access_token;
          resolve(state.accessToken);
        };

        // Solicita o token
        if (state.accessToken && isTokenValid()) {
          resolve(state.accessToken);
        } else {
          state.tokenClient.requestAccessToken({ prompt: 'consent' });
        }
      } catch (error) {
        console.error('Erro na autenticação do Google:', error);
        reject(new Error('Falha ao autenticar com o Google Drive'));
      }
    });
  } catch (error) {
    console.error('Erro ao inicializar Google Identity Services:', error);
    throw new Error('Falha ao carregar serviços do Google');
  }
};

/**
 * Verifica se o token ainda é válido (simplificado)
 */
const isTokenValid = (): boolean => {
  // Por simplicidade, considera que o token é válido se existir
  // Em produção, você deveria verificar a expiração
  return !!state.accessToken;
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return isTokenValid();
};

/**
 * Faz upload de um arquivo para o Google Drive
 */
export const uploadToGoogleDrive = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ fileId: string; webViewLink: string }> => {
  try {
    // Garante que o usuário está autenticado
    if (!isAuthenticated()) {
      await authenticateGoogle();
    }

    // Prepara os metadados do arquivo
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [FOLDER_ID],
    };

    // Cria o FormData para upload multipart
    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    form.append('file', file);

    // Faz o upload usando XMLHttpRequest para ter controle de progresso
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            fileId: response.id,
            webViewLink: `https://drive.google.com/file/d/${response.id}/view`,
          });
        } else {
          reject(new Error(`Upload falhou com status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Erro de rede durante o upload'));
      });

      xhr.open(
        'POST',
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink'
      );
      
      if (state.accessToken) {
        xhr.setRequestHeader('Authorization', `Bearer ${state.accessToken}`);
      }
      
      xhr.send(form);
    });
  } catch (error) {
    console.error('Erro ao fazer upload para o Google Drive:', error);
    throw error;
  }
};

/**
 * Upload simplificado usando fetch (alternativa sem progresso)
 */
export const uploadToGoogleDriveSimple = async (
  file: File
): Promise<{ fileId: string; webViewLink: string }> => {
  try {
    // Garante que o usuário está autenticado
    if (!isAuthenticated()) {
      await authenticateGoogle();
    }

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [FOLDER_ID],
    };

    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    form.append('file', file);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload falhou com status ${response.status}`);
    }

    const data = await response.json();
    return {
      fileId: data.id,
      webViewLink: data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`,
    };
  } catch (error) {
    console.error('Erro ao fazer upload para o Google Drive:', error);
    throw error;
  }
};

/**
 * Desconecta o usuário do Google
 */
export const signOutGoogle = async (): Promise<void> => {
  try {
    if (state.accessToken && window.google?.accounts?.oauth2) {
      // Revoga o token
      window.google.accounts.oauth2.revoke(state.accessToken, () => {
        console.log('Token revogado');
      });
    }
    state.accessToken = null;
    state.tokenClient = null;
  } catch (error) {
    console.error('Erro ao desconectar do Google:', error);
  }
};

// Tipos para o Google Identity Services
interface TokenResponse {
  access_token: string;
  error?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
}

interface TokenClient {
  callback: (response: TokenResponse) => void;
  requestAccessToken: (options?: { prompt?: string }) => void;
}

interface GoogleAccounts {
  oauth2: {
    initTokenClient: (config: {
      client_id: string;
      scope: string;
      callback: string | ((response: TokenResponse) => void);
    }) => TokenClient;
    revoke: (token: string, callback: () => void) => void;
  };
}

declare global {
  interface Window {
    google?: {
      accounts?: GoogleAccounts;
    };
  }
}
