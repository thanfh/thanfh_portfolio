
import React, { useEffect, useRef } from 'react';
import { Project, ProjectBlock } from '../types';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import ProjectDetailGallery from './ProjectDetailGallery';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MoveRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onOpenCaseStudy: (project: Project) => void;
}

const TextBlockRenderer: React.FC<{ block: any, language: string }> = ({ block, language }) => {
  const title = language === 'vi' ? (block.title_vi || block.title) : block.title;
  const content = language === 'vi' ? (block.content_vi || block.content) : block.content;
  const isCentered = block.align === 'center';

  return (
    <div className={`mb-16 md:mb-24 max-w-5xl mx-auto px-4 md:px-0 ${isCentered ? 'text-center' : ''}`}>
      {title && <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-neutral-900 dark:text-white">{title}</h3>}
      <p className="text-neutral-800 dark:text-neutral-300 text-xl md:text-2xl leading-relaxed whitespace-pre-line font-light">
        {content}
      </p>
    </div>
  );
};

const FullImageBlockRenderer: React.FC<{ block: any, language: string }> = ({ block, language }) => {
  const caption = language === 'vi' ? (block.caption_vi || block.caption) : block.caption;
  
  return (
    <div className="w-full mb-16 md:mb-24 bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
      <img src={block.imageUrl} alt={caption || "Project Detail"} className="w-full h-auto" />
      {caption && <p className="mt-4 text-base text-neutral-600 dark:text-neutral-500 text-center italic px-4">{caption}</p>}
    </div>
  );
};

const ImageGridBlockRenderer: React.FC<{ block: any }> = ({ block }) => {
  if (block.layout === 'pan-gallery') {
    return <ProjectDetailGallery images={block.images} />;
  }

  if (block.layout === 'simple-2') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-16 md:mb-24 px-4 md:px-0">
        {block.images.map((img: string, idx: number) => (
          <div key={idx} className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
             <img src={img} className="w-full h-auto object-cover aspect-[4/5]" alt="" />
          </div>
        ))}
      </div>
    );
  }

  if (block.layout === 'simple-3') {
     return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 mb-16 md:mb-24 px-4 md:px-0">
        {block.images.map((img: string, idx: number) => (
          <div key={idx} className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
             <img src={img} className="w-full h-full object-cover aspect-square" alt="" />
          </div>
        ))}
      </div>
    );
  }

  if (block.layout === '1-2') {
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24 px-4 md:px-0">
          <div className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden relative aspect-[3/4] md:aspect-auto">
              <img src={block.images[0]} className="w-full h-full object-cover absolute inset-0 md:static" alt="" />
          </div>
          <div className="flex flex-col gap-4 md:gap-6 aspect-[3/4] md:aspect-auto">
             <div className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden flex-1 relative">
                 <img src={block.images[1]} className="w-full h-full object-cover absolute inset-0" alt="" />
             </div>
             <div className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden flex-1 relative">
                 <img src={block.images[2]} className="w-full h-full object-cover absolute inset-0" alt="" />
             </div>
          </div>
       </div>
    )
  }

  if (block.layout === 'masonry') {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-16 md:mb-24 px-4 md:px-0">
        {block.images.map((img: string, idx: number) => (
          <div key={idx} className="break-inside-avoid bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
              <img src={img} className="w-full h-auto object-cover" alt="" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 md:mb-24 px-4 md:px-0">
        {block.images.map((img: string, idx: number) => (
          <div key={idx} className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
              <img src={img} className="w-full h-auto object-cover" alt="" />
          </div>
        ))}
      </div>
  );
};

const QuoteBlockRenderer: React.FC<{ block: any, language: string }> = ({ block, language }) => {
  const text = language === 'vi' ? (block.text_vi || block.text) : block.text;
  
  return (
    <div className="mb-20 md:mb-32 max-w-6xl mx-auto py-12 md:py-20 border-y border-neutral-300 dark:border-neutral-800 px-4 md:px-0">
      <blockquote className="text-3xl md:text-5xl lg:text-6xl font-medium text-center text-neutral-900 dark:text-white leading-tight">
        "{text}"
      </blockquote>
      {block.author && (
        <cite className="block text-center mt-8 text-base md:text-lg font-mono text-neutral-600 dark:text-neutral-500 not-italic uppercase tracking-wider">
          — {block.author}
        </cite>
      )}
    </div>
  );
};

const TwoColumnBlockRenderer: React.FC<{ block: any, language: string }> = ({ block, language }) => {
  const leftTitle = language === 'vi' ? (block.leftTitle_vi || block.leftTitle) : block.leftTitle;
  const leftContent = language === 'vi' ? (block.leftContent_vi || block.leftContent) : block.leftContent;
  const rightContent = language === 'vi' ? (block.rightContent_vi || block.rightContent) : block.rightContent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16 md:mb-24 items-start px-4 md:px-0">
      <div>
        {leftTitle && <span className="text-amber-700 dark:text-amber-500 text-sm uppercase tracking-widest font-bold mb-6 block">{leftTitle}</span>}
        <p className="text-neutral-800 dark:text-neutral-300 text-xl md:text-2xl leading-relaxed font-light">
          {leftContent}
        </p>
      </div>
      <div>
        {block.rightImage ? (
           <div className="bg-neutral-200 dark:bg-neutral-900 rounded-sm overflow-hidden">
               <img src={block.rightImage} alt="" className="w-full h-auto" />
           </div>
        ) : (
          <p className="text-neutral-800 dark:text-neutral-300 text-xl md:text-2xl leading-relaxed font-light">
            {rightContent}
          </p>
        )}
      </div>
    </div>
  );
};

const CaseStudyView: React.FC<CaseStudyViewProps> = ({ project, onBack, onOpenCaseStudy }) => {
  const { t, language } = useLanguage();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.id]);

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    onBack();
  };

  const description = language === 'vi' ? (project.description_vi || project.description) : project.description;
  const hasBlocks = project.blocks && project.blocks.length > 0;
  const challenge = language === 'vi' ? (project.challenge_vi || project.challenge) : project.challenge;
  const solution = language === 'vi' ? (project.solution_vi || project.solution) : project.solution;

  const relatedProjects = PROJECTS.filter(p => 
    p.category === project.category && 
    p.id !== project.id && 
    p.displayOrder !== 0
  );

  return (
    <MotionDiv 
      key={project.id} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-50 dark:bg-neutral-950 w-full relative transition-colors duration-300"
    >
        <section ref={heroRef} className="pt-32 md:pt-48 px-4 md:px-12 max-w-screen-2xl mx-auto mb-24 md:mb-40">
            
            <MotionDiv 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-between items-center mb-16 border-b border-neutral-300 dark:border-neutral-700 pb-6"
            >
                <button 
                    onClick={handleBack}
                    className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} /> {t('back_work')}
                </button>
                <div className="flex gap-4 text-sm font-mono uppercase tracking-widest text-neutral-500">
                    <span>{project.category}</span>
                    <span>/</span>
                    <span>{project.year}</span>
                </div>
            </MotionDiv>

            <MotionDiv
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 md:mb-24"
            >
                <h1 className="text-[15vw] md:text-[12rem] leading-[0.85] font-bold text-neutral-900 dark:text-white tracking-tighter uppercase break-words">
                    {project.title}
                </h1>
            </MotionDiv>

            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 border-t border-neutral-300 dark:border-neutral-700 mb-16"
            >
                <div className="col-span-1 md:col-span-2 py-8 md:pr-16 border-b md:border-b-0 border-neutral-300 dark:border-neutral-700">
                     <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Overview</span>
                     <p className="text-2xl md:text-4xl leading-tight font-medium text-neutral-800 dark:text-neutral-200">
                        {description}
                     </p>
                </div>
                
                <div className="col-span-1 py-8 md:px-8 md:border-l border-neutral-300 dark:border-neutral-700 border-b md:border-b-0">
                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Services / Tools</span>
                    <ul className="flex flex-col gap-2">
                        {project.tools?.map(t => (
                            <li key={t} className="text-base font-mono text-neutral-700 dark:text-neutral-400">{t}</li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-1 py-8 md:pl-8 md:border-l border-neutral-300 dark:border-neutral-700">
                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Client</span>
                    <p className="text-base font-mono text-neutral-700 dark:text-neutral-400 mb-8">{t('confidential')}</p>
                    
                    <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-4">Year</span>
                    <p className="text-base font-mono text-neutral-700 dark:text-neutral-400">{project.year}</p>
                </div>
            </MotionDiv>

            <MotionDiv
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-sm bg-neutral-200 dark:bg-neutral-900"
            >
                <MotionDiv style={{ y }} className="w-full h-full">
                    {project.videoUrl ? (
                        <video 
                            src={project.videoUrl} 
                            className="w-full h-[120%] object-cover -mt-[10%]" 
                            autoPlay muted loop playsInline
                        />
                    ) : (
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-[120%] object-cover -mt-[10%]" 
                        />
                    )}
                </MotionDiv>

                <div className="absolute bottom-8 right-8 flex items-center gap-3 text-white/80 mix-blend-difference">
                    <span className="text-xs uppercase tracking-widest animate-pulse">Scroll to explore</span>
                    <ArrowDown size={18} />
                </div>
            </MotionDiv>

        </section>

      <div className="max-w-screen-2xl mx-auto px-0 md:px-12 pb-0">
        
        {hasBlocks ? (
           <div className="mb-32">
              {project.blocks?.map((block) => (
                <div key={block.id}>
                  {block.type === 'text' && <TextBlockRenderer block={block} language={language} />}
                  {block.type === 'full-image' && <FullImageBlockRenderer block={block} language={language} />}
                  {block.type === 'image-grid' && <ImageGridBlockRenderer block={block} />}
                  {block.type === 'quote' && <QuoteBlockRenderer block={block} language={language} />}
                  {block.type === 'two-column' && <TwoColumnBlockRenderer block={block} language={language} />}
                </div>
              ))}
           </div>
        ) : (
          <div className="px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 mb-16 md:mb-32">
              <div>
                <span className="text-amber-700 dark:text-amber-500 text-sm uppercase tracking-widest font-bold mb-6 block">01 — {t('challenge_title')}</span>
                <p className="text-neutral-800 dark:text-neutral-400 text-xl md:text-2xl leading-relaxed transition-colors font-light">
                  {challenge || "Content currently being updated."}
                </p>
              </div>
              <div>
                <span className="text-emerald-700 dark:text-emerald-500 text-sm uppercase tracking-widest font-bold mb-6 block">02 — {t('solution_title')}</span>
                <p className="text-neutral-800 dark:text-neutral-400 text-xl md:text-2xl leading-relaxed transition-colors font-light">
                   {solution || "Content currently being updated."}
                </p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 mb-20">
              {project.gallery?.map((img, index) => (
                <MotionDiv 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900 rounded-sm"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-auto object-cover"
                  />
                </MotionDiv>
              ))}
            </div>
          </div>
        )}

        {relatedProjects.length > 0 && (
          <div className="mb-20 md:mb-32 border-t border-neutral-300 dark:border-neutral-800 pt-20 md:pt-32 px-4 md:px-0">
             <div className="flex items-center justify-between mb-12 md:mb-16">
                <h3 className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-white">
                  More {project.category} Projects
                </h3>
                <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500 text-sm md:text-base font-mono uppercase tracking-widest animate-pulse">
                     <span className="hidden md:inline">Drag to explore</span>
                     <span className="md:hidden">Swipe</span>
                     <MoveRight size={20} />
                </div>
             </div>
             
             <div className="flex overflow-x-auto gap-8 md:gap-12 pb-12 -mx-4 px-4 md:-mx-12 md:px-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
                {relatedProjects.map(p => (
                   <div key={p.id} className="min-w-[80vw] md:min-w-[500px] snap-center">
                       <ProjectCard 
                          project={p} 
                          onClick={() => onOpenCaseStudy(p)} 
                       />
                   </div>
                ))}
             </div>
          </div>
        )}

        <div className="border-t border-neutral-300 dark:border-neutral-800 py-6 flex justify-end transition-colors mb-12 px-4 md:px-0">
           <div className="w-full flex justify-end">
             <button 
               onClick={handleBack} 
               className="text-4xl md:text-7xl font-bold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors tracking-tight flex items-center gap-6 group"
             >
               {t('view_all')}
               <ArrowUpRight size={32} className="md:w-16 md:h-16 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
             </button>
           </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default CaseStudyView;
