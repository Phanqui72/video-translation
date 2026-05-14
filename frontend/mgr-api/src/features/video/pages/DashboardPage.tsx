import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectApi, type ProjectDto } from '../../../services/video.service';
import { useAuthStore } from '../../../store/auth.store';

const DashboardPage = () => {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const { user } = useAuthStore();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await projectApi.list(0, 10);
            // The backend returns ApiMessageDto<ResponseListDto<List<ProjectDto>>>
            // Based on list() in ProjectController.java, the data is in ResponseListDto
            if (response.result && response.data?.content) {
                setProjects(response.data.content);
            } else if (response.result && Array.isArray(response.data)) {
                 setProjects(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async () => {
        if (!newProjectTitle.trim()) return;
        setIsCreating(true);
        setCreateError(null);
        try {
            await projectApi.create({ title: newProjectTitle, description: newProjectDesc });
            setShowCreateModal(false);
            setNewProjectTitle('');
            setNewProjectDesc('');
            fetchProjects();
        } catch (error: any) {
            console.error('Failed to create project:', error);
            setCreateError(error.response?.data?.message || 'Có lỗi xảy ra khi tạo dự án. Vui lòng thử lại.');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-20">
                <div className="p-6 flex items-center gap-2 border-b border-gray-50">
                    <span className="material-symbols-outlined text-primary text-3xl">movie_edit</span>
                    <span className="text-xl font-bold tracking-tight">UTEer AI</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { icon: 'dashboard', label: 'Tổng quan', active: true, to: '/dashboard' },
                        { icon: 'video_library', label: 'Dự án của tôi', to: '/projects' },
                        { icon: 'auto_awesome', label: 'Công cụ AI', to: '/tools' },
                        { icon: 'payments', label: 'Gói dịch vụ', to: '/pricing' },
                        { icon: 'settings', label: 'Cài đặt', to: '/settings' },
                    ].map((item) => (
                        <Link 
                            key={item.label} 
                            to={item.to}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">AI Credits</p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">Thời lượng</span>
                                    <span className="font-bold">120 / 300m</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[40%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 sticky top-0">
                    <h1 className="text-lg font-bold text-gray-900">Bảng điều khiển</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{user?.fullName || 'Người dùng'}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Standard Plan</p>
                            </div>
                            <img src={user?.avatarPath || 'https://ui-avatars.com/api/?name=User'} className="w-10 h-10 rounded-xl object-cover border border-gray-200" alt="avatar" />
                        </div>
                    </div>
                </header>

                {/* Dashboard View */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900">Chào mừng trở lại, {user?.fullName?.split(' ')[0] || 'bạn'}! 👋</h2>
                                <p className="text-gray-500">Hôm nay bạn muốn dịch chuyển nội dung nào?</p>
                            </div>
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined">add</span> Dự án mới
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Stats & Usage */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        Giới hạn AI
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Số phút video', value: '850 / 1000m', progress: 85, color: 'bg-primary' },
                                            { label: 'Số dự án', value: `${projects.length} / 50`, progress: (projects.length / 50) * 100, color: 'bg-blue-500' },
                                            { label: 'Dung lượng', value: '4.2 / 10GB', progress: 42, color: 'bg-gray-900' },
                                        ].map((stat) => (
                                            <div key={stat.label}>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-500 font-medium">{stat.label}</span>
                                                    <span className="font-bold text-gray-900">{stat.value}</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{ width: `${stat.progress}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors">
                                        Nâng cấp gói dịch vụ
                                    </button>
                                </div>
                            </div>

                            {/* Projects List */}
                            <div className="lg:col-span-2">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[500px]">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold text-gray-900">Dự án gần đây</h3>
                                        <Link to="/projects" className="text-primary font-bold text-sm hover:underline">Xem tất cả</Link>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                            <p className="text-gray-400 font-medium">Đang tải dự án...</p>
                                        </div>
                                    ) : projects.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {projects.map((project) => (
                                                <div key={project.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
                                                    <div className="aspect-video bg-gray-50 relative overflow-hidden">
                                                        <img src={project.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl">
                                                                <span className="material-symbols-outlined text-3xl">play_arrow</span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-lg">
                                                            {project.projectStatus || 'Active'}
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs text-gray-400">{project.videoCount || 0} videos</p>
                                                            <p className="text-[10px] text-gray-300 font-bold uppercase">
                                                                {new Date(project.createdDate).toLocaleDateString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                                <span className="material-symbols-outlined text-5xl text-gray-200">folder_open</span>
                                            </div>
                                            <h4 className="text-lg font-bold mb-2 text-gray-900">Chưa có dự án nào</h4>
                                            <p className="text-gray-400 max-w-xs mb-8 text-sm leading-relaxed">Hãy bắt đầu bằng cách tạo dự án đầu tiên để trải nghiệm công nghệ dịch thuật AI.</p>
                                            <button 
                                                onClick={() => setShowCreateModal(true)}
                                                className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Tạo dự án ngay
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Tạo dự án mới</h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            {createError && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {createError}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Tên dự án</label>
                                <input 
                                    autoFocus
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 font-medium placeholder:text-gray-300" 
                                    placeholder="Ví dụ: Phim hoạt hình 01"
                                    value={newProjectTitle}
                                    onChange={(e) => setNewProjectTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Mô tả (không bắt buộc)</label>
                                <textarea 
                                    rows={3}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 font-medium placeholder:text-gray-300 resize-none" 
                                    placeholder="Thêm mô tả cho dự án của bạn..."
                                    value={newProjectDesc}
                                    onChange={(e) => setNewProjectDesc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 flex gap-4">
                            <button 
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleCreateProject}
                                disabled={isCreating || !newProjectTitle.trim()}
                                className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
                            >
                                {isCreating ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    'Tạo dự án'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
