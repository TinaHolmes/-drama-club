import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import PlayList from './views/PlayList';
import ScriptLibrary from './views/ScriptLibrary';
import VideoArchive from './views/VideoArchive';
import { UserRole } from './types';

// Simple Member List Page (Inline for simplicity given file limits)
const MemberList = () => (
    <div className="pt-32 px-6 min-h-screen max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-4xl mb-8">Ensemble</h1>
        <p className="text-gray-500 mb-12">The faces behind the masks.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
                <div key={i} className="text-center group">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={`https://picsum.photos/200/200?random=${i+30}`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-serif text-lg">Member Name</h3>
                    <p className="text-xs text-drama-gold uppercase tracking-widest mt-1">Actor / Director</p>
                </div>
            ))}
        </div>
    </div>
);

const App: React.FC = () => {
  // Simulate Auth State (Guest vs Member)
  // In a real app, this would be in a ContextProvider
  const [userRole, setUserRole] = useState<UserRole>('GUEST');

  const toggleAuth = () => {
    setUserRole(prev => prev === 'GUEST' ? 'MEMBER' : 'GUEST');
  };

  return (
    <Router>
      <div className="bg-drama-black text-drama-white min-h-screen font-sans selection:bg-drama-gold selection:text-black flex flex-col">
        <Navbar currentUserRole={userRole} onToggleAuth={toggleAuth} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plays" element={<PlayList />} />
            <Route path="/archive" element={<ScriptLibrary userRole={userRole} />} />
            <Route path="/videos" element={<VideoArchive />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;