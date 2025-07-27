import React, { useState, useMemo } from 'react';
import {
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
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Sort,
  MoreHoriz,
  Clear
} from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

const OrdersPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Dashboard theme colors - matching your dashboard design
  const dashboardColors = {
    light: {
      background: '#fafafa', // Light gray background
      cardBackground: '#ffffff',
      border: '#e5e7eb',
      text: {
        primary: '#111827',
        secondary: '#6b7280'
      },
      hover: '#f9fafb'
    },
    dark: {
      background: '#0f172a', // Dark slate background
      cardBackground: '#1e293b', // Slate 800
      border: '#334155', // Slate 600
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1'
      },
      hover: '#334155'
    }
  };

  const colors = isDarkMode ? dashboardColors.dark : dashboardColors.light;

  // Extended sample order data (20+ entries)
  const orders = [
    {
      id: '#CM9801',
      user: { name: 'Natali Craig', avatar: '👩‍💼' },
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress'
    },
    {
      id: '#CM9802',
      user: { name: 'Kate Morrison', avatar: '👩‍🦰' },
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete'
    },
    {
      id: '#CM9803',
      user: { name: 'Drew Cano', avatar: '👨‍🦱' },
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending'
    },
    {
      id: '#CM9804',
      user: { name: 'Orlando Diggs', avatar: '👨‍💼' },
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: 'Yesterday',
      status: 'Approved'
    },
    {
      id: '#CM9805',
      user: { name: 'Andi Lane', avatar: '👩‍🦳' },
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: 'Feb 2, 2023',
      status: 'Rejected'
    },
    {
      id: '#CM9806',
      user: { name: 'John Smith', avatar: '👨‍💻' },
      project: 'E-commerce Site',
      address: 'Broadway New York',
      date: 'Feb 3, 2023',
      status: 'In Progress'
    },
    {
      id: '#CM9807',
      user: { name: 'Sarah Johnson', avatar: '👩‍🎨' },
      project: 'Portfolio Website',
      address: 'Sunset Boulevard LA',
      date: 'Feb 4, 2023',
      status: 'Complete'
    },
    {
      id: '#CM9808',
      user: { name: 'Mike Davis', avatar: '👨‍🔧' },
      project: 'Mobile App',
      address: 'Michigan Avenue Chicago',
      date: 'Feb 5, 2023',
      status: 'Pending'
    },
    {
      id: '#CM9809',
      user: { name: 'Emma Wilson', avatar: '👩‍💻' },
      project: 'Dashboard Redesign',
      address: 'Pine Street Seattle',
      date: 'Feb 6, 2023',
      status: 'Approved'
    },
    {
      id: '#CM9810',
      user: { name: 'Alex Brown', avatar: '👨‍🎯' },
      project: 'Marketing Site',
      address: 'Oak Street Portland',
      date: 'Feb 7, 2023',
      status: 'Complete'
    },
    {
      id: '#CM9811',
      user: { name: 'Lisa Garcia', avatar: '👩‍🔬' },
      project: 'Data Analytics Platform',
      address: 'Main Street Boston',
      date: 'Feb 8, 2023',
      status: 'In Progress'
    },
    {
      id: '#CM9812',
      user: { name: 'David Miller', avatar: '👨‍🏫' },
      project: 'Learning Management System',
      address: 'University Avenue Austin',
      date: 'Feb 9, 2023',
      status: 'Pending'
    },
    {
      id: '#CM9813',
      user: { name: 'Rachel Green', avatar: '👩‍🎭' },
      project: 'Event Management App',
      address: 'Festival Street Miami',
      date: 'Feb 10, 2023',
      status: 'Rejected'
    },
    {
      id: '#CM9814',
      user: { name: 'Tom Anderson', avatar: '👨‍🚀' },
      project: 'Inventory System',
      address: 'Industrial Park Denver',
      date: 'Feb 11, 2023',
      status: 'Complete'
    },
    {
      id: '#CM9815',
      user: { name: 'Jennifer Lee', avatar: '👩‍⚕️' },
      project: 'Healthcare Portal',
      address: 'Medical Center Phoenix',
      date: 'Feb 12, 2023',
      status: 'Approved'
    },
    {
      id: '#CM9816',
      user: { name: 'Ryan Taylor', avatar: '👨‍🍳' },
      project: 'Restaurant Website',
      address: 'Food Street Nashville',
      date: 'Feb 13, 2023',
      status: 'In Progress'
    },
    {
      id: '#CM9817',
      user: { name: 'Amanda White', avatar: '👩‍🎵' },
      project: 'Music Streaming App',
      address: 'Entertainment District Vegas',
      date: 'Feb 14, 2023',
      status: 'Pending'
    },
    {
      id: '#CM9818',
      user: { name: 'Chris Martin', avatar: '👨‍🏋️' },
      project: 'Fitness Tracking App',
      address: 'Sports Complex Atlanta',
      date: 'Feb 15, 2023',
      status: 'Complete'
    },
    {
      id: '#CM9819',
      user: { name: 'Sophia Rodriguez', avatar: '👩‍🌾' },
      project: 'Agriculture Platform',
      address: 'Farm Road Kansas City',
      date: 'Feb 16, 2023',
      status: 'Approved'
    },
    {
      id: '#CM9820',
      user: { name: 'James Wilson', avatar: '👨‍🔬' },
      project: 'Research Database',
      address: 'Campus Drive Stanford',
      date: 'Feb 17, 2023',
      status: 'In Progress'
    }
  ];

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) {
      return orders;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchLower) ||
      order.user.name.toLowerCase().includes(searchLower) ||
      order.project.toLowerCase().includes(searchLower) ||
      order.address.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.date.toLowerCase().includes(searchLower)
    );
  }, [orders, searchTerm]);

  // Paginate filtered orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setSelectedRows([]);
  };

  // Handle pagination change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  // Dashboard consistent status colors
  const getStatusColor = (status) => {
    const statusColors = {
      'Complete': { 
        light: { color: '#059669', bgcolor: '#d1fae5', border: '#a7f3d0' },
        dark: { color: '#6ee7b7', bgcolor: '#064e3b', border: '#065f46' }
      },
      'In Progress': { 
        light: { color: '#2563eb', bgcolor: '#dbeafe', border: '#93c5fd' },
        dark: { color: '#60a5fa', bgcolor: '#1e3a8a', border: '#1d4ed8' }
      },
      'Pending': { 
        light: { color: '#d97706', bgcolor: '#fef3c7', border: '#fcd34d' },
        dark: { color: '#fbbf24', bgcolor: '#451a03', border: '#92400e' }
      },
      'Approved': { 
        light: { color: '#7c3aed', bgcolor: '#ede9fe', border: '#c4b5fd' },
        dark: { color: '#a78bfa', bgcolor: '#4c1d95', border: '#5b21b6' }
      },
      'Rejected': { 
        light: { color: '#dc2626', bgcolor: '#fee2e2', border: '#fca5a5' },
        dark: { color: '#f87171', bgcolor: '#7f1d1d', border: '#991b1b' }
      }
    };
    
    return statusColors[status]?.[isDarkMode ? 'dark' : 'light'] || 
           { color: colors.text.secondary, bgcolor: colors.background, border: colors.border };
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(paginatedOrders.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => (event) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter(i => i !== index));
    }
  };

  const isSelected = (index) => selectedRows.includes(index);
  const isAllSelected = selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < paginatedOrders.length;

  return (
    <Box sx={{ 
      p: 3,
      bgcolor: colors.background,
      minHeight: '100vh'
    }}>
      {/* Page Title and Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '20px',
              lineHeight: '20px',
              letterSpacing: '0%',
              color: colors.text.primary,
            }}
          >
            Order List
          </Typography>

          {/* Search Results Counter */}
          {searchTerm && (
            <Typography
              variant="body2"
              sx={{
                color: colors.text.secondary,
                bgcolor: colors.cardBackground,
                border: `1px solid ${colors.border}`,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem'
              }}
            >
              {filteredOrders.length} of {orders.length} orders
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Dashboard-themed Icon Buttons */}
          <IconButton 
            sx={{ 
              border: `1px solid ${colors.border}`,
              color: colors.text.secondary,
              bgcolor: colors.cardBackground,
              '&:hover': {
                bgcolor: colors.hover,
                borderColor: theme.palette.primary.main,
                color: colors.text.primary
              }
            }}
          >
            <Add />
          </IconButton>
          <IconButton 
            sx={{ 
              border: `1px solid ${colors.border}`,
              color: colors.text.secondary,
              bgcolor: colors.cardBackground,
              '&:hover': {
                bgcolor: colors.hover,
                borderColor: theme.palette.primary.main,
                color: colors.text.primary
              }
            }}
          >
            <FilterList />
          </IconButton>
          <IconButton 
            sx={{ 
              border: `1px solid ${colors.border}`,
              color: colors.text.secondary,
              bgcolor: colors.cardBackground,
              '&:hover': {
                bgcolor: colors.hover,
                borderColor: theme.palette.primary.main,
                color: colors.text.primary
              }
            }}
          >
            <Sort />
          </IconButton>
          
          {/* Dashboard-themed Search Field */}
          <TextField
            placeholder="Search orders..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ 
              width: 250, 
              bgcolor: colors.cardBackground,
              '& .MuiOutlinedInput-root': {
                color: colors.text.primary,
                '& fieldset': {
                  borderColor: colors.border,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: colors.text.secondary,
                opacity: 1,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: colors.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    sx={{ 
                      color: colors.text.secondary,
                      '&:hover': { 
                        color: colors.text.primary,
                        bgcolor: colors.hover
                      }
                    }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Search Results Message */}
      {searchTerm && filteredOrders.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 2, 
            mb: 2,
            bgcolor: colors.cardBackground,
            borderRadius: 1,
            border: `1px solid ${colors.border}`
          }}
        >
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            No orders found for "<strong>{searchTerm}</strong>"
          </Typography>
          <Typography variant="caption" sx={{ color: colors.text.secondary, mt: 0.5, display: 'block' }}>
            Try adjusting your search terms or clear the search to see all orders
          </Typography>
        </Box>
      )}

      {/* Orders Table - Dashboard Theme */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%',
          minHeight: '400px',
          maxHeight: '400px',
          boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: colors.cardBackground,
          border: `1px solid ${colors.border}`
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell 
                padding="checkbox"
                sx={{ 
                  bgcolor: colors.cardBackground,
                  borderBottom: `1px solid ${colors.border}`
                }}
              >
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                  disabled={paginatedOrders.length === 0}
                  sx={{
                    color: colors.text.secondary,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    }
                  }}
                />
              </TableCell>
              {['Order ID', 'User', 'Project', 'Address', 'Date', 'Status', ''].map((header) => (
                <TableCell 
                  key={header}
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.875rem', 
                    color: colors.text.secondary,
                    bgcolor: colors.cardBackground,
                    borderBottom: `1px solid ${colors.border}`
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => {
              // Dashboard-themed highlight
              const highlightText = (text, searchTerm) => {
                if (!searchTerm.trim()) return text;
                
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const parts = text.split(regex);
                
                return parts.map((part, i) => 
                  regex.test(part) ? (
                    <span 
                      key={i} 
                      style={{ 
                        backgroundColor: isDarkMode ? '#fbbf24' : '#fef3c7', 
                        color: isDarkMode ? '#000' : '#92400e',
                        fontWeight: 600,
                        borderRadius: '2px',
                        padding: '1px 2px'
                      }}
                    >
                      {part}
                    </span>
                  ) : part
                );
              };

              return (
                <TableRow
                  key={`${order.id}-${index}`}
                  hover
                  selected={isSelected(index)}
                  sx={{ 
                    height: '64px',
                    bgcolor: colors.cardBackground,
                    '&:hover': {
                      bgcolor: colors.hover
                    },
                    '&.Mui-selected': { 
                      backgroundColor: isDarkMode ? `${theme.palette.primary.dark}40` : `${theme.palette.primary.light}30`,
                      '&:hover': {
                        backgroundColor: isDarkMode ? `${theme.palette.primary.dark}60` : `${theme.palette.primary.light}50`
                      }
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: `1px solid ${colors.border}`
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(index)}
                      onChange={handleSelectRow(index)}
                      sx={{
                        color: colors.text.secondary,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        color: colors.text.primary
                      }}
                    >
                      {highlightText(order.id, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>{order.user.avatar}</Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600, 
                          color: colors.text.primary
                        }}
                      >
                        {highlightText(order.user.name, searchTerm)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: colors.text.secondary }}
                    >
                      {highlightText(order.project, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: colors.text.secondary }}
                    >
                      {highlightText(order.address, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: colors.text.secondary }}
                    >
                      {highlightText(order.date, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: getStatusColor(order.status).color
                            }}
                          />
                          {highlightText(order.status, searchTerm)}
                        </Box>
                      }
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        bgcolor: getStatusColor(order.status).bgcolor,
                        borderColor: getStatusColor(order.status).border,
                        color: getStatusColor(order.status).color,
                        '& .MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small"
                      sx={{
                        color: colors.text.secondary,
                        '&:hover': {
                          bgcolor: colors.hover,
                          color: colors.text.primary
                        }
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* Fill empty rows to maintain consistent height */}
            {Array.from({ length: Math.max(0, itemsPerPage - paginatedOrders.length) }).map((_, index) => (
              <TableRow 
                key={`empty-${index}`} 
                sx={{ 
                  height: '64px',
                  bgcolor: colors.cardBackground,
                  '& .MuiTableCell-root': {
                    borderBottom: `1px solid ${colors.border}`
                  }
                }}
              >
                <TableCell colSpan={8}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dashboard-themed Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        {/* Results Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: colors.text.secondary }}
          >
            Showing {paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </Typography>
          {searchTerm && (
            <Typography 
              variant="body2" 
              sx={{ color: colors.text.secondary }}
            >
              (filtered from {orders.length} total entries)
            </Typography>
          )}
        </Box>
        
        {/* Dashboard-themed Pagination */}
        <Pagination 
          count={totalPages} 
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          disabled={filteredOrders.length === 0}
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 500,
              color: colors.text.primary,
              bgcolor: colors.cardBackground,
              border: `1px solid ${colors.border}`,
              '&:hover': {
                bgcolor: colors.hover,
                borderColor: theme.palette.primary.main
              },
              '&.Mui-disabled': {
                color: colors.text.secondary,
                bgcolor: colors.cardBackground,
                borderColor: colors.border,
                opacity: 0.5
              }
            },
            '& .Mui-selected': {
              bgcolor: `${theme.palette.primary.main} !important`,
              color: 'white !important',
              borderColor: `${theme.palette.primary.main} !important`,
              '&:hover': {
                bgcolor: `${theme.palette.primary.dark} !important`
              }
            },
            '& .MuiPaginationItem-ellipsis': {
              color: colors.text.secondary
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default OrdersPage;