import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ContactForm } from '@/components/contact-form';
import { ContactMap } from '@/components/contact-map';
import { fetchAddressByCep, getCoordinatesFromAddress } from '@/utils/address-validator'; 

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

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const addressData = await fetchAddressByCep(e.target.value);        
        
        if (addressData) {
            const fullAddress = `${addressData.logradouro}, ${addressData.localidade}, ${addressData.uf}`;
            const coords = await getCoordinatesFromAddress(fullAddress);
            form.setData({
                ...form.data,
                street: addressData.logradouro,
                neighbourhood: addressData.bairro,
                city: addressData.localidade,
                cep: e.target.value,
                latitude: coords?.latitude || form.data.latitude,
                longitude: coords?.longitude || form.data.longitude,
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(`/contacts`);
    };

return (
        <AppLayout breadcrumbs={[{ title: 'Contacts', href: '/dashboard' }, { title: 'Create', href: '/contacts/create' }]}>
            <Head title="Create Contact" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
                
                <div className="space-y-4">
                    <div className="px-2">
                        <h2 className="text-lg font-medium">Contact Details</h2>
                        <p className="text-sm text-muted-foreground">Fill in the information to pin the contact on the map.</p>
                    </div>
                    <ContactForm 
                        {...form} 
                        submitLabel="Create Contact" 
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