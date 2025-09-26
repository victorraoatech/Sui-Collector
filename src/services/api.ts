import axios from 'axios';
import { Asset, Collection, User, Club, Transaction, ApiResponse, SearchFilters } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.suicollect.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const assetsApi = {
  getAll: async (filters?: SearchFilters): Promise<ApiResponse<Asset[]>> => {
    const response = await api.get('/assets', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Asset>> => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  getTrending: async (): Promise<ApiResponse<Asset[]>> => {
    const response = await api.get('/assets/trending');
    return response.data;
  },

  getByCollection: async (collectionId: string): Promise<ApiResponse<Asset[]>> => {
    const response = await api.get(`/collections/${collectionId}/assets`);
    return response.data;
  },

  create: async (assetData: FormData): Promise<ApiResponse<Asset>> => {
    const response = await api.post('/assets', assetData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  buyShares: async (assetId: string, shares: number): Promise<ApiResponse<Transaction>> => {
    const response = await api.post(`/assets/${assetId}/buy-shares`, { shares });
    return response.data;
  },

  like: async (assetId: string): Promise<ApiResponse<{ liked: boolean }>> => {
    const response = await api.post(`/assets/${assetId}/like`);
    return response.data;
  },
};

export const collectionsApi = {
  getAll: async (): Promise<ApiResponse<Collection[]>> => {
    const response = await api.get('/collections');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Collection>> => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<ApiResponse<Collection[]>> => {
    const response = await api.get('/collections/featured');
    return response.data;
  },
};

export const usersApi = {
  getProfile: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  getAssets: async (userId: string): Promise<ApiResponse<Asset[]>> => {
    const response = await api.get(`/users/${userId}/assets`);
    return response.data;
  },

  getCollections: async (userId: string): Promise<ApiResponse<Collection[]>> => {
    const response = await api.get(`/users/${userId}/collections`);
    return response.data;
  },

  follow: async (userId: string): Promise<ApiResponse<{ following: boolean }>> => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  },
};

export const clubsApi = {
  getAll: async (): Promise<ApiResponse<Club[]>> => {
    const response = await api.get('/clubs');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Club>> => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },

  join: async (clubId: string): Promise<ApiResponse<{ joined: boolean }>> => {
    const response = await api.post(`/clubs/${clubId}/join`);
    return response.data;
  },

  getMessages: async (clubId: string): Promise<ApiResponse<any[]>> => {
    const response = await api.get(`/clubs/${clubId}/messages`);
    return response.data;
  },

  sendMessage: async (clubId: string, content: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/clubs/${clubId}/messages`, { content });
    return response.data;
  },
};

export const authApi = {
  zkLogin: async (token: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/zk-login', { token });
    return response.data;
  },

  logout: async (): Promise<ApiResponse<{}>> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;