import { fetchWithAuth } from 'js/authToken';
import API_BASE_URL from 'js/urlHelper';
import { handleResponse } from 'utilities/Responses/handleResponse';
import axios from 'axios';

const BASE_URL = `${API_BASE_URL}/api/proyecto`;

export const index = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page,
    search: filters.search || '',
    estado: filters.estado || ''
  });
  const response = await fetchWithAuth(`${BASE_URL}/index?${params.toString()}`, { method: 'GET' });
  return handleResponse(response);
};

export const indexLanding = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/indexlanding`, {
      params: {
        page: page,
        estado: 1,
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error en indexLanding:", error);
    throw error;
  }
};

export const show = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/show/${id}`, { method: 'GET' });
  return handleResponse(response);
};

// IMPORTANTE: Usamos FormData para subir archivos
export const store = async (formData) => {
  const response = await fetchWithAuth(`${BASE_URL}/store`, {
    method: 'POST',
    body: formData, // No poner Content-Type header manualmente, fetch lo pone
  });
  return handleResponse(response);
};

// Laravel requiere _method: 'PUT' dentro del FormData para manejar archivos en updates
export const update = async (id, formData) => {
  // Aseguramos que el spoofing se hace aquí
  if (!formData.has('_method')) { 
      formData.append('_method', 'PUT'); 
  }
  
  const response = await fetchWithAuth(`${BASE_URL}/update/${id}`, {
    method: 'POST', 
    body: formData,
  });
  return handleResponse(response);
};

export const destroy = async (id) => {
    const response = await fetchWithAuth(`${BASE_URL}/destroy/${id}`, { method: 'DELETE' });
    return handleResponse(response);
};

export const toggleStatus = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/status/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
  return handleResponse(response);
};