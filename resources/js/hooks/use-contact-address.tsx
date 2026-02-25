import { getCoordinatesFromAddress } from '@/utils/address-validator';


export function useContactAddress(form: any) {

    const handleAddressSelect = (place: google.maps.places.PlaceResult) => {
        if (!place.address_components || !place.geometry) return;

        const components = place.address_components;

        const getComponent = (types: string[]) =>
            components.find(component =>
                types.some(type => component.types.includes(type))
            )?.long_name || '';

        const latitude = place.geometry.location?.lat();
        const longitude = place.geometry.location?.lng();

        form.setData(old => ({
            ...old,
            street: getComponent(['route']),
            number: getComponent(['street_number']),
            neighbourhood: getComponent(['sublocality_level_1', 'neighborhood']),
            city: getComponent(['locality', 'administrative_area_level_2']),
            cep: getComponent(['postal_code']).replace(/\D/g, ''),
            latitude: latitude ?? old.latitude,
            longitude: longitude ?? old.longitude,
        }));
    };

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cepValue = e.target.value.replace(/\D/g, '');
        if (cepValue.length !== 8) return;

        try {
            const response = await fetch(`/api/proxy-cep/${cepValue}`, {
                credentials: "include"
            });            
            if (!response.ok) {
                throw new Error("Erro ao buscar CEP");
            }

            const address = await response.json();            
            if (!address) return;

            const searchAddress = `${address.logradouro}, ${address.bairro}, ${address.localidade}, Brazil`;
            const coords = await getCoordinatesFromAddress(searchAddress);

            form.setData(old => ({
                ...old,
                street: address.logradouro,
                neighbourhood: address.bairro,
                city: address.localidade,
                cep: cepValue,
                latitude: coords?.latitude ?? old.latitude,
                longitude: coords?.longitude ?? old.longitude
            }));
        } catch (error) {
        console.error("Proxy error:", error);
        };
    };
    return { handleAddressSelect, handleCepBlur };
}