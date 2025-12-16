
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import CaseStudyView from './components/CaseStudyView';
import GalleryView from './components/GalleryView';
import PlaygroundView from './components/PlaygroundView';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { Project } from './types';
import { LOFI_MUSIC_URL, PROJECTS, GALLERY_SECTIONS, PLAYGROUND_SECTIONS } from './constants';
import { AnimatePresence } from 'framer-motion';

type ViewState = 'home' | 'work' | 'case-study' | 'gallery' | 'draft';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  
  useEffect(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
  }, []);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const imagesToLoad: string[] = [];
    PROJECTS.forEach(p => {
        if (p.imageUrl) imagesToLoad.push(p.imageUrl);
        if (p.gallery) imagesToLoad.push(...p.gallery);
        if (p.blocks) {
            p.blocks.forEach(b => {
                if (b.type === 'full-image' && b.imageUrl) imagesToLoad.push(b.imageUrl);
                if (b.type === 'image-grid' && b.images) imagesToLoad.push(...b.images);
                if (b.type === 'two-column' && b.rightImage) imagesToLoad.push(b.rightImage);
            });
        }
    });
    GALLERY_SECTIONS.forEach(section => {
        section.images.forEach(img => imagesToLoad.push(img.src));
    });
    PLAYGROUND_SECTIONS.forEach(section => {
        section.items.forEach(item => imagesToLoad.push(item.src));
    });

    const uniqueImages = Array.from(new Set(imagesToLoad));
    const totalImages = uniqueImages.length;
    let loadedCount = 0;

    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2500));
    
    const imageLoadPromise = new Promise<void>((resolve) => {
        if (totalImages === 0) {
            setLoadingProgress(100);
            resolve();
            return;
        }

        const updateProgress = () => {
            loadedCount++;
            const percent = Math.min(100, Math.floor((loadedCount / totalImages) * 100));
            setLoadingProgress(percent);

            if (loadedCount >= totalImages) {
                resolve();
            }
        };

        uniqueImages.forEach(src => {
            const img = new Image();
            img.src = src;

            if ('decode' in (img as any)) {
                img.decode()
                   .then(() => {
                       updateProgress();
                   })
                   .catch((err) => {
                       console.warn(`Failed to decode image: ${src}`, err);
                       updateProgress(); 
                   });
            } else {
                img.onload = updateProgress;
                img.onerror = updateProgress;
            }
        });
    });

    Promise.all([imageLoadPromise, minTimePromise]).then(() => {
        setLoadingProgress(100);
        setTimeout(() => {
            setIsLoading(false);
        }, 500); 
    });

    const timeout = setTimeout(() => {
        if (isLoading) {
            setLoadingProgress(100);
            setIsLoading(false);
        }
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isMusicPlaying) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => {
          console.log("Audio play failed:", e);
          setIsMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleOpenCaseStudy = (project: Project) => {
    setCurrentProject(project);
    setCurrentView('case-study');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleViewChange = (view: 'home' | 'work' | 'gallery' | 'draft') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToWork = () => {
      setCurrentView('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Hero onOpenCaseStudy={handleOpenCaseStudy} onNavigateToWork={handleNavigateToWork} />;
      case 'work':
        return <ProjectGrid onOpenCaseStudy={handleOpenCaseStudy} />;
      case 'gallery':
        return <GalleryView />;
      case 'draft':
        return <PlaygroundView />;
      case 'case-study':
        return currentProject ? (
          <CaseStudyView 
            project={currentProject} 
            onBack={() => setCurrentView('work')}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
        ) : (
          <ProjectGrid onOpenCaseStudy={handleOpenCaseStudy} />
        );
      default:
        return <Hero onOpenCaseStudy={handleOpenCaseStudy} onNavigateToWork={handleNavigateToWork} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>
      
      <div className={`min-h-screen font-sans transition-opacity duration-1000 flex flex-col bg-neutral-950 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        
        <CustomCursor />
        
        <audio ref={audioRef} src={LOFI_MUSIC_URL} loop hidden />

        <Header 
          currentView={currentView === 'home' || currentView === 'work' || currentView === 'gallery' || currentView === 'draft' ? currentView : 'work'} 
          onViewChange={handleViewChange as any} 
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
        />
        
        <main className="w-full flex-grow">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
