import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen, Plus, Film, Clock, HardDrive, Loader2,
  Eye, Pencil, Trash2, MoreHorizontal, Search, X
} from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { projectApi, type ProjectDto, type CreateProjectPayload } from '../../../services/video.service';
import { useVideoStore } from '../../../store/video.store';
import { useNavigate } from 'react-router-dom';

const statusConfig: Record<string, { label: string; labelVi: string; color: string; glow: string }> = {
  draft: { label: 'Draft', labelVi: 'Nháp', color: 'bg-gray-100 text-gray-600', glow: '' },
  processing: { label: 'Processing', labelVi: 'Đang xử lý', color: 'bg-blue-50 text-blue-600', glow: 'shadow-[0_0_12px_rgba(0,122,255,0.3)]' },
  completed: { label: 'Completed', labelVi: 'Hoàn tất', color: 'bg-emerald-50 text-emerald-600', glow: '' },
};

const gradients = [
  'from-blue-500/80 to-purple-600/80',
  'from-purple-500/80 to-pink-500/80',
  'from-cyan-500/80 to-blue-600/80',
  'from-orange-400/80 to-red-500/80',
  'from-emerald-400/80 to-teal-600/80',
  'from-indigo-500/80 to-violet-600/80',
];

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Vừa xong';
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return d.toLocaleDateString('vi-VN');
}

export default function ProjectManagementPage() {
  const navigate = useNavigate();
  const {
    projects, projectsLoading, projectsTotalPages, projectsPage,
    setProjects, setProjectsLoading, setProjectsPage, addProject, removeProject
  } = useVideoStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateProjectPayload>({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);
    try {
      const res = await projectApi.list(projectsPage, 12);
      if (res.result && res.data) {
        setProjects(res.data.content || [], res.data.totalPages || 0);
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    } finally {
      setProjectsLoading(false);
    }
  }, [projectsPage, setProjects, setProjectsLoading]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleCreate = async () => {
    if (!createForm.title.trim()) return;
    setCreating(true);
    try {
      const res = await projectApi.create(createForm);
      if (res.result && res.data) {
        addProject(res.data);
        setShowCreateModal(false);
        setCreateForm({ title: '', description: '' });
      }
    } catch (e) { console.error('Create failed:', e); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return;
    setDeletingId(id);
    try {
      await projectApi.delete(id);
      removeProject(id);
    } catch (e) { console.error('Delete failed:', e); }
    finally { setDeletingId(null); }
  };

  const filtered = projects.filter(p =>
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock stats (can be replaced with real API)
  const stats = [
    { icon: FolderOpen, label: 'Tổng dự án', labelEn: 'Total Projects', value: projects.length, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Film, label: 'Video đã tải', labelEn: 'Total Videos', value: projects.reduce((s, p) => s + (p.videoCount || 0), 0), color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Clock, label: 'Đang xử lý', labelEn: 'Processing', value: projects.filter(p => p.projectStatus === 'processing').length, color: 'text-blue-500', bg: 'bg-blue-50', glow: true },
    { icon: HardDrive, label: 'Dung lượng', labelEn: 'Storage', value: '—', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#717786] font-medium uppercase tracking-widest mb-1">Dashboard &gt; Dự án</p>
            <h1 className="text-3xl font-black font-['Outfit'] text-[#1a1c1d] tracking-tight">
              Dự án của tôi <span className="text-[#717786] font-normal text-lg">/ My Projects</span>
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="premium-gradient text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
          >
            <Plus size={18} /> Tạo dự án mới
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 flex items-center gap-4 ${s.glow ? 'shadow-[0_0_20px_rgba(0,122,255,0.1)]' : ''}`}
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={22} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-black font-['Outfit'] text-[#1a1c1d]">{s.value}</p>
                <p className="text-xs text-[#717786] font-semibold">
                  {s.label} <span className="opacity-60">/ {s.labelEn}</span>
                </p>
              </div>
              {s.glow && (
                <div className="ml-auto w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(0,122,255,0.6)]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" size={16} />
          <input
            type="text"
            placeholder="Tìm dự án..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white/50 border border-white/60 rounded-xl pl-11 pr-4 outline-none focus:bg-white/80 focus:border-primary/30 transition-all text-sm"
          />
        </div>

        {/* Project Grid */}
        {projectsLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-3xl p-16 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 premium-gradient rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20">
              <FolderOpen size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-[#1a1c1d] mb-2">
              Bắt đầu dự án đầu tiên
            </h3>
            <p className="text-sm text-[#717786] mb-6">Start your first project</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="premium-gradient text-white px-6 py-3 rounded-xl font-bold text-sm"
            >
              <Plus size={16} className="inline mr-2" /> Tạo dự án mới
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/videos?projectId=${project.id}`)}
                >
                  {/* Thumbnail */}
                  <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig[project.projectStatus]?.color || statusConfig.draft.color} ${statusConfig[project.projectStatus]?.glow || ''}`}>
                        {statusConfig[project.projectStatus]?.labelVi || 'Nháp'}
                      </span>
                    </div>
                    {/* Hover actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/videos?projectId=${project.id}`); }}
                        className="w-8 h-8 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                        <Eye size={14} className="text-[#1a1c1d]" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                        className="w-8 h-8 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-colors">
                        {deletingId === project.id
                          ? <Loader2 size={14} className="animate-spin text-red-500" />
                          : <Trash2 size={14} className="text-red-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-[#1a1c1d] text-sm truncate mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-xs text-[#717786] line-clamp-2 mb-3">{project.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-[#717786]">
                      <span className="flex items-center gap-1">
                        <Film size={12} /> {project.videoCount || 0} videos
                      </span>
                      <span>{formatDate(project.modifiedDate)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {projectsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            {Array.from({ length: projectsTotalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setProjectsPage(i)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  projectsPage === i
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

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-[520px] border border-white/60"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black font-['Outfit'] text-[#1a1c1d]">
                  Tạo dự án mới <span className="text-[#717786] font-normal text-sm">/ New Project</span>
                </h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-xl hover:bg-[#f3f3f5] transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#717786] uppercase tracking-wider block mb-2">
                    Tên dự án / Project Title *
                  </label>
                  <input
                    type="text"
                    value={createForm.title}
                    onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                    placeholder="Ví dụ: Phim Tình Cảm EP01-20"
                    className="w-full h-12 bg-white/50 border border-[#e2e2e4] rounded-xl px-4 outline-none focus:border-primary/40 focus:bg-white transition-all text-sm"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#717786] uppercase tracking-wider block mb-2">
                    Mô tả / Description
                  </label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    placeholder="Mô tả ngắn về dự án..."
                    rows={3}
                    className="w-full bg-white/50 border border-[#e2e2e4] rounded-xl px-4 py-3 outline-none focus:border-primary/40 focus:bg-white transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 h-12 rounded-xl border border-[#e2e2e4] text-[#717786] font-bold text-sm hover:bg-[#f3f3f5] transition-colors"
                >
                  Hủy / Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreate}
                  disabled={creating || !createForm.title.trim()}
                  className="flex-1 h-12 rounded-xl premium-gradient text-white font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  Tạo dự án
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
