import styles from './MapView.module.css';
import Ward from './Ward';
import DraftMarker from './DraftMarker';
import MarkerList from './MarkerList';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MAP_STYLES } from '@/constants';

export default function MapView({ onAddressChange, onPositionChange, /*mapId,*/ posts }) {
    return (
        <Map
            className={styles.mapWrapper}
            defaultCenter={{ lat: 35.68, lng: 139.645 }}
            defaultZoom={12}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            styles={MAP_STYLES}
            //mapId={mapId}
        >
            <Ward />
            <DraftMarker onAddressChange={onAddressChange} onPositionChange={onPositionChange} />
            <MarkerList posts={posts} />
        </Map>
    )
}
