import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, CloudUpload, Film, FileVideo, Clock, HardDrive, Loader2,
  Grid3x3, List, Trash2, Eye, MoreHorizontal, CheckCircle2,
  XCircle, AlertCircle, ChevronDown, X, FolderOpen
} from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { videoApi, projectApi, type VideoDto } from '../../../services/video.service';
import { useVideoStore } from '../../../store/video.store';
import { useSearchParams } from 'react-router-dom';

const statusConfig: Record<string, { label: string; labelVi: string; color: string; icon: typeof CheckCircle2 }> = {
  uploaded: { label: 'Uploaded', labelVi: 'Đã tải', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
  pending: { label: 'Pending', labelVi: 'Chờ xử lý', color: 'bg-amber-50 text-amber-600', icon: AlertCircle },
  uploading: { label: 'Uploading', labelVi: 'Đang tải', color: 'bg-blue-50 text-blue-600', icon: Loader2 },
  failed: { label: 'Failed', labelVi: 'Thất bại', color: 'bg-red-50 text-red-500', icon: XCircle },
};

function formatFileSize(bytes: number) {
  if (!bytes) return '—';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

function formatDuration(seconds: number) {
  if (!seconds) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export default function VideoManagementPage() {
  const [searchParams] = useSearchParams();
  const projectIdParam = searchParams.get('projectId');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    videos, videosLoading, videosTotalPages, videosPage,
    setVideos, setVideosLoading, setVideosPage, removeVideo,
    uploads, addUpload, updateUploadProgress, setUploadStatus,
    viewMode, setViewMode, projects, setProjects
  } = useVideoStore();

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    projectIdParam ? Number(projectIdParam) : null
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  // Fetch projects for dropdown
  useEffect(() => {
    projectApi.list(0, 100).then(res => {
      if (res.result && res.data) setProjects(res.data.content || [], res.data.totalPages || 0);
    });
  }, [setProjects]);

  // Fetch videos
  const fetchVideos = useCallback(async () => {
    setVideosLoading(true);
    try {
      const res = await videoApi.list(selectedProjectId || undefined, videosPage, 20);
      if (res.result && res.data) {
        setVideos(res.data.content || [], res.data.totalPages || 0);
      }
    } catch (e) { console.error('Failed to load videos:', e); }
    finally { setVideosLoading(false); }
  }, [selectedProjectId, videosPage, setVideos, setVideosLoading]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  // Upload logic
  const uploadFile = async (file: File) => {
    if (!selectedProjectId && projects.length === 0) {
      alert('Vui lòng tạo dự án trước khi upload video.');
      return;
    }
    const targetProjectId = selectedProjectId || projects[0]?.id;
    if (!targetProjectId) return;

    const uploadId = crypto.randomUUID();
    addUpload({ id: uploadId, file, projectId: targetProjectId, progress: 0, status: 'uploading' });

    try {
      await videoApi.upload(file, targetProjectId, 'zh', (pct) => {
        updateUploadProgress(uploadId, pct);
      });
      setUploadStatus(uploadId, 'completed');
      fetchVideos(); // Refresh list
    } catch (e) {
      setUploadStatus(uploadId, 'failed', 'Upload failed');
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(uploadFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa video này?')) return;
    setDeletingId(id);
    try {
      await videoApi.delete(id);
      removeVideo(id);
    } catch (e) { console.error('Delete failed:', e); }
    finally { setDeletingId(null); }
  };

  const selectedProjectTitle = selectedProjectId
    ? projects.find(p => p.id === selectedProjectId)?.title || 'Chọn dự án'
    : 'Tất cả dự án';

  const activeUploads = uploads.filter(u => u.status === 'uploading');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#717786] font-medium uppercase tracking-widest mb-1">
              Dashboard &gt; {selectedProjectId ? 'Dự án' : 'Video'}
            </p>
            <h1 className="text-3xl font-black font-['Outfit'] text-[#1a1c1d] tracking-tight">
              Quản lý Video <span className="text-[#717786] font-normal text-lg">/ Video Management</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Project Selector */}
            <div className="relative">
              <button
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                className="h-11 px-4 bg-white/50 border border-white/60 rounded-xl flex items-center gap-2 text-sm font-medium text-[#1a1c1d] hover:bg-white/80 transition-all min-w-[200px]"
              >
                <FolderOpen size={16} className="text-[#717786]" />
                <span className="truncate">{selectedProjectTitle}</span>
                <ChevronDown size={14} className="text-[#717786] ml-auto" />
              </button>
              <AnimatePresence>
                {showProjectDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-2 right-0 w-64 bg-white/95 backdrop-blur-2xl rounded-xl border border-white/60 shadow-2xl z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => { setSelectedProjectId(null); setShowProjectDropdown(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/5 transition-colors ${!selectedProjectId ? 'text-primary font-bold bg-primary/5' : 'text-[#1a1c1d]'}`}
                    >
                      Tất cả dự án
                    </button>
                    {projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedProjectId(p.id); setShowProjectDropdown(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-t border-[#f3f3f5] ${selectedProjectId === p.id ? 'text-primary font-bold bg-primary/5' : 'text-[#1a1c1d]'}`}
                      >
                        {p.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="premium-gradient text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow"
            >
              <Upload size={18} /> Upload Video
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>
        </div>

        {/* Upload Drop Zone */}
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          animate={isDragOver ? { scale: 1.01, borderColor: '#007AFF' } : { scale: 1 }}
          className={`glass-card rounded-2xl p-10 border-2 border-dashed cursor-pointer transition-all group ${
            isDragOver ? 'border-primary/60 bg-primary/5' : 'border-[#c1c6d7] hover:border-primary/30 hover:bg-white/80'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              isDragOver ? 'premium-gradient' : 'bg-blue-50 group-hover:bg-blue-100'
            }`}>
              <CloudUpload size={28} className={isDragOver ? 'text-white' : 'text-primary'} />
            </div>
            <p className="text-base font-bold text-[#1a1c1d] mb-1">
              Kéo thả video vào đây
            </p>
            <p className="text-sm text-[#717786] mb-3">
              Hoặc nhấn để chọn tệp từ máy tính
            </p>
            <p className="text-xs text-[#717786]/60">
              Hỗ trợ: MP4, MKV, AVI, MOV, WebM (Tối đa 2GB)
            </p>
          </div>
        </motion.div>

        {/* Active Uploads */}
        <AnimatePresence>
          {uploads.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3">
              {uploads.map(u => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    u.status === 'uploading' ? 'bg-blue-50' : u.status === 'completed' ? 'bg-emerald-50' : 'bg-red-50'
                  }`}>
                    {u.status === 'uploading' ? (
                      <Loader2 size={18} className="text-primary animate-spin" />
                    ) : u.status === 'completed' ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <XCircle size={18} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a1c1d] truncate">{u.file.name}</p>
                    <p className="text-xs text-[#717786]">
                      {formatFileSize(u.file.size)} • {u.status === 'uploading' ? `${u.progress}%` : u.status === 'completed' ? 'Hoàn tất' : 'Thất bại'}
                    </p>
                    {u.status === 'uploading' && (
                      <div className="w-full h-1.5 bg-[#e2e2e4] rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full premium-gradient shadow-[0_0_8px_rgba(0,122,255,0.4)]"
                          animate={{ width: `${u.progress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video List Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-['Outfit'] text-[#1a1c1d]">
            Danh sách Video <span className="text-[#717786] font-normal text-sm">({videos.length})</span>
          </h2>
          <div className="flex items-center gap-1 bg-white/50 rounded-lg p-1 border border-white/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-[#717786] hover:bg-white/60'}`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary text-white shadow-sm' : 'text-[#717786] hover:bg-white/60'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Video Content */}
        {videosLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : videos.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <FileVideo size={48} className="mx-auto text-[#c1c6d7] mb-4" />
            <p className="font-bold text-[#1a1c1d]">Chưa có video nào</p>
            <p className="text-sm text-[#717786] mt-1">Kéo thả hoặc chọn file để bắt đầu / No videos yet</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-4 gap-5">
            <AnimatePresence>
              {videos.map((video, i) => {
                const st = statusConfig[video.uploadStatus] || statusConfig.pending;
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-xl overflow-hidden group"
                  >
                    <div className="h-28 bg-gradient-to-br from-[#1a1c1d] to-[#2f3132] flex items-center justify-center relative">
                      <FileVideo size={32} className="text-white/30" />
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-md font-mono backdrop-blur-sm">
                        {video.fileFormat?.toUpperCase()}
                      </span>
                      {video.durationSeconds && (
                        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm">
                          {formatDuration(video.durationSeconds)}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-[#1a1c1d] truncate mb-2">
                        {video.originalFilename}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.color}`}>
                          {st.labelVi}
                        </span>
                        <span className="text-[10px] text-[#717786]">{formatFileSize(video.fileSize)}</span>
                      </div>
                    </div>
                    {/* Hover delete */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5">
                      <button
                        onClick={() => navigate(`/ai-pipeline?videoId=${video.id}`)}
                        className="w-7 h-7 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                        title="Xử lý AI"
                      >
                        <Upload size={12} className="text-white rotate-180" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="w-7 h-7 rounded-lg bg-red-500/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Xóa"
                      >
                        {deletingId === video.id
                          ? <Loader2 size={12} className="text-white animate-spin" />
                          : <Trash2 size={12} className="text-white" />}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Table View */
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e2e4]/50">
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Tên video / Filename</th>
                  <th className="text-left px-4 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Dung lượng / Size</th>
                  <th className="text-left px-4 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Thời lượng</th>
                  <th className="text-left px-4 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Định dạng</th>
                  <th className="text-left px-4 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Trạng thái / Status</th>
                  <th className="text-left px-4 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Ngày tải</th>
                  <th className="text-right px-6 py-4 text-[10px] font-bold text-[#717786] uppercase tracking-widest">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => {
                  const st = statusConfig[video.uploadStatus] || statusConfig.pending;
                  const StIcon = st.icon;
                  return (
                    <motion.tr
                      key={video.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-[#e2e2e4]/30 hover:bg-primary/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a1c1d] to-[#2f3132] flex items-center justify-center flex-shrink-0">
                            <FileVideo size={16} className="text-white/50" />
                          </div>
                          <span className="text-sm font-semibold text-[#1a1c1d] truncate max-w-[200px]">
                            {video.originalFilename}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#717786]">{formatFileSize(video.fileSize)}</td>
                      <td className="px-4 py-4 text-sm text-[#717786]">{formatDuration(video.durationSeconds)}</td>
                      <td className="px-4 py-4">
                        <span className="bg-[#f3f3f5] text-[#1a1c1d] px-2 py-1 rounded-md text-[11px] font-bold uppercase">
                          {video.fileFormat}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.color}`}>
                          <StIcon size={12} className={video.uploadStatus === 'uploading' ? 'animate-spin' : ''} />
                          {st.labelVi}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#717786]">{formatDate(video.createdDate)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => navigate(`/ai-pipeline?videoId=${video.id}`)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                            title="Xử lý AI"
                          >
                            <Upload size={14} className="rotate-180" />
                          </button>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-[#717786] hover:text-red-500 transition-colors"
                            title="Xóa"
                          >
                            {deletingId === video.id
                              ? <Loader2 size={14} className="animate-spin" />
                              : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {videosTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            {Array.from({ length: videosTotalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setVideosPage(i)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  videosPage === i
                    ? 'premium-gradient text-white shadow-md shadow-primary/20'
                    : 'bg-white/50 text-[#717786] hover:bg-white/80'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
