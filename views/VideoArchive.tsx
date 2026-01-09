import React, { useState } from 'react';
import { api } from '../services/api';
import { BilibiliVideo } from '../types';

const VideoArchive: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<BilibiliVideo[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');

    try {
      // Simulate Backend Parsing
      const videoData = await api.parseBilibiliVideo(url);
      setVideos(prev => [videoData, ...prev]);
      setUrl('');
    } catch (err) {
      setError('Failed to parse video. Please check the Bilibili link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-6 min-h-screen max-w-6xl mx-auto">
       <div className="mb-16 border-b border-white/10 pb-8">
        <h1 className="font-serif text-4xl mb-4">Video Archive</h1>
        <p className="text-gray-400">Performances, rehearsals, and backstage moments.</p>
      </div>

      {/* Submission Form */}
      <div className="bg-drama-gray p-8 mb-16 rounded-sm border border-white/5">
        <h3 className="text-lg font-serif mb-4 text-white">Add New Video</h3>
        <p className="text-xs text-gray-500 mb-6">
            Paste a Bilibili link below. The system will automatically fetch metadata. 
            (e.g., https://www.bilibili.com/video/BV1xx411c7Xh)
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Bilibili link here..."
                className="flex-1 bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-drama-gold transition-colors"
            />
            <button 
                type="submit" 
                disabled={loading}
                className="bg-white text-black px-8 py-3 font-bold text-sm hover:bg-drama-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'PARSING...' : 'ADD TO ARCHIVE'}
            </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder mock item if empty */}
        {videos.length === 0 && (
             <div className="col-span-full text-center py-12 border border-dashed border-white/10 rounded">
                <p className="text-gray-500">No videos added yet. Try adding one above.</p>
             </div>
        )}

        {videos.map(video => (
            <div key={video.id} className="bg-drama-black border border-white/10 group overflow-hidden">
                <div className="relative aspect-video">
                    <img src={video.cover} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] text-white">
                        {video.duration}
                    </div>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-drama-gold flex items-center justify-center pl-1">
                             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent"></div>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="font-serif text-lg text-white mb-2 line-clamp-1 group-hover:text-drama-gold">{video.title}</h4>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">UP: {video.author}</span>
                        <a href={`https://www.bilibili.com/video/${video.bvid}`} target="_blank" rel="noreferrer" className="text-[10px] text-drama-gold hover:underline">
                            WATCH ON BILIBILI &rarr;
                        </a>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default VideoArchive;