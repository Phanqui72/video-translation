import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Settings, 
  Plus,
  Search,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const mockRoles = [
  { id: 1, name: 'Super Admin', code: 'ROLE_SUPER_ADMIN', permissions: 156, users: 2, color: 'text-red-500 bg-red-50' },
  { id: 2, name: 'Content Creator', code: 'ROLE_CREATOR', permissions: 42, users: 12, color: 'text-primary bg-primary/5' },
  { id: 3, name: 'Video Editor', code: 'ROLE_EDITOR', permissions: 28, users: 8, color: 'text-purple-500 bg-purple-50' },
  { id: 4, name: 'Guest Viewer', code: 'ROLE_VIEWER', permissions: 5, users: 124, color: 'text-gray-500 bg-gray-50' },
];

const RoleManagementPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black font-['Outfit'] text-[#1a1c1d] tracking-tight">
              Phân quyền hệ thống / <span className="text-primary italic">RBAC</span>
            </h2>
            <p className="text-[#717786] text-sm mt-1">Quản lý vai trò, quyền hạn và phân bổ chức năng.</p>
          </motion.div>

          <button className="premium-gradient px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/20 flex items-center space-x-2">
            <Plus size={18} />
            <span>Thêm vai trò / Add Role</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Role List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]" size={16} />
              <input 
                type="text" 
                placeholder="Tìm vai trò..."
                className="w-full h-12 bg-white/50 border border-white/60 rounded-xl pl-12 pr-4 outline-none focus:bg-white transition-all text-sm font-medium"
              />
            </div>
            
            {mockRoles.map((role, i) => (
              <motion.div 
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 rounded-2xl cursor-pointer hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2 rounded-lg", role.color)}>
                    <ShieldCheck size={20} />
                  </div>
                  <ChevronRight size={16} className="text-[#c1c6d7] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-[#1a1c1d]">{role.name}</h4>
                <p className="text-[10px] text-[#717786] font-mono mt-0.5">{role.code}</p>
                
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-[11px] font-bold text-[#717786]">
                    <Lock size={12} className="mr-1" /> {role.permissions} quyền
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-[#717786]">
                    <Fingerprint size={12} className="mr-1" /> {role.users} người dùng
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Role Permissions Editor */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card h-full rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/40 bg-white/20 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1a1c1d]">Chi tiết vai trò: <span className="text-primary">Content Creator</span></h3>
                  <p className="text-xs text-[#717786] mt-1">Chỉnh sửa quyền hạn cho nhóm người sáng tạo nội dung.</p>
                </div>
                <button className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-xs hover:bg-primary/5 transition-all">
                  Lưu thay đổi / Save
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar">
                {[
                  { category: 'Quản lý Video', en: 'Video Management', perms: ['Xem danh sách', 'Tải lên video', 'Chỉnh sửa phụ đề', 'Xóa video', 'Tải về kết quả'] },
                  { category: 'Dịch thuật AI', en: 'AI Translation', perms: ['Khởi tạo dịch', 'Chọn ngôn ngữ', 'Hiệu chỉnh AI', 'Xem tiến độ'] },
                  { category: 'Hệ thống', en: 'System', perms: ['Xem dashboard', 'Thay đổi profile', 'Gửi báo cáo'] },
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#e2e2e4] pb-2">
                      <h5 className="text-xs font-black uppercase tracking-widest text-[#717786]">{cat.category} <span className="opacity-50 ml-2">/ {cat.en}</span></h5>
                      <button className="text-[10px] font-bold text-primary hover:underline">Chọn tất cả</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {cat.perms.map((p, pIdx) => (
                        <label key={pIdx} className="flex items-center justify-between p-4 rounded-xl border border-white/60 bg-white/30 hover:bg-white/60 transition-all cursor-pointer group">
                          <span className="text-sm font-medium text-[#414755] group-hover:text-[#1a1c1d]">{p}</span>
                          <input type="checkbox" defaultChecked={pIdx % 3 !== 0} className="w-5 h-5 rounded-lg border-[#c1c6d7] text-primary focus:ring-primary/20" />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleManagementPage;
