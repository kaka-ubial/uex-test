import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

function MapHandler({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        if (map) {
            map.panTo({ lat, lng });
        }
    }, [lat, lng, map]);
    return null;
}

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