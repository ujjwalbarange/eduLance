import React from 'react';
import { Filter, ChevronDown, DollarSign, Clock, Code } from 'lucide-react';

export const FilterSidebar = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </h3>
        
        {/* Tech Stack */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <Code className="w-4 h-4 mr-2 text-blue-500" />
            Tech Stack
          </h4>
          <div className="space-y-2">
            {['React', 'Python', 'Java', 'Node.js', 'C++', 'PHP'].map((tech) => (
              <label key={tech} className="flex items-center group cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">{tech}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Time */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Delivery Time
          </h4>
          <div className="space-y-2">
            {['Express (24h)', 'Up to 3 days', 'Up to 7 days', 'Anytime'].map((time) => (
              <label key={time} className="flex items-center group cursor-pointer">
                <input type="radio" name="delivery" className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">{time}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
            Budget
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
        Apply Filters
      </button>
    </div>
  );
};
