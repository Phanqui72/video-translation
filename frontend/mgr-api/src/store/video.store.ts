import { create } from 'zustand';
import type { ProjectDto, VideoDto } from '../services/video.service';

interface UploadItem {
  id: string;
  file: File;
  projectId: number;
  progress: number;
  status: 'uploading' | 'completed' | 'failed';
  error?: string;
}

interface VideoManagementState {
  // Projects
  projects: ProjectDto[];
  selectedProject: ProjectDto | null;
  projectsLoading: boolean;
  projectsTotalPages: number;
  projectsPage: number;
  setProjects: (projects: ProjectDto[], totalPages: number) => void;
  setSelectedProject: (project: ProjectDto | null) => void;
  setProjectsLoading: (loading: boolean) => void;
  setProjectsPage: (page: number) => void;
  addProject: (project: ProjectDto) => void;
  updateProject: (project: ProjectDto) => void;
  removeProject: (id: number) => void;

  // Videos
  videos: VideoDto[];
  videosLoading: boolean;
  videosTotalPages: number;
  videosPage: number;
  setVideos: (videos: VideoDto[], totalPages: number) => void;
  setVideosLoading: (loading: boolean) => void;
  setVideosPage: (page: number) => void;
  removeVideo: (id: number) => void;

  // Upload queue
  uploads: UploadItem[];
  addUpload: (item: UploadItem) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  setUploadStatus: (id: string, status: UploadItem['status'], error?: string) => void;
  removeUpload: (id: string) => void;
  clearCompletedUploads: () => void;

  // View mode
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
}

export const useVideoStore = create<VideoManagementState>((set) => ({
  // Projects
  projects: [],
  selectedProject: null,
  projectsLoading: false,
  projectsTotalPages: 0,
  projectsPage: 0,
  setProjects: (projects, totalPages) => set({ projects, projectsTotalPages: totalPages }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setProjectsLoading: (loading) => set({ projectsLoading: loading }),
  setProjectsPage: (page) => set({ projectsPage: page }),
  addProject: (project) => set((s) => ({ projects: [project, ...s.projects] })),
  updateProject: (project) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === project.id ? project : p)),
    })),
  removeProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

  // Videos
  videos: [],
  videosLoading: false,
  videosTotalPages: 0,
  videosPage: 0,
  setVideos: (videos, totalPages) => set({ videos, videosTotalPages: totalPages }),
  setVideosLoading: (loading) => set({ videosLoading: loading }),
  setVideosPage: (page) => set({ videosPage: page }),
  removeVideo: (id) =>
    set((s) => ({ videos: s.videos.filter((v) => v.id !== id) })),

  // Upload queue
  uploads: [],
  addUpload: (item) => set((s) => ({ uploads: [...s.uploads, item] })),
  updateUploadProgress: (id, progress) =>
    set((s) => ({
      uploads: s.uploads.map((u) => (u.id === id ? { ...u, progress } : u)),
    })),
  setUploadStatus: (id, status, error) =>
    set((s) => ({
      uploads: s.uploads.map((u) => (u.id === id ? { ...u, status, error } : u)),
    })),
  removeUpload: (id) =>
    set((s) => ({ uploads: s.uploads.filter((u) => u.id !== id) })),
  clearCompletedUploads: () =>
    set((s) => ({ uploads: s.uploads.filter((u) => u.status !== 'completed') })),

  // View mode
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
