import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button'; 
import { Plus } from 'lucide-react';
import ContactList from '@/components/contact-list';
import { dashboard } from '@/routes';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ContactMap } from '../components/contact-map';

const breadcrumbs = [
    { title: 'Contacts', href: dashboard().url },
];

export default function Dashboard({ contacts }: { contacts: any }) {
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState<any>(null);
    
    useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        router.get(`/dashboard`, 
            { search }, 
            { preserveState: true, replace: true }
        );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
}, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight">Contacts</h1>
                            <p className="text-sm text-muted-foreground mb-2">Manage your contact list and information.</p>
                        </div>
                        
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/contacts/create">
                                <Plus className="mr-2 h-4 w-4" />
                                New Contact
                            </Link>
                        </Button>
                    </div>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or CPF..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
                        <div className="lg:col-span-1 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col bg-white dark:bg-neutral-900">
                            <div className="overflow-y-auto flex-1">
                                <ContactList 
                                serverContacts={contacts}
                                onContactClick={(contact) => {
                                    setSelectedContact(contact)}}
                                activeContactId={selectedContact?.id}
                            /> 
                        </div>
                    </div>
                    <div className="lg:col-span-2 h-[500px] lg:h-auto rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                            <ContactMap
                            key={selectedContact?.id || 'default'}
                            lat={Number(selectedContact?.latitude|| contacts.data[0]?.latitude || -23.5505)}
                            lng={Number(selectedContact?.longitude || contacts.data[0]?.longitude || -46.6333)}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}