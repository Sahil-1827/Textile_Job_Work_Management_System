import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { getPendingJobWorkEntries } from '../services/api';
import { toast } from 'react-toastify';

const PendingJobWork = () => {
    const [entries, setEntries] = useState([]);
    const [filters, setFilters] = useState({ traderName: '', startDate: '', endDate: '' });

    const fetchPendingEntries = async () => {
        try {
            const res = await getPendingJobWorkEntries(filters);
            setEntries(res.data);
        } catch (err) {
            toast.error("Failed to fetch pending entries");
        }
    };

    useEffect(() => {
        fetchPendingEntries();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>Pending Job Work</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 100px', gap: 2, alignItems: 'center' }}>
                    <TextField
                        label="Filter by Trader"
                        name="traderName"
                        value={filters.traderName}
                        onChange={handleFilterChange}
                    />
                    <TextField
                        label="From Date"
                        type="date"
                        name="startDate"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleFilterChange}
                    />
                    <TextField
                        label="To Date"
                        type="date"
                        name="endDate"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleFilterChange}
                    />
                    <Button variant="contained" onClick={fetchPendingEntries}>Filter</Button>
                </Box>
            </Paper>

            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Trader Name</TableCell>
                        <TableCell>Process</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries.map((entry) => (
                        <TableRow key={entry._id}>
                            <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                            <TableCell>{entry.traderName}</TableCell>
                            <TableCell>{entry.jobWorkType?.processName}</TableCell>
                            <TableCell>{entry.quantity}</TableCell>
                            <TableCell>₹{entry.rateAtTime}</TableCell>
                            <TableCell>{entry.status}</TableCell>
                        </TableRow>
                    ))}
                    {entries.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} align="center">No pending entries found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default PendingJobWork;