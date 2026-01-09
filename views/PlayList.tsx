import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Play } from '../types';
import PlayCard from '../components/PlayCard';

const PlayList: React.FC = () => {
  const [plays, setPlays] = useState<Play[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<number | 'All'>('All');

  useEffect(() => {
    const fetchPlays = async () => {
      setLoading(true);
      const data = await api.getPlays();
      setPlays(data);
      setLoading(false);
    };
    fetchPlays();
  }, []);

  const filteredPlays = plays.filter(play => {
    const typeMatch = filterType === 'All' || play.type === filterType;
    const yearMatch = filterYear === 'All' || play.year === filterYear;
    return typeMatch && yearMatch;
  });

  const years = Array.from(new Set(plays.map(p => p.year))).sort((a: number, b: number) => b - a);

  return (
    <div className="pt-32 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Repertoire</h1>
        <p className="text-gray-400">A timeline of our passion and performance.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-12 py-6 border-y border-white/10">
        <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-widest text-gray-500">Genre</span>
            {['All', 'Original', 'Adapted', 'Classic'].map(type => (
                <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`text-sm ${filterType === type ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    {type}
                </button>
            ))}
        </div>
        <div className="hidden md:block w-px bg-white/10 h-6"></div>
        <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-widest text-gray-500">Year</span>
            <button 
                onClick={() => setFilterYear('All')} 
                className={`text-sm ${filterYear === 'All' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
            >
                All
            </button>
            {years.map(year => (
                <button
                    key={year}
                    onClick={() => setFilterYear(year)}
                    className={`text-sm ${filterYear === year ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    {year}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse">Loading Archive...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPlays.map(play => (
                <PlayCard key={play.id} play={play} />
            ))}
        </div>
      )}
      
      {!loading && filteredPlays.length === 0 && (
        <div className="text-center py-20 text-gray-500 italic">No productions found matching these criteria.</div>
      )}
    </div>
  );
};

export default PlayList;