import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ContactForm } from '@/components/contact-form';
import { ContactMap } from '@/components/contact-map';
import { fetchAddressByCep } from '@/utils/address-validator'; 

export default function Edit({contact}: {contact: any}) {
    const form = useForm({
        name: contact.name || '',
        cpf: contact.cpf || '',
        phone: contact.phone || '',
        cep: contact.cep || '',
        city: contact.city || '',
        street: contact.street || '',
        number: contact.number || '',
        neighbourhood: contact.neighbourhood || '',
        latitude: contact.latitude || '',
        longitude: contact.longitude || ''
    });

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const address = await fetchAddressByCep(e.target.value);
        
        if (address) {
            form.setData({
                ...form.data,
                street: address.logradouro,
                neighbourhood: address.bairro,
                city: address.localidade,
                cep: e.target.value
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.patch(`/contacts/${contact.id}`); 
    };

return (
        <AppLayout breadcrumbs={[{ title: 'Contacts', href: '/dashboard' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit Contact" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
                <div className="space-y-4">
                <div className="px-2">
                    <h2 className="text-lg font-medium">Contact Details</h2>
                    <p className="text-sm text-muted-foreground">Fill in the information to pin the contact on the map.</p>
                </div>
                    <ContactForm 
                        {...form} 
                        submitLabel="Update Contact" 
                        onSubmit={submit} 
                        onCepBlur={handleCepBlur}
                    />
            </div>
            <div className="h-[400px] lg:h-full min-h-[500px] sticky top-6">
                <div className="h-full rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                    <ContactMap 
                        lat={Number(form.data.latitude)} 
                        lng={Number(form.data.longitude)} 
                    />
                </div>
            </div>
        </div>
        </AppLayout>
    );
}