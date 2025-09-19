// Header.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bell, Search, Notebook, SunMedium, History, Star, X, Check, Trash2, Menu } from 'lucide-react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { useToast } from '../../context/ToastContext';

const PortalTooltip = ({ anchorRef, visible, text, isDarkMode }) => {
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!visible || !anchorRef?.current) return;

    const update = () => {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) return;

      const tooltipRect = tooltipEl.getBoundingClientRect();
      const margin = 8; // gap between button and tooltip
      const top = window.scrollY + anchorRect.bottom + margin;
      const left = window.scrollX + anchorRect.left + anchorRect.width / 2; // center align

      // arrowLeft: distance from left of tooltip to place arrow in px
      const arrowLeft = tooltipRect.width / 2;

      setPos({ top, left, arrowLeft });
    };

    // compute after paint so tooltipRef has width
    // use setTimeout 0 or requestAnimationFrame
    requestAnimationFrame(update);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [visible, anchorRef]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translateX(-50%)',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          pointerEvents: 'auto', // keep it non-interactive but allow text selection if needed
          background: isDarkMode ? '#111827' : '#111827', // kept dark-like as in your original
          color: '#ffffff',
          borderRadius: 6,
          padding: '6px 8px',
          fontSize: 12,
          fontWeight: 500,
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.04)' : 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {text}
        {/* arrow */}
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
            borderBottom: isDarkMode ? '8px solid #111827' : '8px solid #111827',
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

  // State for star/favorite toggle
  const [isFavorite, setIsFavorite] = useState(false);

  // Search state
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Notification states
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

  // new refs for tooltip anchors
  const leftToggleRef = useRef(null);
  const starButtonRef = useRef(null);
  const themeButtonRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const rightToggleRef = useRef(null);

  // hover state tracker for tooltips
  const [hoverTooltip, setHoverTooltip] = useState(null); // e.g. 'left', 'star', 'theme', 'refresh', 'bell', 'right'

  // Close notifications when clicking outside
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when mobile search opens
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const handleRefresh = () => {
    if (onRefreshDashboard) {
      const refreshIcon = document.querySelector('.refresh-icon');
      if (refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          refreshIcon.style.transform = 'rotate(0deg)';
        }, 300);
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

  const toggleNotifications = () => { setShowNotifications(!showNotifications); };
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
    setShowMobileSearch(!showMobileSearch);
    if (showMobileSearch) setSearchValue('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchValue);
    setShowMobileSearch(false);
    setSearchValue('');
  };

  // small helper to wire mouseenter/mouseleave
  const onEnter = (key) => () => setHoverTooltip(key);
  const onLeave = () => setHoverTooltip(null);

  return (
    <>
      <header className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      } border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4 transition-colors duration-200 relative z-40`}>

        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Mobile Menu Button (Hamburger) */}
              {isMobile && (
                <button
                  onClick={toggleLeftSidebar}
                  ref={leftToggleRef}
                  onMouseEnter={onEnter('left')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 sm:hidden ${
                    leftSidebarVisible
                      ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {/* Desktop Left Sidebar Toggle */}
              {!isMobile && (
                <button
                  onClick={toggleLeftSidebar}
                  ref={leftToggleRef}
                  onMouseEnter={onEnter('left')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 relative ${
                    leftSidebarVisible
                      ? (isDarkMode ? 'text-blue-400 bg-gray-700 hover:text-blue-300' : 'text-blue-600 bg-blue-50 hover:text-blue-700')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  <Notebook className="w-5 h-5" />
                </button>
              )}

              {/* Star/Favorite Button - Hidden on mobile */}
              {!isMobile && (
                <button
                  onClick={handleFavoriteToggle}
                  ref={starButtonRef}
                  onMouseEnter={onEnter('star')}
                  onMouseLeave={onLeave}
                  className={`p-2 rounded-lg transition-all duration-200 relative ${
                    isFavorite ? 'text-yellow-500 hover:text-yellow-400' : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  <Star className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-yellow-500' : 'fill-none'}`} />
                </button>
              )}

              {/* Breadcrumb - Hidden on mobile and tablet */}
              {!isMobile && !isTablet && (
                <div className="flex items-center space-x-2">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Dashboards</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Default</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Desktop Search */}
            {!isMobile && (
              <div className="relative hidden sm:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search"
                  className={`pl-9 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors w-32 sm:w-40 lg:w-64 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="text-xs font-medium">⌘</span>
                  <span className="text-xs">/</span>
                </div>
              </div>
            )}

            {/* Mobile Search Button */}
            {isMobile && (
              <button
                onClick={toggleMobileSearch}
                className={`p-2 rounded-lg transition-all duration-200 sm:hidden ${
                  showMobileSearch ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              ref={themeButtonRef}
              onMouseEnter={onEnter('theme')}
              onMouseLeave={onLeave}
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                isDarkMode ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700' : 'text-gray-500 hover:text-orange-500 hover:bg-gray-100'
              }`}
            >
              <SunMedium className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* History/Refresh Button - Hidden on mobile */}
            {!isMobile && (
              <button
                onClick={handleRefresh}
                ref={refreshButtonRef}
                onMouseEnter={onEnter('refresh')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <History className="w-5 h-5 refresh-icon transition-transform duration-300" style={{ transformOrigin: 'center' }} />
              </button>
            )}

            {/* Notification Bell Button */}
            <div className="relative">
              <button
                ref={bellButtonRef}
                onClick={toggleNotifications}
                onMouseEnter={onEnter('bell')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${
                  showNotifications ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown - Responsive */}
              {showNotifications && (
                <div
                  ref={notificationRef}
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-lg border z-50 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } max-h-80 sm:max-h-96 overflow-hidden ${isMobile ? 'fixed right-2 w-[calc(100vw-1rem)]' : ''}`}
                >
                  {/* Header */}
                  <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} className={`text-xs px-2 py-1 rounded transition-colors ${isDarkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'}`}>
                            Mark all read
                          </button>
                        )}
                        <button onClick={() => setShowNotifications(false)} className={`p-1 rounded transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b transition-colors hover:bg-opacity-50 relative ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} ${!notification.read ? (isDarkMode ? 'bg-gray-750' : 'bg-blue-25') : ''}`}>
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 text-lg">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{notification.title}</p>
                                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{notification.message}</p>
                                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
                                </div>
                                <div className="flex items-center space-x-1 ml-2">
                                  {!notification.read && (
                                    <button onClick={() => markAsRead(notification.id)} className={`p-1 rounded transition-colors ${isDarkMode ? 'text-green-400 hover:bg-gray-600' : 'text-green-600 hover:bg-green-50'}`} title="Mark as read">
                                      <Check className="w-3 h-3" />
                                    </button>
                                  )}
                                  <button onClick={() => deleteNotification(notification.id)} className={`p-1 rounded transition-colors ${isDarkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-red-50'}`} title="Delete notification">
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

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button onClick={clearAllNotifications} className={`w-full text-center text-sm py-2 rounded transition-colors ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}>
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar Toggle - Hidden on mobile and tablet */}
            {!isMobile && !isTablet && (
              <button
                onClick={toggleRightSidebar}
                ref={rightToggleRef}
                onMouseEnter={onEnter('right')}
                onMouseLeave={onLeave}
                className={`p-2 rounded-lg transition-all duration-200 relative ${
                  rightSidebarVisible ? (isDarkMode ? 'text-blue-400 bg-gray-700 hover:text-blue-300' : 'text-blue-600 bg-blue-50 hover:text-blue-700') : (isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
                }`}
              >
                <Notebook className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && isMobile && (
        <div className={`fixed inset-x-0 top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input ref={searchInputRef} type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`} />
            </div>
            <button type="button" onClick={toggleMobileSearch} className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}><X className="w-5 h-5" /></button>
          </form>
        </div>
      )}

      {/* Render portal tooltips for each anchor we used */}
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
