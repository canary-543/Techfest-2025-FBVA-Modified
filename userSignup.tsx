
import React, { useState, useRef, useEffect } from 'react';

const UserSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    college: '',
    otherCollege: '',
    regId: ''
  });

  const [phoneDigits, setPhoneDigits] = useState<string[]>(new Array(10).fill(''));
  const phoneRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneDigitChange = (index: number, value: string) => {
    // Only allow numbers 0-9
    if (!/^\d*$/.test(value)) return;
    
    const newDigits = [...phoneDigits];
    const lastChar = value.slice(-1);
    newDigits[index] = lastChar;
    setPhoneDigits(newDigits);

    // Auto-focus next box
    if (lastChar && index < 9) {
      phoneRefs.current[index + 1]?.focus();
    }
  };

  const handlePhoneKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace logic to return to previous box
    if (e.key === 'Backspace' && !phoneDigits[index] && index > 0) {
      phoneRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = phoneDigits.join('');
    console.log('Registration submitted:', { ...formData, phone });
  };

  const isAus = formData.college === 'ASSAM UNIVERSITY SILCHAR';
  const isOtherCollege = formData.college === 'Others';

  return (
    <div className="w-full h-full bg-transparent relative flex flex-col items-center pt-8 md:pt-12 px-6 overflow-y-auto custom-scrollbar no-horizontal-scroll pb-32">
      
      {/* Refined Header - Matched to Events Page scale */}
      <div className="relative z-10 mb-12 md:mb-16 text-center animate-fade-in-header">
        <h1 className="text-4xl md:text-7xl font-anton tracking-[0.05em] uppercase flex items-center justify-center gap-3 md:gap-6">
          <span className="text-white">USER</span>
          <span className="text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">REGISTRATION</span>
        </h1>
        <div className="h-[1.5px] w-full max-w-2xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-5xl flex flex-col gap-6 md:gap-8 animate-fade-in-up">
        
        {/* Username Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.username ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            USERNAME:
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-12 md:h-16 bg-white/[0.02] border border-white/10 rounded-xl px-6 text-white font-space text-lg outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.04] transition-all"
              autoComplete="off"
            />
          </div>
        </div>

        {/* First Name Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.firstName ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            FIRST NAME:
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full h-12 md:h-16 bg-white/[0.02] border border-white/10 rounded-xl px-6 text-white font-space text-lg outline-none focus:border-fuchsia-500/50 transition-all"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Middle Name Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.middleName ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            MIDDLE NAME:
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full h-12 md:h-16 bg-white/[0.02] border border-white/10 rounded-xl px-6 text-white font-space text-lg outline-none focus:border-fuchsia-500/50 transition-all"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Last Name Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.lastName ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            LAST NAME:
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full h-12 md:h-16 bg-white/[0.02] border border-white/10 rounded-xl px-6 text-white font-space text-lg outline-none focus:border-fuchsia-500/50 transition-all"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Phone Number OTP Style Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${phoneDigits.some(d => d) ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            PHONE NUMBER:
          </label>
          <div className="flex-1 flex gap-2 md:gap-3 justify-between items-center h-12 md:h-16">
            {phoneDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { phoneRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePhoneDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handlePhoneKeyDown(idx, e)}
                className={`w-full h-full bg-white/[0.03] border rounded-lg text-center text-white font-anton text-lg md:text-2xl outline-none transition-all duration-300
                  ${digit ? 'border-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.3)] bg-fuchsia-500/5' : 'border-white/10'}
                  focus:border-fuchsia-500 focus:bg-white/10`}
              />
            ))}
          </div>
        </div>

        {/* College Selection Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.college ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            COLLEGE NAME:
          </label>
          <div className="flex-1 relative">
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full h-12 md:h-16 bg-[#0a0a0a] border border-white/10 rounded-xl px-6 text-white font-space text-sm md:text-lg outline-none focus:border-fuchsia-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>SELECT YOUR INSTITUTION</option>
              <option value="ASSAM UNIVERSITY SILCHAR">ASSAM UNIVERSITY SILCHAR</option>
              <option value="NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR">NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR</option>
              <option value="POLYTECHNIC SILCHAR">POLYTECHNIC SILCHAR</option>
              <option value="SILCHAR MEDICAL COLLEGE AND HOSPITAL">SILCHAR MEDICAL COLLEGE AND HOSPITAL</option>
              <option value="Others">Others</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Specified College Input (Conditional) - Tightened Margin */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOtherCollege ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-3 group">
            <label className="md:w-[42%] text-base md:text-xl font-anton tracking-[0.08em] text-white/50 uppercase">
              PLEASE SPECIFY:
            </label>
            <input
              type="text"
              name="otherCollege"
              value={formData.otherCollege}
              onChange={handleChange}
              placeholder="ENTER YOUR COLLEGE NAME"
              className="flex-1 h-12 md:h-14 bg-white/[0.03] border border-white/15 rounded-xl px-6 text-white font-space outline-none focus:border-fuchsia-500/50 transition-all"
            />
          </div>
        </div>

        {/* Registration ID for AUS (Conditional) - Tightened Margin + Pink Glow Logic */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isAus ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-3 group">
            <label className={`md:w-[42%] text-base md:text-xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.regId ? 'text-white' : 'text-fuchsia-400/50'}`}>
              REGISTRATION ID [ONLY FOR AUS STUDENTS]:
            </label>
            <div className="flex-1 relative">
               <input
                type="text"
                name="regId"
                value={formData.regId}
                onChange={handleChange}
                className={`w-full h-12 md:h-16 bg-white/[0.02] rounded-xl px-6 text-white font-space text-lg outline-none transition-all duration-500 border
                  ${formData.regId 
                    ? 'border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)] bg-fuchsia-500/[0.05]' 
                    : 'border-white/10 focus:border-fuchsia-500/50'}
                `}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* Submit Section - Reduced gap */}
        <div className="mt-8 flex justify-center pb-16">
          <button 
            type="submit"
            className="group relative px-20 py-5 md:px-32 md:py-7 overflow-visible outline-none transition-transform active:scale-95"
          >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-fuchsia-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Chassis Shape */}
            <div 
              className="absolute inset-0 bg-white/5 border border-white/20 backdrop-blur-2xl transition-all duration-500 group-hover:bg-fuchsia-600 group-hover:border-fuchsia-400 group-hover:shadow-[0_0_50px_rgba(217,70,239,0.4)]"
              style={{
                clipPath: 'polygon(15px 0%, calc(100% - 15px) 0%, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0% calc(100% - 15px), 0% 15px)'
              }}
            >
               <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:10px_10px]"></div>
            </div>
            
            <span className="relative z-10 text-white font-anton text-2xl md:text-4xl tracking-[0.25em] group-hover:tracking-[0.3em] transition-all duration-500">
              SUBMIT
            </span>
          </button>
        </div>
      </form>

      <style>{`
        @keyframes fade-in-header {
          from { opacity: 0; transform: scale(0.98) translateY(-10px); filter: blur(5px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes fade-in-up-custom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-header {
          animation: fade-in-header 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up-custom 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          animation-delay: 150ms;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d946ef;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(217, 70, 239, 0.5);
        }
      `}</style>
    </div>
  );
};

export default UserSignup;
