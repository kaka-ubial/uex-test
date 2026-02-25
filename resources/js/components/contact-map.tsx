import { Map, Marker } from '@vis.gl/react-google-maps';

export function ContactMap({ lat, lng }: { lat: number; lng: number }) {
    return (
        <div className="h-full w-full border-2 border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                <Map
                    center={{ lat, lng }}
                    zoom={15}
                    gestureHandling="greedy"
                    disableDefaultUI
                >
                    <Marker position={{ lat, lng }} />
                </Map>
        </div>
    );
}