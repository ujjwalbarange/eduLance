import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Users, 
  DollarSign, 
  AlertCircle, 
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Clock,
  FileText,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Toast } from '../components/Feedback';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = React.useState<'gigs' | 'payments' | 'users'>('gigs');
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const pendingGigs = [
    { id: 'G-101', title: 'Full Stack MERN Project', seller: 'Alex Chen', date: '2026-04-05', status: 'Pending' },
    { id: 'G-102', title: 'Python Automation Script', seller: 'Sarah Miller', date: '2026-04-05', status: 'Pending' },
  ];

  const pendingPayments = [
    { id: 'PAY-882', orderId: '#EDL-99281', buyer: 'Ujjwal P.', amount: '$51', method: 'UPI', date: '2026-04-05', txId: '123456789012' },
    { id: 'PAY-883', orderId: '#EDL-99285', buyer: 'John Doe', amount: '$27', method: 'UPI', date: '2026-04-05', txId: '987654321098' },
  ];

  const handleAction = (type: string, action: 'approve' | 'reject') => {
    setToast({ 
      message: `${type} ${action === 'approve' ? 'approved' : 'rejected'} successfully!`, 
      type: action === 'approve' ? 'success' : 'error' 
    });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <ShieldCheck className="w-8 h-8 mr-3 text-red-600" />
              Admin Control Center
            </h1>
            <p className="text-gray-500 mt-1">Manage marketplace integrity and verify transactions.</p>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            {(['gigs', 'payments', 'users'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize",
                  activeTab === tab ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Pending Gigs', value: '12', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Pending Payments', value: '8', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Users', value: '1,240', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab} Approval Queue</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'gigs' && (
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gig Title</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seller</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submitted</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingGigs.map((gig) => (
                    <tr key={gig.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{gig.title}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{gig.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-gray-700">{gig.seller}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm text-gray-500">{gig.date}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleAction('Gig', 'approve')}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleAction('Gig', 'reject')}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'payments' && (
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-gray-900">TX: {pay.txId}</p>
                          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Order {pay.orderId}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-gray-700">{pay.buyer}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-extrabold text-gray-900">{pay.amount}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Screenshot
                          </button>
                          <button 
                            onClick={() => handleAction('Payment', 'approve')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleAction('Payment', 'reject')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'users' && (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                <p className="text-gray-500 text-sm">This section is under maintenance.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
