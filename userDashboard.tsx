
import React, { useState, useEffect, useRef } from 'react';
import { UserData } from './App';

interface UserDashboardProps {
  user: UserData | null;
  onSignOut?: () => void;
  onNavigateToModules?: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onSignOut, onNavigateToModules }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates from -1 to 1
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    // Instruction: Move opposite to direction of mouse
    setTilt({
      x: mouseY * 12, 
      y: -mouseX * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (!user) return null;

  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ');
  const isAus = user.college === 'ASSAM UNIVERSITY SILCHAR';

  return (
    <div className="w-full h-full bg-transparent relative flex flex-col items-center pt-8 md:pt-12 px-6 overflow-y-auto custom-scrollbar no-horizontal-scroll pb-32">
      
      {/* Header Section */}
      <div className="relative z-10 mb-12 md:mb-16 text-center animate-fade-in-header">
        <h2 className="text-5xl md:text-8xl font-anton tracking-[0.05em] text-white uppercase opacity-95 leading-tight">
          USER <span className="text-fuchsia-500 drop-shadow-[0_0_15px_#d946ef]">DASHBOARD</span>
        </h2>
        <div className="h-[1.5px] w-full max-w-2xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent mx-auto mt-4"></div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
        
        {/* LEFT COLUMN: 3D ID CARD */}
        <div 
          className="flex justify-center items-center perspective-[1500px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={cardRef}
            className="relative w-full max-w-[380px] md:max-w-[420px] aspect-[3/4.6] transition-transform duration-200 ease-out preserve-3d"
            style={{ 
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Card Main Chassis - SLEEK ROUNDED DESIGN */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] to-[#050505] border-2 border-fuchsia-500/20 rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_40px_rgba(217,70,239,0.05),0_30px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Decorative Scanning Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-fuchsia-500/30 blur-[1px] animate-[card-scan_4s_linear_infinite]"></div>
              
              {/* Technical Grids & Spots */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d946ef_1.5px,transparent_1.5px)] bg-[size:16px_16px]"></div>
              <div className="absolute top-[20%] right-[10%] w-40 h-40 bg-fuchsia-500/5 blur-[80px] rounded-full"></div>
              <div className="absolute bottom-[30%] left-[5%] w-32 h-32 bg-cyan-500/5 blur-[70px] rounded-full"></div>

              {/* Card Content Area */}
              <div className="relative w-full h-full flex flex-col items-center p-8 md:p-10">
                
                {/* 1. Username (Top of PFP) - LOWERCASE & SMALLER font style */}
                <div className="mb-6">
                  <p className="text-fuchsia-500 font-space font-bold text-lg md:text-xl tracking-[0.1em] lowercase drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                    {user.username.toLowerCase()}
                  </p>
                </div>

                {/* 2. PFP Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 group/pfp">
                  <div className="absolute inset-[-4px] border border-fuchsia-500/30 rounded-full animate-spin-slow border-dashed"></div>
                  <div className="absolute inset-[-10px] border border-white/5 rounded-full"></div>
                  
                  <div className="w-full h-full bg-[#121212] rounded-full border-2 border-fuchsia-500/40 flex items-center justify-center overflow-hidden shadow-[0_0_35px_rgba(217,70,239,0.15)] relative z-10">
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-fuchsia-500/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-950/30 to-transparent"></div>
                  </div>
                </div>

                {/* 3. Full Name */}
                <div className="text-center w-full mb-8">
                  <h3 className="text-white font-anton text-3xl md:text-4xl uppercase tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] truncate px-2">
                    {fullName}
                  </h3>
                  <div className="w-12 h-0.5 bg-fuchsia-500/40 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* 4, 5, 6. Info List */}
                <div className="w-full space-y-5 px-2">
                  
                  {/* Phone Number with Icon */}
                  <div className="flex items-center gap-4 group/info">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all group-hover/info:border-fuchsia-500/40 group-hover/info:bg-fuchsia-500/10">
                      <svg className="w-4 h-4 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase">MOBILE_UPLINK</span>
                      <p className="text-gray-200 font-anton text-lg tracking-widest">{user.phone}</p>
                    </div>
                  </div>

                  {/* College Name with Icon - SLIGHTLY LARGER FONT */}
                  <div className="flex items-center gap-4 group/info">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all group-hover/info:border-fuchsia-500/40 group-hover/info:bg-fuchsia-500/10">
                      <svg className="w-4 h-4 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase">INSTITUTION</span>
                      <p className="text-gray-200 font-space text-sm md:text-lg tracking-wide uppercase leading-tight font-medium truncate">
                        {user.college === 'Others' ? user.otherCollege : user.college}
                      </p>
                    </div>
                  </div>

                  {/* AUS Registration ID (Conditional) */}
                  {isAus && user.regId && (
                    <div className="flex items-center gap-4 group/info animate-fade-in-up">
                      <div className="w-9 h-9 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-fuchsia-500 uppercase">AUS_REG_NUMBER</span>
                        <p className="text-white font-anton text-xl tracking-[0.1em] drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                          {user.regId}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Section - SIGN OUT BUTTON */}
                <div className="w-full mt-auto pt-6 border-t border-white/5 flex justify-center">
                  <button 
                    onClick={onSignOut}
                    className="group/signout px-8 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 rounded-xl text-gray-500 hover:text-red-400 font-anton text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 active:scale-95"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover/signout:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            
            {/* Backside Glow */}
            <div className="absolute -inset-4 bg-fuchsia-500/5 blur-[60px] -z-10 rounded-[3rem]"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVENTS REGISTERED BOX */}
        <div className="w-full h-full flex flex-col items-center lg:items-start animate-stagger-up" style={{ animationDelay: '400ms' }}>
          <div 
            className="w-full h-full min-h-[440px] bg-[#0c0c0c]/40 border border-white/5 relative overflow-hidden flex flex-col p-8 md:p-12 shadow-2xl rounded-[2.5rem] backdrop-blur-sm"
          >
            {/* Header Readout - SMALLER TEXT */}
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-10 w-full">
              <div className="flex flex-col">
                <h4 className="text-xl md:text-3xl font-anton text-white tracking-[0.05em] uppercase">
                  EVENTS REGISTERED <span className="text-fuchsia-500">[0]</span>
                </h4>
              </div>
              
              {/* Module Arrow Navigation */}
              <div className="relative">
                <button 
                  onMouseEnter={() => setIsArrowHovered(true)}
                  onMouseLeave={() => setIsArrowHovered(false)}
                  onClick={onNavigateToModules}
                  className="flex flex-col items-center gap-1 group transition-all duration-300"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 border border-white/10 rounded-[1.25rem] flex items-center justify-center transition-all duration-500 ${isArrowHovered ? 'border-fuchsia-500 bg-fuchsia-500/10 -translate-y-3 shadow-[0_0_30px_rgba(217,70,239,0.3)]' : 'opacity-40'}`}>
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-bold tracking-[0.2em] text-fuchsia-400 uppercase transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 mt-2 ${isArrowHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
                    modules
                  </span>
                </button>
              </div>
            </div>

            {/* Empty State Area */}
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 border-2 border-dashed border-white/5 rounded-[2rem] p-10 group hover:opacity-70 transition-all">
              <div className="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <p className="text-xl md:text-2xl font-anton tracking-[0.1em] text-white uppercase mb-2">No registered events</p>
              <p className="text-xs md:text-sm font-space tracking-wider text-gray-400 max-w-xs uppercase font-bold">
                Head over to the Modules section to explore and register for technical challenges.
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes fade-in-header { from { opacity: 0; transform: scale(0.98) translateY(-10px); filter: blur(5px); } to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } }
        .animate-fade-in-header { animation: fade-in-header 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes stagger-up { from { opacity: 0; transform: translateY(20px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .animate-stagger-up { animation: stagger-up 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        @keyframes card-scan { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(100%); opacity: 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
