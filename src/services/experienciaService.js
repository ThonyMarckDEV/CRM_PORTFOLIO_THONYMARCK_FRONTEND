import { fetchWithAuth } from 'js/authToken';
import API_BASE_URL from 'js/urlHelper';
import { handleResponse } from 'utilities/Responses/handleResponse';

const BASE_URL = `${API_BASE_URL}/api/experiencia`;

export const index = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page,
    search: filters.search || '',
    actual: filters.actual !== '' ? filters.actual : ''
  });
  return handleResponse(await fetchWithAuth(`${BASE_URL}/index?${params.toString()}`, { method: 'GET' }));
};

export const show = async (id) => {
  return handleResponse(await fetchWithAuth(`${BASE_URL}/show/${id}`, { method: 'GET' }));
};

export const store = async (formData) => {
  return handleResponse(await fetchWithAuth(`${BASE_URL}/store`, {
    method: 'POST',
    body: formData,
  }));
};

export const update = async (id, formData) => {
  if (!formData.has('_method')) formData.append('_method', 'PUT');
  
  return handleResponse(await fetchWithAuth(`${BASE_URL}/update/${id}`, {
    method: 'POST',
    body: formData,
  }));
};

export const destroy = async (id) => {
  return handleResponse(await fetchWithAuth(`${BASE_URL}/destroy/${id}`, { method: 'DELETE' }));
};