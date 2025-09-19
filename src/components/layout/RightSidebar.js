import React, { useContext } from 'react';
import { activities, contacts } from '../../data/mockData';
import { Bug, User, Radio, X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RightSidebar = ({ isVisible, isMobile = false, onClose }) => {
  const { darkMode } = useContext(ThemeContext);

  const desktopStyle = {
    backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
    borderLeft: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(229,231,235,1)'
  };

  const mobileStyle = {
    backgroundColor: darkMode ? '#000000' : '#ffffff',
    borderLeft: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(229,231,235,1)'
  };

  if (!isMobile) {
    return (
      <aside aria-hidden={!isVisible} className={`${isVisible ? 'w-80 opacity-100' : 'w-0 opacity-0'} transition-all duration-300 ease-in-out border-l p-0 overflow-hidden h-full`} style={desktopStyle}>
        <div className="w-80 p-6 h-full flex flex-col" style={{ minWidth: 0 }}>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Bug className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827' }}>You have a bug that needs...</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>Just now</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827' }}>New user registered</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>59 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Bug className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827' }}>You have a bug that needs...</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>12 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827' }}>New user registered</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>Today, 11:59 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Activities</h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <img 
                      src={activity.avatar} 
                      alt={activity.user}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0" 
                      style={{ 
                        backgroundColor: darkMode ? '#111111' : '#f3f4f6',
                        color: darkMode ? '#ffffff' : '#111827',
                        display: 'none' // Hidden by default, shown if image fails
                      }}
                    >
                      {activity.user.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                      <p style={{ color: darkMode ? '#fff' : '#111827' }}>{activity.user} {activity.action}</p>
                      <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Contacts</h3>
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" 
                      style={{ 
                        backgroundColor: darkMode ? '#071029' : '#e6f0ff', 
                        color: darkMode ? '#60a5fa' : '#1e40af',
                        display: 'none' // Hidden by default, shown if image fails
                      }}
                    >
                      {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    <span style={{ color: darkMode ? '#fff' : '#111827' }}>{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Mobile overlay version
  return (
    <div role="dialog" aria-hidden={!isVisible} className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`} style={mobileStyle}>
      <div className="w-80 p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontWeight: 600, color: darkMode ? '#fff' : '#111827' }}>Activity</h2>
          {onClose && (
            <button onClick={onClose} className={`p-1 rounded-lg transition-colors`} style={{ color: darkMode ? '#cfcfcf' : '#6b7280' }}>
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          <div>
            <h3 style={{ fontWeight: 700, color: darkMode ? '#fff' : '#111827' }}>Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Bug className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div>
                  <p style={{ color: darkMode ? '#fff' : '#111827' }}>You have a bug that needs...</p>
                  <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>12 hours ago</p>
                  <p style={{ color: darkMode ? '#fff' : '#111827' }}>You have a bug that needs...</p>
                  <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>12 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div>
                  <p style={{ color: darkMode ? '#fff' : '#111827' }}>New user registered</p>
                  <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>59 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 700, color: darkMode ? '#fff' : '#111827' }}>Activities</h3>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <img 
                    src={activity.avatar} 
                    alt={activity.user}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0" 
                    style={{ 
                      backgroundColor: darkMode ? '#111111' : '#f3f4f6',
                      color: darkMode ? '#ffffff' : '#111827',
                      display: 'none'
                    }}
                  >
                    {activity.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ color: darkMode ? '#fff' : '#111827' }}>{activity.user} {activity.action}</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 700, color: darkMode ? '#fff' : '#111827' }}>Contacts</h3>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" 
                    style={{ 
                      backgroundColor: darkMode ? '#071029' : '#e6f0ff', 
                      color: darkMode ? '#60a5fa' : '#1e40af',
                      display: 'none'
                    }}
                  >
                    {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                  <span style={{ color: darkMode ? '#fff' : '#111827' }}>{contact.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
