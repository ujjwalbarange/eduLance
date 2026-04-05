import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Info, 
  DollarSign, 
  Clock, 
  Code, 
  Globe, 
  Terminal, 
  Database,
  ArrowLeft,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Modal, Toast } from '../components/Feedback';

export const CreateGigPage = () => {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form State
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Web Dev');
  const [description, setDescription] = React.useState('');
  const [techStack, setTechStack] = React.useState<string[]>([]);
  const [newTech, setNewTech] = React.useState('');

  // Packages State
  const [packages, setPackages] = React.useState({
    Basic: { name: '', description: '', price: 0, delivery: '2 Days', features: [''] },
    Standard: { name: '', description: '', price: 0, delivery: '4 Days', features: [''] },
    Premium: { name: '', description: '', price: 0, delivery: '7 Days', features: [''] },
  });

  const addTech = () => {
    if (newTech && !techStack.includes(newTech)) {
      setTechStack([...techStack, newTech]);
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const updatePackage = (type: 'Basic' | 'Standard' | 'Premium', field: string, value: any) => {
    setPackages({
      ...packages,
      [type]: { ...packages[type], [field]: value }
    });
  };

  const addFeature = (type: 'Basic' | 'Standard' | 'Premium') => {
    const newFeatures = [...packages[type].features, ''];
    updatePackage(type, 'features', newFeatures);
  };

  const updateFeature = (type: 'Basic' | 'Standard' | 'Premium', index: number, value: string) => {
    const newFeatures = [...packages[type].features];
    newFeatures[index] = value;
    updatePackage(type, 'features', newFeatures);
  };

  const removeFeature = (type: 'Basic' | 'Standard' | 'Premium', index: number) => {
    const newFeatures = packages[type].features.filter((_, i) => i !== index);
    updatePackage(type, 'features', newFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Create a New Gig</h1>
            <p className="text-gray-500 mt-1">Offer your software expertise to students worldwide.</p>
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="px-6 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-white transition-all">
              Save Draft
            </button>
            <button 
              form="create-gig-form"
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Publish Gig
            </button>
          </div>
        </div>

        <form id="create-gig-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Overview Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Gig Overview
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Gig Title</label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., I will build a professional React dashboard for your project"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Minimum 15 characters. Be descriptive.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  >
                    <option>Web Dev</option>
                    <option>App Dev</option>
                    <option>Data Science</option>
                    <option>Scripting</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Tech Stack</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                      placeholder="Add tech (e.g., React)"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <button 
                      type="button"
                      onClick={addTech}
                      className="px-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map(tech => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                        {tech}
                        <button onClick={() => removeTech(tech)} className="ml-2 hover:text-blue-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[200px] text-sm"
                  placeholder="Describe what you offer in detail. Mention your expertise and what the buyer will receive."
                />
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Gig Media
              </h2>
            </div>
            <div className="p-8">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Upload a Gig Image</h3>
                <p className="text-xs text-gray-500 mt-1">Recommended size: 1280x720px (16:9)</p>
                <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">JPG, PNG, or SVG • Max 5MB</p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Pricing Packages
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 border-b border-gray-100 w-1/4"></th>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <th key={type} className="px-8 py-4 border-b border-gray-100 border-l border-gray-100 text-center">
                        <span className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">{type}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-8 py-6 border-b border-gray-100 font-bold text-sm text-gray-700">Package Name</td>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <td key={type} className="px-4 py-4 border-b border-gray-100 border-l border-gray-100">
                        <input 
                          type="text"
                          required
                          value={packages[type].name}
                          onChange={(e) => updatePackage(type, 'name', e.target.value)}
                          placeholder="e.g., Starter Code"
                          className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-8 py-6 border-b border-gray-100 font-bold text-sm text-gray-700">Description</td>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <td key={type} className="px-4 py-4 border-b border-gray-100 border-l border-gray-100">
                        <textarea 
                          required
                          value={packages[type].description}
                          onChange={(e) => updatePackage(type, 'description', e.target.value)}
                          placeholder="What's included?"
                          className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs min-h-[80px]"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-8 py-6 border-b border-gray-100 font-bold text-sm text-gray-700">Delivery Time</td>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <td key={type} className="px-4 py-4 border-b border-gray-100 border-l border-gray-100">
                        <select 
                          value={packages[type].delivery}
                          onChange={(e) => updatePackage(type, 'delivery', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                        >
                          <option>1 Day</option>
                          <option>2 Days</option>
                          <option>3 Days</option>
                          <option>5 Days</option>
                          <option>7 Days</option>
                          <option>14 Days</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-8 py-6 border-b border-gray-100 font-bold text-sm text-gray-700">Price ($)</td>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <td key={type} className="px-4 py-4 border-b border-gray-100 border-l border-gray-100">
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                          <input 
                            type="number"
                            required
                            value={packages[type].price}
                            onChange={(e) => updatePackage(type, 'price', parseInt(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs font-bold"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-bold text-sm text-gray-700">Features</td>
                    {(['Basic', 'Standard', 'Premium'] as const).map(type => (
                      <td key={type} className="px-4 py-6 border-l border-gray-100 align-top">
                        <div className="space-y-2">
                          {packages[type].features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <input 
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(type, idx, e.target.value)}
                                placeholder="Feature..."
                                className="flex-1 px-3 py-1.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[10px]"
                              />
                              <button 
                                type="button"
                                onClick={() => removeFeature(type, idx)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button 
                            type="button"
                            onClick={() => addFeature(type)}
                            className="w-full py-1.5 border border-dashed border-gray-200 rounded-lg text-[10px] font-bold text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Feature
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 pt-8">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  Publish Gig
                </>
              )}
            </button>
            <button 
              type="button"
              className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save as Draft
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {showSuccessToast && (
          <Toast 
            message="Gig sent for verification! It will be published after approval." 
            type="success" 
            onClose={() => setShowSuccessToast(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
