import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Activity, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Bảng điều khiển', labelEn: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Người dùng', labelEn: 'Users', path: '/admin/users' },
  { icon: ShieldCheck, label: 'Phân quyền', labelEn: 'RBAC', path: '/admin/rbac' },
  { icon: Activity, label: 'Hoạt động', labelEn: 'Audit Logs', path: '/admin/audit' },
  { icon: Settings, label: 'Cài đặt', labelEn: 'Settings', path: '/admin/settings' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F3F3F5] flex overflow-hidden font-['Inter']">
      {/* Sidebar */}
      <aside className="w-[280px] h-screen glass-card rounded-none border-y-0 border-l-0 flex flex-col z-20">
        <div className="p-8">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl italic font-['Outfit']">U</span>
            </div>
            <span className="text-2xl font-black font-['Outfit'] text-[#1a1c1d] tracking-tighter">
              UTEer <span className="text-primary italic">AI</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-[#717786] hover:bg-white/50 hover:text-[#1a1c1d]"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-primary" : "group-hover:text-[#1a1c1d]")} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-tighter font-medium">{item.labelEn}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,122,255,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#ba1a1a] hover:bg-red-50 transition-colors font-bold text-sm">
            <LogOut size={20} />
            <span>Đăng xuất / Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Ambient background glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Bar */}
        <header className="h-20 border-b border-white/40 flex items-center justify-between px-10 bg-white/30 backdrop-blur-md z-10">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786] group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm / Search..."
              className="w-full h-11 bg-white/40 border border-white/60 rounded-xl pl-12 pr-4 outline-none focus:bg-white/80 transition-all text-sm"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2.5 rounded-xl hover:bg-white/50 transition-colors text-[#414755]">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
            </button>
            
            <div className="h-10 w-[1px] bg-[#e2e2e4]" />

            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-[#1a1c1d] group-hover:text-primary transition-colors">Admin UTEer</p>
                <p className="text-[10px] text-[#717786] uppercase font-bold tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                <img src="https://ui-avatars.com/api/?name=Admin+UTEer&background=007AFF&color=fff" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
