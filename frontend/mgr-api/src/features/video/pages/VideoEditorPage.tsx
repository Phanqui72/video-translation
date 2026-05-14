import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const VideoEditorPage = () => {
    const navigate = useNavigate();
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);

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

    return (
        <div className="w-full min-h-screen bg-[#f9f9fb] text-[#1a1c1d]">
            

<header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border-b border-white/40 shadow-[0_30px_40px_rgba(0,0,0,0.04)] flex justify-between items-center px-margin-desktop py-stack-md">
<div className="flex items-center gap-stack-md">
<span className="material-symbols-outlined text-primary hover:scale-105 transition-transform duration-200 cursor-pointer" data-icon="movie_edit">movie_edit</span>
<h1 className="font-display-lg text-headline-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">UTEer</h1>
</div>
<div className="hidden md:flex items-center gap-stack-lg">
<button className="text-primary font-bold hover:scale-105 transition-transform duration-200">Trình biên tập</button>
<button className="text-on-surface-variant font-medium hover:scale-105 transition-transform duration-200">Dự án</button>
<button className="text-on-surface-variant font-medium hover:scale-105 transition-transform duration-200">Thư viện</button>
</div>
<div className="flex items-center gap-stack-md">
<button 
    onClick={handleExport}
    disabled={isExporting}
    className="bg-primary text-on-primary px-stack-md py-stack-sm rounded-full font-label-caps hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
>
    {isExporting ? 'ĐANG XUẤT...' : 'XUẤT VIDEO'}
</button>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center border-2 border-white">
<span className="material-symbols-outlined text-on-primary-fixed" data-icon="person">person</span>
</div>
</div>
</header>

<main className="flex-1 flex flex-col md:flex-row pt-[80px] h-full overflow-hidden">

<aside className="hidden md:flex flex-col w-20 glass-panel border-r border-white/40 items-center py-stack-lg gap-stack-lg">
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
<div className="w-24 text-[10px] font-bold text-on-surface-variant flex items-center px-unit bg-white/20 rounded-lg">SUBTITLES</div>
<div className="flex gap-1">
<div className="w-32 h-6 bg-secondary/20 border border-secondary/40 rounded flex items-center px-unit text-[10px] text-secondary font-medium">Xin chào thế giới...</div>
<div className="w-48 h-6 bg-secondary/20 border border-secondary/40 rounded flex items-center px-unit text-[10px] text-secondary font-medium">Chào mừng bạn đến với UTEer AI...</div>
</div>
</div>

<div className="h-14 flex items-center gap-stack-sm min-w-max">
<div className="w-24 text-[10px] font-bold text-on-surface-variant flex items-center px-unit bg-white/20 rounded-lg">VIDEO</div>
<div className="flex">
<div className="w-[500px] h-12 bg-primary/20 border-2 border-primary rounded-lg overflow-hidden flex relative">
<img className="w-12 h-full object-cover border-r border-white/20" data-alt="Cinematic movie reel strip background showing multiple frames of a high-tech video production process with vibrant lighting and professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhKaFX1SmHPiMGIgyLyf1qQcWOO0aeH0NYhHczZga7Snl2ubEr5VC6ofUdBU_NYIKCW8CVBrqGhGXOhTK83osWPu5y4hCZ6FVYLkN26rn5RABkEZMtBr100-8kVgX-XYkKOh9sXWIEBFbb82LTNLVl7zuUjwZRBtWKFc1_ARwRQjlnojLhoE9y2EbMzyhZMA6E3zF09JuD_Gwql8VovAs5aHIwZ1HqjaZMWp_E5yS7hs12pgNn8FRjKwVpmH1QMb_w754VSPC3cwI"/>
<img className="w-12 h-full object-cover border-r border-white/20" data-alt="A professional video editor layout showing a timeline sequence with bright colorful frames and cinematic lighting highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjg-t5kCQ6PMOPuCCu4U608hnQtYPXkPexznY-wrfJWJOaPQi_hqUc3dRQwJSPjAbIBuQUcQ6iAlOtTxqgUyr32LtosezHMkXjTPtezGf2xHsHuutBVv9L-wbR0XlF3c9qDT7ukgpuUe6eT-_8vhNLNfrlEBf1yPNMi_PfWx6c3nsLgqU3sxJQi80Kx2OC5Ago5gC3JPdEjDqxb5rtGIQq5qlslKpOH4Z_82f42C2glO2rdVPa4rMitZTCT8Qb2w_KT4jfNSGtHrE"/>
<div className="flex-1 flex items-center px-stack-sm text-body-sm font-bold text-primary">Main_Cinematic_Sequence.mp4</div>
</div>
</div>
</div>

<div className="h-10 flex items-center gap-stack-sm min-w-max">
<div className="w-24 text-[10px] font-bold text-on-surface-variant flex items-center px-unit bg-white/20 rounded-lg">AI DUBBING</div>
<div className="flex">
<div className="w-[480px] h-8 bg-tertiary/10 border border-tertiary/30 rounded-lg flex items-center px-stack-sm text-[10px] text-tertiary italic">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="waves">waves</span>
                                Giọng AI: Cinematic Male (Việt Nam)
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

<div className="mb-stack-lg">
<label className="text-body-sm font-bold text-on-surface-variant mb-stack-sm block">Ngôn ngữ đích</label>
<div className="relative">
<div className="w-full bg-white/50 border border-outline-variant px-stack-md py-stack-sm rounded-xl flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-stack-sm">
<span className="text-lg">🇻🇳</span>
<span className="text-body-sm font-medium">Tiếng Việt</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="expand_more">expand_more</span>
</div>
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
