import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Script, UserRole } from '../types';

interface Props {
  userRole: UserRole;
}

const ScriptLibrary: React.FC<Props> = ({ userRole }) => {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    api.getScripts().then(setScripts);
  }, []);

  return (
    <div className="pt-32 px-6 min-h-screen max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
            <h1 className="font-serif text-4xl mb-4">Script Library</h1>
            <p className="text-gray-400 max-w-lg">
                The written word is the skeleton of drama. Here we preserve the texts that have built our history.
            </p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-white/5 border border-white/10 rounded text-xs">
            Current Access: <span className={userRole === 'GUEST' ? 'text-gray-400' : 'text-drama-gold font-bold'}>{userRole}</span>
        </div>
      </div>

      <div className="space-y-4">
        {scripts.map(script => (
            <div key={script.id} className="group bg-drama-gray border border-white/5 p-6 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-serif text-xl text-white">{script.title}</h3>
                            {script.accessLevel === 'MEMBER_ONLY' && (
                                <span className="text-[10px] px-2 py-0.5 border border-red-900 text-red-400 rounded bg-red-900/10">INTERNAL</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Written by {script.author} • Uploaded {script.uploadDate}</p>
                        <p className="text-sm text-gray-300 max-w-2xl">{script.description}</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 min-w-[120px]">
                        <span className="text-xs text-gray-600">{script.fileSize}</span>
                        {/* Logic: Show Download if Public OR if User is Member */}
                        {script.accessLevel === 'PUBLIC' || userRole !== 'GUEST' ? (
                            <button className="px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-drama-gold transition-colors w-full">
                                DOWNLOAD
                            </button>
                        ) : (
                            <button disabled className="px-4 py-2 bg-white/5 text-gray-500 text-sm cursor-not-allowed w-full border border-white/5">
                                LOCKED
                            </button>
                        )}
                    </div>
                </div>
                
                {script.accessLevel === 'MEMBER_ONLY' && userRole === 'GUEST' && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 italic flex items-center">
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        This file is restricted to club members. Please log in to access.
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptLibrary;