import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX,
  Mail,
  Calendar,
  Eye,
  X,
  ChevronRight,
  Phone,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const mockUsers = [
  { id: 1, name: 'Lê Thanh Bình', email: 'binh.lt@uteer.ai', role: 'Admin', status: 'active', joined: '2024-03-15', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Trần Minh Tâm', email: 'tam.tm@uteer.ai', role: 'Creator', status: 'active', joined: '2024-03-20', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Phạm Hồng Phúc', email: 'phuc.ph@gmail.com', role: 'Viewer', status: 'inactive', joined: '2024-04-01', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Hoàng Anh Tuấn', email: 'tuan.ha@uteer.ai', role: 'Creator', status: 'active', joined: '2024-04-05', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Võ Thị Mỹ Linh', email: 'linh.vtm@gmail.com', role: 'Viewer', status: 'active', joined: '2024-04-10', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black font-['Outfit'] text-[#1a1c1d] tracking-tight">
              Quản lý <span className="text-primary italic">Người dùng</span>
            </h2>
            <p className="text-[#717786] text-sm mt-1">Danh sách tất cả tài khoản trong hệ thống UTEer AI.</p>
          </motion.div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="premium-gradient px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/20 flex items-center space-x-2 hover:scale-[1.02] transition-all"
            >
              <Plus size={18} />
              <span>Thêm mới / Add User</span>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Tổng User', value: '1,284', delta: '+12%', icon: UserCheck, color: 'text-blue-500' },
            { label: 'Đang hoạt động', value: '856', delta: '+5%', icon: Shield, color: 'text-green-500' },
            { label: 'Mới (30 ngày)', value: '124', delta: '+25%', icon: Calendar, color: 'text-purple-500' },
            { label: 'Bị khóa', value: '12', delta: '-2%', icon: UserX, color: 'text-red-500' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl bg-white/50", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{stat.delta}</span>
              </div>
              <h3 className="text-2xl font-black text-[#1a1c1d]">{stat.value}</h3>
              <p className="text-xs font-bold text-[#717786] uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Data Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden border border-white/40 shadow-2xl shadow-black/5"
        >
          <div className="p-6 border-b border-white/40 bg-white/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717786] group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên, email..."
                className="w-full h-12 bg-white/50 border border-white/60 rounded-xl pl-12 pr-4 outline-none focus:bg-white transition-all text-sm font-medium"
              />
            </div>
            <button className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/50 border border-white/60 text-xs font-bold text-[#414755] hover:bg-white transition-all">
              <Filter size={16} />
              <span>Bộ lọc / Filters</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-white/10">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#717786]">Người dùng / User</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#717786]">Vai trò / Role</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#717786]">Trạng thái / Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#717786]">Ngày tham gia</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#717786] text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {mockUsers.map((user, i) => (
                  <tr key={user.id} className="hover:bg-white/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1c1d] text-sm group-hover:text-primary transition-colors">{user.name}</p>
                          <p className="text-xs text-[#717786] font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md",
                        user.role === 'Admin' ? "bg-red-50 text-red-500" : "bg-primary/10 text-primary"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1.5">
                        <div className={cn("w-2 h-2 rounded-full", user.status === 'active' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-300")} />
                        <span className="text-xs font-bold text-[#414755] capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-[#717786]">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewDetails(user)}
                          className="p-2 rounded-lg hover:bg-white text-[#717786] hover:text-primary transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white text-[#717786] hover:text-primary transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white text-[#717786] hover:text-red-500 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-white/40 bg-white/10 flex items-center justify-between text-xs font-bold text-[#717786]">
            <p>Hiển thị 1 - 5 của 1,284 người dùng</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-white/60 hover:bg-white transition-all disabled:opacity-30">Trước</button>
              <button className="px-3 py-1 rounded-lg bg-primary text-white shadow-lg shadow-primary/20">1</button>
              <button className="px-3 py-1 rounded-lg border border-white/60 hover:bg-white transition-all">2</button>
              <button className="px-3 py-1 rounded-lg border border-white/60 hover:bg-white transition-all">Sau</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detail Overlay / Modal */}
      <AnimatePresence>
        {isDetailOpen && selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-black font-['Outfit'] text-[#1a1c1d]">Chi tiết người dùng</h3>
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-4 relative group">
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-[#1a1c1d]">{selectedUser.name}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase">{selectedUser.role}</span>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase",
                      selectedUser.status === 'active' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    )}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <div className="flex items-center text-[10px] font-black text-[#717786] uppercase tracking-widest">
                        <Mail size={12} className="mr-2" /> Email Address
                      </div>
                      <p className="font-bold text-[#1a1c1d] text-sm">{selectedUser.email}</p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <div className="flex items-center text-[10px] font-black text-[#717786] uppercase tracking-widest">
                        <Phone size={12} className="mr-2" /> Phone Number
                      </div>
                      <p className="font-bold text-[#1a1c1d] text-sm">+84 987 654 321</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <div className="flex items-center text-[10px] font-black text-[#717786] uppercase tracking-widest">
                        <Clock size={12} className="mr-2" /> Last Activity
                      </div>
                      <p className="font-bold text-[#1a1c1d] text-sm">2 giờ trước / 2h ago</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <div className="flex items-center text-[10px] font-black text-[#717786] uppercase tracking-widest">
                        <Calendar size={12} className="mr-2" /> Joined Date
                      </div>
                      <p className="font-bold text-[#1a1c1d] text-sm">{selectedUser.joined}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black text-[#717786] uppercase tracking-widest ml-1">Account History</h5>
                    <div className="space-y-3">
                      {[
                        { event: 'Tải lên video', time: '10:45 AM', date: 'Hôm nay' },
                        { event: 'Dịch thuật hoàn tất', time: '09:20 AM', date: 'Hôm nay' },
                        { event: 'Đăng nhập từ IP mới', time: '11:15 PM', date: 'Hôm qua' },
                      ].map((h, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-gray-200">
                          <span className="text-sm font-bold text-[#414755]">{h.event}</span>
                          <span className="text-[10px] font-medium text-[#717786]">{h.time}, {h.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex space-x-3">
                <button className="flex-1 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-sm text-[#414755] hover:bg-gray-100 transition-all">
                  Khóa tài khoản
                </button>
                <button className="flex-1 py-3 premium-gradient rounded-xl font-bold text-sm text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                  Sửa thông tin
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create User Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b flex items-center justify-between bg-gray-50">
                <h3 className="text-2xl font-black font-['Outfit'] text-[#1a1c1d]">Thêm người dùng mới</h3>
                <button onClick={() => setIsCreateOpen(false)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#717786] uppercase tracking-wider ml-1">Họ và tên</label>
                    <input className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 outline-none focus:border-primary transition-all text-sm" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#717786] uppercase tracking-wider ml-1">Email</label>
                    <input className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 outline-none focus:border-primary transition-all text-sm" placeholder="name@uteer.ai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#717786] uppercase tracking-wider ml-1">Mật khẩu</label>
                    <input type="password" className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 outline-none focus:border-primary transition-all text-sm" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#717786] uppercase tracking-wider ml-1">Vai trò</label>
                    <select className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 outline-none focus:border-primary transition-all text-sm">
                      <option>Creator</option>
                      <option>Viewer</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-end space-x-4">
                  <button type="button" onClick={() => setIsCreateOpen(false)} className="px-6 py-3 font-bold text-sm text-[#717786] hover:text-[#1a1c1d]">Hủy bỏ</button>
                  <button type="submit" className="premium-gradient px-8 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                    Tạo tài khoản ngay
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default UserManagementPage;
