import * as React from 'react';
import { Form, Head, router, usePage } from '@inertiajs/react';
import { styled } from '@mui/material/styles';
import { 
    Box, List, ListItem, ListItemText, IconButton, 
    Typography, Stack, Divider, Pagination 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const FullWidthContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  width: '100%', 
  height: '100%', 
}));

export default function ContactList({serverContacts}: {serverContacts: any}) {
const contacts = serverContacts?.data || [];
    const pagination = {
        current: serverContacts?.current_page || 1,
        total: serverContacts?.last_page || 1
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', value.toString());
        
        router.get(`/dashboard?${params.toString()}`, {}, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(`/contacts/${id}`);
        }
    };

    const handleUpdate = (contact: any) => {
        router.get(`/contacts/${contact.id}/edit`);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FullWidthContainer>
                <List sx={{ width: '100%', py: 0 }}>
                    {contacts.length > 0 ? (
                        contacts.map((contact: any, index: number) => (
                            <React.Fragment key={contact.id}>
                                <ListItem
                                    secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            <IconButton onClick={() => handleUpdate(contact)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => handleDelete(contact.id)}
                                                sx={{ color: 'error.light' }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'black' }}>
                                                {contact.name}
                                            </Typography>
                                        }
                                        secondary={`${contact.street}, ${contact.number} - ${contact.city}`}
                                    />
                                </ListItem>
                                {index < contacts.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                No contacts found.
                            </Typography>
                        </Box>
                    )}
                </List>
            </FullWidthContainer>

            {pagination.total > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Pagination 
                        count={pagination.total} 
                        page={pagination.current} 
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            )}
        </Box>
    );
}