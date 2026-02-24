import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ContactList({ contacts }) {
    const [search, setSearch] = useState('');

    // Filtering logic (can also be handled via Laravel props)
    const filteredContacts = contacts.data.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || c.cpf.includes(search)
    );

    return (
        <AuthenticatedLayout>
            <div style={{ padding: '20px' }}>
                <TextField 
                    label="Search by Name or CPF" 
                    variant="outlined" 
                    fullWidth 
                    onChange={(e) => setSearch(e.target.value)}
                    margin="normal"
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name (A-Z)</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredContacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.cpf}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{`${contact.street}, ${contact.city}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </AuthenticatedLayout>
    );
}