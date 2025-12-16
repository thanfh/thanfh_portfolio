
import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { GALLERY_SECTIONS } from '../constants';
import { GalleryImage } from '../types';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

const useContainerWidth = (ref: React.RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return width;
};

interface JustifiedSectionProps {
  images: GalleryImage[];
  targetRowHeight: number;
  onImageClick: (src: string) => void;
}

const JustifiedSection: React.FC<JustifiedSectionProps> = ({ images, targetRowHeight, onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);

  const rows = useMemo(() => {
    if (!containerWidth) return [];

    let currentRow: { image: GalleryImage; aspectRatio: number }[] = [];
    let currentRowWidth = 0;
    const resultRows: { items: { image: GalleryImage; aspectRatio: number }[]; aspectRatioSum: number; isLast?: boolean }[] = [];

    images.forEach((img) => {
      const w = img.width || 800;
      const h = img.height || 600;
      const aspectRatio = w / h;
      const scaledWidth = targetRowHeight * aspectRatio;

      if ((currentRowWidth + scaledWidth <= containerWidth * 1.15 && currentRow.length < 5) || currentRow.length === 0) {
        currentRow.push({ image: img, aspectRatio });
        currentRowWidth += scaledWidth;
      } else {
        resultRows.push({ 
          items: currentRow, 
          aspectRatioSum: currentRowWidth / targetRowHeight 
        });
        
        currentRow = [{ image: img, aspectRatio }];
        currentRowWidth = scaledWidth;
      }
    });

    if (currentRow.length > 0) {
      resultRows.push({ 
        items: currentRow, 
        aspectRatioSum: currentRowWidth / targetRowHeight, 
        isLast: true 
      });
    }

    return resultRows;
  }, [images, containerWidth, targetRowHeight]);

  return (
    <div ref={containerRef} className="flex flex-col gap-2 md:gap-4 w-full">
      {rows.map((row, rowIndex) => {
        const calculatedHeight = containerWidth / row.aspectRatioSum;
        const finalHeight = (row.isLast && calculatedHeight > targetRowHeight * 1.5) 
            ? targetRowHeight 
            : calculatedHeight;

        return (
          <div 
            key={rowIndex} 
            className="flex gap-2 md:gap-4 w-full justify-center" 
            style={{ height: `${finalHeight}px` }}
          >
            {row.items.map((item, imgIndex) => {
               const uniqueId = item.image.id || `img-${rowIndex}-${imgIndex}-${item.image.src}`;
               
               return (
                  <MotionDiv
                    key={uniqueId}
                    layoutId={`img-${uniqueId}`}
                    className="relative group overflow-hidden bg-neutral-200 dark:bg-neutral-900 cursor-zoom-in rounded-sm"
                    style={{
                        width: `${finalHeight * item.aspectRatio}px`,
                        flexGrow: row.isLast ? 0 : 1
                    }}
                    whileHover={{ 
                        scale: 1.02, 
                        zIndex: 30,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.5)",
                        transition: { duration: 0.2 } 
                    }}
                    onClick={() => onImageClick(item.image.src)}
                  >
                    <img
                        src={item.image.src}
                        alt=""
                        className="w-full h-full object-cover transition-all duration-500 brightness-100 group-hover:brightness-110"
                        loading="lazy"
                    />
                  </MotionDiv>
               );
            })}
          </div>
        );
      })}
    </div>
  );
};

const GalleryView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rowHeight, setRowHeight] = useState(300);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRowHeight(180); 
      } else if (window.innerWidth < 1024) {
        setRowHeight(240); 
      } else {
        setRowHeight(320);
      }                              
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white font-sans relative transition-colors duration-300">
      
      <div className="pt-36 md:pt-48 pb-16 md:pb-24 px-4 md:px-12 border-b border-neutral-200 dark:border-neutral-900 relative overflow-hidden">
          <h1 className="text-[12vw] md:text-[14vw] font-bold tracking-tighter text-neutral-200 dark:text-neutral-900 select-none absolute top-24 md:top-32 left-0 w-full text-center z-0 leading-none">
              GALLERY
          </h1>
          <div className="relative z-10 max-w-4xl pt-12 md:pt-24">
              <span className="text-blue-600 dark:text-blue-500 font-mono text-sm uppercase tracking-widest mb-6 block">
                  Visual Diary
              </span>
              <p className="text-2xl md:text-5xl font-medium text-neutral-800 dark:text-neutral-300 leading-tight">
                  Capturing light, form, and texture. A personal collection of street photography and visual observations.
              </p>
          </div>
      </div>

      <div className="w-full px-4 md:px-12 pb-32 pt-20 md:pt-32 flex flex-col gap-40">
        
        {GALLERY_SECTIONS.map((section, index) => (
          <section key={section.id} id={section.id} className="relative">
            <div className="sticky top-[52px] md:top-[80px] z-40 mb-12 flex flex-col items-center text-center gap-4 py-8 mix-blend-difference pointer-events-none">
              <span className="text-neutral-300 font-mono text-xs md:text-sm uppercase tracking-[0.2em]">
                0{index + 1} / Archive
              </span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white my-2">
                {section.title}
              </h2>
              <div className="flex items-center justify-center gap-4 md:gap-6 text-neutral-300 font-mono text-sm md:text-base uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{section.location}</span>
                </div>
                <span className="text-neutral-500">•</span>
                <span>{section.date}</span>
              </div>
            </div>
            
            <JustifiedSection 
              images={section.images} 
              targetRowHeight={rowHeight} 
              onImageClick={setSelectedImage} 
            />
          </section>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <MotionDiv
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-black/95 p-4 md:p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <MotionImg
              src={selectedImage}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e: any) => e.stopPropagation()}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryView;
