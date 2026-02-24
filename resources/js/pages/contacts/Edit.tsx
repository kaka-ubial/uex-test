import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ContactFormPage } from '@/components/contact-form-page';

export default function Edit({ contact }) {
    const form = useForm({
        ...contact
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.patch(`/contacts/${contact.id}`);
    };

    return (
        <AppLayout>
            <ContactFormPage
                form={form}
                submitLabel="Update Contact"
                onSubmit={submit}
            />
        </AppLayout>
    );
}