import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import MapMarker from './MapMarker';

export default function MarkerList({ posts, selectedPost, onSelect }) {
    // マップ準備
    const map = useMap();

    return (
        <>
            {map && posts.map( post => (
                <MapMarker key={post.id} post={post} selectedPost={selectedPost} onSelect={onSelect} />
            ))}
        </>
    );
}