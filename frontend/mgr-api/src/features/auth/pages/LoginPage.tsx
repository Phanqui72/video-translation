import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, User, Lock, Globe, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import authService from '../../../services/auth.service';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login(username, password);
      // Store tokens
      localStorage.setItem('access_token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      // Store user info if available
      if (data.user_kind !== undefined) {
        localStorage.setItem('user_kind', data.user_kind);
      }
      
      setIsLoading(false);
      // Navigate based on user kind (1 = admin, 2 = user)
      if (data.user_kind === 1) {
        navigate('/admin/users');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setIsLoading(false);
      const errorMsg = err.response?.data?.error_description 
        || err.response?.data?.message 
        || 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.';
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative px-4">
      {/* Background Cinematic Light Sweeps */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007AFF] opacity-10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#AF52DE] opacity-10 blur-[120px] animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-[440px]"
      >
        <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold font-['Outfit'] text-[#1a1c1d] mb-2 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              UTEer <span className="text-primary italic">AI</span>
            </motion.h1>
            <p className="text-[#414755] text-sm font-medium">
              Chào mừng trở lại / Welcome back
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3"
              >
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-red-600 font-bold leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#717786] uppercase tracking-[0.2em] ml-1">
                Tên đăng nhập / Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-[#717786]">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_uteer"
                  className="w-full h-14 bg-white/40 border border-white/60 focus:border-primary focus:bg-white/80 rounded-2xl pl-12 pr-4 outline-none transition-all duration-300 backdrop-blur-sm placeholder:text-[#c1c6d7] text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#717786] uppercase tracking-[0.2em] ml-1">
                Mật khẩu / Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-[#717786]">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/40 border border-white/60 focus:border-primary focus:bg-white/80 rounded-2xl pl-12 pr-12 outline-none transition-all duration-300 backdrop-blur-sm placeholder:text-[#c1c6d7] text-sm font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#717786] hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-[#c1c6d7] text-primary focus:ring-primary/20 transition-all" />
                <span className="text-[11px] font-bold text-[#414755] group-hover:text-primary transition-colors">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" size={18} className="text-[11px] text-primary hover:text-secondary transition-colors font-black">
                Quên mật khẩu?
              </Link>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-16 premium-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20",
                "flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70",
                "relative overflow-hidden group/btn"
              )}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="tracking-widest uppercase text-sm">Đăng nhập ngay</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center space-x-4">
            <div className="flex-1 h-[1px] bg-[#e2e2e4]/50" />
            <span className="text-[10px] text-[#717786] uppercase font-black tracking-widest">Hoặc</span>
            <div className="flex-1 h-[1px] bg-[#e2e2e4]/50" />
          </div>

          <div className="mt-6">
            <button className="w-full h-14 bg-white/50 border border-white/60 hover:bg-white rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 text-[#1a1c1d] font-bold text-sm shadow-sm">
              <Globe size={18} className="text-[#DB4437]" />
              <span>Tiếp tục với Google</span>
            </button>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-[#717786]">
            Chưa có tài khoản? <Link to="/register" className="text-primary font-black hover:underline">Tạo mới ngay</Link>
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex justify-center space-x-8">
          <a href="#" className="text-[9px] text-[#717786] hover:text-primary uppercase font-black tracking-widest transition-colors">Điều khoản</a>
          <a href="#" className="text-[9px] text-[#717786] hover:text-primary uppercase font-black tracking-widest transition-colors">Bảo mật</a>
          <a href="#" className="text-[9px] text-[#717786] hover:text-primary uppercase font-black tracking-widest transition-colors">Trợ giúp</a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
