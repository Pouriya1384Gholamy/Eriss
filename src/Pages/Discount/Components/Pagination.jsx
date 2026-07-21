import React, { useEffect, useMemo, useRef, useState } from 'react';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  const allPages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const containerRef = useRef(null);
  const activeRef = useRef(null);

  const [lineStyle, setLineStyle] = useState({ left: '0px', width: '0px', opacity: 0 });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const visiblePages = useMemo(() => {
    if (!isMobile) return allPages;
    const currentIndex = allPages.indexOf(currentPage);
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(allPages.length, currentIndex + 2);
    return allPages.slice(start, end);
  }, [isMobile, currentPage]);

  const updateLinePosition = () => {
    if (!activeRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const activeRect = activeRef.current.getBoundingClientRect();
    setLineStyle({
      left: `${activeRect.left - containerRect.left}px`,
      width: `${activeRect.width}px`,
      opacity: 1,
    });
  };

  useEffect(() => {
    const raf = requestAnimationFrame(updateLinePosition);
    window.addEventListener('resize', updateLinePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateLinePosition);
    };
  }, [currentPage, visiblePages, isMobile]);

  return (
    <div className="w-full my-10 px-4" dir="ltr">
      <div className="mx-auto w-full max-w-[580px] rounded-2xl bg-secondary p-1 shadow-xl ring-1 ring-white/5">
        <div className="relative flex items-center justify-between rounded-xl bg-primary p-2">
          
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">قبلی</span>
          </button>

          {/* Pages Container */}
          <div ref={containerRef} className="relative flex items-center justify-center gap-1 px-2">
            {visiblePages.map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  ref={isActive ? activeRef : null}
                  onClick={() => setCurrentPage(page)}
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Magic Line */}
            <div
              className="absolute bottom-0 z-0 h-1 rounded-full bg-[#00ffcc] shadow-[0_0_10px_#00ffcc] transition-all duration-300 ease-out"
              style={{ left: lineStyle.left, width: lineStyle.width, opacity: lineStyle.opacity }}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(allPages.length, prev + 1))}
            disabled={currentPage === allPages.length}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span className="hidden sm:inline">بعدی</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
