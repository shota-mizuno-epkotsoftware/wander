import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

async function fetchAddress(latLng) {
    const geocoder = new google.maps.Geocoder();
    const { results } = await geocoder.geocode({ location: latLng });

    const components = results[0].address_components;
    const get = (type) =>
        components.find(c =>
            c.types.includes(type))?.long_name ?? '';
    return {
        zip: get('postal_code'),
        pref: get('administrative_area_level_1'),
        city: get('locality'),
        town: [
            get('sublocality_level_1'),
            get('sublocality_level_2'),
            get('sublocality_level_3'),
            get('sublocality_level_4'),
        ].filter(Boolean).join(''),
    };
}

export default function DraftMarker({ onAddressChange, onPositionChange }) {
    // マップ準備
    const map = useMap();

    const currentMarker = useRef(null);

    useEffect(() => {
        if (!map) return;

        async function addMarker(latLng) {
            currentMarker.current?.setMap(null);

            currentMarker.current = new google.maps.Marker({
                position: latLng,
                map,
                animation: google.maps.Animation.DROP,
                draggable: true,
            });

            const address = await fetchAddress(latLng);
            onAddressChange(address);
            onPositionChange({ lat: latLng.lat(), lng: latLng.lng() });

            currentMarker.current.addListener('dragend', async (e) => {
                const address = await fetchAddress(currentMarker.current.getPosition());
                onAddressChange(address);
                onPositionChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            });
        };

        const clickListener = map.addListener('click', e => addMarker(e.latLng));
        const dataClickListener = map.data.addListener('click', e => addMarker(e.latLng));

        return () => {
            clickListener.remove();
            dataClickListener.remove();
        };
    }, [map, onAddressChange, onPositionChange]);

    return (
        <>
        </>
    );
}