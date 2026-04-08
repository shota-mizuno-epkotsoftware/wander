import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

export default function MapMarker({ post }) {
    // マップ準備
    const map = useMap();

    const markerRef = useRef(null);
    const infoRef = useRef(null);
    const isPinnedRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        markerRef.current = new google.maps.Marker({
            position: { lat: parseFloat(post.address.latitude), lng: parseFloat(post.address.longitude) },
            map,
            title: post.title,
            animation: google.maps.Animation.DROP,
            draggable: true,
        });
        infoRef.current = new google.maps.InfoWindow({
            content: `
                <div style="
                    padding: 8px 12px;
                    font-family: sans-serif;
                    max-width: 200px;
                    max-height: 200px;
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(12px);
                ">
                    <img src=${post.pictures[0].name} style="width: 100%; height: 80px; object-fit: cover" />
                    <strong style="font-size:14px">${post.title}</strong>
                    <p style="margin:4px 0 0; color:#666; font-size:12px">
                        ${post.description}
                    </p>
                </div>
            `,
        });

        markerRef.current.addListener('mouseover', () => {
            if (!isPinnedRef.current) infoRef.current.open(map, markerRef.current);
        });

        markerRef.current.addListener('mouseout', () => {
            if (!isPinnedRef.current) infoRef.current.close();
        });

        markerRef.current.addListener('click', () => {
            isPinnedRef.current = !isPinnedRef.current;
            isPinnedRef.current ? infoRef.current.open(map, markerRef.current) : infoRef.current.close();
        });

        infoRef.current.addListener('closeclick', () => {
            isPinnedRef.current = false;
        });

        return () => {
            markerRef.current?.setMap(null);
            isPinnedRef.current = false;
        };
    }, [map]);

    return (
        <>
        </>
    );
}