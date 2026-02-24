import { useForm } from '@inertiajs/react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function DeleteAccount() {
    const { data, setData, delete: destroy, errors } = useForm({ password: '' });

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            onOpen: () => { if(errors.password) alert("Invalid Password"); }
        });
    };

    return (
        <Box sx={{ p: 3, border: '1px solid red' }}>
            <Typography color="error">Critical Action: Delete Account</Typography>
            <TextField 
                type="password" 
                label="Confirm Password to Proceed" 
                fullWidth 
                onChange={e => setData('password', e.target.value)} 
            />
            <Button onClick={handleDelete} color="error" variant="outlined" sx={{ mt: 2 }}>
                Permanently Delete My Account
            </Button>
        </Box>
    );
}