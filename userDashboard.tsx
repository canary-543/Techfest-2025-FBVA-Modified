
import React from 'react';

const UserDashboard: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent relative flex flex-col items-center pt-8 md:pt-12 px-6 overflow-y-auto custom-scrollbar no-horizontal-scroll pb-32">
      
      {/* Header Section */}
      <div className="relative z-10 mb-12 md:mb-20 text-center animate-fade-in-header">
        <h2 className="text-5xl md:text-8xl font-anton tracking-[0.05em] text-white uppercase opacity-95 leading-tight">
          USER <span className="text-fuchsia-500 drop-shadow-[0_0_15px_#d946ef]">DASHBOARD</span>
        </h2>
        <div className="h-[1.5px] w-full max-w-2xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent mx-auto mt-4"></div>
      </div>

      {/* Placeholder for Dashboard Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center min-h-[40vh] animate-stagger-up" style={{ animationDelay: '200ms' }}>
         {/* Blank space for future dashboard widgets/stats */}
         <div className="w-full h-full flex items-center justify-center opacity-20 border-2 border-dashed border-fuchsia-500/30 rounded-[3rem] p-12">
            <span className="text-fuchsia-500 font-anton text-xl md:text-3xl tracking-[0.3em] uppercase animate-pulse">
               AWAITING_UPLINK...
            </span>
         </div>
      </div>

      <style>{`
        @keyframes fade-in-header { from { opacity: 0; transform: scale(0.98) translateY(-10px); filter: blur(5px); } to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } }
        .animate-fade-in-header { animation: fade-in-header 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes stagger-up { from { opacity: 0; transform: translateY(20px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .animate-stagger-up { animation: stagger-up 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default UserDashboard;
