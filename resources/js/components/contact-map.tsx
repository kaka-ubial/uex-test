import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export function ContactMap({ lat, lng }: { lat: number; lng: number }) {
    return (
        <div className="h-[300px] w-full rounded-xl overflow-hidden border">
            <APIProvider apiKey={'AIzaSyD-90LyKnm7s4_zDE__xTmyiUvrygpo2Pc'}>
                <Map
                    defaultCenter={{ lat: lat, lng: lng }}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <Marker position={{ lat: lat, lng: lng }} />
                </Map>
            </APIProvider>
        </div>
    );
}