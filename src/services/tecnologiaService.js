import { fetchWithAuth } from 'js/authToken';
import API_BASE_URL from 'js/urlHelper';
import { handleResponse } from 'utilities/Responses/handleResponse';
import axios from 'axios';

const BASE_URL = `${API_BASE_URL}/api/tecnologia`;


// GET: Listar Landing
export const indexLanding = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/indexlanding`, {
        params: {
            all: 'true',
        }
    });
    
    return response.data; 
  } catch (error) {
    console.error("Error al obtener tecnologías:", error);
    throw error;
  }
};

// GET: Listar
export const index = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page: page,
    search: filters.search || ''
  });

  const response = await fetchWithAuth(`${BASE_URL}/index?${params.toString()}`, { method: 'GET' });
  return handleResponse(response);
};

// GET: Ver uno
export const show = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/show/${id}`, { method: 'GET' });
  return handleResponse(response);
};

// POST: Crear
export const store = async (data) => {
  const response = await fetchWithAuth(`${BASE_URL}/store`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// PUT: Actualizar
export const update = async (id, data) => {
  const response = await fetchWithAuth(`${BASE_URL}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// DELETE: Eliminar
export const destroy = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  return handleResponse(response);
};