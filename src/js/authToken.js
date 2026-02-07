import API_BASE_URL from './urlHelper';
import jwtUtils from 'utilities/Token/jwtUtils';
import { logout } from 'js/logout';

export async function fetchWithAuth(url, options = {}) {
  // -----------------------------------------------------------------------
  // 1. PREPARACIÓN: Inyección del Access Token
  // -----------------------------------------------------------------------
  
  let access_token = jwtUtils.getAccessTokenFromCookie();

  // INICIO CAMBIO IMPORTANTE:
  // Definimos los headers base SIN Content-Type todavía
  const headers = {
    'Accept': 'application/json',
    ...options.headers,
  };

  // Solo forzamos 'application/json' si el body NO es FormData.
  // Si ES FormData, dejamos que el navegador establezca 'multipart/form-data; boundary=...' automáticamente.
  if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
  }
  // FIN CAMBIO IMPORTANTE

  if (access_token) {
    headers['Authorization'] = `Bearer ${access_token}`;
  }

  // -----------------------------------------------------------------------
  // 2. EJECUCIÓN INICIAL: Primer intento
  // -----------------------------------------------------------------------

  let response = await fetch(url, { ...options, headers });

  // -----------------------------------------------------------------------
  // 3. INTERCEPCIÓN DE ERRORES: Manejo de Token Expirado (401)
  // -----------------------------------------------------------------------
  if (response.status === 401) {
    // console.log("[Auth] 401 detectado. Intentando estrategia de Refresh Token...");

    try {
      // -------------------------------------------------------
      // A) Petición de Refresh 
      // -------------------------------------------------------
      const refreshResponse = await fetch(`${API_BASE_URL}/api/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
      });

      if (!refreshResponse.ok) {
        throw new Error('No se pudo renovar el token (Refresh token inválido o expirado).');
      }

      // -------------------------------------------------------
      // B) Actualización del Estado Local
      // -------------------------------------------------------
      const data = await refreshResponse.json();
      const newAccessToken = data.access_token;

      jwtUtils.setAccessTokenInCookie(newAccessToken);

      // -------------------------------------------------------
      // C) REINTENTO: Ejecutar la petición original de nuevo
      // -------------------------------------------------------
      headers['Authorization'] = `Bearer ${newAccessToken}`;
      
      response = await fetch(url, { ...options, headers });

    } catch (error) {
      // -------------------------------------------------------
      // D) Fallo Fatal: Logout
      // -------------------------------------------------------
      console.error("[Auth] Sesión expirada totalmente. Forzando logout...", error);
      logout();
      return response; 
    }
  }

  return response;
}