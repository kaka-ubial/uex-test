import React, { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    /** Callback to send the parsed Google Place object back to the parent form */
    onAddressSelect: (address: any) => void;
}

export function AddressAutocomplete({ onAddressSelect }: Props) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['address_components', 'geometry', 'formatted_address'],
            types: ['address'],
            componentRestrictions: { country: 'br' } 
        };

    autocompleteRef.current = new places.Autocomplete(inputRef.current, options);     
       
    const listener = autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && place.geometry) {
                onAddressSelect(place);
            }
        });

    return () => {
            if (listener) {
                google.maps.event.removeListener(listener);
            }
            const pacContainers = document.querySelectorAll('.pac-container');
            pacContainers.forEach(container => container.remove());
        };
    }, [places, onAddressSelect]); 

    return (
        <div className="space-y-2 mb-1">
            <Label htmlFor="search-address">Buscar endereço</Label>
            <Input 
                id="search-address"
                ref={inputRef} 
                placeholder="Ex: Av. Paulista, São Paulo" 
            />
        </div>
    );
}
