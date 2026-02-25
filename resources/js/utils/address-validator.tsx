export interface ViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

export const getCoordinatesFromAddress = async (address: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    const encodedAddress = encodeURIComponent(address);
    
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        }
        return null;
    } catch (error) {
        console.error("Erro na geocodificação:", error);
        return null;
    }
};