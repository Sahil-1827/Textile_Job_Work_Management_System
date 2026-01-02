import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getJobWorkTypes, addJobWorkEntry, getJobWorkEntries, updateEntryStatus } from '../services/api';
import { toast } from 'react-toastify';

const JobWorkEntry = () => {
    const [entries, setEntries] = useState([]);
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({ traderName: '', jobWorkTypeId: '', quantity: '' });

    const user = JSON.parse(localStorage.getItem('user'));
    const isUser = user?.role === 'user';

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const [typesRes, entriesRes] = await Promise.all([getJobWorkTypes(), getJobWorkEntries()]);
        setTypes(typesRes.data);
        setEntries(entriesRes.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addJobWorkEntry(formData);
            toast.success("Entry added successfully");
            setFormData({ traderName: '', jobWorkTypeId: '', quantity: '' });
            fetchInitialData();
        } catch (err) {
            toast.error("Failed to add entry");
        }
    };

    const handleStatusChange = async (id, currentStatus, newStatus) => {
        if (currentStatus === 'Processing' && newStatus === 'Pending') {
            return toast.error("Cannot move back to Pending");
        }
        if (currentStatus === 'Completed') {
            return toast.error("Already Completed");
        }

        try {
            await updateEntryStatus(id, newStatus);
            toast.success("Status updated!");
            fetchInitialData();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>Job Work Entry</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 120px', gap: 2 }}>
                        <TextField
                            label="Trader Name"
                            value={formData.traderName}
                            onChange={(e) => setFormData({ ...formData, traderName: e.target.value })}
                            required
                        />
                        <TextField
                            select label="Process"
                            value={formData.jobWorkTypeId}
                            onChange={(e) => setFormData({ ...formData, jobWorkTypeId: e.target.value })}
                            required
                        >
                            {types.map(t => <MenuItem key={t._id} value={t._id}>{t.processName} (₹{t.rate})</MenuItem>)}
                        </TextField>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                        />
                        <Button type="submit" variant="contained">Save</Button>
                    </Box>
                </form>
            </Paper>

            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Trader</TableCell>
                        <TableCell>Process</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Amount</TableCell>
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
                            <TableCell>₹{entry.totalAmount}</TableCell>
                            <TableCell>
                                {isUser && entry.status !== 'Completed' ? (
                                    <TextField
                                        select
                                        size="small"
                                        value={entry.status}
                                        onChange={(e) => handleStatusChange(entry._id, entry.status, e.target.value)}
                                    >
                                        <MenuItem value="Pending" disabled={entry.status === 'Processing'}>Pending</MenuItem>
                                        <MenuItem value="Processing">Processing</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </TextField>
                                ) : (
                                    entry.status
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default JobWorkEntry;