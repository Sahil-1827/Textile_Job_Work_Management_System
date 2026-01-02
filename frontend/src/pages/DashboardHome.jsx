import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Assessment, People, Receipt } from '@mui/icons-material';

const DashboardHome = () => {
  const stats = [
    { title: 'Total Orders', value: '120', icon: <Assessment fontSize="large" />, color: 'bg-blue-500' },
    { title: 'Active Parties', value: '45', icon: <People fontSize="large" />, color: 'bg-green-500' },
    { title: 'Pending Challans', value: '12', icon: <Receipt fontSize="large" />, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper className={`p-6 text-white ${stat.color} flex items-center justify-between shadow-lg`}>
              <div>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" className="font-bold">{stat.value}</Typography>
              </div>
              {stat.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardHome;