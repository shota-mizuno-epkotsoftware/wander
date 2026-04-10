import styles from './Map.module.css'
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import MapView from '@/Components/MapView';
import LocationForm from '@/Components/LocationForm';
import PostList from '@/Components/PostList';
import { Head } from '@inertiajs/react';

export default function Map({ apiKey, mapId, posts }) {
  const [address, setAddress] = useState({ zip: '', pref: '', city: '' , town: '' });
  const [position, setPosition] = useState({ lat: null, lng: null});
  const [view, setView] = useState('postList');
  const [selectedPost, setSelectedPost] = useState(null); // PostList.jsxから

  //console.log(posts);
  //console.log(mapId, apiKey);
  return (
    <>
      <Head title='WANDER' />
      <APIProvider apiKey={apiKey}>
        <div className={styles.appContainer}>
          <MapView onAddressChange={setAddress} onPositionChange={setPosition} /*mapId={mapId}*/ posts={posts} />
          <div className={styles.menu}>
              <div className={styles.menuBar}>
                <h1>WANDER</h1>
                <div className={styles.viewSwitch}>
                  <button onClick={() => setView('postList')}>投稿リスト</button>
                  <button onClick={() => setView('locationForm')}>投稿画面</button>
                </div>
              </div>
              <div className={styles.panelWrapper}>
                { view === 'postList' && <PostList posts={posts} />}
                { view === 'locationForm' && <LocationForm address={address} position={position} />}
              </div>
              {/* Pagetopコンポーネントを後ほど制作 */}
          </div>
        </div>
      </APIProvider>
    </>
  )
}