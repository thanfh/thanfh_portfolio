
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

interface ProjectGridProps {
  onOpenCaseStudy: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onOpenCaseStudy }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const projects = PROJECTS;

  return (
    <section id="work" className="w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-500 overflow-hidden">
      
      <div className="pt-36 md:pt-48 pb-16 md:pb-24 px-4 md:px-12 border-b border-neutral-200 dark:border-neutral-900 relative overflow-hidden">
          <h1 className="text-[15vw] md:text-[14vw] font-bold tracking-tighter text-neutral-200 dark:text-neutral-900 select-none absolute top-24 md:top-32 left-0 w-full text-center z-0 leading-none pointer-events-none">
              WORK
          </h1>
          
          <div className="relative z-10 max-w-4xl pt-12 md:pt-24">
              <span className="text-amber-600 dark:text-amber-500 font-mono text-sm uppercase tracking-widest mb-6 block">
                  Selected Projects
              </span>
              <p className="text-2xl md:text-5xl font-medium text-neutral-800 dark:text-neutral-300 leading-tight">
                  A curated selection of commercial and personal projects exploring the boundaries of digital design.
              </p>
          </div>
      </div>

      <div className="w-full px-4 md:px-12 py-20 md:py-32">
        
        <div className="flex flex-col gap-32 md:gap-72">
          {projects.map((project, index) => {
            const isEvenIndex = index % 2 === 0; 
            const description = language === 'vi' ? (project.description_vi || project.description) : project.description;
            const isHovered = hoveredProject === project.id;

            return (
              <div 
                key={project.id}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 lg:gap-40 ${isEvenIndex ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-[60%] group cursor-pointer perspective-1000 relative" onClick={() => onOpenCaseStudy(project)}>
                    <div 
                        className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-200 dark:bg-neutral-900 rounded-sm"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <MotionImg
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                        />
                        
                        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
                        <div className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 md:opacity-0 md:scale-90 opacity-100 scale-100'}`}>
                             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg">
                                <span className="text-xs md:text-sm uppercase tracking-widest font-bold">View</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className={`w-full md:w-[40%] relative flex flex-col ${isEvenIndex ? 'items-start text-left' : 'items-end text-left md:text-right'}`}>
                    
                    <span 
                        className={`absolute -top-12 md:-top-24 text-[8rem] md:text-[14rem] xl:text-[20rem] font-bold leading-none text-neutral-100 dark:text-neutral-900/50 select-none -z-10 ${isEvenIndex ? '-left-4 md:-left-16' : '-right-4 md:-right-16'}`}
                    >
                        0{index + 1}
                    </span>

                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`relative z-10 flex flex-col ${isEvenIndex ? 'items-start' : 'items-start md:items-end'}`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-500">
                                {project.category}
                            </span>
                        </div>

                        <h2 
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-neutral-900 dark:text-white mb-8 cursor-pointer leading-[0.9] hover:text-neutral-500 transition-colors break-words max-w-full"
                            onClick={() => onOpenCaseStudy(project)}
                        >
                            {project.title}
                        </h2>

                        <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg md:text-2xl max-w-lg mb-10 ${isEvenIndex ? 'text-left' : 'text-left md:text-right'}`}>
                            {description}
                        </p>

                        <div className={`flex flex-wrap gap-x-6 gap-y-3 mb-10 ${isEvenIndex ? 'justify-start' : 'justify-start md:justify-end'}`}>
                             {project.tools?.map((tool, i) => (
                                 <span key={i} className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                                     {tool}{i < (project.tools?.length || 0) - 1 ? ' /' : ''}
                                 </span>
                             ))}
                        </div>

                        <button 
                            onClick={() => onOpenCaseStudy(project)}
                            className={`group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.25em] text-neutral-900 dark:text-white hover:text-neutral-500 transition-colors pb-2 border-b border-transparent hover:border-neutral-500 ${isEvenIndex ? 'flex-row' : 'flex-row md:flex-row-reverse'}`}
                        >
                            {t('view_live')}
                            <ArrowUpRight size={20} className={`transition-transform duration-300 ${isEvenIndex ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : 'group-hover:-translate-x-1 group-hover:-translate-y-1'}`} />
                        </button>
                    </MotionDiv>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectGrid;
