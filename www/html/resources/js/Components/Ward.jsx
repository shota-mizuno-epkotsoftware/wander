import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { GEOJSON_URL, WARD_COLORS } from '@/constants';

export default function Ward() {
    // マップ準備
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        fetch(GEOJSON_URL)
            .then(res => res.json())
            .then(geojson => {
                // 区部を抽出する
                const wards = {
                    type: 'FeatureCollection',
                    features: geojson.features.filter(f => f.properties.area_en === 'Tokubu'),
                };
                map.data.addGeoJson(wards);

                // 区ごとに色を塗る
                map.data.setStyle(feature => {
                    const name = feature.getProperty('ward_ja') || '';
                    const color = WARD_COLORS[name] || '#cccccc';
                    return {
                        fillColor: color,
                        fillOpacity: 0.15,
                        strokeColor: '#ffffff',
                        strokeWeight: 1.5,
                    };
                });

                // ホバーで色を濃くして区名を表示
                const mouseOverListener = map.data.addListener('mouseover', e => {
                    map.data.overrideStyle(e.feature, { fillOpacity: 0.30, strokeWeight: 2.5 });
                });
                const mouseOutListener = map.data.addListener('mouseout', e => {
                    map.data.revertStyle(e.feature);
                });

                return () => {
                    mouseOverListener.remove();
                    mouseOutListener.remove();
                };
            });
    }, [map]);

    return (
        <>
        </>
    );
}