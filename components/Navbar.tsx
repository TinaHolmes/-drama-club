import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';

interface NavbarProps {
  currentUserRole: UserRole;
  onToggleAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUserRole, onToggleAuth }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, label }: { path: string; label: string }) => (
    <Link
      to={path}
      className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
        isActive(path) ? 'text-drama-gold border-b border-drama-gold pb-1' : 'text-gray-400 hover:text-white'
      }`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-drama-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-xl font-bold text-white tracking-wider">MUFENG</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Drama Club Archive</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <NavItem path="/" label="Home" />
          <NavItem path="/plays" label="Repertoire" />
          <NavItem path="/archive" label="Scripts" />
          <NavItem path="/videos" label="Videos" />
          <NavItem path="/members" label="Ensemble" />
          
          <button 
            onClick={onToggleAuth}
            className="ml-8 px-4 py-1.5 border border-white/20 text-xs text-gray-400 hover:text-white hover:border-white transition-all rounded-sm"
          >
            {currentUserRole === 'GUEST' ? 'LOGIN' : `LOGOUT (${currentUserRole})`}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-drama-black border-b border-white/10 px-6 py-8 flex flex-col space-y-6">
          <NavItem path="/" label="Home" />
          <NavItem path="/plays" label="Repertoire" />
          <NavItem path="/archive" label="Scripts" />
          <NavItem path="/videos" label="Videos" />
          <NavItem path="/members" label="Ensemble" />
          <button onClick={onToggleAuth} className="text-left text-xs text-gray-500 mt-4">
            {currentUserRole === 'GUEST' ? 'Switch to MEMBER View' : 'Switch to GUEST View'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;