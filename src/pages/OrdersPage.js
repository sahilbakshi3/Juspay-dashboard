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
  
  const theme = useTheme(); // Get current theme
  const isDarkMode = theme.palette.mode === 'dark';

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

  // Dark mode aware status colors
  const getStatusColor = (status) => {
    const baseColors = {
      'Complete': { 
        light: { color: 'success', bgcolor: '#e8f5e8' },
        dark: { color: 'success', bgcolor: '#1b4332' }
      },
      'In Progress': { 
        light: { color: 'primary', bgcolor: '#e3f2fd' },
        dark: { color: 'primary', bgcolor: '#1e3a8a' }
      },
      'Pending': { 
        light: { color: 'warning', bgcolor: '#fff8e1' },
        dark: { color: 'warning', bgcolor: '#451a03' }
      },
      'Approved': { 
        light: { color: 'secondary', bgcolor: '#f3e5f5' },
        dark: { color: 'secondary', bgcolor: '#4c1d95' }
      },
      'Rejected': { 
        light: { color: 'error', bgcolor: '#ffebee' },
        dark: { color: 'error', bgcolor: '#7f1d1d' }
      }
    };
    
    return baseColors[status]?.[isDarkMode ? 'dark' : 'light'] || 
           { color: 'default', bgcolor: isDarkMode ? '#374151' : '#f5f5f5' };
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
      bgcolor: isDarkMode ? 'background.default' : 'transparent',
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
            color: isDarkMode ? 'text.secondary' : 'black.600', // Use theme-aware color instead of hardcoded
          }}
        >
          Order List
        </Typography>

          {/* Search Results Counter */}
          {searchTerm && (
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? 'text.secondary' : 'grey.600',
                bgcolor: isDarkMode ? 'grey.800' : 'grey.100',
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
          {/* Enhanced Icon Buttons for Dark Mode */}
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: isDarkMode ? 'grey.600' : 'grey.300',
              color: isDarkMode ? 'text.primary' : 'grey.700',
              bgcolor: isDarkMode ? 'grey.800' : 'transparent',
              '&:hover': {
                bgcolor: isDarkMode ? 'grey.700' : 'grey.50',
                borderColor: isDarkMode ? 'grey.500' : 'grey.400'
              }
            }}
          >
            <Add />
          </IconButton>
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: isDarkMode ? 'grey.600' : 'grey.300',
              color: isDarkMode ? 'text.primary' : 'grey.700',
              bgcolor: isDarkMode ? 'grey.800' : 'transparent',
              '&:hover': {
                bgcolor: isDarkMode ? 'grey.700' : 'grey.50',
                borderColor: isDarkMode ? 'grey.500' : 'grey.400'
              }
            }}
          >
            <FilterList />
          </IconButton>
          <IconButton 
            sx={{ 
              border: 1, 
              borderColor: isDarkMode ? 'grey.600' : 'grey.300',
              color: isDarkMode ? 'text.primary' : 'grey.700',
              bgcolor: isDarkMode ? 'grey.800' : 'transparent',
              '&:hover': {
                bgcolor: isDarkMode ? 'grey.700' : 'grey.50',
                borderColor: isDarkMode ? 'grey.500' : 'grey.400'
              }
            }}
          >
            <Sort />
          </IconButton>
          
          {/* Enhanced Search Field for Dark Mode */}
          <TextField
            placeholder="Search orders..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ 
              width: 250, 
              bgcolor: isDarkMode ? 'grey.800' : '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                color: isDarkMode ? 'text.primary' : 'inherit',
                '& fieldset': {
                  borderColor: isDarkMode ? 'grey.600' : 'grey.300',
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? 'primary.light' : 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: isDarkMode ? 'grey.400' : 'grey.500',
                opacity: 1,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: isDarkMode ? 'grey.400' : 'grey.500' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    sx={{ 
                      color: isDarkMode ? 'grey.400' : 'grey.500',
                      '&:hover': { 
                        color: isDarkMode ? 'grey.200' : 'grey.700',
                        bgcolor: isDarkMode ? 'grey.700' : 'grey.100'
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
            bgcolor: isDarkMode ? 'grey.900' : 'grey.50',
            borderRadius: 1,
            border: '1px solid',
            borderColor: isDarkMode ? 'grey.700' : 'grey.200'
          }}
        >
          <Typography variant="body2" sx={{ color: isDarkMode ? 'text.secondary' : 'grey.600' }}>
            No orders found for "<strong>{searchTerm}</strong>"
          </Typography>
          <Typography variant="caption" sx={{ color: isDarkMode ? 'grey.500' : 'grey.500', mt: 0.5, display: 'block' }}>
            Try adjusting your search terms or clear the search to see all orders
          </Typography>
        </Box>
      )}

      {/* Orders Table - Dark Mode Enhanced */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '892px', 
          minHeight: '400px',
          maxHeight: '400px',
          boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: isDarkMode ? 'grey.900' : 'background.paper',
          border: isDarkMode ? '1px solid' : 'none',
          borderColor: isDarkMode ? 'grey.700' : 'transparent'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: isDarkMode ? 'grey.800' : 'inherit' }}>
              <TableCell 
                padding="checkbox"
                sx={{ 
                  bgcolor: isDarkMode ? 'grey.800' : 'inherit',
                  borderBottom: isDarkMode ? '1px solid' : 'inherit',
                  borderColor: isDarkMode ? 'grey.700' : 'inherit'
                }}
              >
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                  disabled={paginatedOrders.length === 0}
                  sx={{
                    color: isDarkMode ? 'grey.400' : 'inherit',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    }
                  }}
                />
              </TableCell>
              {['Order ID', 'User', 'Project', 'Address', 'Date', 'Status', ''].map((header, index) => (
                <TableCell 
                  key={header}
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.875rem', 
                    color: isDarkMode ? 'text.secondary' : 'grey.600',
                    bgcolor: isDarkMode ? 'grey.800' : 'inherit',
                    borderBottom: isDarkMode ? '1px solid' : 'inherit',
                    borderColor: isDarkMode ? 'grey.700' : 'inherit'
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => {
              // Enhanced highlight for dark mode
              const highlightText = (text, searchTerm) => {
                if (!searchTerm.trim()) return text;
                
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const parts = text.split(regex);
                
                return parts.map((part, i) => 
                  regex.test(part) ? (
                    <span 
                      key={i} 
                      style={{ 
                        backgroundColor: isDarkMode ? '#fbbf24' : '#fff59d', 
                        color: isDarkMode ? '#000' : 'inherit',
                        fontWeight: 600 
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
                    bgcolor: isDarkMode ? 'grey.900' : 'inherit',
                    '&:hover': {
                      bgcolor: isDarkMode ? 'grey.800' : 'grey.50'
                    },
                    '&.Mui-selected': { 
                      backgroundColor: isDarkMode ? 'primary.dark' : '#e3f2fd !important',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'primary.dark' : '#bbdefb !important'
                      }
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: isDarkMode ? '1px solid' : 'inherit',
                      borderColor: isDarkMode ? 'grey.700' : 'inherit'
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(index)}
                      onChange={handleSelectRow(index)}
                      sx={{
                        color: isDarkMode ? 'grey.400' : 'inherit',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        color: isDarkMode ? 'text.primary' : '#1a1a1a' 
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
                          color: isDarkMode ? 'text.primary' : '#1a1a1a' 
                        }}
                      >
                        {highlightText(order.user.name, searchTerm)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: isDarkMode ? 'text.secondary' : 'grey.600' }}
                    >
                      {highlightText(order.project, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: isDarkMode ? 'text.secondary' : 'grey.600' }}
                    >
                      {highlightText(order.address, searchTerm)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ color: isDarkMode ? 'text.secondary' : 'grey.600' }}
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
                              bgcolor: order.status === 'Complete' ? '#10b981' :
                                      order.status === 'In Progress' ? '#3b82f6' :
                                      order.status === 'Pending' ? '#f59e0b' :
                                      order.status === 'Approved' ? '#8b5cf6' :
                                      order.status === 'Rejected' ? '#ef4444' : '#6b7280'
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
                        borderColor: 'transparent',
                        color: isDarkMode ? 'text.primary' : 'inherit',
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
                        color: isDarkMode ? 'grey.400' : 'grey.400',
                        '&:hover': {
                          bgcolor: isDarkMode ? 'grey.700' : 'grey.100',
                          color: isDarkMode ? 'grey.200' : 'grey.600'
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
                  bgcolor: isDarkMode ? 'grey.900' : 'inherit',
                  '& .MuiTableCell-root': {
                    borderBottom: isDarkMode ? '1px solid' : 'inherit',
                    borderColor: isDarkMode ? 'grey.700' : 'inherit'
                  }
                }}
              >
                <TableCell colSpan={8}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Enhanced Pagination and Info for Dark Mode */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        {/* Results Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: isDarkMode ? 'text.secondary' : 'grey.600' }}
          >
            Showing {paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </Typography>
          {searchTerm && (
            <Typography 
              variant="body2" 
              sx={{ color: isDarkMode ? 'grey.500' : 'grey.500' }}
            >
              (filtered from {orders.length} total entries)
            </Typography>
          )}
        </Box>
        
        {/* Enhanced Pagination for Dark Mode */}
        <Pagination 
          count={totalPages} 
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          disabled={filteredOrders.length === 0}
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 500,
              color: isDarkMode ? 'text.primary' : 'inherit',
              bgcolor: isDarkMode ? 'grey.800' : 'transparent',
              border: isDarkMode ? '1px solid' : 'none',
              borderColor: isDarkMode ? 'grey.600' : 'transparent',
              '&:hover': {
                bgcolor: isDarkMode ? 'grey.700' : 'grey.100',
                borderColor: isDarkMode ? 'grey.500' : 'transparent'
              },
              '&.Mui-disabled': {
                color: isDarkMode ? 'grey.600' : 'grey.400',
                bgcolor: isDarkMode ? 'grey.900' : 'transparent',
                borderColor: isDarkMode ? 'grey.700' : 'transparent'
              }
            },
            '& .Mui-selected': {
              bgcolor: 'primary.main !important',
              color: 'white !important',
              borderColor: 'primary.main !important',
              '&:hover': {
                bgcolor: 'primary.dark !important'
              }
            },
            '& .MuiPaginationItem-ellipsis': {
              color: isDarkMode ? 'text.secondary' : 'inherit'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default OrdersPage;
