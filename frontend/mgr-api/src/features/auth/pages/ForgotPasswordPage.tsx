import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import authService from '../../../services/auth.service';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await authService.requestForgotPassword(email);
      setIsLoading(false);
      setIsSuccess(true);
      // Store the message which contains the OTP for MVP testing
      setError(response.message); 
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007AFF] opacity-10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#AF52DE] opacity-10 blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[440px] px-6"
      >
        <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <Link to="/login" className="flex items-center text-xs font-bold text-primary mb-6 hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft size={14} className="mr-2" /> Quay lại đăng nhập
                </Link>
                <h1 className="text-3xl font-bold text-[#1a1c1d] mb-2">Quên mật khẩu?</h1>
                <p className="text-[#717786] text-sm">Đừng lo, hãy nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục.</p>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#717786] uppercase tracking-widest ml-1">Email của bạn</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 bg-white/40 border border-white/60 focus:bg-white/80 rounded-xl pl-12 pr-4 outline-none transition-all text-sm font-medium"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 premium-gradient text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Gửi yêu cầu khôi phục</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1c1d] mb-4">Yêu cầu thành công</h2>
              <p className="text-primary font-bold text-lg mb-4 bg-primary/10 p-4 rounded-xl border border-primary/20">
                {error}
              </p>
              <p className="text-[#717786] text-sm mb-8 leading-relaxed">
                Vui lòng sử dụng mã OTP trên để đặt lại mật khẩu của bạn.
              </p>
              <Link 
                to="/login"
                className="inline-block px-8 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all"
              >
                Trở lại Đăng nhập
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
