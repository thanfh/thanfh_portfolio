
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Headphones } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MotionDiv = motion.div as any;

interface HeaderProps {
  currentView: 'home' | 'work' | 'gallery' | 'draft';
  onViewChange: (view: 'home' | 'work' | 'gallery' | 'draft') => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, isMusicPlaying, toggleMusic }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, profile } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    if (href === 'home') {
        onViewChange('home');
    } else if (href === 'work') {
        onViewChange('work');
    } else if (href === 'gallery') {
        onViewChange('gallery');
    } else if (href === 'draft') {
        onViewChange('draft');
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-300 ease-in-out flex items-center border-b ${
          isScrolled 
            ? 'bg-white/90 dark:bg-neutral-950/95 backdrop-blur-md h-[52px] md:h-[68px] border-neutral-300 dark:border-white/5 shadow-sm' 
            : 'bg-white/50 dark:bg-neutral-950/80 backdrop-blur-md h-[72px] md:h-[96px] border-transparent'
        }`}
      >
        <div className="w-full px-4 md:px-12 flex items-center justify-between">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-xl md:text-2xl font-semibold tracking-tighter uppercase z-50 transition-colors text-neutral-900 dark:text-white"
          >
            {profile.name}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.label} 
                onClick={() => handleNavClick(link.href)}
                className={`relative text-base font-medium transition-colors tracking-wide ${
                  currentView === link.href 
                    ? 'text-neutral-900 dark:text-white font-bold' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
                {currentView === link.href && (
                  <MotionDiv
                    layoutId="active-nav-dot"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700 mx-2" />

            <div className="flex items-center gap-6">
              <button
                onClick={toggleLanguage}
                className="w-28 justify-center text-base font-medium text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center"
                aria-label="Toggle Language"
              >
                {language === 'en' ? 'Vietnamese' : 'English'}
              </button>

              <button
                onClick={toggleMusic}
                className={`transition-colors ${
                  isMusicPlaying 
                    ? 'text-black dark:text-white animate-pulse' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                aria-label={isMusicPlaying ? "Pause Music" : "Play Music"}
              >
                <Headphones size={22} />
              </button>
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-4 z-50">
            <button
                onClick={toggleLanguage}
                className="w-20 justify-end text-xs font-bold transition-colors text-neutral-900 dark:text-neutral-200 flex items-center"
                aria-label="Toggle Language"
              >
                {language === 'en' ? 'VI / EN' : 'EN / VI'}
            </button>

            <button
                onClick={toggleMusic}
                className={`transition-colors text-neutral-900 dark:text-neutral-200 ${isMusicPlaying ? 'animate-pulse' : 'opacity-80'}`}
                aria-label="Toggle Music"
              >
                <Headphones size={20} />
            </button>

            <button 
              className="transition-colors text-neutral-900 dark:text-neutral-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 w-full h-full bg-white dark:bg-neutral-950 flex flex-col items-center justify-center gap-8 md:hidden p-8 overflow-y-auto z-[999]"
            >
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-neutral-900 dark:text-white hover:text-neutral-500 transition-colors"
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col items-center w-full space-y-8">
                  <button 
                      onClick={() => handleNavClick('home')}
                      className={`text-4xl font-light relative ${
                      currentView === 'home' ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400 dark:text-neutral-500'
                      }`}
                  >
                      Home
                  </button>
              
                  {NAV_LINKS.map((link) => (
                      <button 
                          key={link.label}
                          onClick={() => handleNavClick(link.href)}
                          className={`text-4xl font-light relative ${
                          currentView === link.href ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400 dark:text-neutral-500'
                          }`}
                      >
                          {link.label}
                      </button>
                  ))}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;
