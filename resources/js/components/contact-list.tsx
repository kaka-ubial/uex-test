import * as React from 'react';
import { router } from '@inertiajs/react';
import { styled } from '@mui/material/styles';
import { 
    Box, List, ListItem, ListItemText, IconButton, 
    Typography, Stack, Divider, Pagination,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

interface ContactListProps {
    serverContacts: any;
    onContactClick: (contact: any) => void;
    activeContactId?: number | null;
}

const FullWidthContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  width: '100%', 
  height: '100%', 
}));

export default function ContactList({serverContacts, onContactClick, activeContactId }: ContactListProps    ) {
    const contacts = serverContacts?.data || [];
    const [deleteId, setDeleteId] = useState<number | null>(null);

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

    const handleCancelDelete = () => {
        setDeleteId(null); 
    };
    
    const handleDelete = (id: number) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            router.delete(`/contacts/${deleteId}`);
            setDeleteId(null);
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
                                    component="div"
                                    onClick={() => onContactClick(contact)}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: activeContactId === contact.id ? 'action.selected' : 'transparent',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                    }}
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
                                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
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
            <Dialog
                open={deleteId !== null}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color='text.secondary'>
                    {"Delete Contact?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this contact? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCancelDelete} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {pagination.total > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Pagination 
                        count={pagination.total} 
                        page={pagination.current} 
                        onChange={handlePageChange}
                        color="secondary"
                        shape="rounded"
                    />
                </Box>
            )}
        </Box>
    );
}