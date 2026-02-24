import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ContactFormPage } from '@/components/contact-form-page';

export default function Create() {
    const form = useForm({
        name: '',
        cpf: '',
        phone: '',
        cep: '',
        city: '',
        street: '',
        number: '',
        neighbourhood: '',
        latitude: -23.55052,
        longitude: -46.633308,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/contacts');
    };

    return (
        <AppLayout>

            <ContactFormPage
                form={form}
                submitLabel="Create Contact"
                onSubmit={submit}
            />
        </AppLayout>
    );
}