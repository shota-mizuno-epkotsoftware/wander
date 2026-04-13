import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

export default function MapMarker({ post, selectedPost, onSelect }) {
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
            draggable: false,
        });
        infoRef.current = new google.maps.InfoWindow({
            // 投稿情報の表示内容をインラインで定義
            content: `
                <div style="
                    padding: 8px 12px;
                    font-family: sans-serif;
                    width: 200px;
                    max-height: 200px;
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(12px);
                ">
                    <img src=/storage/${post.pictures[0].name} style="width: 100%; height: 80px; object-fit: cover" />
                    <strong style="font-size:14px">${post.title}</strong>
                    <p style="
                        margin:4px 0 0;
                        color: grey;
                        font-size:12px
                    ">
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
            if (isPinnedRef.current) {
                onSelect(post);
            } else {
                isPinnedRef.current = !isPinnedRef.current;
                isPinnedRef.current ? infoRef.current.open(map, markerRef.current) : infoRef.current.close();
                onSelect(isPinnedRef?.id === post.id ? null : post);
            }
        });

        infoRef.current.addListener('closeclick', () => {
            isPinnedRef.current = false;
        });

        return () => {
            markerRef.current?.setMap(null);
            //isPinnedRef.current = false;
        };
    }, [map, post.title, post.description, post.pictures[0]?.name, post.address.latitude, post.address.longitude]); //useMemoで直す

    useEffect(() => {
        if (!markerRef.current || !infoRef.current) return;

        if (selectedPost?.id === post.id) {
            infoRef.current.open(map, markerRef.current);
            //markerRef.current.setAnimation(google.maps.Animation.BOUNCE);
            map.panTo({
                lat: parseFloat(post.address.latitude),
                lng: parseFloat(post.address.longitude),
            });
            map.panBy(-200, 0);
        } else {
            markerRef.current.setAnimation(null);
        }
    }, [selectedPost]);

    return (
        <>
        </>
    );
}