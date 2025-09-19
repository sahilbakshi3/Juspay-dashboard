import React, { useState, useEffect, useContext } from 'react';
import { X, Menu } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { ThemeContext } from '../../context/ThemeContextProvider';

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [leftSidebarOverlay, setLeftSidebarOverlay] = useState(false);
  const [rightSidebarOverlay, setRightSidebarOverlay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setLeftSidebarVisible(false);
        setRightSidebarVisible(false);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      } else if (tablet) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(false);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      } else {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLeftSidebar = () => {
    if (isMobile || isTablet) setLeftSidebarOverlay(!leftSidebarOverlay);
    else setLeftSidebarVisible(!leftSidebarVisible);
  };

  const toggleRightSidebar = () => {
    if (isMobile || isTablet) setRightSidebarOverlay(!rightSidebarOverlay);
    else setRightSidebarVisible(!rightSidebarVisible);
  };

  const closeOverlays = () => {
    setLeftSidebarOverlay(false);
    setRightSidebarOverlay(false);
  };

  useEffect(() => {
    if (leftSidebarOverlay || rightSidebarOverlay) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [leftSidebarOverlay, rightSidebarOverlay]);

  return (
    <div
      className="flex h-screen transition-colors duration-200 overflow-hidden"
      style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}
    >
      {(leftSidebarOverlay || rightSidebarOverlay) && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={closeOverlays}
          style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)' }}
        />
      )}

      <div className={`${isMobile || isTablet ? (leftSidebarOverlay ? 'fixed left-0 top-0 h-full z-50 transform translate-x-0' : 'fixed left-0 top-0 h-full z-50 transform -translate-x-full') : leftSidebarVisible ? 'relative' : 'relative'}`}>
        <Sidebar
          isVisible={isMobile || isTablet ? leftSidebarOverlay : leftSidebarVisible}
          isMobile={isMobile}
          isTablet={isTablet}
          onClose={() => setLeftSidebarOverlay(false)}
        />
      </div>

      <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${isMobile ? 'w-full' : ''}`}>
        <Header
          leftSidebarVisible={isMobile || isTablet ? leftSidebarOverlay : leftSidebarVisible}
          rightSidebarVisible={isMobile || isTablet ? rightSidebarOverlay : rightSidebarVisible}
          toggleLeftSidebar={toggleLeftSidebar}
          toggleRightSidebar={toggleRightSidebar}
          isMobile={isMobile}
          isTablet={isTablet}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className={`${isMobile ? 'px-4 py-4' : isTablet ? 'px-6 py-6' : 'px-6 py-8'} w-full max-w-full`}>
            {children}
          </div>
        </main>
      </div>

      <div className={`${isMobile || isTablet ? (rightSidebarOverlay ? 'fixed right-0 top-0 h-full z-50 transform translate-x-0' : 'fixed right-0 top-0 h-full z-50 transform translate-x-full') : rightSidebarVisible ? 'relative' : 'relative'}`}>
        <RightSidebar
          isVisible={isMobile || isTablet ? rightSidebarOverlay : rightSidebarVisible}
          isMobile={isMobile}
          isTablet={isTablet}
          onClose={() => setRightSidebarOverlay(false)}
        />
      </div>

      {isMobile && !leftSidebarOverlay && !rightSidebarOverlay && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 border rounded-full px-4 py-2 shadow-lg flex items-center space-x-4`} style={{ backgroundColor: darkMode ? '#000000' : '#ffffff', borderColor: darkMode ? 'rgba(255,255,255,0.04)' : '#e5e7eb' }}>
          <button onClick={toggleLeftSidebar} className={`p-2 rounded-full transition-colors`} aria-label="Open navigation menu" style={{ color: darkMode ? '#cfcfcf' : '#6b7280' }}>
            <Menu className="w-5 h-5" />
          </button>
          <div style={{ width: 1, height: 24, backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : '#e5e7eb' }} />
          <button onClick={toggleRightSidebar} className={`p-2 rounded-full transition-colors`} aria-label="Open activity panel" style={{ color: darkMode ? '#cfcfcf' : '#6b7280' }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${darkMode ? 'rgba(255,255,255,0.12)' : '#6b7280'}` }}>
              <div style={{ width: '100%', height: 3, backgroundColor: darkMode ? 'rgba(255,255,255,0.12)' : '#6b7280', marginTop: 4 }} />
              <div style={{ width: '66%', height: 3, backgroundColor: darkMode ? 'rgba(255,255,255,0.12)' : '#6b7280', marginTop: 2 }} />
            </div>
          </button>
        </div>
      )}

      <div className="sr-only">
        <button onClick={toggleLeftSidebar} className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-blue-600 focus:text-white focus:rounded">Toggle Navigation (Alt + N)</button>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('keydown', function(e) {
            if (e.altKey && e.key === 'n') {
              e.preventDefault();
              document.querySelector('[data-testid="left-sidebar-toggle"]')?.click();
            }
            if (e.altKey && e.key === 'a') {
              e.preventDefault();
              document.querySelector('[data-testid="right-sidebar-toggle"]')?.click();
            }
            if (e.key === 'Escape') {
              document.querySelector('[data-testid="close-overlays"]')?.click();
            }
          });
        `
      }} />

      <button data-testid="close-overlays" onClick={closeOverlays} className="sr-only" tabIndex={-1} />
    </div>
  );
};

export default Layout;