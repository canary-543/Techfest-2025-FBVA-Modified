
import React, { useState, useRef, useEffect } from 'react';

const COLLEGES = [
  "ASSAM UNIVERSITY SILCHAR",
  "NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR",
  "POLYTECHNIC SILCHAR",
  "SILCHAR MEDICAL COLLEGE AND HOSPITAL",
  "Others"
];

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [phoneDigits, setPhoneDigits] = useState<string[]>(new Array(10).fill(''));
  const phoneRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCollegeSelect = (college: string) => {
    setFormData({ ...formData, college });
    setIsDropdownOpen(false);
  };

  const handlePhoneDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...phoneDigits];
    const lastChar = value.slice(-1);
    newDigits[index] = lastChar;
    setPhoneDigits(newDigits);
    if (lastChar && index < 9) {
      phoneRefs.current[index + 1]?.focus();
    }
  };

  const handlePhoneKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
      
      {/* Header - Matched Exactly to Events page scale */}
      <div className="relative z-10 mb-12 md:mb-20 text-center animate-fade-in-header">
        <h2 className="text-5xl md:text-8xl font-anton tracking-[0.05em] text-white uppercase opacity-95 leading-tight">
          USER <span className="text-fuchsia-500 drop-shadow-[0_0_15px_#d946ef]">REGISTRATION</span>
        </h2>
        <div className="h-[1.5px] w-full max-w-2xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-5xl flex flex-col animate-fade-in-up">
        
        {/* Username */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.username ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            USERNAME:
          </label>
          <div className="flex-1">
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

        {/* Names Row */}
        {[
          { key: 'firstName', label: 'FIRST NAME' },
          { key: 'middleName', label: 'MIDDLE NAME' },
          { key: 'lastName', label: 'LAST NAME' }
        ].map((field) => (
          <div key={field.key} className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8">
            <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData[field.key as keyof typeof formData] ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
              {field.label}:
            </label>
            <div className="flex-1">
              <input
                type="text"
                name={field.key}
                value={formData[field.key as keyof typeof formData]}
                onChange={handleChange}
                className="w-full h-12 md:h-16 bg-white/[0.02] border border-white/10 rounded-xl px-6 text-white font-space text-lg outline-none focus:border-fuchsia-500/50 transition-all"
                autoComplete="off"
              />
            </div>
          </div>
        ))}

        {/* Phone Number */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8">
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

        {/* Custom College Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group relative z-50 mb-6 md:mb-8">
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${formData.college ? 'text-white' : 'text-white/30'} group-hover:text-white`}>
            COLLEGE NAME:
          </label>
          <div className="flex-1 relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full h-12 md:h-16 bg-[#0a0a0a] border rounded-xl px-6 text-left flex items-center justify-between transition-all duration-300
                ${isDropdownOpen ? 'border-fuchsia-500 ring-2 ring-fuchsia-500/20' : 'border-white/10'}
                ${formData.college ? 'text-white' : 'text-white/40'}
              `}
            >
              <span className="font-space text-sm md:text-lg uppercase tracking-wider truncate">
                {formData.college || "SELECT YOUR INSTITUTION"}
              </span>
              <svg 
                className={`w-5 h-5 text-fuchsia-500 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180 shadow-[0_0_10px_#d946ef]' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`
              absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-3xl border border-fuchsia-500/40 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 origin-top z-[100]
              ${isDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
            `}>
              <div className="py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {COLLEGES.map((college) => (
                  <div
                    key={college}
                    onClick={() => handleCollegeSelect(college)}
                    className={`
                      px-6 py-4 cursor-pointer font-anton tracking-[0.1em] text-sm md:text-lg transition-all duration-300 relative group/opt
                      ${formData.college === college ? 'text-fuchsia-500 bg-fuchsia-500/10' : 'text-white/70'}
                      hover:text-white hover:pl-9
                    `}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-500 scale-y-0 group-hover/opt:scale-y-100 transition-transform origin-top"></div>
                    <span className="relative z-10">{college}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specified College Input (Conditional) - Spacing Managed inside wrapper */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOtherCollege ? 'max-h-24 opacity-100 mb-6 md:mb-8' : 'max-h-0 opacity-0 mb-0 pointer-events-none'}`}>
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

        {/* Registration ID for AUS (Conditional) - Spacing Managed inside wrapper */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isAus ? 'max-h-32 opacity-100 mb-6 md:mb-8' : 'max-h-0 opacity-0 mb-0 pointer-events-none'}`}>
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
                    ? 'border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.5)] bg-fuchsia-500/[0.06]' 
                    : 'border-white/10 focus:border-fuchsia-500/50'}
                `}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* Submit Section - Refined vertical gap */}
        <div className="mt-4 md:mt-8 flex justify-center pb-16">
          <button 
            type="submit"
            className="group relative px-20 py-5 md:px-32 md:py-7 overflow-visible outline-none transition-transform active:scale-95"
          >
            <div className="absolute inset-0 bg-fuchsia-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 70, 239, 0.5);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(217, 70, 239, 0.3);
        }
      `}</style>
    </div>
  );
};

export default UserSignup;
