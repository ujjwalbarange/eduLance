import React from 'react';
import { Search, ArrowRight, Shield, Zap, Users, Code } from 'lucide-react';
import { GigCard } from '../components/GigCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { MOCK_GIGS } from '../constants';
import { motion } from 'motion/react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
            >
              Get your college software projects done by <span className="text-blue-200">experts</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-10"
            >
              The trusted marketplace for students to find high-quality software solutions, 
              from MERN apps to Python scripts.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Try 'React Dashboard' or 'Python Script'"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 shadow-xl focus:ring-4 focus:ring-blue-400/50 outline-none transition-all"
                />
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center">
                Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-blue-100 font-medium">
              <span>Popular:</span>
              {['MERN Stack', 'Python Automation', 'Java Swing', 'Data Analysis'].map(tag => (
                <button key={tag} className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Payments</h3>
                <p className="text-sm text-gray-500">Manual verification for 100% trust.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Expert Students</h3>
                <p className="text-sm text-gray-500">Vetted developers from top colleges.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-500">Dedicated team for project disputes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Software Services</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <select className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer">
                  <option>Best Selling</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_GIGS.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
              {/* Duplicate for visual density */}
              {MOCK_GIGS.map((gig) => (
                <GigCard key={`${gig.id}-2`} gig={gig} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
