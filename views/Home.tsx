import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Play } from '../types';
import PlayCard from '../components/PlayCard';

const Home: React.FC = () => {
  const [featuredPlays, setFeaturedPlays] = useState<Play[]>([]);

  useEffect(() => {
    // Load a few plays for the home screen
    api.getPlays().then(plays => setFeaturedPlays(plays.slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                className="w-full h-full object-cover opacity-40"
                alt="Stage background"
            />
            <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-drama-gold tracking-[0.3em] text-sm mb-6 uppercase">Shanghai Ocean University</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">
            When the wind blows, <br/>
            <span className="italic">the curtain rises.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Mufeng Drama Club. A sanctuary for stories, a laboratory for emotions, 
            and a home for those who dream in light and shadow.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/plays" className="px-8 py-3 bg-white text-black font-semibold tracking-widest hover:bg-drama-gold transition-colors">
              VIEW REPERTOIRE
            </Link>
            <Link to="/members" className="px-8 py-3 border border-white text-white tracking-widest hover:bg-white hover:text-black transition-colors">
              MEET THE CAST
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-6 bg-drama-black">
        <div className="max-w-4xl mx-auto text-center">
            <span className="block w-12 h-1 bg-drama-gold mx-auto mb-8"></span>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">The Archive</h2>
            <p className="text-gray-400 leading-loose">
                Established in 2005, Mufeng has produced over 50 original and adapted plays. 
                This digital space serves not merely as a record of our past performances, 
                but as a living library of scripts, production notes, and the memories of every 
                student who has stepped onto our stage.
            </p>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-3xl">Selected Works</h2>
            <Link to="/plays" className="text-sm text-drama-gold hover:text-white transition-colors pb-1 border-b border-drama-gold">View All Productions &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlays.map(play => (
                <PlayCard key={play.id} play={play} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;