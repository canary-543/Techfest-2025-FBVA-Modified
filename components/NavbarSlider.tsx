
import React, { useState, useRef, useEffect } from 'react';

const SECTIONS = ['HOME', 'GALLERY', 'MODULES', 'EVENTS', 'TEAM'];

interface NavbarSliderProps {
  onSelect?: (section: string) => void;
  initialSection?: string;
  registrationPhase?: 'IDLE' | 'EXPANDED';
}

const NavbarSlider: React.FC<NavbarSliderProps> = ({ onSelect, initialSection = 'HOME', registrationPhase = 'IDLE' }) => {
  const initialIndex = SECTIONS.indexOf(initialSection);
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [hovering, setHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyTimerRef = useRef<number | null>(null);

  const [isExiting, setIsExiting] = useState(false);
  const prevPhaseRef = useRef(registrationPhase);

  const isExpandedRegistration = registrationPhase === 'EXPANDED';

  useEffect(() => {
    const idx = SECTIONS.indexOf(initialSection);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [initialSection]);

  // Detect when we leave the registration phase to trigger the exit delay logic
  useEffect(() => {
    if (prevPhaseRef.current === 'EXPANDED' && registrationPhase === 'IDLE') {
      setIsExiting(true);
      const timer = setTimeout(() => setIsExiting(false), 1200); // Duration of the full out-sequence
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = registrationPhase;
  }, [registrationPhase]);

  useEffect(() => {
    startStickyTimer();
    return () => {
      if (stickyTimerRef.current) window.clearTimeout(stickyTimerRef.current);
    };
  }, []);

  const getPillPositionStyle = (): React.CSSProperties => {
    if (isExpandedRegistration) {
      return {
        left: '1%',
        width: '98%',
        transform: 'none'
      };
    }
    return {
      left: `${activeIndex * 20}%`,
      width: '20%',
    };
  };

  const startStickyTimer = () => {
    if (stickyTimerRef.current) window.clearTimeout(stickyTimerRef.current);
    stickyTimerRef.current = window.setTimeout(() => {
      setIsSticky(false);
      stickyTimerRef.current = null;
    }, 300000); 
  };

  const notifyChange = (index: number) => {
    if (onSelect) {
      onSelect(SECTIONS[index]);
    }
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_730b227c1d.mp3');
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const handleClick = (index: number) => {
    if (isExpandedRegistration || index === activeIndex) return;
    setActiveIndex(index);
    notifyChange(index);
    refreshExpansion();
  };

  const refreshExpansion = () => {
    setIsSticky(true);
    startStickyTimer();
  };

  const handleMouseEnter = () => {
    if (isExpandedRegistration) return;
    setHovering(true);
    refreshExpansion();
  };

  const handleMouseLeave = () => {
    if (isExpandedRegistration) return;
    setHovering(false);
    setIsDragging(false);
    startStickyTimer();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExpandedRegistration || !isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const index = Math.floor(percentage / 20);
    
    if (index !== activeIndex && index >= 0 && index < SECTIONS.length) {
        setActiveIndex(index);
        notifyChange(index);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isActive = hovering || isDragging || isSticky || isExpandedRegistration;

  return (
    <div className={`relative flex flex-col items-center pointer-events-auto transition-all duration-300 w-auto`}>
        {/* The Slider Track */}
        <div 
            ref={trackRef}
            className={`
                h-12 rounded-full border border-fuchsia-500/20 bg-[#080808] relative flex items-center 
                shadow-[0_0_25px_rgba(217,70,239,0.08)] group
                hover:border-fuchsia-500/40 cursor-pointer select-none w-[380px] md:w-[550px]
                transition-all ${isExpandedRegistration ? 'duration-1000 border-fuchsia-500/50 shadow-[0_0_50px_rgba(217,70,239,0.3)]' : (isExiting ? 'duration-[600ms] delay-[600ms]' : 'duration-300')}
            `}
            onMouseMove={handleMouseMove}
            onMouseDown={(e) => { 
                if (isExpandedRegistration) return;
                e.preventDefault(); 
                setIsDragging(true); 
                refreshExpansion(); 
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {/* SNAP DOTS */}
            <div className={`absolute inset-0 flex justify-between px-[10%] items-center pointer-events-none transition-all ${isExpandedRegistration ? 'opacity-0 duration-300 delay-0' : 'opacity-100 duration-300 delay-[1000ms]'}`}>
                {SECTIONS.map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef] scale-125' : 'bg-fuchsia-500/20'}`}
                    ></div>
                ))}
            </div>

            {/* Clickable Zones */}
            {!isExpandedRegistration && SECTIONS.map((_, i) => (
                <div 
                    key={i} 
                    className="flex-1 h-full z-10" 
                    onClick={() => handleClick(i)}
                ></div>
            ))}

            {/* Neon Pill - Reversible Delays for Smooth Sequencing */}
            <div 
                className={`absolute h-full flex items-center justify-center z-20 pointer-events-none transition-all 
                  ${isExpandedRegistration 
                    ? 'duration-[1000ms] delay-0 cubic-bezier(0.65, 0, 0.35, 1)' 
                    : (isExiting ? 'duration-[500ms] delay-[600ms] ease-out' : 'duration-[400ms] delay-0 ease-out')}`}
                style={getPillPositionStyle()}
            >
                <div className={`
                    bg-fuchsia-500 rounded-full flex items-center justify-center relative overflow-hidden
                    shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all
                    ${isExpandedRegistration 
                      ? 'w-full h-[80%] duration-[1000ms] delay-0 cubic-bezier(0.65, 0, 0.35, 1)' 
                      : (isExiting 
                          ? 'w-[92%] h-[80%] duration-[500ms] delay-[600ms] ease-out' 
                          : (isActive ? 'w-[92%] h-[80%] shadow-[0_0_25px_rgba(217,70,239,0.9)] duration-[400ms] delay-0' : 'w-4 h-4 shadow-[0_0_10px_rgba(217,70,239,0.4)] duration-[400ms] delay-0'))}
                `}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Cinematic Text Container */}
                    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                      {/* Standard Navigation Label */}
                      <span className={`
                          absolute font-anton tracking-[0.05em] text-white uppercase 
                          drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] leading-none transition-all
                          text-sm md:text-lg duration-300
                          ${!isExpandedRegistration && isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4'}
                      `}>
                          {SECTIONS[activeIndex]}
                      </span>

                      {/* User Registration Label */}
                      <span className={`
                          absolute font-anton tracking-[0.05em] text-white uppercase 
                          drop-shadow-[0_0_3px_rgba(0,0,0,0.3)] leading-none transition-all
                          text-sm md:text-lg
                          ${isExpandedRegistration 
                              ? 'opacity-100 translate-y-0 duration-[600ms] delay-[1000ms] ease-out' 
                              : 'opacity-0 -translate-y-12 duration-[600ms] delay-0 ease-in'}
                      `}>
                          USER REGISTRATION
                      </span>
                    </div>
                </div>
            </div>
        </div>

        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
    </div>
  );
};

export default NavbarSlider;
