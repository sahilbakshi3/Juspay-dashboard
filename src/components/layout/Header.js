import React, { useContext, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bell, Search, Notebook, SunMedium, History, Star, X, Check, Trash2, Menu } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { useToast } from '../../context/ToastContext';
import { useSearch } from '../../context/SearchContext';

// PortalTooltip component remains the same
const PortalTooltip = ({ anchorRef, visible, text, isDarkMode }) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!visible || !anchorRef?.current) return;

    const update = () => {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) return;

      const margin = 8;
      const top = window.scrollY + anchorRect.bottom + margin;
      const left = window.scrollX + anchorRect.left + anchorRect.width / 2;
      setPos({ top, left });
    };

    requestAnimationFrame(update);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [visible, anchorRef]);

  if (!visible) return null;

  const bg = '#000000';
  return ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translateX(-50%)',
        zIndex: 3000,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          pointerEvents: 'auto',
          background: bg,
          color: '#ffffff',
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 12,
          fontWeight: 500,
          boxShadow: '0 6px 18px rgba(0,0,0,0.36)',
          border: '1px solid rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `8px solid ${bg}`,
            filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.06))'
          }}
        />
      </div>
    </div>,
    document.body
  );
};

const Header = ({
  leftSidebarVisible,
  rightSidebarVisible,
  toggleLeftSidebar,
  toggleRightSidebar,
  onRefreshDashboard,
  isMobile = false,
  isTablet = false
}) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { showRefreshToast, showFavoriteAddedToast, showFavoriteRemovedToast } = useToast();
  const { searchQuery, updateSearch, clearSearch } = useSearch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Order Received", message: "Order #1234 has been placed by John Doe", time: "2 minutes ago", read: false, type: "order" },
    { id: 2, title: "System Update", message: "Your dashboard has been updated to version 2.1", time: "1 hour ago", read: false, type: "system" },
    { id: 3, title: "Payment Completed", message: "Payment of $299.99 has been processed successfully", time: "3 hours ago", read: true, type: "payment" },
    { id: 4, title: "New User Registration", message: "Jane Smith has registered as a new user", time: "5 hours ago", read: true, type: "user" },
    { id: 5, title: "Server Maintenance", message: "Scheduled maintenance will occur tonight at 2 AM", time: "1 day ago", read: false, type: "maintenance" }
  ]);

  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);
  const searchInputRef = useRef(null);

  const leftToggleRef = useRef(null);
  const starButtonRef = useRef(null);
  const themeButtonRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const rightToggleRef = useRef(null);

  const [hoverTooltip, setHoverTooltip] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showMobileSearch]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      }
      if (e.key === 'Escape') {
        clearSearch();
        setSearchValue('');
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [clearSearch]);

  const handleRefresh = () => {
    if (onRefreshDashboard) {
      const refreshIcon = document.querySelector('.refresh-icon');
      if (refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => { refreshIcon.style.transform = 'rotate(0deg)'; }, 300);
      }
      onRefreshDashboard();
      showRefreshToast();
    }
  };

  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) showFavoriteAddedToast(); else showFavoriteRemovedToast();
  };

  const toggleNotifications = () => setShowNotifications(v => !v);
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const clearAllNotifications = () => setNotifications([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '🛒';
      case 'system': return '⚙️';
      case 'payment': return '💳';
      case 'user': return '👤';
      case 'maintenance': return '🔧';
      default: return '🔔';
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(v => !v);
    if (showMobileSearch) {
      setSearchValue('');
      clearSearch();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearch(searchValue);
    setShowMobileSearch(false);
  };

  const onEnter = (key) => () => setHoverTooltip(key);
  const onLeave = () => setHoverTooltip(null);

  return (
    <>
      <header
        className="border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4 transition-colors duration-200 relative z-40"
        style={{
          backgroundColor: isDarkMode ? '#000000' : undefined,
          borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
          color: isDarkMode ? '#FFFFFF' : undefined
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {isMobile && (
                <button
                  onClick={toggleLeftSidebar}
                  ref={leftToggleRef}
                  onMouseEnter={onEnter('left')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 sm:hidden ${leftSidebarVisible ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {!isMobile && (
                <button
                  onClick={toggleLeftSidebar}
                  ref={leftToggleRef}
                  onMouseEnter={onEnter('left')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 relative ${leftSidebarVisible ? (isDarkMode ? 'text-blue-400 bg-gray-700 hover:text-blue-300' : 'text-blue-600 bg-blue-50 hover:text-blue-700') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
                >
                  <Notebook className="w-5 h-5" />
                </button>
              )}

              {!isMobile && (
                <button
                  onClick={handleFavoriteToggle}
                  ref={starButtonRef}
                  onMouseEnter={onEnter('star')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 relative ${isFavorite ? 'text-yellow-500 hover:text-yellow-400' : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
                >
                  <Star className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-yellow-500' : 'fill-none'}`} />
                </button>
              )}

              {!isMobile && !isTablet && (
                <div className="flex items-center space-x-2">
                  <span style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280' }}>Dashboards</span>
                  <span style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }}>/</span>
                  <span style={{ fontWeight: 600, color: isDarkMode ? '#FFFFFF' : '#111827' }}>Default</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {!isMobile && (
              <div className="relative hidden sm:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => updateSearch(e.target.value)}
                  className={`pl-9 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors w-32 sm:w-40 lg:w-64`}
                  style={{
                    backgroundColor: isDarkMode ? '#0a0a0a' : undefined,
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
                    color: isDarkMode ? '#fff' : undefined
                  }}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="text-xs font-medium">⌘</span>
                  <span className="text-xs">/</span>
                </div>
              </div>
            )}

            {isMobile && (
              <button onClick={toggleMobileSearch} className={`p-2 rounded-lg transition-all duration-200 sm:hidden ${showMobileSearch ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}>
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={toggleTheme}
              ref={themeButtonRef}
              onMouseEnter={onEnter('theme')}
              onMouseLeave={onLeave}
              className={`p-2 rounded-lg transition-all duration-200 relative ${isDarkMode ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700' : 'text-gray-500 hover:text-orange-500 hover:bg-gray-100'}`}
            >
              <SunMedium className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {!isMobile && (
              <button
                onClick={handleRefresh}
                ref={refreshButtonRef}
                onMouseEnter={onEnter('refresh')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <History className="w-5 h-5 refresh-icon transition-transform duration-300" style={{ transformOrigin: 'center' }} />
              </button>
            )}

            <div className="relative">
              <button
                ref={bellButtonRef}
                onClick={toggleNotifications}
                onMouseEnter={onEnter('bell')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${showNotifications ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  ref={notificationRef}
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-lg border z-50 max-h-80 sm:max-h-96 overflow-hidden`}
                  style={{
                    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined
                  }}
                >
                  <div className={`p-4 border-b`} style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined }}>
                    <div className="flex items-center justify-between">
                      <h3 style={{ fontWeight: 600, color: isDarkMode ? '#fff' : '#111827' }}>
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} style={{ fontSize: 12, color: isDarkMode ? '#90caf9' : '#1976d2' }} className="px-2 py-1 rounded">
                            Mark all read
                          </button>
                        )}
                        <button onClick={() => setShowNotifications(false)} className={`p-1 rounded transition-colors`} style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280' }}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className={`p-8 text-center`} style={{ color: isDarkMode ? '#9CA3AF' : '#6b7280' }}>
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b transition-colors relative`} style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined, backgroundColor: !notification.read && isDarkMode ? '#0b0b0b' : undefined }}>
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 text-lg">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p style={{ fontWeight: 600, color: isDarkMode ? '#fff' : '#111827' }}>{notification.title}</p>
                                  <p style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280', marginTop: 6 }}>{notification.message}</p>
                                  <p style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF', marginTop: 6, fontSize: 12 }}>{notification.time}</p>
                                </div>
                                <div className="flex items-center space-x-1 ml-2">
                                  {!notification.read && (
                                    <button onClick={() => markAsRead(notification.id)} className={`p-1 rounded transition-colors`} title="Mark as read" style={{ color: isDarkMode ? '#34d399' : '#10b981' }}>
                                      <Check className="w-3 h-3" />
                                    </button>
                                  )}
                                  <button onClick={() => deleteNotification(notification.id)} className={`p-1 rounded transition-colors`} title="Delete notification" style={{ color: isDarkMode ? '#fb7185' : '#dc2626' }}>
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              {!notification.read && (<div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-4"></div>)}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className={`p-3 border-t`} style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined }}>
                      <button onClick={clearAllNotifications} className={`w-full text-center text-sm py-2 rounded transition-colors`} style={{ color: isDarkMode ? '#fb7185' : '#dc2626' }}>
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!isMobile && !isTablet && (
              <button
                onClick={toggleRightSidebar}
                ref={rightToggleRef}
                onMouseEnter={onEnter('right')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${rightSidebarVisible ? (isDarkMode ? 'text-blue-400 bg-gray-700 hover:text-blue-300' : 'text-blue-600 bg-blue-50 hover:text-blue-700') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')}`}
              >
                <Notebook className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {showMobileSearch && isMobile && (
        <div className="fixed inset-x-0 top-0 z-50 border-b p-4" style={{ backgroundColor: isDarkMode ? '#000000' : '#ffffff', borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined }}>
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cards..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  updateSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: isDarkMode ? '#0a0a0a' : undefined,
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : undefined,
                  color: isDarkMode ? '#fff' : undefined
                }}
              />
            </div>
            <button type="button" onClick={toggleMobileSearch} className={`p-3 rounded-lg transition-colors`} style={{ color: isDarkMode ? '#cfcfcf' : '#6b7280' }}>
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      <PortalTooltip anchorRef={leftToggleRef} visible={hoverTooltip === 'left'} text={`${leftSidebarVisible ? 'Hide' : 'Show'} left sidebar`} isDarkMode={isDarkMode} />
      <PortalTooltip anchorRef={starButtonRef} visible={hoverTooltip === 'star'} text={isFavorite ? 'Remove from favorites' : 'Add to favorites'} isDarkMode={isDarkMode} />
      <PortalTooltip anchorRef={themeButtonRef} visible={hoverTooltip === 'theme'} text={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`} isDarkMode={isDarkMode} />
      <PortalTooltip anchorRef={refreshButtonRef} visible={hoverTooltip === 'refresh'} text="Refresh Dashboard" isDarkMode={isDarkMode} />
      <PortalTooltip anchorRef={bellButtonRef} visible={hoverTooltip === 'bell'} text="Notifications" isDarkMode={isDarkMode} />
      <PortalTooltip anchorRef={rightToggleRef} visible={hoverTooltip === 'right'} text={`${rightSidebarVisible ? 'Hide' : 'Show'} right sidebar`} isDarkMode={isDarkMode} />
    </>
  );
};

export default Header;