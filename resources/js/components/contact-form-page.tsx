import { ContactForm } from './contact-form';
import { ContactMap } from './contact-map';
import { AddressAutocomplete } from './address-autocomplete';
import { useContactAddress } from '@/hooks/use-contact-address';

export function ContactFormPage({ form, submitLabel, onSubmit }) {

    const { handleAddressSelect, handleCepBlur } = useContactAddress(form);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
            <div className="space-y-4">
                <div className="px-2">
                    <h2 className="text-lg font-medium">Contact Details</h2>
                    <p className="text-sm text-muted-foreground">Fill in the information to pin the contact on the map.</p>
                </div>
                <ContactForm 
                    {...form}
                    submitLabel={submitLabel}
                    onSubmit={onSubmit}
                    onCepBlur={handleCepBlur}
                />
            </div>

            <div className="h-[500px]">
                <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                <ContactMap
                    lat={Number(form.data.latitude)}
                    lng={Number(form.data.longitude)}
                />
            </div>
        </div>
    );
}