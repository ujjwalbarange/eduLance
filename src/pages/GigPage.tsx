import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Check, Shield, MessageSquare, AlertCircle, Upload, Calendar, FileText, Code } from 'lucide-react';
import { MOCK_GIGS } from '../constants';
import { Package } from '../types';
import { motion } from 'motion/react';
import { Modal } from '../components/Feedback';

export const GigPage = () => {
  const { id } = useParams();
  const gig = MOCK_GIGS.find(g => g.id === id) || MOCK_GIGS[0];
  const [activeTab, setActiveTab] = React.useState<'Basic' | 'Standard' | 'Premium'>('Basic');
  const [isRequirementModalOpen, setIsRequirementModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const packages: Package[] = [
    {
      type: 'Basic',
      name: 'Starter Code',
      description: 'Core functionality with clean code and basic documentation.',
      price: gig.startingPrice,
      deliveryTime: '2 Days',
      features: ['Source Code', 'Basic Documentation', '1 Revision'],
    },
    {
      type: 'Standard',
      name: 'Full Project',
      description: 'Complete project with detailed report and setup instructions.',
      price: gig.startingPrice * 2,
      deliveryTime: '4 Days',
      features: ['Source Code', 'Detailed Project Report', 'Setup Video', '3 Revisions', 'Database Integration'],
    },
    {
      type: 'Premium',
      name: 'Diamond Suite',
      description: 'End-to-end solution including deployment and viva preparation.',
      price: gig.startingPrice * 3.5,
      deliveryTime: '7 Days',
      features: ['Everything in Standard', 'Cloud Deployment', 'Viva/Interview Prep', 'Unlimited Revisions', '1 Month Support'],
    },
  ];

  const activePackage = packages.find(p => p.type === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <nav className="flex text-sm text-gray-500 space-x-2">
              <span className="hover:text-blue-600 cursor-pointer">Programming</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer">{gig.category}</span>
            </nav>

            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {gig.title}
            </h1>

            <div className="flex items-center space-x-4">
              <img src={gig.seller.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">{gig.seller.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{gig.seller.level}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900">{gig.rating}</span>
                  <span className="text-gray-400">({gig.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img src={gig.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About This Gig</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Are you struggling with your college software project? I am here to help! 
                With over 3 years of experience in {gig.techStack.join(', ')}, I can build 
                robust, scalable, and well-documented applications tailored to your requirements.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Clean & Commented Code', 'Plagiarism-free Work', 'On-time Delivery', 'Free Setup Support'].map(item => (
                  <li key={item} className="flex items-center text-gray-700 text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar - Pricing */}
          <div className="w-full lg:w-[400px] space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-24">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {packages.map(p => (
                  <button
                    key={p.type}
                    onClick={() => setActiveTab(p.type)}
                    className={`flex-1 py-4 text-sm font-bold transition-all ${
                      activeTab === p.type 
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {p.type}
                  </button>
                ))}
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">{activePackage.name}</h3>
                  <span className="text-2xl font-extrabold text-gray-900">${activePackage.price}</span>
                </div>
                
                <p className="text-sm text-gray-500 leading-relaxed">
                  {activePackage.description}
                </p>

                <div className="flex items-center space-x-4 text-sm font-bold text-gray-700">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {activePackage.deliveryTime} Delivery
                  </div>
                </div>

                <ul className="space-y-3">
                  {activePackage.features.map(f => (
                    <li key={f} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-blue-500 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setIsRequirementModalOpen(true)}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center"
                >
                  Continue (${activePackage.price})
                </button>

                <button className="w-full py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors flex items-center justify-center text-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Seller
                </button>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-100">
                <div className="flex items-center justify-center text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  <Shield className="w-3 h-3 mr-1" />
                  EduLance Payment Protection
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Note:</strong> After payment, you'll need to upload your project requirements. 
                The seller will start work only after verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirement Modal */}
      <Modal 
        isOpen={isRequirementModalOpen} 
        onClose={() => setIsRequirementModalOpen(false)}
        title="Project Requirements"
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          navigate('/checkout', { state: { package: activePackage, gig } });
        }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Problem Statement
            </label>
            <textarea 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px] text-sm"
              placeholder="Describe your project requirements in detail..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Code className="w-4 h-4 mr-2 text-blue-500" />
                Preferred Language
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                <option>React / Next.js</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>Node.js</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                Deadline
              </label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center">
              <Upload className="w-4 h-4 mr-2 text-blue-500" />
              Upload Reference Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
              <p className="text-[10px] text-gray-400 mt-1">PDF, DOCX, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
          >
            Proceed to Payment
          </button>
        </form>
      </Modal>
    </div>
  );
};
