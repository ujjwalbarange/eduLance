import React from 'react';
import { Star, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gig } from '../types';
import { motion } from 'motion/react';

interface GigCardProps {
  gig: Gig;
}

export const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
    >
      <Link to={`/gig/${gig.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={gig.image}
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-gray-700 shadow-sm uppercase tracking-wider">
              {gig.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={gig.seller.avatar}
              alt={gig.seller.name}
              className="w-6 h-6 rounded-full border border-gray-100"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-none">{gig.seller.name}</span>
              <span className="text-[10px] text-blue-600 font-medium">{gig.seller.level}</span>
            </div>
          </div>

          <h3 className="text-sm text-gray-700 font-medium line-clamp-2 mb-3 min-h-[40px] group-hover:text-blue-600 transition-colors">
            {gig.title}
          </h3>

          <div className="flex items-center space-x-1 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-900">{gig.rating}</span>
            <span className="text-sm text-gray-400">({gig.reviewsCount})</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {gig.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-[10px]">2 days delivery</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Starting at</span>
              <p className="text-lg font-bold text-gray-900 leading-none">${gig.startingPrice}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
