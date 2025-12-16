
import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Layers, Maximize2, X } from 'lucide-react';
import { PLAYGROUND_SECTIONS } from '../constants';
import { PlaygroundItem } from '../types';

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

interface PlaygroundGridProps {
  items: PlaygroundItem[];
  targetRowHeight: number;
  onItemClick: (item: PlaygroundItem) => void;
}

const PlaygroundGrid: React.FC<PlaygroundGridProps> = ({ items, targetRowHeight, onItemClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);

  const rows = useMemo(() => {
    if (!containerWidth) return [];

    let currentRow: { item: PlaygroundItem; aspectRatio: number }[] = [];
    let currentRowWidth = 0;
    const resultRows: { items: { item: PlaygroundItem; aspectRatio: number }[]; aspectRatioSum: number; isLast?: boolean }[] = [];

    items.forEach((item) => {
      const w = item.width || 800;
      const h = item.height || 1000;
      const aspectRatio = w / h;
      const scaledWidth = targetRowHeight * aspectRatio;

      if ((currentRowWidth + scaledWidth <= containerWidth * 1.15 && currentRow.length < 5) || currentRow.length === 0) {
        currentRow.push({ item: item, aspectRatio });
        currentRowWidth += scaledWidth;
      } else {
        resultRows.push({ 
          items: currentRow, 
          aspectRatioSum: currentRowWidth / targetRowHeight 
        });
        
        currentRow = [{ item: item, aspectRatio }];
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
  }, [items, containerWidth, targetRowHeight]);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 w-full">
      {rows.map((row, rowIndex) => {
        const calculatedHeight = containerWidth / row.aspectRatioSum;
        const finalHeight = (row.isLast && calculatedHeight > targetRowHeight * 1.5) 
            ? targetRowHeight 
            : calculatedHeight;

        return (
          <div 
            key={rowIndex} 
            className="flex gap-6 w-full justify-center" 
            style={{ height: `${finalHeight}px` }}
          >
            {row.items.map((wrapper, idx) => {
               const item = wrapper.item;
               
               return (
                  <MotionDiv
                    key={item.id}
                    layoutId={`pg-img-${item.id}`}
                    className="relative group overflow-hidden bg-neutral-900 cursor-pointer"
                    style={{
                        width: `${finalHeight * wrapper.aspectRatio}px`,
                        flexGrow: row.isLast ? 0 : 1
                    }}
                    whileHover={{ scale: 0.98, opacity: 0.9 }}
                    onClick={() => onItemClick(item)}
                  >
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-500"
                        loading="lazy"
                    />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-white font-bold text-2xl mb-1">{item.title}</span>
                        <span className="text-neutral-400 text-sm font-mono uppercase tracking-widest">{item.tag}</span>
                    </div>
                  </MotionDiv>
               );
            })}
          </div>
        );
      })}
    </div>
  );
};

const PlaygroundView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);
  const [rowHeight, setRowHeight] = useState(400);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRowHeight(250); 
      } else if (window.innerWidth < 1024) {
        setRowHeight(350); 
      } else {
        setRowHeight(450);
      }                              
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white font-sans relative transition-colors duration-300">
      
      <div className="pt-36 md:pt-48 pb-16 md:pb-24 px-4 md:px-12 border-b border-neutral-900 relative overflow-hidden">
          <h1 className="text-[12vw] md:text-[14vw] font-bold tracking-tighter text-neutral-900 select-none absolute top-24 md:top-32 left-0 w-full text-center z-0 leading-none">
              DRAFT
          </h1>
          <div className="relative z-10 max-w-4xl pt-12 md:pt-24">
              <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest mb-6 block">
                  Experimental Lab
              </span>
              <p className="text-2xl md:text-5xl font-medium text-neutral-300 leading-tight">
                  A collection of daily drills, unused concepts, and visual experiments. 
                  Where function takes a backseat to form.
              </p>
          </div>
      </div>

      <div className="w-full px-4 md:px-12 pb-32 pt-20 md:pt-32 flex flex-col gap-32 md:gap-48">
        {PLAYGROUND_SECTIONS.map((section) => (
          <section key={section.id} className="relative">
            <div className="flex items-end justify-between mb-12 border-b border-neutral-800 pb-6">
               <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center gap-4">
                        {section.id === 'experiments' ? <Beaker size={40} className="text-neutral-500" /> : <Layers size={40} className="text-neutral-500" />}
                        {section.title}
                    </h2>
                    <p className="text-neutral-500 font-mono text-base md:text-lg">{section.description}</p>
               </div>
               <span className="text-neutral-700 font-mono text-sm md:text-base">0{section.items.length} ITEMS</span>
            </div>

            <PlaygroundGrid 
              items={section.items} 
              targetRowHeight={rowHeight} 
              onItemClick={setSelectedItem} 
            />
          </section>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MotionDiv
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-3 border border-white/20 rounded-full bg-black/50">
              <X size={32} />
            </button>

            <div className="flex flex-col items-center justify-center w-full h-full" onClick={(e: any) => e.stopPropagation()}>
                <MotionImg
                src={selectedItem.src}
                layoutId={`pg-img-${selectedItem.id}`}
                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl mb-8"
                />
                
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h3>
                    <span className="text-emerald-500 font-mono text-sm uppercase tracking-widest">{selectedItem.tag}</span>
                </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaygroundView;
