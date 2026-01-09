import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from '../types';

interface PlayCardProps {
  play: Play;
}

const PlayCard: React.FC<PlayCardProps> = ({ play }) => {
  return (
    <Link to={`/plays/${play.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-drama-gray mb-4">
        <img 
          src={play.coverImage} 
          alt={play.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="text-sm font-serif italic text-drama-gold">View Production Details</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-500 font-mono">{play.year} {play.semester}</span>
            <span className="text-[10px] border border-gray-700 px-1.5 py-0.5 rounded text-gray-400">{play.type}</span>
        </div>
        <h3 className="text-xl font-serif text-white group-hover:text-drama-gold transition-colors">{play.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{play.synopsis}</p>
      </div>
    </Link>
  );
};

export default PlayCard;