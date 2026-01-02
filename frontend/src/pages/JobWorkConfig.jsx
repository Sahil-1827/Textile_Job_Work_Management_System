import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, TextField, Table, TableBody,
    TableCell, TableHead, TableRow, Paper, MenuItem, IconButton, Tooltip
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { getJobWorkTypes, addJobWorkType, updateJobWorkType } from '../services/api';

const JobWorkConfig = () => {
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({ processName: '', rate: '', unit: 'meter' });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const res = await getJobWorkTypes();
            setTypes(res.data);
        } catch (err) {
            console.error("Failed to fetch types", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdmin) return alert("Only admins can add processes");
        await addJobWorkType(formData);
        setFormData({ processName: '', rate: '', unit: 'meter' });
        fetchTypes();
    };

    const handleEditClick = (type) => {
        setEditingId(type._id);
        setEditData({ ...type });
    };

    const handleUpdate = async () => {
        try {
            await updateJobWorkType(editingId, editData);
            setEditingId(null);
            fetchTypes();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Job Work Rates</Typography>

            {isAdmin && (
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Add New Process</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Process Name"
                                value={formData.processName}
                                onChange={(e) => setFormData({ ...formData, processName: e.target.value })}
                                fullWidth required
                            />
                            <TextField
                                label="Rate"
                                type="number"
                                value={formData.rate}
                                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                fullWidth required
                            />
                            <TextField
                                select label="Unit"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="meter">Per Meter</MenuItem>
                                <MenuItem value="piece">Per Piece</MenuItem>
                            </TextField>
                            <Button type="submit" variant="contained" size="large">Add</Button>
                        </Box>
                    </form>
                </Paper>
            )}

            <Table sx={{ borderRadius: '10px' }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Process Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Rate (₹)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Unit</TableCell>
                        {isAdmin && <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {types.map((t) => (
                        <TableRow key={t._id}>
                            <TableCell>
                                {editingId === t._id ? (
                                    <TextField
                                        size="small"
                                        value={editData.processName}
                                        onChange={(e) => setEditData({ ...editData, processName: e.target.value })}
                                    />
                                ) : t.processName}
                            </TableCell>
                            <TableCell>
                                {editingId === t._id ? (
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={editData.rate}
                                        onChange={(e) => setEditData({ ...editData, rate: e.target.value })}
                                    />
                                ) : `₹${t.rate}`}
                            </TableCell>
                            <TableCell>
                                {editingId === t._id ? (
                                    <TextField
                                        select size="small"
                                        value={editData.unit}
                                        onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
                                    >
                                        <MenuItem value="meter">meter</MenuItem>
                                        <MenuItem value="piece">piece</MenuItem>
                                    </TextField>
                                ) : t.unit}
                            </TableCell>

                            {isAdmin && (
                                <TableCell>
                                    {editingId === t._id ? (
                                        <>
                                            <Tooltip title="Edit Rate"><IconButton onClick={handleUpdate} color="success"><Save /></IconButton></Tooltip>
                                            <Tooltip title="Cancel Edit"><IconButton onClick={() => setEditingId(null)} color="error"><Cancel /></IconButton></Tooltip>
                                        </>
                                    ) : (
                                        <Tooltip title="Edit Rate">
                                            <IconButton onClick={() => handleEditClick(t)} color="primary"><Edit /></IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default JobWorkConfig;