// src/pages/OrdersPage.js
import React, { useState, useMemo, useEffect } from "react";
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
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Add,
  FilterList,
  Clear,
  MoreHoriz,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// profile images (adjust paths if needed)
import nataliCraig from "../assets/images/profiles/natali-craig.png";
import drewCano from "../assets/images/profiles/drew-cano.png";
import orlandoDiggs from "../assets/images/profiles/orlando-diggs.png";
import andiLane from "../assets/images/profiles/andi-lane.png";
import kateMorrison from "../assets/images/profiles/kate-morrison.png";
import korayOkumus from "../assets/images/profiles/koray-okumus.png";

/* ---------- small custom sort icon ---------- */
const ArrowDownUp = (props) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="m21 16-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m3 8 4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---------- your provided left pagination SVG (decorative) ---------- */
const LeftPaginationSVG = ({ style }) => (
  <svg width="244" height="28" viewBox="0 0 244 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", ...style }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.9254 8.55806C17.1915 8.80214 17.1915 9.19786 16.9254 9.44194L12.4375 13.5581C12.1714 13.8021 12.1714 14.1979 12.4375 14.4419L16.9254 18.5581C17.1915 18.8021 17.1915 19.1979 16.9254 19.4419C16.6593 19.686 16.2278 19.686 15.9617 19.4419L11.4738 15.3258C10.6754 14.5936 10.6754 13.4064 11.4738 12.6742L15.9617 8.55806C16.2278 8.31398 16.6593 8.31398 16.9254 8.55806Z" fill="#1C1C1C"/>
    <path d="M36 12.8C36 8.31958 36 6.07937 36.8719 4.36808C37.6389 2.86278 38.8628 1.63893 40.3681 0.871948C42.0794 0 44.3196 0 48.8 0H51.2C55.6804 0 57.9206 0 59.6319 0.871948C61.1372 1.63893 62.3611 2.86278 63.1281 4.36808C64 6.07937 64 8.31958 64 12.8V15.2C64 19.6804 64 21.9206 63.1281 23.6319C62.3611 25.1372 61.1372 26.3611 59.6319 27.1281C57.9206 28 55.6804 28 51.2 28H48.8C44.3196 28 42.0794 28 40.3681 27.1281C38.8628 26.3611 37.6389 25.1372 36.8719 23.6319C36 21.9206 36 19.6804 36 15.2V12.8Z" fill="#1C1C1C" fillOpacity="0.05"/>
    <path d="M51.2255 8.81818V19H49.9925V10.608H49.913C49.8666 10.7008 49.7473 10.8068 49.555 10.9261C49.3628 11.0421 49.1142 11.1449 48.8093 11.2344C48.5044 11.3205 48.1564 11.3636 47.7653 11.3636V10.3295C48.1597 10.3295 48.5011 10.2583 48.7894 10.1158C49.0778 9.97325 49.3181 9.80587 49.5103 9.61364C49.7058 9.4214 49.8533 9.2474 49.9528 9.09162C50.0555 8.93584 50.1152 8.8447 50.1317 8.81818H51.2255Z" fill="#1C1C1C"/>
    <path d="M82.8157 19V18.1051L86.1765 14.4261C86.5709 13.9953 86.8957 13.6207 87.1509 13.3026C87.4061 12.9811 87.5951 12.6795 87.7177 12.3977C87.8436 12.1127 87.9066 11.8144 87.9066 11.5028C87.9066 11.1449 87.8204 10.835 87.6481 10.5732C87.479 10.3113 87.247 10.1091 86.9521 9.96662C86.6571 9.8241 86.3256 9.75284 85.9577 9.75284C85.5666 9.75284 85.2253 9.83404 84.9336 9.99645C84.6452 10.1555 84.4215 10.3793 84.2624 10.6676C84.1067 10.956 84.0288 11.294 84.0288 11.6818H82.8555C82.8555 11.0852 82.993 10.5616 83.2681 10.1108C83.5432 9.66004 83.9177 9.30871 84.3917 9.05682C84.869 8.80492 85.4042 8.67898 85.9975 8.67898C86.5941 8.67898 87.1228 8.80492 87.5835 9.05682C88.0442 9.30871 88.4054 9.64844 88.6673 10.076C88.9291 10.5036 89.06 10.9792 89.06 11.5028C89.06 11.8774 88.9921 12.2436 88.8562 12.6016C88.7236 12.9562 88.4916 13.3523 88.1602 13.7898C87.832 14.224 87.3763 14.7543 86.793 15.3807L84.506 17.8267V17.9062H89.239V19H82.8157Z" fill="#1C1C1C"/>
    <path d="M118.499 16.4545H119.752C119.789 16.7992 119.906 17.0909 120.105 17.3295C120.307 17.5649 120.569 17.7438 120.891 17.8665C121.212 17.9858 121.569 18.0455 121.96 18.0455C122.384 18.0455 122.765 17.9742 123.103 17.8317C123.441 17.6892 123.71 17.477 123.908 17.1953C124.107 16.9103 124.207 16.5573 124.207 16.1364C124.207 15.7685 124.121 15.4271 123.948 15.1122C123.776 14.794 123.499 14.5372 123.118 14.3416C122.737 14.1461 122.231 14.0483 121.602 14.0483H120.786V13.054L123.332 9.99148V9.91193H118.997V8.81818H125.022V9.71307L122.298 13.0142V13.0938C122.735 13.1136 123.143 13.2031 123.521 13.3622C123.902 13.5213 124.233 13.7367 124.515 14.0085C124.8 14.2803 125.022 14.5968 125.181 14.9581C125.34 15.3194 125.42 15.7121 125.42 16.1364C125.42 16.7164 125.271 17.2334 124.972 17.6875C124.677 18.1383 124.268 18.4929 123.744 18.7514C123.224 19.0099 122.622 19.1392 121.94 19.1392C121.336 19.1392 120.781 19.0331 120.274 18.821C119.767 18.6089 119.354 18.3023 119.036 17.9013C118.718 17.5002 118.539 17.018 118.499 16.4545Z" fill="#1C1C1C"/>
    <path d="M154.324 16.9119V15.8977L158.401 8.81818H159.614L155.637 15.7386V15.8182H161.682V16.9119H154.324ZM159.117 19V16.6136V16.1314V12.6364H160.29V19H159.117Z" fill="#1C1C1C"/>
    <path d="M193.977 19.1392C193.394 19.1392 192.868 19.0232 192.401 18.7912C191.934 18.5592 191.559 18.241 191.277 17.8366C190.996 17.4323 190.842 16.9716 190.815 16.4545H192.008C192.055 16.9152 192.263 17.2964 192.635 17.598C193.009 17.8963 193.457 18.0455 193.977 18.0455C194.395 18.0455 194.766 17.9477 195.091 17.7521C195.419 17.5566 195.676 17.2881 195.861 16.9467C196.05 16.602 196.145 16.2126 196.145 15.7784C196.145 15.3343 196.047 14.9382 195.851 14.5902C195.659 14.2389 195.394 13.9621 195.056 13.7599C194.718 13.5578 194.332 13.455 193.897 13.4517C193.586 13.4484 193.266 13.4964 192.938 13.5959C192.61 13.692 192.34 13.8163 192.128 13.9688L190.974 13.8295L191.591 8.81818H196.88V9.91193H192.625L192.267 12.9148H192.326C192.535 12.7491 192.797 12.6115 193.112 12.5021C193.427 12.3928 193.755 12.3381 194.096 12.3381C194.719 12.3381 195.275 12.4872 195.762 12.7855C196.252 13.0805 196.637 13.4848 196.915 13.9986C197.197 14.5123 197.338 15.099 197.338 15.7585C197.338 16.4081 197.192 16.9882 196.9 17.4986C196.612 18.0057 196.214 18.4067 195.707 18.7017C195.2 18.9934 194.623 19.1392 193.977 19.1392Z" fill="#1C1C1C"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M227.075 19.4419C226.808 19.1979 226.808 18.8021 227.075 18.5581L231.563 14.4419C231.829 14.1979 231.829 13.8021 231.563 13.5581L227.075 9.44194C226.808 9.19786 226.808 8.80214 227.075 8.55806C227.341 8.31398 227.772 8.31398 228.038 8.55806L232.526 12.6742C233.325 13.4064 233.325 14.5936 232.526 15.3258L228.038 19.4419C227.772 19.686 227.341 19.686 227.075 19.4419Z" fill="#1C1C1C"/>
  </svg>
);

/* ---------- CustomPagination component (only pagination UI) ---------- */
const CustomPagination = ({ totalPages, currentPage, onChange, themeMode }) => {
  const theme = useTheme();
  const isDark = themeMode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getWindow = (total, page) => {
    const maxButtons = 7;
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);
    const result = [];
    const left = Math.max(2, page - 2);
    const right = Math.min(total - 1, page + 2);
    result.push(1);
    if (left > 2) result.push("left-ellipsis");
    for (let i = left; i <= right; i++) result.push(i);
    if (right < total - 1) result.push("right-ellipsis");
    result.push(total);
    return result;
  };

  const pages = getWindow(totalPages, currentPage);

  const pageButtonStyle = (active) => ({
    minWidth: 32,
    height: 28,
    borderRadius: 4,
    padding: "0 8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: active ? "default" : "pointer",
    background: active ? (isDark ? "var(--black-5, #FFFFFF1A)" : "var(--black-5, #1C1C1C0D)") : "transparent",
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    fontWeight: active ? 700 : 500,
    border: "none"
  });

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: { xs: 0.5, sm: 1 },
      flexWrap: isMobile ? "wrap" : "nowrap",
      justifyContent: "flex-end"
    }}>
      <IconButton 
        size="small" 
        onClick={() => onChange(Math.max(1, currentPage - 1))} 
        disabled={currentPage === 1} 
        sx={{ width: 36, height: 28 }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>

      <Box sx={{ display: "inline-flex", gap: 0.5, alignItems: "center" }}>
        {pages.map((p, idx) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            <Box key={p + idx} sx={{ px: 1.25, color: "text.secondary" }}>…</Box>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              style={pageButtonStyle(p === currentPage)}
            >
              {p}
            </button>
          )
        )}
      </Box>

      <IconButton 
        size="small" 
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))} 
        disabled={currentPage === totalPages} 
        sx={{ width: 36, height: 28 }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
};

/* ---------- OrdersPage main component ---------- */
const OrdersPage = ({ isMobile: propIsMobile, isTablet: propIsTablet }) => {
  const theme = useTheme();
  const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletBreakpoint = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const isMobile = propIsMobile !== undefined ? propIsMobile : isMobileBreakpoint;
  const isTablet = propIsTablet !== undefined ? propIsTablet : isTabletBreakpoint;

  // state
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ status: "All", dateRange: "All Time" });

  // fixed items per page
  const itemsPerPage = 10;

  const isDarkMode = theme.palette.mode === "dark";
  const tickColor = isDarkMode ? "#C6C7F8" : "#1C1C1C";

  const dashboardColors = {
    light: { background: "#ffffff", cardBackground: "#ffffff", border: "rgba(0,0,0,0.12)", text: { primary: "#111827", secondary: "#6b7280" }, hover: "#f9fafb" },
    dark: { background: "#0b0b0b", cardBackground: "#0b0b0b", border: "rgba(255,255,255,0.06)", text: { primary: "#fff", secondary: "#cbd5e1" }, hover: "#111111" },
  };
  const colors = isDarkMode ? dashboardColors.dark : dashboardColors.light;

  // status color map (moved out to avoid inline object-with-spaces syntax)
  const statusColorMap = {
    "In Progress": "#3b82f6",
    "Complete": "#10b981",
    "Pending": "#06b6d4",
    "Approved": "#f59e0b",
    "Rejected": "#9ca3af"
  };

  // avatar helpers
  const profileImageMap = {
    "Natali Craig": nataliCraig,
    "Kate Morrison": kateMorrison,
    "Drew Cano": drewCano,
    "Orlando Diggs": orlandoDiggs,
    "Andi Lane": andiLane,
    "Koray Okumus": korayOkumus,
  };
  const getProfileImage = (name) => profileImageMap[name] || [nataliCraig, kateMorrison, drewCano, orlandoDiggs, andiLane, korayOkumus][name.length % 6];
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // orders array (unchanged)
  const orders = [
    { id: "#CM9801", user: { name: "Natali Craig", avatar: null }, project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress", dateSort: new Date("2024-02-28T10:00:00") },
    { id: "#CM9802", user: { name: "Kate Morrison", avatar: null }, project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete", dateSort: new Date("2024-02-28T09:59:00") },
    { id: "#CM9803", user: { name: "Drew Cano", avatar: null }, project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending", dateSort: new Date("2024-02-28T09:00:00") },
    { id: "#CM9804", user: { name: "Orlando Diggs", avatar: null }, project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved", dateSort: new Date("2024-02-27T10:00:00") },
    { id: "#CM9805", user: { name: "Andi Lane", avatar: null }, project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected", dateSort: new Date("2023-02-02T10:00:00") },
    { id: "#CM9806", user: { name: "John Smith", avatar: null }, project: "E-commerce Site", address: "Broadway New York", date: "Feb 3, 2023", status: "In Progress", dateSort: new Date("2023-02-03T10:00:00") },
    { id: "#CM9807", user: { name: "Sarah Johnson", avatar: null }, project: "Portfolio Website", address: "Sunset Boulevard LA", date: "Feb 4, 2023", status: "Complete", dateSort: new Date("2023-02-04T10:00:00") },
    { id: "#CM9808", user: { name: "Mike Davis", avatar: null }, project: "Mobile App", address: "Michigan Avenue Chicago", date: "Feb 5, 2023", status: "Pending", dateSort: new Date("2023-02-05T10:00:00") },
    { id: "#CM9809", user: { name: "Emma Wilson", avatar: null }, project: "Dashboard Redesign", address: "Pine Street Seattle", date: "Feb 6, 2023", status: "Approved", dateSort: new Date("2023-02-06T10:00:00") },
    { id: "#CM9810", user: { name: "Alex Brown", avatar: null }, project: "Marketing Site", address: "Oak Street Portland", date: "Feb 7, 2023", status: "Complete", dateSort: new Date("2023-02-07T10:00:00") },
    { id: "#CM9811", user: { name: "Lisa Garcia", avatar: null }, project: "Data Analytics Platform", address: "Main Street Boston", date: "Feb 8, 2023", status: "In Progress", dateSort: new Date("2023-02-08T10:00:00") },
    { id: "#CM9812", user: { name: "David Miller", avatar: null }, project: "Learning Management System", address: "University Avenue Austin", date: "Feb 9, 2023", status: "Pending", dateSort: new Date("2023-02-09T10:00:00") },
    { id: "#CM9813", user: { name: "Rachel Green", avatar: null }, project: "Event Management App", address: "Festival Street Miami", date: "Feb 10, 2023", status: "Rejected", dateSort: new Date("2023-02-10T10:00:00") },
    { id: "#CM9814", user: { name: "Tom Anderson", avatar: null }, project: "Inventory System", address: "Industrial Park Denver", date: "Feb 11, 2023", status: "Complete", dateSort: new Date("2023-02-11T10:00:00") },
    { id: "#CM9815", user: { name: "Jennifer Lee", avatar: null }, project: "Healthcare Portal", address: "Medical Center Phoenix", date: "Feb 12, 2023", status: "Approved", dateSort: new Date("2023-02-12T10:00:00") },
    { id: "#CM9816", user: { name: "Brian White", avatar: null }, project: "Job Board App", address: "King Street Charleston", date: "Feb 13, 2023", status: "Pending", dateSort: new Date("2023-02-13T10:00:00") },
    { id: "#CM9817", user: { name: "Olivia Moore", avatar: null }, project: "HR Management Tool", address: "Queen Street Toronto", date: "Feb 14, 2023", status: "Complete", dateSort: new Date("2023-02-14T10:00:00") },
    { id: "#CM9818", user: { name: "Ethan Taylor", avatar: null }, project: "Design System", address: "Creative Avenue Atlanta", date: "Feb 15, 2023", status: "In Progress", dateSort: new Date("2023-02-15T10:00:00") },
    { id: "#CM9819", user: { name: "Sophia Martin", avatar: null }, project: "Disaster Response Portal", address: "Firehouse Road Houston", date: "Feb 16, 2023", status: "Approved", dateSort: new Date("2023-02-16T10:00:00") },
    { id: "#CM9820", user: { name: "Daniel Walker", avatar: null }, project: "Recipe App", address: "Baker Street London", date: "Feb 17, 2023", status: "Rejected", dateSort: new Date("2023-02-17T10:00:00") },
    { id: "#CM9821", user: { name: "Ella Harris", avatar: null }, project: "Customer Support Dashboard", address: "Helpdesk Lane Dallas", date: "Feb 18, 2023", status: "In Progress", dateSort: new Date("2023-02-18T10:00:00") },
    { id: "#CM9822", user: { name: "Logan Martinez", avatar: null }, project: "Student Portal", address: "Campus Circle Raleigh", date: "Feb 19, 2023", status: "Pending", dateSort: new Date("2023-02-19T10:00:00") },
    { id: "#CM9823", user: { name: "Grace Thompson", avatar: null }, project: "Farm Management System", address: "Harvest Road Boise", date: "Feb 20, 2023", status: "Complete", dateSort: new Date("2023-02-20T10:00:00") },
    { id: "#CM9824", user: { name: "Henry Scott", avatar: null }, project: "Safety Compliance App", address: "Rescue Blvd Tampa", date: "Feb 21, 2023", status: "Approved", dateSort: new Date("2023-02-21T10:00:00") },
    { id: "#CM9825", user: { name: "Chloe Adams", avatar: null }, project: "Travel Booking Platform", address: "Aviation Road Nashville", date: "Feb 22, 2023", status: "In Progress", dateSort: new Date("2023-02-22T10:00:00") },
    { id: "#CM9826", user: { name: "Lucas Mitchell", avatar: null }, project: "Telemedicine App", address: "Wellness Drive Baltimore", date: "Feb 23, 2023", status: "Complete", dateSort: new Date("2023-02-23T10:00:00") },
    { id: "#CM9827", user: { name: "Amelia Perez", avatar: null }, project: "Space Education Portal", address: "Galaxy Street Houston", date: "Feb 24, 2023", status: "Pending", dateSort: new Date("2023-02-24T10:00:00") },
    { id: "#CM9828", user: { name: "Jack Rivera", avatar: null }, project: "AgriTech CRM", address: "Greenfield Road Fresno", date: "Feb 25, 2023", status: "Rejected", dateSort: new Date("2023-02-25T10:00:00") },
    { id: "#CM9829", user: { name: "Zoe Cooper", avatar: null }, project: "Music Collaboration App", address: "Harmony Lane Austin", date: "Feb 26, 2023", status: "Complete", dateSort: new Date("2023-02-26T10:00:00") },
    { id: "#CM9830", user: { name: "Nathan Bell", avatar: null }, project: "Lab Management System", address: "Science Park San Diego", date: "Feb 27, 2023", status: "Approved", dateSort: new Date("2023-02-27T10:00:00") },
  ];

  // ---------- sorting helpers ----------
  const getSortedData = (data, sortConfig) => {
    if (!sortConfig?.key) return data;
    return [...data].sort((a, b) => {
      let aVal, bVal;
      switch (sortConfig.key) {
        case "id":
          aVal = parseInt(a.id.replace("#CM", "")) || 0;
          bVal = parseInt(b.id.replace("#CM", "")) || 0;
          break;
        case "user":
          aVal = a.user.name.toLowerCase(); bVal = b.user.name.toLowerCase(); break;
        case "project":
          aVal = a.project.toLowerCase(); bVal = b.project.toLowerCase(); break;
        case "address":
          aVal = a.address.toLowerCase(); bVal = b.address.toLowerCase(); break;
        case "date":
          aVal = a.dateSort; bVal = b.dateSort; break;
        case "status":
          const order = { Pending: 1, "In Progress": 2, Approved: 3, Complete: 4, Rejected: 5 };
          aVal = order[a.status] || 99; bVal = order[b.status] || 99; break;
        default:
          aVal = a[sortConfig.key]; bVal = b[sortConfig.key];
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (activeFilters.status !== "All") filtered = filtered.filter((o) => o.status === activeFilters.status);
    if (activeFilters.dateRange !== "All Time") {
      if (activeFilters.dateRange === "Today") filtered = filtered.filter(o => o.date.includes("now") || o.date.includes("minute") || o.date.includes("hour"));
      if (activeFilters.dateRange === "Yesterday") filtered = filtered.filter(o => o.date === "Yesterday");
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

  const sortedAndFilteredOrders = useMemo(() => getSortedData(filteredOrders, sortConfig), [filteredOrders, sortConfig]);

  // ---------- pagination ----------
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredOrders.slice(start, start + itemsPerPage);
  }, [sortedAndFilteredOrders, currentPage]);

  // ---------- handlers ----------
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); setSelectedRows([]); };
  const handleClearSearch = () => { setSearchTerm(""); setCurrentPage(1); setSelectedRows([]); };
  const handlePageChange = (page) => { setCurrentPage(page); setSelectedRows([]); };

  const handleSortMenuOpen = (e) => setSortMenuAnchor(e.currentTarget);
  const handleSortMenuClose = () => setSortMenuAnchor(null);
  const handleSortChange = (key) => {
    setSortConfig(prev => prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" });
    setCurrentPage(1);
    setSelectedRows([]);
    handleSortMenuClose();
  };

  const handleFilterClick = (e) => setFilterAnchorEl(e.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (type, value) => { setActiveFilters(prev => ({ ...prev, [type]: value })); setCurrentPage(1); setSelectedRows([]); };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedRows(paginatedOrders.map((_, i) => i)); else setSelectedRows([]);
  };
  const handleSelectRow = (i) => (e) => {
    if (e.target.checked) setSelectedRows(prev => [...prev, i]); else setSelectedRows(prev => prev.filter(x => x !== i));
  };
  const isAllSelected = selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < paginatedOrders.length;

  const highlightText = (text, s) => {
    if (!s.trim()) return text;
    const re = new RegExp(`(${s})`, "gi");
    const parts = String(text).split(re);
    return parts.map((p, i) => re.test(p) ? <span key={i} style={{ backgroundColor: isDarkMode ? '#fef3c7' : '#fffbeb', color: isDarkMode ? '#000' : '#92400e', fontWeight: 600, borderRadius: 2, padding: '1px 2px' }}>{p}</span> : p);
  };

  // responsive wrapper: if wide enough let content grow, else maxWidth 1172
  const [useFullWidth, setUseFullWidth] = useState(() => window.innerWidth >= 1400);
  useEffect(() => {
    const onResize = () => setUseFullWidth(window.innerWidth >= 1400);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Box sx={{ px: isMobile ? 2 : 3, bgcolor: colors.background, minHeight: "100vh", py: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: isMobile ? "18px" : "22px", color: colors.text.primary }}>Order List</Typography>
      </Box>

      <Box sx={{ width: "100%", maxWidth: useFullWidth ? "100%" : 1172, mx: "auto" }}>
        {/* icon row (rounded rectangle) */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          height: 44,
          px: 1.5,
          mb: 2,
          borderRadius: 2,
          border: `1px solid ${colors.border}`,
          background: isDarkMode ? "var(--Primary-Light, #FFFFFF0D)" : "var(--Primary-Light, #F7F9FB)",
          flexWrap: "wrap",
        }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Add"><IconButton size="small" sx={{ width: 36, height: 36 }}><Add /></IconButton></Tooltip>
            <Tooltip title="Filter"><IconButton onClick={handleFilterClick} size="small" sx={{ width: 36, height: 36, color: activeFilters.status !== 'All' || activeFilters.dateRange !== 'All Time' ? theme.palette.primary.main : colors.text.secondary }}><FilterList /></IconButton></Tooltip>
            <Tooltip title="Sort"><IconButton onClick={handleSortMenuOpen} size="small" sx={{ width: 36, height: 36 }}><ArrowDownUp style={{ color: colors.text.secondary }} /></IconButton></Tooltip>
          </Box>

          <Box sx={{ ml: "auto" }}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Search sx={{ color: colors.text.secondary }} /></InputAdornment>),
                endAdornment: searchTerm ? (<InputAdornment position="end"><IconButton size="small" onClick={handleClearSearch}><Clear fontSize="small" sx={{ color: colors.text.secondary }} /></IconButton></InputAdornment>) : null
              }}
              sx={{
                width: 160,
                "& .MuiOutlinedInput-root": {
                  height: 28,
                  borderRadius: 1,
                  "& fieldset": { borderColor: colors.border, borderRadius: 2 },
                  "& .MuiInputBase-input": { padding: "4px 8px", height: 28, boxSizing: "border-box" }
                }
              }}
            />
          </Box>
        </Box>

        {/* table - REMOVED height constraint and overflow */}
        <TableContainer component={Paper} sx={{ width: "100%", opacity: 1, borderRadius: 3, bgcolor: colors.cardBackground, border: "none" }}>
          <Table stickyHeader size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow sx={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: colors.cardBackground }}>
                <TableCell padding="checkbox">
                  <Checkbox checked={isAllSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} disabled={paginatedOrders.length === 0} sx={{ color: colors.text.secondary, "&.Mui-checked": { color: tickColor } }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>Project</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary }}>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedOrders.map((order, idx) => (
                <TableRow key={`${order.id}-${idx}`} hover sx={{ "& .MuiTableCell-root": { borderBottom: `1px solid ${colors.border}` } }}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedRows.includes(idx)} onChange={handleSelectRow(idx)} sx={{ color: colors.text.secondary, "&.Mui-checked": { color: tickColor } }} />
                  </TableCell>

                  <TableCell><Typography sx={{ fontWeight: 400 }}>{highlightText(order.id, searchTerm)}</Typography></TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={getProfileImage(order.user.name)} sx={{ width: 28, height: 28 }}>{getInitials(order.user.name)}</Avatar>
                      <Typography sx={{ fontWeight: 400 }}>{highlightText(order.user.name, searchTerm)}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell><Typography sx={{ color: colors.text.secondary }}>{highlightText(order.project, searchTerm)}</Typography></TableCell>

                  <TableCell><Typography sx={{ color: colors.text.secondary }}>{highlightText(order.address, searchTerm)}</Typography></TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 18, color: colors.text.secondary }} />
                      <Typography sx={{ color: colors.text.secondary }}>{highlightText(order.date, searchTerm)}</Typography>
                    </Box>
                  </TableCell>

                  {/* Status cell uses statusColorMap to avoid inline object literal with spaces */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: statusColorMap[order.status] || colors.text.secondary
                        }}
                      />
                      <Typography sx={{ color: colors.text.secondary }}>{order.status}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <IconButton size="small" sx={{ color: colors.text.secondary, opacity: 0, ".MuiTableRow-root:hover &": { opacity: 1 } }}>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* REMOVED filler rows that were keeping table height stable */}

              {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: "center", borderBottom: "none", py: 6 }}>
                    <Typography sx={{ color: colors.text.secondary }}>No orders available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* SINGLE pagination component - right aligned */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          <CustomPagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onChange={handlePageChange} 
            themeMode={theme.palette.mode} 
          />
        </Box>
      </Box>

      {/* Sort menu */}
      <Menu anchorEl={sortMenuAnchor} open={Boolean(sortMenuAnchor)} onClose={handleSortMenuClose}>
        <MenuItem onClick={() => handleSortChange("id")}>Order ID {sortConfig.key === "id" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("user")}>User {sortConfig.key === "user" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("project")}>Project {sortConfig.key === "project" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("date")}>Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("status")}>Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
      </Menu>

      {/* Filter menu */}
      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
        <Box sx={{ p: 1, minWidth: 200 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Filter by Status</Typography>
          {["All", "Complete", "In Progress", "Pending", "Approved", "Rejected"].map(s => (
            <MenuItem key={s} onClick={() => { handleFilterChange("status", s); handleFilterClose(); }} sx={{ bgcolor: activeFilters.status === s ? colors.hover : "transparent" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {s !== "All" && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: statusColorMap[s] || colors.text.secondary }} />}
                <Typography>{s}</Typography>
                {activeFilters.status === s && <Box sx={{ ml: "auto", color: theme.palette.primary.main }}>✓</Box>}
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default OrdersPage;