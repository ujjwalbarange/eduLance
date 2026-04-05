import React from 'react';
import { LayoutDashboard, ShoppingBag, DollarSign, Clock, CheckCircle, ArrowUpRight, MessageSquare, Briefcase, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [view, setView] = React.useState<'buyer' | 'seller'>('buyer');

  const activeOrders = [
    {
      id: 'ORD-101',
      title: 'MERN Stack College Project',
      status: 'In Progress',
      progress: 40,
      seller: 'Alex Chen',
      deadline: 'Apr 12, 2026',
      amount: 49,
    },
    {
      id: 'ORD-102',
      title: 'Python Data Analysis Script',
      status: 'Requirements',
      progress: 10,
      seller: 'Sarah Miller',
      deadline: 'Apr 08, 2026',
      amount: 25,
    },
  ];

  const sellerStats = [
    { label: 'Total Earnings', value: '$1,240', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Projects', value: '3', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: '18', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Ujjwal!</p>
          </div>

          {/* Switcher */}
          <div className="bg-gray-200 p-1 rounded-xl flex items-center shadow-inner">
            <button
              onClick={() => setView('buyer')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                view === 'buyer' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Buyer View
            </button>
            <button
              onClick={() => setView('seller')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                view === 'seller' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Seller View
            </button>
          </div>
          
          {view === 'seller' && (
            <button 
              onClick={() => navigate('/create-gig')}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Gig
            </button>
          )}
        </div>

        {view === 'buyer' ? (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
              Active Orders
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {activeOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{order.id}</span>
                        <h3 className="text-lg font-bold text-gray-900">{order.title}</h3>
                        <p className="text-sm text-gray-500">Seller: <span className="font-bold text-gray-700">{order.seller}</span></p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-1000" 
                          style={{ width: `${order.progress}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                    <div className="text-center md:text-right px-6">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Deadline</p>
                      <p className="text-sm font-bold text-gray-900">{order.deadline}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center">
                        View Details
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Seller Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sellerStats.map((stat) => (
                <div key={stat.label} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Active Projects */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Project</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Buyer</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Due In</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2].map((i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-6">
                          <p className="font-bold text-gray-900">Portfolio Website with Next.js</p>
                          <p className="text-xs text-gray-400 mt-1">Standard Package • $85</p>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-6 h-6 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">User_{i}23</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="text-sm font-bold text-orange-600">2 Days</span>
                        </td>
                        <td className="px-6 py-6">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">In Progress</span>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">
                            Deliver Work
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
