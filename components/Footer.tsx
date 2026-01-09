import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-drama-black border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end opacity-60">
        <div>
          <h3 className="font-serif text-lg mb-2">Shanghai Ocean University</h3>
          <p className="text-sm">Mufeng Drama Club</p>
          <p className="text-xs mt-4 text-gray-500">Est. 2005</p>
        </div>
        <div className="mt-8 md:mt-0 text-right">
          <p className="text-xs text-gray-500 max-w-xs ml-auto">
            This archive is maintained by current club members. 
            All content rights reserved to their respective creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;