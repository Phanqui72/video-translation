import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const AIPipelinePage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen bg-[#f9f9fb] text-[#1a1c1d]">
            

<header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border-b border-white/40 shadow-[0_30px_40px_rgba(0,0,0,0.04)] flex justify-between items-center px-margin-desktop py-stack-md w-full">
<div className="flex items-center gap-stack-sm">
<span className="material-symbols-outlined text-primary font-display-lg text-display-lg" data-icon="movie_edit">movie_edit</span>
<span className="font-display-lg text-display-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">UTEer</span>
</div>
<nav className="hidden md:flex items-center gap-stack-lg">
<a className="text-primary font-bold hover:scale-105 transition-transform duration-200" href="#">Dự án</a>
<a className="text-on-surface-variant font-medium hover:scale-105 transition-transform duration-200" href="#">Phân tích</a>
<a className="text-on-surface-variant font-medium hover:scale-105 transition-transform duration-200" href="#">Tài khoản</a>
</nav>
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
<img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDZRhd5tMF1J89G6jehioWHt26yEqrGxH5TMMIMl8Bq1tRsPDU408Y_3dFkSX31VuPkO1F4YVu9AO7jjLm0DIeYvKzXyMxKRg5WZzERIn01GZILGlNPVhTU8pS9bpUSnprQG0x1zB81tzqX78v9KUJp_uKzFlA-c8tYhuiudVJ6rjpCKqTbomv-pWUpb3IVTv_tYUyoaM9yMIxPg8YfhQAFOVvJq75OJCtvvP2cOTcxOeAjDMm8abzwom4NuDtC_2_fSSWz-JtNV0"/>
</div>
</header>
<div className="flex min-h-screen pt-[88px]">

<aside className="h-full w-72 fixed left-0 top-0 pt-[88px] bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border-r border-white/40 shadow-2xl flex flex-col py-stack-lg hidden md:flex">
<div className="px-stack-md mb-stack-lg">
<div className="flex items-center gap-stack-sm p-stack-sm">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</div>
<div>
<p className="font-bold text-on-surface">Premium Creator</p>
<p className="text-xs text-on-surface-variant">Enterprise Plan</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-unit">
<a className="bg-primary/10 text-primary border-l-2 border-primary font-bold px-stack-md py-stack-sm rounded-r-full flex items-center gap-stack-md transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="folder_open">folder_open</span>
                    Projects
                </a>
<a className="text-on-surface-variant px-stack-md py-stack-sm flex items-center gap-stack-md hover:bg-primary/5 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="insights">insights</span>
                    Analytics
                </a>
<a className="text-on-surface-variant px-stack-md py-stack-sm flex items-center gap-stack-md hover:bg-primary/5 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="share_reviews">share_reviews</span>
                    Social Accounts
                </a>
<a className="text-on-surface-variant px-stack-md py-stack-sm flex items-center gap-stack-md hover:bg-primary/5 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
                    Credits
                </a>
</nav>
<div className="mt-auto px-stack-md">
<div className="p-stack-md glass-panel rounded-xl">
<p className="text-xs font-label-caps text-outline uppercase mb-unit">Tài nguyên</p>
<p className="text-body-sm font-bold text-primary">120 Credits Left</p>
<div className="w-full bg-surface-container-highest h-1 rounded-full mt-stack-sm overflow-hidden">
<div className="bg-primary h-full w-2/3"></div>
</div>
</div>
</div>
</aside>

<main className="flex-1 md:ml-72 p-margin-mobile md:p-stack-lg max-w-container-max mx-auto w-full">

<section className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
<div>
<span className="text-primary font-label-caps tracking-widest uppercase text-xs">Processing Node #8821</span>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Tiến trình xử lý AI</h1>
<p className="text-on-surface-variant">Đang xử lý: "Cinematic_Documentary_2024_4K.mp4" (03:45:12)</p>
</div>
<div className="flex gap-stack-sm">
<button className="px-stack-md py-stack-sm rounded-full bg-error/10 text-error font-bold flex items-center gap-unit hover:bg-error/20 transition-all active:scale-95">
<span className="material-symbols-outlined text-sm" data-icon="cancel">cancel</span>
                        Hủy tiến trình
                    </button>
<button 
    onClick={() => navigate('/editor')}
    className="px-stack-md py-stack-sm rounded-full bg-primary text-white font-bold flex items-center gap-unit shadow-lg hover:scale-105 transition-all active:scale-95"
>
    <span className="material-symbols-outlined text-sm" data-icon="visibility">visibility</span>
    Xem bản nháp
</button>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-md mb-stack-lg">

<div className="lg:col-span-4 glass-panel p-stack-md rounded-2xl relative overflow-hidden group">
<div className="absolute top-0 right-0 p-stack-sm">
<span className="material-symbols-outlined text-success text-green-500" data-icon="check_circle" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-center gap-stack-sm mb-stack-sm">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="mic">mic</span>
</div>
<div>
<p className="font-bold text-on-surface">1. WhisperX STT</p>
<p className="text-xs text-on-surface-variant">Speech-to-Text Analysis</p>
</div>
</div>
<div className="space-y-unit">
<div className="flex justify-between text-xs font-bold text-on-surface mb-1">
<span>Hoàn thành</span>
<span>100%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-full"></div>
</div>
</div>
</div>

<div className="lg:col-span-4 glass-panel p-stack-md rounded-2xl relative overflow-hidden group">
<div className="absolute top-0 right-0 p-stack-sm">
<span className="material-symbols-outlined text-success text-green-500" data-icon="check_circle" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-center gap-stack-sm mb-stack-sm">
<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="translate">translate</span>
</div>
<div>
<p className="font-bold text-on-surface">2. Llama 3 Translation</p>
<p className="text-xs text-on-surface-variant">Contextual Localization</p>
</div>
</div>
<div className="space-y-unit">
<div className="flex justify-between text-xs font-bold text-on-surface mb-1">
<span>Hoàn thành</span>
<span>100%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-full"></div>
</div>
</div>
</div>

<div className="lg:col-span-4 glass-panel p-stack-md rounded-2xl glow-active relative overflow-hidden">
<div className="absolute top-2 right-2 flex items-center gap-unit">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-[10px] font-bold text-primary uppercase">Active</span>
</div>
<div className="flex items-center gap-stack-sm mb-stack-sm">
<div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="record_voice_over">record_voice_over</span>
</div>
<div>
<p className="font-bold text-on-surface">3. GPT-SoVITS TTS</p>
<p className="text-xs text-on-surface-variant">Voice Cloning &amp; Synthesis</p>
</div>
</div>
<div className="space-y-unit">
<div className="flex justify-between text-xs font-bold text-on-surface mb-1">
<span>Đang xử lý</span>
<span>64%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[64%] shadow-[0_0_8px_rgba(0,88,188,0.5)]"></div>
</div>
</div>
</div>

<div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col h-[400px]">
<div className="p-stack-md border-b border-white/40 flex justify-between items-center bg-white/40">
<div className="flex items-center gap-stack-sm">
<span className="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<span className="font-bold text-on-surface">Nhật ký trực tiếp (Live Logs)</span>
</div>
<div className="flex gap-unit">
<span className="w-3 h-3 rounded-full bg-error/20"></span>
<span className="w-3 h-3 rounded-full bg-tertiary/20"></span>
<span className="w-3 h-3 rounded-full bg-primary/20"></span>
</div>
</div>
<div className="flex-1 p-stack-md font-mono text-xs overflow-y-auto bg-inverse-surface text-white/80 space-y-unit">
<p><span className="text-primary-fixed-dim">[14:20:01]</span> <span className="text-green-400">INFO</span> WhisperX: VAD Segment 1442 detected. Processing...</p>
<p><span className="text-primary-fixed-dim">[14:20:05]</span> <span className="text-green-400">SUCCESS</span> WhisperX: STT alignment finished for block 1400-1450.</p>
<p><span className="text-primary-fixed-dim">[14:21:12]</span> <span className="text-blue-400">STAGGER</span> Llama-3: Translating context window "Historical Context of Vietnam"...</p>
<p><span className="text-primary-fixed-dim">[14:21:18]</span> <span className="text-green-400">SUCCESS</span> Llama-3: Translation token output synchronized.</p>
<p><span className="text-primary-fixed-dim">[14:22:45]</span> <span className="text-yellow-400">RUNNING</span> GPT-SoVITS: Synthesizing voice profile 'Deep_Narrator_V3'...</p>
<p><span className="text-primary-fixed-dim">[14:22:46]</span> <span className="text-white/40">&gt;&gt; Tensor core optimization active (CUDA 12.1)</span></p>
<p><span className="text-primary-fixed-dim">[14:22:48]</span> <span className="text-yellow-400">RUNNING</span> GPT-SoVITS: Chunk 88/142 generated (61.96% complete).</p>
<p><span className="text-primary-fixed-dim">[14:22:50]</span> <span className="text-yellow-400">RUNNING</span> GPT-SoVITS: Emotional variance factor adjusted to 0.85.</p>
<p className="animate-pulse">_</p>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-stack-md">
<div className="glass-panel rounded-2xl p-stack-md flex-1">
<p className="font-bold text-on-surface mb-stack-sm">Preview Hiện Tại</p>
<div className="aspect-video rounded-xl bg-black relative overflow-hidden border border-white/20">
<img className="w-full h-full object-cover opacity-60" data-alt="A cinematic 4K video frame showing a breathtaking wide shot of a misty Vietnamese mountain range at dawn. The lighting is ethereal and soft, with layers of blue and purple hues blending into a golden sun. Subtle UI overlays show audio wave forms and AI tracking markers in a premium glassmorphic style, suggesting an active video editing and translation process in a futuristic software." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBORIP210PZcj6ODv9Ay0Mn4ECooTUemkChv9n2ui-AoJILWG3Nl0-JubjA3PBWrbqukkY8Pmc3_v77S41KhY72_1ot-HIfWiGwbfpGsG5wYPQJR1y4fzRxCmlLmrEVrMm4IXgT_8ZXcy_oQykr1YS9GvXGCywc6M6dYvlpcSOwdHz2pirKQr-WoBUR5ubGYMkFM8FPchA__kA-ee_7YvrYfmhanFSubn_-eQ3kgIaoB-8pL_mfFIPomp9mvsJzpTehgdU6ECTsYmQ"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="play_arrow">play_arrow</span>
</div>
</div>
<div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
<div className="bg-primary h-full w-2/3"></div>
</div>
</div>
<div className="mt-stack-md space-y-stack-sm">
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Thời gian còn lại:</span>
<span className="font-bold text-on-surface">~12 phút</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Tốc độ xử lý:</span>
<span className="font-bold text-primary">4.2x Real-time</span>
</div>
</div>
</div>
<div className="glass-panel rounded-2xl p-stack-md bg-primary-container text-white border-none shadow-xl">
<div className="flex items-center gap-stack-sm mb-stack-sm">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
<p className="font-bold">Chế độ Ultra-Fast</p>
</div>
<p className="text-xs text-white/80">Sử dụng cụm GPU A100 để tăng tốc độ Lip-Sync và Rendering lên 300%.</p>
</div>
</div>

<div className="lg:col-span-6 glass-panel p-stack-md rounded-2xl relative overflow-hidden group opacity-60 grayscale hover:grayscale-0 transition-all">
<div className="flex items-center gap-stack-sm mb-stack-sm">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined" data-icon="face_retouching_natural">face_retouching_natural</span>
</div>
<div>
<p className="font-bold text-on-surface">4. Lip-Sync Engine</p>
<p className="text-xs text-on-surface-variant">Wav2Lip + GFPGAN Refinement</p>
</div>
</div>
<div className="space-y-unit">
<div className="flex justify-between text-xs font-bold text-on-surface mb-1">
<span>Đang chờ...</span>
<span>0%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full w-0"></div>
</div>
</div>
</div>
<div className="lg:col-span-6 glass-panel p-stack-md rounded-2xl relative overflow-hidden group opacity-60 grayscale hover:grayscale-0 transition-all">
<div className="flex items-center gap-stack-sm mb-stack-sm">
<div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="movie">movie</span>
</div>
<div>
<p className="font-bold text-on-surface">5. Final Rendering</p>
<p className="text-xs text-on-surface-variant">4K HEVC Export + Metadata</p>
</div>
</div>
<div className="space-y-unit">
<div className="flex justify-between text-xs font-bold text-on-surface mb-1">
<span>Đang chờ...</span>
<span>0%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-outline h-full w-0"></div>
</div>
</div>
</div>
</div>
</main>
</div>

<footer className="w-full py-stack-lg bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-stack-md">
<div className="flex flex-col items-center md:items-start">
<span className="font-headline-lg text-primary text-2xl font-bold">UTEer AI</span>
<p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">© 2024 UTEer AI. Cinematic Translation Excellence.</p>
</div>
<div className="flex gap-stack-lg">
<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API Documentation</a>
<a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
</div>
</footer>

        </div>
    );
};

export default AIPipelinePage;
