
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Instagram, Linkedin, Facebook, Send, ArrowRight } from 'lucide-react';
import { PROFILE, PROJECTS } from '../constants';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';

const MotionDiv = motion.div as any;

interface HeroProps {
  onOpenCaseStudy: (project: Project) => void;
  onNavigateToWork: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToWork }) => {
  const { t, language } = useLanguage();
  
  const heroVisual = PROJECTS.find(p => p.id === 'p2') || PROJECTS.find(p => p.videoUrl) || PROJECTS[0];
  
  const handleScrollDown = () => {
    document.getElementById('intro-manifesto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">

      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
        
        <div className="absolute inset-0 z-0">
          {heroVisual.videoUrl ? (
            <video 
              src={heroVisual.videoUrl}
              poster={heroVisual.imageUrl}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={heroVisual.imageUrl} alt="Hero Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/50 z-10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 opacity-10 pointer-events-none z-10 mix-blend-overlay" 
               style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-5xl mx-auto"
          >
            <span className="inline-block py-1 px-3 md:px-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-md text-[10px] md:text-sm font-mono text-neutral-300 mb-6 md:mb-8 tracking-[0.2em] uppercase">
              {PROFILE.role} — Vietnam
            </span>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white leading-tight tracking-tighter mb-6 md:mb-8 mix-blend-screen break-words max-w-full">
              Digital <span className="font-serif italic font-light text-neutral-300">Artisan</span>
            </h1>

            <div className="flex gap-6 md:gap-8 items-center justify-center">
              {PROFILE.socials.map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300">
                  {social.iconName === 'Instagram' && <Instagram size={20} />}
                  {social.iconName === 'Linkedin' && <Linkedin size={20} />}
                  {social.iconName === 'Facebook' && <Facebook size={20} />}
                  {social.iconName === 'Telegram' && <Send size={20} />}
                </a>
              ))}
            </div>
          </MotionDiv>
        </div>

        <MotionDiv 
          className="absolute bottom-8 left-0 right-0 w-full z-20 flex justify-center pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
             className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto text-white/50 p-4 hover:text-white transition-colors"
             onClick={handleScrollDown}
          >
             <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
             <ArrowDown size={20} />
          </div>
        </MotionDiv>
      </section>

      <section id="intro-manifesto" className="py-24 md:py-40 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 min-h-[80vh] flex items-center transition-colors duration-300">
        <div className="container mx-auto max-w-screen-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
             <div className="lg:col-span-3">
                <div className="sticky top-32">
                    <span className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-8">
                        <span className="w-8 h-px bg-neutral-400 dark:bg-neutral-600"></span>
                        About Me
                    </span>
                    <div className="hidden lg:flex flex-col gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-600">
                        <p>EXP: 8+ YEARS</p>
                        <p>BASED: HANOI</p>
                        <p>FOCUS: 3D / BRAND</p>
                    </div>
                </div>
             </div>

             <div className="lg:col-span-9">
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-neutral-900 dark:text-white mb-12 tracking-tight">
                       {PROFILE.tagline}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-neutral-300 dark:border-neutral-800 pt-12">
                        <div className="text-neutral-700 dark:text-neutral-400 text-lg leading-relaxed">
                            <p className="mb-6">{PROFILE.bio}</p>
                            <p className="text-sm font-mono text-neutral-500">
                                Softwares: Blender, Houdini, Cinema 4D, After Effects, Figma, React.
                            </p>
                        </div>
                        
                        <div className="flex flex-col justify-between items-start h-full gap-8">
                             <p className="text-neutral-500 dark:text-neutral-500 text-sm italic">
                                "Design is not just what it looks like and feels like. Design is how it works."
                             </p>
                             
                             <button 
                                onClick={onNavigateToWork}
                                className="group flex items-center justify-between w-full py-6 md:py-8 border-y border-neutral-300 dark:border-neutral-800 text-2xl md:text-4xl font-light text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900 hover:px-4 transition-all duration-300"
                             >
                                <span>{t('view_all_projects')}</span>
                                <ArrowRight className="w-8 h-8 md:w-10 md:h-10 transform group-hover:translate-x-2 transition-transform" />
                             </button>
                        </div>
                    </div>
                </MotionDiv>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Hero;
