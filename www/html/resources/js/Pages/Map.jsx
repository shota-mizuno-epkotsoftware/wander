import styles from './Map.module.css'
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import MapView from '@/Components/MapView';
import LocationForm from '@/Components/LocationForm';
import { Head } from '@inertiajs/react';

export default function Map({ apiKey, posts }) {
  const [address, setAddress] = useState({ zip: '', pref: '', city: '' , town: '' });
  console.log(posts);
  return (
    <>
      <Head title='WANDER' />
      <APIProvider apiKey={apiKey}>
        <div className={styles.appContainer}>
          <MapView onAddressChange={setAddress} />
          <div className={styles.menu}>
              <div className={styles.menuTitle}>
                <h1>WANDER</h1>
                <h2>Discover the Magic around You</h2>
              </div>
              <div className={styles.panelWrapper}>
                <LocationForm address={address} />
              </div>
          </div>
        </div>
      </APIProvider>
    </>
  )
}