import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User, Lock, Mail, Phone, ArrowRight, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth.service';
import { cn } from '../../../lib/utils';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.register({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 rounded-3xl text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1c1d] mb-4">Đăng ký thành công!</h2>
          <p className="text-[#717786] mb-8">Tài khoản của bạn đã được tạo. Vui lòng kiểm tra email để kích hoạt.</p>
          <Link 
            to="/login"
            className="premium-gradient w-full block py-4 rounded-xl text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Đăng nhập ngay
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative py-12">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007AFF] opacity-20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#AF52DE] opacity-20 blur-[120px] animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[550px] px-6"
      >
        <div className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-['Outfit'] text-[#1a1c1d] mb-2">Tạo tài khoản mới</h1>
            <p className="text-[#717786] text-sm">Gia nhập cộng đồng dịch thuật AI hàng đầu</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3"
            >
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-red-600 font-bold leading-relaxed">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                  <input 
                    type="text" 
                    required
                    className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-4 outline-none transition-all text-sm font-medium"
                    placeholder="user123"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                  <input 
                    type="text" 
                    required
                    className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-4 outline-none transition-all text-sm font-medium"
                    placeholder="Nguyen Van A"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                <input 
                  type="email" 
                  required
                  className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-4 outline-none transition-all text-sm font-medium"
                  placeholder="contact@uteer.ai"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-10 outline-none transition-all text-sm font-medium"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717786] hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">
                  Xác nhận <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-10 outline-none transition-all text-sm font-medium"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">Số điện thoại</label>
              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                <input 
                  type="tel" 
                  className="w-full h-12 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-11 pr-4 outline-none transition-all text-sm font-medium"
                  placeholder="09xx xxx xxx"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 premium-gradient text-white font-black rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-6 uppercase tracking-widest text-xs"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Đăng ký ngay</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-[#717786]">
            Đã có tài khoản? <Link to="/login" className="text-primary font-black hover:underline">Đăng nhập ngay</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
