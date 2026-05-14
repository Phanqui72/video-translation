import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Attach token to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =============== PROJECT API ===============
export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  projectStatus: string;
  visibility: string;
  account: { id: number; fullName: string; avatarPath: string };
  videoCount: number;
  createdDate: string;
  modifiedDate: string;
  status: number;
}

export interface CreateProjectPayload {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  visibility?: string;
}

export interface UpdateProjectPayload {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  visibility?: string;
  projectStatus?: string;
}

export const projectApi = {
  list: async (page = 0, size = 12) => {
    const res = await apiClient.get('/v1/project/list', {
      params: { page, size, sort: 'createdDate,desc' },
    });
    return res.data;
  },

  get: async (id: number) => {
    const res = await apiClient.get(`/v1/project/get/${id}`);
    return res.data;
  },

  create: async (data: CreateProjectPayload) => {
    const res = await apiClient.post('/v1/project/create', data);
    return res.data;
  },

  update: async (data: UpdateProjectPayload) => {
    const res = await apiClient.put('/v1/project/update', data);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await apiClient.delete(`/v1/project/delete/${id}`);
    return res.data;
  },
};

// =============== VIDEO API ===============
export interface VideoDto {
  id: number;
  projectId: number;
  projectTitle: string;
  originalFilename: string;
  storageUrl: string;
  durationSeconds: number;
  resolution: string;
  fileSize: number;
  fileFormat: string;
  languageSource: string;
  uploadStatus: string;
  contentType: string;
  createdDate: string;
  modifiedDate: string;
  status: number;
}

export const videoApi = {
  list: async (projectId?: number, page = 0, size = 20) => {
    const params: Record<string, unknown> = { page, size, sort: 'createdDate,desc' };
    if (projectId) params.projectId = projectId;
    const res = await apiClient.get('/v1/video/list', { params });
    return res.data;
  },

  get: async (id: number) => {
    const res = await apiClient.get(`/v1/video/get/${id}`);
    return res.data;
  },

  upload: async (
    file: File,
    projectId: number,
    languageSource = 'zh',
    onProgress?: (pct: number) => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', String(projectId));
    formData.append('languageSource', languageSource);

    const res = await apiClient.post('/v1/video/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      },
    });
    return res.data;
  },

  delete: async (id: number) => {
    const res = await apiClient.delete(`/v1/video/delete/${id}`);
    return res.data;
  },
};

export default apiClient;
