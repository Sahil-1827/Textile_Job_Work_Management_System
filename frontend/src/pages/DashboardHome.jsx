import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Card, CardContent, Avatar, useTheme, Skeleton } from '@mui/material';
import { People, Receipt, PendingActions, EventNote } from '@mui/icons-material';
import { getDashboardStats } from '../services/api'; // Using your API function

const StatCard = ({ title, value, icon, color, loading }) => {
  const theme = useTheme();
  return (
    <Card sx={{
      borderRadius: 4,
      background: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff', // Gray-800 for dark mode
      transition: '0.3s',
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }
    }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar sx={{ bgcolor: `${color}20`, color: color, width: 52, height: 52, mr: 2 }}>{icon}</Avatar>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>{title}</Typography>
          {loading ? (
            <Skeleton width="60%" height={40} />
          ) : (
            <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalTraders: 0,
    totalInvoices: 0,
    pendingPayments: 0,
    todayEntries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats(); // Fetch data from the API
        setStats(data);
      } catch (err) {
        console.error("Stats fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: 'text.primary' }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Traders"
            value={stats.totalTraders}
            icon={<People />}
            color="#3b82f6"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Invoices"
            value={stats.totalInvoices}
            icon={<Receipt />}
            color="#10b981"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Payments"
            value={`₹${stats.pendingPayments}`}
            icon={<PendingActions />}
            color="#f59e0b"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Entries"
            value={stats.todayEntries}
            icon={<EventNote />}
            color="#8b5cf6"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Welcome Section */}
      <Box sx={{
        mt: 5, p: 4, borderRadius: 4,
        bgcolor: 'background.paper',
        border: (theme) => `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Welcome Back!</Typography>
        <Typography variant="body1" color="text.secondary">
          Here you can view the current statistics of your business. You can manage traders and invoices from the menu on the left side.
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardHome;
