import styles from './MapView.module.css';
import Ward from './Ward';
import Marker from './Marker';
import { Map } from '@vis.gl/react-google-maps';
import { MAP_STYLES } from '@/constants';

export default function MapView({ onAddressChange }) {
    return (
        <Map
            className={styles.mapWrapper}
            defaultCenter={{ lat: 35.68, lng: 139.645 }}
            defaultZoom={12}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            styles={MAP_STYLES}
        >
            <Ward />
            <Marker onAddressChange={onAddressChange} />
        </Map>
    )
}
