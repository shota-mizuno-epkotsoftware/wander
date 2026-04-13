import { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import styles from './LocationForm.module.css';

export default function LocationForm({ address, position, onSuccess }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        picture: null,
        description: '',
        zip: '',
        pref: '',
        city: '',
        town: '',
        lat: '',
        lng: '',
    });
    const [preview, setPreview] = useState(null);

    useEffect (() => {
        if (!address || !position) return;
        setData({
            ...data,
            zip: address.zip ?? '',
            pref: address.pref ?? '',
            city: address.city ?? '',
            town: address.town ??'',
            lat: position.lat ?? '',
            lng: position.lng ?? '',
        });
    }, [address, position]);

    function handlePicture(e) {
        const file = e.target.files[0];
        if (!file) return;
        setData('picture', file);
        setPreview(URL.createObjectURL(file));
    }

    function onSubmit(e) {
        console.log(data);
        e.preventDefault();
        post('/post', {
            forceFormData: true,
            onSuccess: () => {
                router.reload({ only: ['posts'] });
                onSuccess();
            },
        });
    }

    return (
        <>
            <form className={styles.formCard} onSubmit={ onSubmit }>
                <div className={styles.field}>
                    <input
                        type='text'
                        placeholder='タイトル'
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                    />
                    { errors.title && <p className={styles.error}>{ errors.title }</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor='picture' className={styles.pictureLabel}>画像を選択</label>
                    <input
                        type='file'
                        id='picture'
                        className={styles.picture}
                        accept='image/*'
                        onChange={ handlePicture }
                    />
                    { preview && <img src={ preview } alt='preview' /> }
                    { errors.picture && <p className={styles.error}>{ errors.picture }</p> }
                </div>
                <div className={styles.field}>
                    <textarea
                        placeholder='説明'
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    { errors.description && <p className={styles.error}>{ errors.description }</p> }
                </div>
                <div className={styles.field}>
                    <input type="text" placeholder="自動入力（ピン対応）" value={data.zip} readOnly />
                </div>
                <div className={styles.field}>
                    <input type="text" placeholder="自動入力（ピン対応）" value={data.pref} readOnly />
                </div>
                <div className={styles.field}>
                    <input type="text" placeholder="自動入力（ピン対応）" value={data.city} readOnly />
                </div>
                <div className={styles.field}>
                    <input type="text" placeholder="自動入力（ピン対応）" value={data.town} readOnly />
                </div>
                { (errors.zip || errors.pref || errors.city || errors.town) && <p className={styles.error}>{ 'Place a pin correctly.' }</p>}
                <input type="hidden" value={data.lat} />
                <input type="hidden" value={data.lng} />
                <button type='submit' className={styles.buttonForm} disabled={processing}>投稿</button>
            </form>
        </>
    );
}