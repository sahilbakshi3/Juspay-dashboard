import React, { useContext, useState, useRef, useEffect } from 'react';
import { Bell, Search, Notebook, SunMedium, History, Star, X, Check, Trash2 } from 'lucide-react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { useToast } from '../../context/ToastContext';

const Header = ({ 
  leftSidebarVisible, 
  rightSidebarVisible, 
  toggleLeftSidebar, 
  toggleRightSidebar,
  onRefreshDashboard
}) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { showRefreshToast, showFavoriteAddedToast, showFavoriteRemovedToast } = useToast();
  
  // State for star/favorite toggle
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #1234 has been placed by John Doe",
      time: "2 minutes ago",
      read: false,
      type: "order"
    },
    {
      id: 2,
      title: "System Update",
      message: "Your dashboard has been updated to version 2.1",
      time: "1 hour ago",
      read: false,
      type: "system"
    },
    {
      id: 3,
      title: "Payment Completed",
      message: "Payment of $299.99 has been processed successfully",
      time: "3 hours ago",
      read: true,
      type: "payment"
    },
    {
      id: 4,
      title: "New User Registration",
      message: "Jane Smith has registered as a new user",
      time: "5 hours ago",
      read: true,
      type: "user"
    },
    {
      id: 5,
      title: "Server Maintenance",
      message: "Scheduled maintenance will occur tonight at 2 AM",
      time: "1 day ago",
      read: false,
      type: "maintenance"
    }
  ]);

  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);

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

  const handleRefresh = () => {
    if (onRefreshDashboard) {
      // Add rotation animation to refresh icon
      const refreshIcon = document.querySelector('.refresh-icon');
      if (refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          refreshIcon.style.transform = 'rotate(0deg)';
        }, 300);
      }
      
      onRefreshDashboard();
      showRefreshToast(); // Show MUI toast notification at top center
    }
  };

  // Handle star/favorite toggle with toast notification
  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Show appropriate toast notification
    if (newFavoriteState) {
      showFavoriteAddedToast();
    } else {
      showFavoriteRemovedToast();
    }
  };

  // Notification functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'system':
        return '⚙️';
      case 'payment':
        return '💳';
      case 'user':
        return '👤';
      case 'maintenance':
        return '🔧';
      default:
        return '🔔';
    }
  };

  return (
    <header className={`${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    } border-b px-6 py-4 transition-colors duration-200 relative z-40`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* Left Sidebar Toggle */}
            <button 
              onClick={toggleLeftSidebar}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                leftSidebarVisible
                  ? (isDarkMode 
                      ? 'text-blue-400 bg-gray-700 hover:text-blue-300' 
                      : 'text-blue-600 bg-blue-50 hover:text-blue-700')
                  : (isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
              }`}
            >
              <Notebook className="w-5 h-5" />
              
              {/* Bottom Tooltip */}
              <div className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                px-2 py-1 text-xs font-medium rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-50
                ${isDarkMode 
                  ? 'bg-gray-900 text-white border border-gray-700' 
                  : 'bg-gray-800 text-white'
                }
              `}>
                {leftSidebarVisible ? 'Hide' : 'Show'} left sidebar
                <div className={`
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
                `}></div>
              </div>
            </button>

            {/* Star/Favorite Button with Toggle */}
            <button 
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                isFavorite
                  ? 'text-yellow-500 hover:text-yellow-400'
                  : (isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
              }`}
            >
              <Star 
                className={`w-5 h-5 transition-all duration-200 ${
                  isFavorite ? 'fill-yellow-500' : 'fill-none'
                }`} 
              />
              
              {/* Bottom Tooltip */}
              <div className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                px-2 py-1 text-xs font-medium rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-50
                ${isDarkMode 
                  ? 'bg-gray-900 text-white border border-gray-700' 
                  : 'bg-gray-800 text-white'
                }
              `}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                <div className={`
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
                `}></div>
              </div>
            </button>

            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Dashboards
            </span>
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
              /
            </span>
            <span className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Default
            </span>
          </div>
        </div>
        
        <div className="h-1.75 w-19.75 flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input 
              type="text" 
              placeholder="Search" 
              className={`pl-9 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            {/* Command shortcut indicator */}
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <span className="text-xs font-medium">⌘</span>
              <span className="text-xs">/</span>
            </div>
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              isDarkMode 
                ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-100'
            }`}
          >
            <SunMedium className="w-6 h-6" />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              Switch to {isDarkMode ? 'light' : 'dark'} mode
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
          
          {/* History/Refresh Button with Animation */}
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <History 
              className="w-5 h-5 refresh-icon transition-transform duration-300" 
              style={{ transformOrigin: 'center' }}
            />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              Refresh Dashboard
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
          
          {/* Notification Bell Button */}
          <div className="relative">
            <button 
              ref={bellButtonRef}
              onClick={toggleNotifications}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                showNotifications
                  ? (isDarkMode 
                      ? 'text-blue-400 bg-gray-700' 
                      : 'text-blue-600 bg-blue-50')
                  : (isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
              }`}
            >
              <Bell className="w-5 h-5" />
              
              {/* Unread count badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              
              {/* Tooltip */}
              <div className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                px-2 py-1 text-xs font-medium rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-50
                ${isDarkMode 
                  ? 'bg-gray-900 text-white border border-gray-700' 
                  : 'bg-gray-800 text-white'
                }
              `}>
                Notifications
                <div className={`
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
                `}></div>
              </div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div 
                ref={notificationRef}
                className={`absolute right-0 mt-2 w-96 rounded-lg shadow-lg border z-50 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } max-h-96 overflow-hidden`}
              >
                {/* Header */}
                <div className={`p-4 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            isDarkMode 
                              ? 'text-blue-400 hover:bg-gray-700' 
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className={`p-1 rounded transition-colors ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className={`p-8 text-center ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b transition-colors hover:bg-opacity-50 relative ${
                          isDarkMode 
                            ? 'border-gray-700 hover:bg-gray-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        } ${!notification.read ? (isDarkMode ? 'bg-gray-750' : 'bg-blue-25') : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 text-lg">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className={`font-medium text-sm ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </p>
                                <p className={`text-sm mt-1 ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs mt-1 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className={`p-1 rounded transition-colors ${
                                      isDarkMode 
                                        ? 'text-green-400 hover:bg-gray-600' 
                                        : 'text-green-600 hover:bg-green-50'
                                    }`}
                                    title="Mark as read"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className={`p-1 rounded transition-colors ${
                                    isDarkMode 
                                      ? 'text-red-400 hover:bg-gray-600' 
                                      : 'text-red-600 hover:bg-red-50'
                                  }`}
                                  title="Delete notification"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-4"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className={`p-3 border-t ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <button
                      onClick={clearAllNotifications}
                      className={`w-full text-center text-sm py-2 rounded transition-colors ${
                        isDarkMode 
                          ? 'text-red-400 hover:bg-gray-700' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar Toggle */}
          <button 
            onClick={toggleRightSidebar}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              rightSidebarVisible
                ? (isDarkMode 
                    ? 'text-blue-400 bg-gray-700 hover:text-blue-300' 
                    : 'text-blue-600 bg-blue-50 hover:text-blue-700')
                : (isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
            }`}
          >
            <Notebook className="w-5 h-5" />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              {rightSidebarVisible ? 'Hide' : 'Show'} right sidebar
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
