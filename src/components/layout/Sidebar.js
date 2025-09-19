// src/components/layout/Sidebar.js
import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContextProvider';
import {
  BarChart3, FolderOpen, User, CreditCard, Globe, FileText, MessageSquare, ChevronDown, ChevronRight, ShoppingBag, GraduationCap, Building, ChartPie, FolderClosed, BookOpen, ContactRound, Users, MessagesSquare, X, Megaphone, Users2
} from 'lucide-react';

const CollapsibleMenuItem = ({
  icon: Icon,
  label,
  subItems = [],
  isExpanded,
  onToggle,
  hasIcon = true,
  onClick,
  darkMode,
  isMobile,
  isActive
}) => {
  return (
    <div>
      <button
        onClick={onClick || onToggle}
        className={`w-full flex items-center justify-between space-x-3 px-2 py-2 rounded-lg transition-colors text-left relative`}
        aria-expanded={!!isExpanded}
        style={{ background: isActive ? (darkMode ? 'transparent' : 'transparent') : 'transparent' }}
      >
        <div className="flex items-center space-x-3 min-w-0">
          {isActive ? (
            <span aria-hidden style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 28, borderRadius: 8, background: darkMode ? '#C6C7F8' : '#111827' }} />
          ) : null}

          {hasIcon && Icon && <Icon className={`flex-shrink-0 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden />}

          <span className={`truncate ${isMobile ? 'text-sm' : 'text-base'}`} style={{ paddingLeft: isActive ? 8 : 0, color: isActive ? (darkMode ? '#fff' : '#111827') : (darkMode ? '#cfcfcf' : '#374151') }}>
            {label}
          </span>
        </div>

        {subItems.length > 0 && (
          <div className="flex-shrink-0">
            {isExpanded ? <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <ChevronRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />}
          </div>
        )}
      </button>

      {subItems.length > 0 && (
        <div style={{ overflow: 'hidden', transition: 'all 300ms ease', maxHeight: isExpanded ? 240 : 0, opacity: isExpanded ? 1 : 0 }}>
          <div style={{ marginLeft: isMobile ? 24 : 32 }}>
            {subItems.map(item => (
              <button key={item.id} onClick={item.onClick} disabled={item.disabled} style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 8,
                borderRadius: 8,
                textAlign: 'left',
                background: item.isActive ? (darkMode ? '#0a0a0a' : '#eff6ff') : 'transparent',
                color: item.disabled ? (darkMode ? '#6b7280' : '#9ca3af') : (item.isActive ? (darkMode ? '#60a5fa' : '#1d4ed8') : (darkMode ? '#cfcfcf' : '#374151'))
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'transparent' }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isVisible, isMobile = false, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const [expandedSections, setExpandedSections] = useState({
    userProfile: false,
    default: true,
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  const handleNavigation = (path) => {
    history.push(path);
    if (isMobile && onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  const toggleSection = (name) => setExpandedSections(prev => ({ ...prev, [name]: !prev[name] }));

  // Updated User Profile sub-items with all 5 components
  const userProfileSubItems = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/profile/overview'), isActive: isActive('/profile/overview'), disabled: false },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/profile/projects'), isActive: isActive('/profile/projects'), disabled: false },
    { id: 'campaigns', label: 'Campaigns', onClick: () => handleNavigation('/profile/campaigns'), isActive: isActive('/profile/campaigns'), disabled: false },
    { id: 'documents', label: 'Documents', onClick: () => handleNavigation('/profile/documents'), isActive: isActive('/profile/documents'), disabled: false },
    { id: 'followers', label: 'Followers', onClick: () => handleNavigation('/profile/followers'), isActive: isActive('/profile/followers'), disabled: false }
  ];

  const favoritesList = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/overview'), isActive: isActive('/overview') },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/projects'), isActive: isActive('/projects') }
  ];

  const containerStyle = {
    backgroundColor: darkMode ? '#000000' : '#ffffff',
    borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : '#e5e7eb'}`,
    width: isVisible ? 256 : 0,
    transition: 'all 300ms ease',
    height: '100%',
    overflow: 'hidden'
  };

  return (
    <aside style={containerStyle}>
      <div style={{ width: 256, display: isVisible ? 'block' : 'none', height: '100%', flexDirection: 'column' }}>
        <div style={{ padding: isMobile ? 16 : 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* UPDATED LOGO SECTION WITH FULL CIRCLE AND NORMAL FONT WEIGHT */}
              <img 
                src="/logo.png" 
                alt="ByeWind Logo" 
                style={{ 
                  width: isMobile ? 24 : 32, 
                  height: isMobile ? 24 : 32, 
                  borderRadius: '50%', // Full circle
                  objectFit: 'cover'
                }}
              />
              <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#111827' }}>ByeWind</span> {/* Normal font weight */}
            </div>

            {isMobile && onClose && (
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: darkMode ? '#cfcfcf' : '#6b7280' }}>
                <X />
              </button>
            )}
          </div>
        </div>

        <nav style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 12, height: 'calc(100% - 96px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280' }}>FAVORITES</div>
            <button onClick={() => handleNavigation('/recently')} style={{ 
              fontSize: 12, 
              fontWeight: 700, 
              letterSpacing: 1.5, 
              color: darkMode ? '#9ca3af' : '#6b7280', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer' 
            }}>
              RECENTLY
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favoritesList.map(item => (
              <button key={item.id} onClick={item.onClick} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                borderRadius: 8,
                background: item.isActive ? (darkMode ? '#0a0a0a' : '#eff6ff') : 'transparent',
                color: item.isActive ? (darkMode ? '#60a5fa' : '#1d4ed8') : (darkMode ? '#cfcfcf' : '#374151'),
                border: 'none',
                textAlign: 'left'
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d1d5db' }} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280' }}>DASHBOARDS</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem label="Default" icon={ChartPie} subItems={[]} isExpanded={expandedSections.default} onToggle={() => toggleSection('default')} onClick={() => handleNavigation('/')} hasIcon darkMode={darkMode} isMobile={isMobile} isActive={isActive('/')} />
            <CollapsibleMenuItem label="eCommerce" icon={ShoppingBag} subItems={[]} isExpanded={expandedSections.ecommerce} onToggle={() => toggleSection('ecommerce')} hasIcon darkMode={darkMode} isMobile={isMobile} isActive={isActive('/orders')} />
            <CollapsibleMenuItem label="Projects" icon={FolderClosed} subItems={[]} isExpanded={expandedSections.projects} onToggle={() => toggleSection('projects')} hasIcon darkMode={darkMode} isMobile={isMobile} isActive={false} />
            <CollapsibleMenuItem label="Online Courses" icon={BookOpen} subItems={[]} isExpanded={expandedSections.onlineCourses} onToggle={() => toggleSection('onlineCourses')} hasIcon darkMode={darkMode} isMobile={isMobile} isActive={false} />
          </div>

          <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280' }}>PAGES</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem icon={ContactRound} label="User Profile" subItems={userProfileSubItems} isExpanded={expandedSections.userProfile} onToggle={() => toggleSection('userProfile')} darkMode={darkMode} isMobile={isMobile} isActive={false} />
            <CollapsibleMenuItem icon={CreditCard} label="Account" subItems={[]} isExpanded={expandedSections.account} onToggle={() => toggleSection('account')} darkMode={darkMode} isMobile={isMobile} isActive={false} />
            <CollapsibleMenuItem icon={Users} label="Corporate" subItems={[]} isExpanded={expandedSections.corporate} onToggle={() => toggleSection('corporate')} darkMode={darkMode} isMobile={isMobile} isActive={false} />
            <CollapsibleMenuItem icon={FileText} label="Blog" subItems={[]} isExpanded={expandedSections.blog} onToggle={() => toggleSection('blog')} darkMode={darkMode} isMobile={isMobile} isActive={false} />
            <CollapsibleMenuItem icon={MessagesSquare} label="Social" subItems={[]} isExpanded={expandedSections.social} onToggle={() => toggleSection('social')} darkMode={darkMode} isMobile={isMobile} isActive={false} />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;