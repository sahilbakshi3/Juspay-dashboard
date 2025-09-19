import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Button,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Clear,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ViewList,
  ViewModule,
  MoreHoriz,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
} from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

const OrdersPage = ({ isMobile: propIsMobile, isTablet: propIsTablet }) => {
  const theme = useTheme();
  const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletBreakpoint = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const isMobile = propIsMobile !== undefined ? propIsMobile : isMobileBreakpoint;
  const isTablet = propIsTablet !== undefined ? propIsTablet : isTabletBreakpoint;

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState(isMobile ? 'card' : 'table');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ status: 'All', dateRange: 'All Time' });

  const getItemsPerPage = () => {
    if (isMobile) return 5;
    if (isTablet) return 8;
    return 10;
  };
  const itemsPerPage = getItemsPerPage();
  const isDarkMode = theme.palette.mode === 'dark';
  const tickColor = isDarkMode ? '#C6C7F8' : '#1C1C1C';

  const dashboardColors = {
    light: {
      background: '#fafafa',
      cardBackground: '#ffffff',
      border: '#e5e7eb',
      text: { primary: '#111827', secondary: '#6b7280' },
      hover: '#f9fafb'
    },
    dark: {
      background: '#0f172a',
      cardBackground: '#1e293b',
      border: '#334155',
      text: { primary: '#f8fafc', secondary: '#cbd5e1' },
      hover: '#334155'
    }
  };
  const colors = isDarkMode ? dashboardColors.dark : dashboardColors.light;

  // --- Helpers for initials avatar ---
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  const stringToColor = (str) => {
    if (!str) return '#9CA3AF';
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += (`00${value.toString(16)}`).slice(-2);
    }
    return color;
  };
  // ----------------------------------------

  // Full orders list (exactly as you provided)
  const orders = [
    {
      id: '#CM9801',
      user: { name: 'Natali Craig', avatar: '👩‍💼' },
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress',
      dateSort: new Date('2024-02-28T10:00:00')
    },
    {
      id: '#CM9802',
      user: { name: 'Kate Morrison', avatar: '👩‍🦰' },
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete',
      dateSort: new Date('2024-02-28T09:59:00')
    },
    {
      id: '#CM9803',
      user: { name: 'Drew Cano', avatar: '👨‍🦱' },
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending',
      dateSort: new Date('2024-02-28T09:00:00')
    },
    {
      id: '#CM9804',
      user: { name: 'Orlando Diggs', avatar: '👨‍💼' },
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: 'Yesterday',
      status: 'Approved',
      dateSort: new Date('2024-02-27T10:00:00')
    },
    {
      id: '#CM9805',
      user: { name: 'Andi Lane', avatar: '👩‍🦳' },
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: 'Feb 2, 2023',
      status: 'Rejected',
      dateSort: new Date('2023-02-02T10:00:00')
    },
    {
      id: '#CM9806',
      user: { name: 'John Smith', avatar: '👨‍💻' },
      project: 'E-commerce Site',
      address: 'Broadway New York',
      date: 'Feb 3, 2023',
      status: 'In Progress',
      dateSort: new Date('2023-02-03T10:00:00')
    },
    {
      id: '#CM9807',
      user: { name: 'Sarah Johnson', avatar: '👩‍🎨' },
      project: 'Portfolio Website',
      address: 'Sunset Boulevard LA',
      date: 'Feb 4, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-04T10:00:00')
    },
    {
      id: '#CM9808',
      user: { name: 'Mike Davis', avatar: '👨‍🔧' },
      project: 'Mobile App',
      address: 'Michigan Avenue Chicago',
      date: 'Feb 5, 2023',
      status: 'Pending',
      dateSort: new Date('2023-02-05T10:00:00')
    },
    {
      id: '#CM9809',
      user: { name: 'Emma Wilson', avatar: '👩‍💻' },
      project: 'Dashboard Redesign',
      address: 'Pine Street Seattle',
      date: 'Feb 6, 2023',
      status: 'Approved',
      dateSort: new Date('2023-02-06T10:00:00')
    },
    {
      id: '#CM9810',
      user: { name: 'Alex Brown', avatar: '👨‍🎯' },
      project: 'Marketing Site',
      address: 'Oak Street Portland',
      date: 'Feb 7, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-07T10:00:00')
    },
    {
      id: '#CM9811',
      user: { name: 'Lisa Garcia', avatar: '👩‍🔬' },
      project: 'Data Analytics Platform',
      address: 'Main Street Boston',
      date: 'Feb 8, 2023',
      status: 'In Progress',
      dateSort: new Date('2023-02-08T10:00:00')
    },
    {
      id: '#CM9812',
      user: { name: 'David Miller', avatar: '👨‍🏫' },
      project: 'Learning Management System',
      address: 'University Avenue Austin',
      date: 'Feb 9, 2023',
      status: 'Pending',
      dateSort: new Date('2023-02-09T10:00:00')
    },
    {
      id: '#CM9813',
      user: { name: 'Rachel Green', avatar: '👩‍🎭' },
      project: 'Event Management App',
      address: 'Festival Street Miami',
      date: 'Feb 10, 2023',
      status: 'Rejected',
      dateSort: new Date('2023-02-10T10:00:00')
    },
    {
      id: '#CM9814',
      user: { name: 'Tom Anderson', avatar: '👨‍🚀' },
      project: 'Inventory System',
      address: 'Industrial Park Denver',
      date: 'Feb 11, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-11T10:00:00')
    },
    {
      id: '#CM9815',
      user: { name: 'Jennifer Lee', avatar: '👩‍⚕️' },
      project: 'Healthcare Portal',
      address: 'Medical Center Phoenix',
      date: 'Feb 12, 2023',
      status: 'Approved',
      dateSort: new Date('2023-02-12T10:00:00')
    },
    {
      id: '#CM9816',
      user: { name: 'Brian White', avatar: '👨‍💼' },
      project: 'Job Board App',
      address: 'King Street Charleston',
      date: 'Feb 13, 2023',
      status: 'Pending',
      dateSort: new Date('2023-02-13T10:00:00')
    },
    {
      id: '#CM9817',
      user: { name: 'Olivia Moore', avatar: '👩‍🔧' },
      project: 'HR Management Tool',
      address: 'Queen Street Toronto',
      date: 'Feb 14, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-14T10:00:00')
    },
    {
      id: '#CM9818',
      user: { name: 'Ethan Taylor', avatar: '👨‍🎨' },
      project: 'Design System',
      address: 'Creative Avenue Atlanta',
      date: 'Feb 15, 2023',
      status: 'In Progress',
      dateSort: new Date('2023-02-15T10:00:00')
    },
    {
      id: '#CM9819',
      user: { name: 'Sophia Martin', avatar: '👩‍🚒' },
      project: 'Disaster Response Portal',
      address: 'Firehouse Road Houston',
      date: 'Feb 16, 2023',
      status: 'Approved',
      dateSort: new Date('2023-02-16T10:00:00')
    },
    {
      id: '#CM9820',
      user: { name: 'Daniel Walker', avatar: '👨‍🍳' },
      project: 'Recipe App',
      address: 'Baker Street London',
      date: 'Feb 17, 2023',
      status: 'Rejected',
      dateSort: new Date('2023-02-17T10:00:00')
    },
    {
      id: '#CM9821',
      user: { name: 'Ella Harris', avatar: '👩‍🔧' },
      project: 'Customer Support Dashboard',
      address: 'Helpdesk Lane Dallas',
      date: 'Feb 18, 2023',
      status: 'In Progress',
      dateSort: new Date('2023-02-18T10:00:00')
    },
    {
      id: '#CM9822',
      user: { name: 'Logan Martinez', avatar: '👨‍🎓' },
      project: 'Student Portal',
      address: 'Campus Circle Raleigh',
      date: 'Feb 19, 2023',
      status: 'Pending',
      dateSort: new Date('2023-02-19T10:00:00')
    },
    {
      id: '#CM9823',
      user: { name: 'Grace Thompson', avatar: '👩‍🌾' },
      project: 'Farm Management System',
      address: 'Harvest Road Boise',
      date: 'Feb 20, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-20T10:00:00')
    },
    {
      id: '#CM9824',
      user: { name: 'Henry Scott', avatar: '👨‍🚒' },
      project: 'Safety Compliance App',
      address: 'Rescue Blvd Tampa',
      date: 'Feb 21, 2023',
      status: 'Approved',
      dateSort: new Date('2023-02-21T10:00:00')
    },
    {
      id: '#CM9825',
      user: { name: 'Chloe Adams', avatar: '👩‍✈️' },
      project: 'Travel Booking Platform',
      address: 'Aviation Road Nashville',
      date: 'Feb 22, 2023',
      status: 'In Progress',
      dateSort: new Date('2023-02-22T10:00:00')
    },
    {
      id: '#CM9826',
      user: { name: 'Lucas Mitchell', avatar: '👨‍⚕️' },
      project: 'Telemedicine App',
      address: 'Wellness Drive Baltimore',
      date: 'Feb 23, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-23T10:00:00')
    },
    {
      id: '#CM9827',
      user: { name: 'Amelia Perez', avatar: '👩‍🚀' },
      project: 'Space Education Portal',
      address: 'Galaxy Street Houston',
      date: 'Feb 24, 2023',
      status: 'Pending',
      dateSort: new Date('2023-02-24T10:00:00')
    },
    {
      id: '#CM9828',
      user: { name: 'Jack Rivera', avatar: '👨‍🌾' },
      project: 'AgriTech CRM',
      address: 'Greenfield Road Fresno',
      date: 'Feb 25, 2023',
      status: 'Rejected',
      dateSort: new Date('2023-02-25T10:00:00')
    },
    {
      id: '#CM9829',
      user: { name: 'Zoe Cooper', avatar: '👩‍🎤' },
      project: 'Music Collaboration App',
      address: 'Harmony Lane Austin',
      date: 'Feb 26, 2023',
      status: 'Complete',
      dateSort: new Date('2023-02-26T10:00:00')
    },
    {
      id: '#CM9830',
      user: { name: 'Nathan Bell', avatar: '👨‍🔬' },
      project: 'Lab Management System',
      address: 'Science Park San Diego',
      date: 'Feb 27, 2023',
      status: 'Approved',
      dateSort: new Date('2023-02-27T10:00:00')
    }
  ];

  // Sorting, filtering, pagination, handlers (same logic as before)
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      let aValue, bValue;
      switch (sortConfig.key) {
        case 'id':
          aValue = parseInt(a.id.replace('#CM', ''));
          bValue = parseInt(b.id.replace('#CM', ''));
          break;
        case 'user':
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
          break;
        case 'project':
          aValue = a.project.toLowerCase();
          bValue = b.project.toLowerCase();
          break;
        case 'address':
          aValue = a.address.toLowerCase();
          bValue = b.address.toLowerCase();
          break;
        case 'date':
          aValue = a.dateSort;
          bValue = b.dateSort;
          break;
        case 'status':
          const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Approved': 3, 'Complete': 4, 'Rejected': 5 };
          aValue = statusOrder[a.status] || 6;
          bValue = statusOrder[b.status] || 6;
          break;
        default:
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (activeFilters.status !== 'All') {
      filtered = filtered.filter(order => order.status === activeFilters.status);
    }
    if (activeFilters.dateRange !== 'All Time') {
      filtered = filtered.filter(order => {
        switch (activeFilters.dateRange) {
          case 'Today':
            return order.date === 'Just now' || order.date.includes('minute') || order.date.includes('hour');
          case 'Yesterday':
            return order.date === 'Yesterday';
          case 'This Week':
            return order.date === 'Yesterday' || order.date === 'Just now' || order.date.includes('minute') || order.date.includes('hour');
          case 'This Month':
            return order.date.includes('Feb') || order.date === 'Yesterday' || order.date === 'Just now' || order.date.includes('minute') || order.date.includes('hour');
          default:
            return true;
        }
      });
    }
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(s) ||
        order.user.name.toLowerCase().includes(s) ||
        order.project.toLowerCase().includes(s) ||
        order.address.toLowerCase().includes(s) ||
        order.status.toLowerCase().includes(s) ||
        order.date.toLowerCase().includes(s)
      );
    }
    return filtered;
  }, [orders, searchTerm, activeFilters]);

  const sortedAndFilteredOrders = useMemo(() => getSortedData(filteredOrders), [filteredOrders, sortConfig]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleSearchChange = (event) => { setSearchTerm(event.target.value); setCurrentPage(1); setSelectedRows([]); };
  const handleClearSearch = () => { setSearchTerm(''); setCurrentPage(1); setSelectedRows([]); };
  const handlePageChange = (event, page) => { setCurrentPage(page); setSelectedRows([]); };
  const handleViewModeToggle = () => setViewMode(viewMode === 'table' ? 'card' : 'table');

  const handleCardExpand = (orderId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(orderId)) newExpanded.delete(orderId); else newExpanded.add(orderId);
    setExpandedCards(newExpanded);
  };

  const handleMenuClick = (event, order) => { setAnchorEl(event.currentTarget); setSelectedOrder(order); };
  const handleMenuClose = () => { setAnchorEl(null); setSelectedOrder(null); };

  const getStatusColor = (status) => {
    const statusColors = {
      'Complete': { light: { color: '#10b981', bgcolor: 'transparent', border: 'none' }, dark: { color: '#34d399', bgcolor: 'transparent', border: 'none' } },
      'In Progress': { light: { color: '#3b82f6', bgcolor: 'transparent', border: 'none' }, dark: { color: '#60a5fa', bgcolor: 'transparent', border: 'none' } },
      'Pending': { light: { color: '#06b6d4', bgcolor: 'transparent', border: 'none' }, dark: { color: '#22d3ee', bgcolor: 'transparent', border: 'none' } },
      'Approved': { light: { color: '#f59e0b', bgcolor: 'transparent', border: 'none' }, dark: { color: '#fbbf24', bgcolor: 'transparent', border: 'none' } },
      'Rejected': { light: { color: '#9ca3af', bgcolor: 'transparent', border: 'none' }, dark: { color: '#6b7280', bgcolor: 'transparent', border: 'none' } }
    };
    return statusColors[status]?.[isDarkMode ? 'dark' : 'light'] || { color: colors.text.secondary, bgcolor: 'transparent', border: 'none' };
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) setSelectedRows(paginatedOrders.map((_, i) => i));
    else setSelectedRows([]);
  };

  const handleSelectRow = (index) => (event) => {
    if (event.target.checked) setSelectedRows([...selectedRows, index]);
    else setSelectedRows(selectedRows.filter(i => i !== index));
  };

  const isSelected = (index) => selectedRows.includes(index);
  const isAllSelected = selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < paginatedOrders.length;

  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = String(text).split(regex);
    return parts.map((part, i) => regex.test(part) ? (
      <span key={i} style={{
        backgroundColor: isDarkMode ? '#fbbf24' : '#fef3c7',
        color: isDarkMode ? '#000' : '#92400e',
        fontWeight: 600,
        borderRadius: '2px',
        padding: '1px 2px'
      }}>{part}</span>
    ) : part);
  };

  const SortableTableCell = ({ children, sortKey, align = 'left', sx = {} }) => {
    const isActive = sortConfig.key === sortKey;
    const direction = isActive ? sortConfig.direction : 'asc';
    return (
      <TableCell
        sx={{
          fontWeight: 600,
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          color: colors.text.secondary,
          bgcolor: colors.cardBackground,
          borderBottom: `1px solid ${colors.border}`,
          padding: isMobile ? '8px 4px' : '16px',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
          '&:hover': { bgcolor: colors.hover, color: colors.text.primary },
          ...(isActive && {
            color: theme.palette.primary.main,
            bgcolor: isDarkMode ? `${theme.palette.primary.dark}20` : `${theme.palette.primary.light}20`
          }),
          ...sx
        }}
        align={align}
        onClick={() => handleSort(sortKey)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
          {children}
          {isActive && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
              {direction === 'asc' ? <ArrowUpward sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }} /> : <ArrowDownward sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />}
            </Box>
          )}
          {!isActive && (
            <Box sx={{ display: 'flex', flexDirection: 'column', opacity: 0.3, '&:hover': { opacity: 0.6 } }}>
              <ArrowUpward sx={{ fontSize: '0.5rem', mb: -0.25 }} />
              <ArrowDownward sx={{ fontSize: '0.5rem' }} />
            </Box>
          )}
        </Box>
      </TableCell>
    );
  };

  // Card View component (uses Avatar, calendar icon for date)
  const OrderCard = ({ order, index, isSelected, onSelect }) => {
    const isExpanded = expandedCards.has(order.id);
    return (
      <Card sx={{
        mb: 2,
        bgcolor: colors.cardBackground,
        border: `1px solid ${colors.border}`,
        borderRadius: 2,
        boxShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.08)',
        '&:hover': { boxShadow: isDarkMode ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0,0,0,0.12)' },
        ...(isSelected && { borderColor: theme.palette.primary.main, bgcolor: isDarkMode ? `${theme.palette.primary.dark}20` : `${theme.palette.primary.light}20` })
      }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox checked={isSelected} onChange={onSelect} size="small" sx={{
                color: colors.text.secondary,
                '& .MuiSvgIcon-root': { color: colors.text.secondary },
                '&.Mui-checked, &.Mui-checked .MuiSvgIcon-root': { color: tickColor },
                '&.Mui-checked': { bgcolor: 'transparent' }
              }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.text.primary, fontSize: '0.875rem' }}>
                {highlightText(order.id, searchTerm)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: getStatusColor(order.status).color }} />
                  <span style={{ fontSize: '0.75rem' }}>{order.status}</span>
                </Box>
              } size="small" sx={{ fontSize: '0.75rem', fontWeight: 500, bgcolor: getStatusColor(order.status).bgcolor, borderColor: getStatusColor(order.status).border, color: getStatusColor(order.status).color }} />

              <IconButton size="small" onClick={(e) => handleMenuClick(e, order)} sx={{ color: colors.text.secondary, '&:hover': { bgcolor: colors.hover, color: colors.text.primary } }}>
                <MoreHoriz fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Avatar + name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: '0.75rem',
                bgcolor: stringToColor(order.user.name),
                opacity: 1,
                transform: 'rotate(0deg)',
                borderRadius: '50%' // Radius/8 equivalent
              }}
            >
              {getInitials(order.user.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text.primary, fontSize: '0.875rem', mb: 0.5 }}>{highlightText(order.user.name, searchTerm)}</Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem' }}>{highlightText(order.project, searchTerm)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CalendarToday sx={{ fontSize: isMobile ? 18 : 20, color: colors.text.secondary }} />
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem' }}>{highlightText(order.date, searchTerm)}</Typography>
            </Box>

            <IconButton size="small" onClick={() => handleCardExpand(order.id)} sx={{ color: colors.text.secondary, '&:hover': { bgcolor: colors.hover, color: colors.text.primary } }}>
              {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>

          <Collapse in={isExpanded}>
            <Divider sx={{ my: 1, borderColor: colors.border }} />
            <Box sx={{ pt: 1 }}>
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem', display: 'block', mb: 0.5 }}><strong>Address:</strong> {highlightText(order.address, searchTerm)}</Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem', display: 'block' }}><strong>Project:</strong> {highlightText(order.project, searchTerm)}</Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: isMobile ? 2 : isTablet ? 2.5 : 3, bgcolor: colors.background, minHeight: '100vh' }}>
      {/* Top bar */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', mb: 3, gap: isMobile ? 2 : 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography component="h1" sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px', color: colors.text.primary }}>Order List</Typography>

          {(activeFilters.status !== 'All' || activeFilters.dateRange !== 'All Time') && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {activeFilters.status !== 'All' && (
                <Chip label={`Status: ${activeFilters.status}`} size="small" onDelete={() => handleFilterChange('status', 'All')} sx={{ bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, color: colors.text.primary, fontSize: '0.75rem' }} />
              )}
              {activeFilters.dateRange !== 'All Time' && (
                <Chip label={`Date: ${activeFilters.dateRange}`} size="small" onDelete={() => handleFilterChange('dateRange', 'All Time')} sx={{ bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, color: colors.text.primary, fontSize: '0.75rem' }} />
              )}
            </Box>
          )}

          {searchTerm && (
            <Typography variant="body2" sx={{ color: colors.text.secondary, bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.75rem' }}>
              {filteredOrders.length} of {orders.length}
            </Typography>
          )}

          {sortConfig.key && (
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><span>Sorted by {sortConfig.key}</span>{sortConfig.direction === 'asc' ? <ArrowUpward sx={{ fontSize: '0.75rem' }} /> : <ArrowDownward sx={{ fontSize: '0.75rem' }} />}</Box>}
              size="small"
              onDelete={() => setSortConfig({ key: null, direction: 'asc' })}
              sx={{ bgcolor: theme.palette.primary.light + '20', border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main, fontSize: '0.75rem' }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1, alignItems: isMobile ? 'stretch' : 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: isMobile ? 1 : 0 }}>
            <IconButton sx={{ border: `1px solid ${colors.border}`, color: colors.text.secondary, bgcolor: colors.cardBackground, '&:hover': { bgcolor: colors.hover, borderColor: theme.palette.primary.main, color: colors.text.primary } }} size={isMobile ? 'small' : 'medium'}><Add /></IconButton>
            <IconButton onClick={handleFilterClick} sx={{ border: `1px solid ${colors.border}`, color: activeFilters.status !== 'All' || activeFilters.dateRange !== 'All Time' ? theme.palette.primary.main : colors.text.secondary, bgcolor: colors.cardBackground, '&:hover': { bgcolor: colors.hover, borderColor: theme.palette.primary.main, color: colors.text.primary } }} size={isMobile ? 'small' : 'medium'}><FilterList /></IconButton>
            {(isMobile || isTablet) && (
              <IconButton onClick={handleViewModeToggle} sx={{ border: `1px solid ${colors.border}`, color: viewMode === 'card' ? theme.palette.primary.main : colors.text.secondary, bgcolor: colors.cardBackground, '&:hover': { bgcolor: colors.hover, borderColor: theme.palette.primary.main, color: colors.text.primary } }} size={isMobile ? 'small' : 'medium'}>
                {viewMode === 'card' ? <ViewModule /> : <ViewList />}
              </IconButton>
            )}
          </Box>

          <TextField
            placeholder="Search orders..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: isMobile ? '100%' : isTablet ? 200 : 250,
              bgcolor: colors.cardBackground,
              '& .MuiOutlinedInput-root': {
                color: colors.text.primary,
                '& fieldset': { borderColor: colors.border },
                '&:hover fieldset': { borderColor: theme.palette.primary.main },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
              },
              '& .MuiInputBase-input::placeholder': { color: colors.text.secondary, opacity: 1 }
            }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Search sx={{ color: colors.text.secondary }} /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  {!isMobile && (<Box sx={{ mr: searchTerm ? 1 : 0, display: 'flex', alignItems: 'center', color: colors.text.secondary }}><span style={{ fontSize: '0.75rem', fontWeight: 500 }}>⌘</span><span style={{ fontSize: '0.75rem' }}>/</span></Box>)}
                  {searchTerm && (<IconButton size="small" onClick={handleClearSearch} sx={{ color: colors.text.secondary, '&:hover': { color: colors.text.primary, bgcolor: colors.hover } }}><Clear fontSize="small" /></IconButton>)}
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      {/* If mobile/tablet + card view */}
      {(isMobile || isTablet) && viewMode === 'card' ? (
        <Box>
          {paginatedOrders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} index={index} isSelected={isSelected(index)} onSelect={handleSelectRow(index)} />
          ))}

          {paginatedOrders.length === 0 && !searchTerm && (
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: colors.cardBackground, borderRadius: 2, border: `1px solid ${colors.border}` }}>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>No orders available</Typography>
            </Box>
          )}
        </Box>
      ) : (
        // Table view
        <TableContainer component={Paper} sx={{ width: '100%', minHeight: isMobile ? '300px' : isTablet ? '400px' : '500px', maxHeight: isMobile ? '400px' : isTablet ? '500px' : '600px', boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'auto', bgcolor: colors.cardBackground, border: `1px solid ${colors.border}` }}>
          <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: colors.cardBackground, borderBottom: `1px solid ${colors.border}` }}>
                <TableCell padding="checkbox" sx={{ bgcolor: colors.cardBackground, borderBottom: `1px solid ${colors.border}`, width: isMobile ? '40px' : 'auto' }}>
                  <Checkbox checked={isAllSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} disabled={paginatedOrders.length === 0} sx={{ color: colors.text.secondary, '& .MuiSvgIcon-root': { color: colors.text.secondary }, '&.Mui-checked, &.Mui-checked .MuiSvgIcon-root': { color: tickColor } }} size={isMobile ? 'small' : 'medium'} />
                </TableCell>

                <SortableTableCell sortKey="id">Order ID</SortableTableCell>
                <SortableTableCell sortKey="user">User</SortableTableCell>
                <SortableTableCell sortKey="project">Project</SortableTableCell>
                {!isMobile && <SortableTableCell sortKey="address">Address</SortableTableCell>}
                {!isMobile && <SortableTableCell sortKey="date">Date</SortableTableCell>}
                <SortableTableCell sortKey="status">Status</SortableTableCell>

                <TableCell sx={{ fontWeight: 600, fontSize: isMobile ? '0.75rem' : '0.875rem', color: colors.text.secondary, bgcolor: colors.cardBackground, borderBottom: `1px solid ${colors.border}`, padding: isMobile ? '8px 4px' : '16px', width: '48px' }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order, index) => (
                <TableRow key={`${order.id}-${index}`} hover selected={isSelected(index)} sx={{ height: isMobile ? '48px' : '64px', bgcolor: colors.cardBackground, '&:hover': { bgcolor: colors.hover }, '&.Mui-selected': { backgroundColor: isDarkMode ? `${theme.palette.primary.dark}40` : `${theme.palette.primary.light}30`, '&:hover': { backgroundColor: isDarkMode ? `${theme.palette.primary.dark}60` : `${theme.palette.primary.light}50` } }, '& .MuiTableCell-root': { borderBottom: `1px solid ${colors.border}`, padding: isMobile ? '8px 4px' : '16px' } }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected(index)} onChange={handleSelectRow(index)} sx={{ color: colors.text.secondary, '& .MuiSvgIcon-root': { color: colors.text.secondary }, '&.Mui-checked, &.Mui-checked .MuiSvgIcon-root': { color: tickColor } }} size={isMobile ? 'small' : 'medium'} />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text.primary, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{highlightText(order.id, searchTerm)}</Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 1.5 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: stringToColor(order.user.name),
                          opacity: 1,
                          transform: 'rotate(0deg)',
                          borderRadius: '50%' // Radius/8 equivalent
                        }}
                      >
                        {getInitials(order.user.name)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text.primary, fontSize: isMobile ? '0.75rem' : '0.875rem', ...(isMobile && { maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }) }}>
                        {highlightText(order.user.name, searchTerm)}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: colors.text.secondary, fontSize: isMobile ? '0.75rem' : '0.875rem', ...(isMobile && { maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }) }}>{highlightText(order.project, searchTerm)}</Typography>
                  </TableCell>

                  {!isMobile && <TableCell><Typography variant="body2" sx={{ color: colors.text.secondary, fontSize: '0.875rem' }}>{highlightText(order.address, searchTerm)}</Typography></TableCell>}
                  {!isMobile && (
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <CalendarToday sx={{ fontSize: 18, color: colors.text.secondary }} />
                        <Typography variant="body2" sx={{ color: colors.text.secondary, fontSize: '0.875rem' }}>{highlightText(order.date, searchTerm)}</Typography>
                      </Box>
                    </TableCell>
                  )}

                  <TableCell>
                    <Chip label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: getStatusColor(order.status).color }} /><span style={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}>{isMobile ? order.status.slice(0, 3) + (order.status.length > 3 ? '.' : '') : order.status}</span></Box>} size="small" sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem', fontWeight: 500, bgcolor: getStatusColor(order.status).bgcolor, borderColor: getStatusColor(order.status).border, color: getStatusColor(order.status).color, '& .MuiChip-label': { px: isMobile ? 0.5 : 1 } }} />
                  </TableCell>

                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, order)} sx={{ color: colors.text.secondary, '&:hover': { bgcolor: colors.hover, color: colors.text.primary } }}><MoreHoriz fontSize={isMobile ? 'small' : 'medium'} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* Fill empty rows */}
              {Array.from({ length: Math.max(0, itemsPerPage - paginatedOrders.length) }).map((_, idx) => (
                <TableRow key={`empty-${idx}`} sx={{ height: isMobile ? '48px' : '64px', bgcolor: colors.cardBackground, '& .MuiTableCell-root': { borderBottom: `1px solid ${colors.border}` } }}>
                  <TableCell colSpan={isMobile ? 5 : 7} />
                </TableRow>
              ))}

              {paginatedOrders.length === 0 && !searchTerm && (
                <TableRow sx={{ height: '200px' }}>
                  <TableCell colSpan={isMobile ? 5 : 7} sx={{ textAlign: 'center', borderBottom: 'none' }}>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>No orders available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', alignItems: 'center', mt: 3, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
          {!isMobile && <Typography variant="body2" sx={{ color: colors.text.secondary }}>Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders</Typography>}

          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" size={isMobile ? 'small' : 'medium'} showFirstButton={!isMobile} showLastButton={!isMobile} sx={{ '& .MuiPaginationItem-root': { color: colors.text.secondary, '&:hover': { bgcolor: colors.hover }, '&.Mui-selected': { bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, '&:hover': { bgcolor: theme.palette.primary.dark } } } }} />

          {isMobile && <Typography variant="caption" sx={{ color: colors.text.secondary, textAlign: 'center' }}>{Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}</Typography>}
        </Box>
      )}

      {/* Filter Menu */}
      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose} PaperProps={{ sx: { bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.15)', minWidth: 200, '& .MuiMenuItem-root': { color: colors.text.primary, fontSize: '0.875rem', '&:hover': { bgcolor: colors.hover } } } }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: 600 }}>Filter by Status</Typography>
          {['All', 'Complete', 'In Progress', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <MenuItem key={status} onClick={() => { handleFilterChange('status', status); handleFilterClose(); }} sx={{ bgcolor: activeFilters.status === status ? colors.hover : 'transparent', borderRadius: 1, mb: 0.5, '&:hover': { bgcolor: colors.hover } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {status !== 'All' && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: status === 'All' ? 'transparent' : getStatusColor(status).color }} />}
                {status}
                {activeFilters.status === status && <Box sx={{ ml: 'auto', color: theme.palette.primary.main }}>✓</Box>}
              </Box>
            </MenuItem>
          ))}

          {(activeFilters.status !== 'All' || activeFilters.dateRange !== 'All Time') && (
            <>
              <Divider sx={{ my: 1, borderColor: colors.border }} />
              <MenuItem onClick={() => { setActiveFilters({ status: 'All', dateRange: 'All Time' }); handleFilterClose(); }} sx={{ color: theme.palette.error.main + ' !important', '&:hover': { bgcolor: theme.palette.error.main + '20 !important' } }}>Clear All Filters</MenuItem>
            </>
          )}
        </Box>
      </Menu>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.15)', '& .MuiMenuItem-root': { color: colors.text.primary, fontSize: '0.875rem', '&:hover': { bgcolor: colors.hover } } } }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Order</MenuItem>
        <MenuItem onClick={handleMenuClose}>Download Invoice</MenuItem>
        <Divider sx={{ borderColor: colors.border }} />
        <MenuItem onClick={handleMenuClose} sx={{ color: theme.palette.error.main + ' !important', '&:hover': { bgcolor: theme.palette.error.main + '20 !important' } }}>Delete Order</MenuItem>
      </Menu>

      {/* Selected Items Actions Bar */}
      {selectedRows.length > 0 && (
        <Box sx={{ position: 'fixed', bottom: isMobile ? 16 : 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, bgcolor: colors.cardBackground, border: `1px solid ${colors.border}`, borderRadius: 2, px: 3, py: 2, boxShadow: isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.15)', display: 'flex', alignItems: 'center', gap: 2, flexDirection: isMobile ? 'column' : 'row', minWidth: isMobile ? '280px' : '320px' }}>
          <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedRows.length} order{selectedRows.length !== 1 ? 's' : ''} selected</Typography>

          <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'row' : 'row', width: isMobile ? '100%' : 'auto' }}>
            <Button size="small" onClick={() => setSelectedRows([])} sx={{ borderColor: colors.border, color: colors.text.secondary, '&:hover': { borderColor: theme.palette.primary.main, bgcolor: colors.hover }, flex: isMobile ? 1 : 'none' }}>Cancel</Button>
            <Button variant="contained" size="small" sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark }, flex: isMobile ? 1 : 'none' }}>Export</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
