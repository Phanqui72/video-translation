import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#f9f9fb] text-[#1a1c1d]">
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-primary text-3xl">movie_edit</span>
                        <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">UTEer</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-primary font-semibold hover:text-primary/80 transition-colors">Trang chủ</Link>
                        <a className="text-gray-600 font-medium hover:text-primary transition-colors" href="#features">Tính năng</a>
                        <a className="text-gray-600 font-medium hover:text-primary transition-colors" href="#pricing">Bảng giá</a>
                        <div className="flex items-center gap-4 border-l pl-8 ml-2">
                            <Link to="/login" className="text-gray-700 font-semibold hover:text-primary transition-colors">Đăng nhập</Link>
                            <Link to="/register" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
                                Bắt đầu ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
   <main className="pt-24">
    <section className="px-6 md:px-12 lg:px-24 py-20 flex flex-col items-center text-center">
        <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Phá Bỏ Rào Cản Ngôn Ngữ Với <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI Điện Ảnh</span>
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Dịch thuật và lồng tiếng video từ Trung sang Việt chỉ trong tích tắc với công nghệ AI hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link to="/register" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                    Bắt đầu ngay <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                    Xem bản demo
                </button>
            </div>
        </div>

        <div className="w-full max-w-5xl bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative group">
            <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden relative">
                <img alt="Video Transformation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM8cYH4QmSQR7yxAMVdA1o82mnP5g5oH0ZwY_ZySFmdJnrcFaG6vr3kpU12zouP7uNvs7WA_oLAMO-Rf2tROJYnXBMWybJaUF7IsdZ1N0JfuU08KHz7yTX4JolFPpVAKx0TYeY_Pb4sCe-X5oCVbD7a7CC_TuTKHB7JmLRmze7RR9RXwmYq2CkGTCM_j-_152nMUn8-LD7_44lyaHoq8f_3Jo_JGf1E_p46ZA9HZRZZ6fl0eMfNQ7IcAo1wNXd6Pdq2uMubihtcyc"/>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl text-primary">
                        <span className="material-symbols-outlined text-5xl">play_arrow</span>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Gốc: Tiếng Trung
                </div>
                <div className="absolute bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white"></span> Dịch: Tiếng Việt
                </div>
            </div>
        </div>
    </section>

    <section id="features" className="px-6 md:px-12 lg:px-24 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-4xl font-bold mb-4">Công nghệ đột phá</h2>
                <p className="text-gray-500 text-lg">Giải pháp tự động hóa hoàn quy trình hậu kỳ video</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden relative group min-h-[400px]">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">record_voice_over</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-4">AI Dubbing - Lồng Tiếng Tự Nhiên</h3>
                        <p className="text-gray-500 text-lg max-w-md">Giọng đọc AI cảm xúc, tự động khớp tông giọng của nhân vật gốc một cách hoàn hảo.</p>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
                </div>

                <div className="md:col-span-4 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[400px]">
                    <div>
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                            <span className="material-symbols-outlined text-4xl">face_retouching_natural</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Lip-Sync</h3>
                        <p className="text-gray-500">Tự động chỉnh sửa khẩu hình miệng khớp với lời thoại tiếng Việt.</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-gray-200">auto_awesome</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="pricing" className="px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Lựa chọn gói dịch vụ</h2>
                <p className="text-gray-500 text-lg">Phù hợp cho mọi nhu cầu từ cá nhân đến doanh nghiệp</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { name: 'CƠ BẢN', price: '$0', title: 'Free', features: ['5 phút video/tháng', 'Độ phân giải 720p', 'Có Watermark'], color: 'primary' },
                    { name: 'CÁ NHÂN', price: '$15', title: 'Pro', features: ['60 phút video/tháng', 'Độ phân giải 4K', 'Không Watermark', 'Ưu tiên xử lý'], popular: true, color: 'primary' },
                    { name: 'SÁNG TẠO', price: '$30', title: 'Studio', features: ['150 phút video/tháng', 'Lip-Sync nâng cao', 'Hỗ trợ nhiều kênh'], color: 'secondary' },
                    { name: 'DOANH NGHIỆP', price: 'Custom', title: 'Enterprise', features: ['Không giới hạn phút', 'API & Webhook', 'Hỗ trợ 24/7'], color: 'black' }
                ].map((plan) => (
                    <div key={plan.title} className={`bg-white p-8 rounded-[2.5rem] border ${plan.popular ? 'border-primary ring-4 ring-primary/5 scale-105 shadow-xl z-10' : 'border-gray-100 shadow-sm'} flex flex-col h-full relative`}>
                        {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Phổ biến nhất</div>}
                        <div className="mb-8">
                            <p className={`text-[10px] font-bold tracking-widest mb-2 ${plan.popular ? 'text-primary' : 'text-gray-400'}`}>{plan.name}</p>
                            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.price !== 'Custom' && <span className="text-gray-500 text-sm">/tháng</span>}
                            </div>
                        </div>
                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span> {f}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                            Bắt đầu ngay
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
</main>

<footer className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-12 mb-12">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">movie_edit</span>
                    <span className="text-2xl font-bold">UTEer AI</span>
                </div>
                <p className="text-gray-400 max-w-sm">Dẫn đầu công nghệ AI trong dịch thuật và sản xuất nội dung điện ảnh đa ngôn ngữ.</p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Sản phẩm</h4>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Tính năng</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Bảng giá</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Hỗ trợ</h4>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Tài liệu API</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Trung tâm trợ giúp</a>
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <p>© 2024 UTEer AI. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
                <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            </div>
        </div>
    </div>
</footer>
</div>
    );
};

export default LandingPage;
