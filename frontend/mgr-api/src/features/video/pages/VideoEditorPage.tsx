import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { projectApi, videoApi, type ProjectDto, type VideoDto } from '../../../services/video.service';

export const VideoEditorPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<ProjectDto | null>(null);
    const [videos, setVideos] = useState<VideoDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [selectedVoice, setSelectedVoice] = useState('Cinematic Male (Việt Nam)');
    const [subtitles, setSubtitles] = useState([
        { id: 1, text: 'Xin chào thế giới...', width: 128 },
        { id: 2, text: 'Chào mừng bạn đến với UTEer AI...', width: 192 }
    ]);

    useEffect(() => {
        const loadProjectData = async () => {
            if (!projectId) return;
            setIsLoading(true);
            try {
                const projectRes = await projectApi.get(Number(projectId));
                if (projectRes.result) {
                    setProject(projectRes.data);
                }
                const videosRes = await videoApi.list(Number(projectId));
                if (videosRes.result && videosRes.data?.content) {
                    setVideos(videosRes.data.content);
                }
            } catch (error) {
                console.error('Failed to load project data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProjectData();
    }, [projectId]);

    const handleExport = () => {
        setIsExporting(true);
        setExportProgress(0);
        const interval = setInterval(() => {
            setExportProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsExporting(false);
                        alert('Video exported successfully!');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-[#f9f9fb] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium tracking-tight">Đang tải phòng dựng...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#f9f9fb] text-[#1a1c1d]">
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex justify-between items-center px-8 h-16">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>movie_edit</span>
                        <h1 className="font-bold text-lg text-gray-900 tracking-tight">{project?.title || 'Dự án mới'}</h1>
                        <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {project?.projectStatus || 'DRAFT'}
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button className="text-primary font-bold text-sm">Trình biên tập</button>
                    <button className="text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">Cài đặt AI</button>
                    <button className="text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">Lịch sử xuất</button>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className="bg-primary text-white px-6 h-10 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isExporting ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span className="material-symbols-outlined text-[20px]">ios_share</span>
                        )}
                        {isExporting ? 'ĐANG XUẤT...' : 'XUẤT VIDEO'}
                    </button>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=User" className="w-full h-full object-cover" alt="avatar" />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row pt-16 h-[calc(100vh-40px)] overflow-hidden">
                <aside className="hidden md:flex flex-col w-20 bg-white border-r border-gray-200 items-center py-6 gap-8">
<div className="flex flex-col items-center gap-unit cursor-pointer group">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
<span className="material-symbols-outlined" data-icon="video_library">video_library</span>
</div>
<span className="text-[10px] font-bold text-primary">Nội dung</span>
</div>
<div className="flex flex-col items-center gap-unit cursor-pointer group">
<div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined" data-icon="category">category</span>
</div>
<span className="text-[10px] font-medium text-on-surface-variant">Icon</span>
</div>
<div className="flex flex-col items-center gap-unit cursor-pointer group">
<div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined" data-icon="music_note">music_note</span>
</div>
<span className="text-[10px] font-medium text-on-surface-variant">Nhạc</span>
</div>
<div className="flex flex-col items-center gap-unit cursor-pointer group">
<div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined" data-icon="auto_fix_high">auto_fix_high</span>
</div>
<span className="text-[10px] font-medium text-on-surface-variant">Hiệu ứng</span>
</div>
</aside>

<section className="flex-1 flex flex-col overflow-hidden bg-surface-container-low">

<div className="flex-1 relative flex items-center justify-center p-stack-md">
<div className="aspect-video w-full max-w-4xl glass-panel rounded-2xl overflow-hidden shadow-2xl relative">
<img className="w-full h-full object-cover" data-alt="A high-resolution cinematic video frame of a futuristic cityscape at dusk, featuring glowing neon skyscrapers and flying vehicles. The lighting is dominated by electric blues and deep purples, reflecting the premium AI aesthetic. The atmosphere is sleek and high-tech, appearing as a professional video editor preview window with transparent interface overlays." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYHI-S-am2Hhh_Xr4VLBvEbq1th_ZOec5qkhIdOy1UO6_ETNNamdIpt4V8pM4jhr1kcrrtZgWvjzhHWEvZZTjDqJxRr_6mvKAanVGkUtRk5-NvO0uOr7VhANEdBO34ICnDQu5xL9V2jEs1ArTzYkmpF2AjbYdp1CrD0ejvV8hJ8d8xZScynpklI8r0G4fDv4Q6MKUI53PZ1wGhu-oUTlskhlfVx6JsfPxujY0QLYyz0m2PJQya8IqN1ORBlSh7tWYjKQQaPobJKL0"/>

<div className="absolute bottom-0 left-0 w-full p-stack-md bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-unit">
<div className="w-full h-1 bg-white/30 rounded-full relative">
<div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full"></div>
</div>
<div className="flex items-center justify-between text-white">
<div className="flex items-center gap-stack-md">
<span className="material-symbols-outlined cursor-pointer hover:scale-110" data-icon="play_arrow" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
<span className="material-symbols-outlined cursor-pointer hover:scale-110" data-icon="skip_next">skip_next</span>
<span className="text-body-sm font-medium">00:12 / 00:45</span>
</div>
<div className="flex items-center gap-stack-md">
<span className="material-symbols-outlined cursor-pointer" data-icon="fullscreen">fullscreen</span>
<span className="material-symbols-outlined cursor-pointer" data-icon="settings">settings</span>
</div>
</div>
</div>
</div>
</div>

<div className="h-64 glass-panel border-t border-white/40 flex flex-col">
<div className="flex items-center px-stack-md py-unit bg-white/30 border-b border-white/20">
<div className="flex items-center gap-stack-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]" data-icon="history">history</span>
<span className="text-body-sm font-semibold">Dòng thời gian</span>
</div>
<div className="ml-auto flex items-center gap-stack-md">
<span className="material-symbols-outlined cursor-pointer text-primary" data-icon="zoom_in">zoom_in</span>
<span className="material-symbols-outlined cursor-pointer" data-icon="zoom_out">zoom_out</span>
</div>
</div>
<div className="flex-1 overflow-x-auto custom-scrollbar flex flex-col p-stack-sm gap-unit relative">

<div className="absolute left-40 top-0 bottom-0 w-[2px] bg-primary z-10">
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
</div>

                    <div className="h-8 flex items-center gap-stack-sm min-w-max">
                        <div className="w-24 text-[10px] font-bold text-gray-400 flex items-center px-3 bg-gray-50 rounded-lg h-6">SUBTITLES</div>
                        <div className="flex gap-1">
                            {subtitles.map(sub => (
                                <div 
                                    key={sub.id} 
                                    style={{ width: `${sub.width}px` }}
                                    className="h-6 bg-blue-50 border border-blue-200 rounded flex items-center px-2 text-[10px] text-blue-600 font-medium truncate hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                    {sub.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-14 flex items-center gap-stack-sm min-w-max">
                        <div className="w-24 text-[10px] font-bold text-gray-400 flex items-center px-3 bg-gray-50 rounded-lg h-6">VIDEO</div>
                        <div className="flex gap-2">
                            {videos.length > 0 ? (
                                videos.map(video => (
                                    <div key={video.id} className="h-12 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden flex items-center gap-3 pr-4 min-w-[300px]">
                                        <div className="w-20 h-full bg-gray-200 flex-shrink-0 relative">
                                            <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-gray-400">movie</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-gray-900 truncate">{video.originalFilename}</p>
                                            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{Math.floor(video.durationSeconds / 60)}:{(video.durationSeconds % 60).toString().padStart(2, '0')} • {video.resolution}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-12 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center px-6 text-[10px] text-gray-400 font-medium">
                                    Chưa có video nào trong dự án này
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-10 flex items-center gap-stack-sm min-w-max">
                        <div className="w-24 text-[10px] font-bold text-gray-400 flex items-center px-3 bg-gray-50 rounded-lg h-6">AI DUBBING</div>
                        <div className="flex">
                            <div className="h-8 bg-purple-50 border border-purple-200 rounded-lg flex items-center px-4 text-[10px] text-purple-600 italic gap-2">
                                <span className="material-symbols-outlined text-[14px]">waves</span>
                                Giọng AI: {selectedVoice}
                            </div>
                        </div>
                    </div>

<div className="h-10 flex items-center gap-stack-sm min-w-max">
<div className="w-24 text-[10px] font-bold text-on-surface-variant flex items-center px-unit bg-white/20 rounded-lg">BGM</div>
<div className="flex">
<div className="w-full h-8 bg-surface-variant border border-outline-variant rounded-lg flex items-center px-stack-sm text-[10px] text-on-surface-variant">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="music_note">music_note</span>
                                Lo-fi_Background_Ambient.wav
                            </div>
</div>
</div>
</div>
</div>
</section>

<aside className="hidden lg:flex flex-col w-80 glass-panel border-l border-white/40 p-stack-md overflow-y-auto">
<h2 className="font-headline-lg text-body-md text-primary mb-stack-md flex items-center gap-stack-sm">
<span className="material-symbols-outlined" data-icon="bolt" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
                Cài đặt AI
            </h2>

<div className="mb-stack-lg p-stack-md bg-white/50 rounded-2xl border border-white/60 shadow-sm">
<div className="flex items-center justify-between mb-stack-sm">
<span className="text-body-sm font-bold">Mô phỏng giọng nói</span>
<span className="text-[10px] bg-primary/10 text-primary px-stack-sm py-0.5 rounded-full font-bold">PREMIUM</span>
</div>
<div className="flex items-center gap-stack-md mb-stack-md">
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
<span className="material-symbols-outlined" data-icon="mic" style={{"fontVariationSettings":"'FILL' 1"}}>mic</span>
</div>
<div className="flex-1">
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-1">
<div className="h-full w-3/4 bg-primary rounded-full"></div>
</div>
<span className="text-[10px] text-on-surface-variant">Đang phân tích mẫu giọng: 75%</span>
</div>
</div>
<button className="w-full py-stack-sm border-2 border-primary text-primary rounded-xl font-label-caps text-[11px] hover:bg-primary/5 transition-colors">NGHE THỬ GIỌNG CLONE</button>
</div>

<div className="mb-stack-lg">
<label className="text-body-sm font-bold text-on-surface-variant mb-stack-sm block">Chế độ dịch thuật</label>
<div className="grid grid-cols-2 gap-unit p-unit bg-surface-container rounded-xl">
<button className="py-stack-sm bg-white text-primary rounded-lg shadow-sm text-body-sm font-bold">Trực tiếp</button>
<button className="py-stack-sm text-on-surface-variant text-body-sm font-medium">Sáng tạo</button>
</div>
<p className="mt-2 text-[11px] text-on-surface-variant italic">Chế độ Trực tiếp ưu tiên độ chính xác từng từ.</p>
</div>

<div className="mb-stack-lg flex items-center justify-between p-stack-md bg-primary-container/10 border border-primary/20 rounded-2xl">
<div>
<span className="text-body-sm font-bold block">Khớp hình môi AI</span>
<span className="text-[10px] text-on-surface-variant">Đồng bộ khẩu hình với ngôn ngữ mới</span>
</div>
<div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
<div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
</div>
</div>

                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Ngôn ngữ đích</label>
                    <div className="relative group">
                        <div className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl flex items-center justify-between cursor-pointer group-hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🇻🇳</span>
                                <span className="text-sm font-bold text-gray-900">Tiếng Việt</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">expand_more</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Giọng nói AI</label>
                    <div className="space-y-2">
                        {['Cinematic Male (Việt Nam)', 'Natural Female (Việt Nam)', 'Soft Voice (Việt Nam)'].map(voice => (
                            <button 
                                key={voice}
                                onClick={() => setSelectedVoice(voice)}
                                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${selectedVoice === voice ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
                            >
                                {voice}
                            </button>
                        ))}
                    </div>
                </div>
<button className="mt-auto w-full py-stack-md bg-gradient-to-r from-primary to-secondary text-on-primary rounded-2xl font-display-lg text-body-md shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Áp dụng AI Dubbing
            </button>
</aside>
</main>

<footer className="w-full py-2 bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center px-margin-desktop gap-stack-md">
<div className="flex items-center gap-stack-md text-on-surface-variant text-[11px]">
<div className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-green-500"></span>
<span>Hệ thống ổn định</span>
</div>
<span className="h-3 w-px bg-outline-variant"></span>
<span>Bộ nhớ đệm: 1.2 GB / 5 GB</span>
</div>
<div className="flex items-center gap-stack-lg text-on-surface-variant text-[11px]">
<span className="hover:text-primary cursor-pointer transition-colors">Phím tắt</span>
<span className="hover:text-primary cursor-pointer transition-colors">Trung tâm hỗ trợ</span>
<span className="font-bold text-primary">© 2024 UTEer AI</span>
</div>
</footer>

<nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel flex justify-around items-center py-stack-sm px-margin-mobile border-t border-white/40 z-50">
<div className="flex flex-col items-center gap-unit text-primary">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
<span className="text-[10px] font-bold">Chỉnh sửa</span>
</div>
<div className="flex flex-col items-center gap-unit text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
<span className="text-[10px] font-medium">AI Tools</span>
</div>
<div className="flex flex-col items-center gap-unit text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="layers">layers</span>
<span className="text-[10px] font-medium">Lớp</span>
</div>
<div className="flex flex-col items-center gap-unit text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="export_notes">export_notes</span>
<span className="text-[10px] font-medium">Xuất</span>
</div>
</nav>
            <AnimatePresence>
                {isExporting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
                    >
                        <div className="w-80 text-center">
                            <h2 className="text-white text-xl font-bold mb-4">Đang xuất video...</h2>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${exportProgress}%` }}
                                />
                            </div>
                            <p className="text-white/60 text-sm">{exportProgress}%</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoEditorPage;
