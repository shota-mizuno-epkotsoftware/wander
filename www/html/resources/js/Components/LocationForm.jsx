import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LocationForm.module.css';

export default function MapView({ address }) {
    const { register, setValue, handleSubmit } = useForm();
    const [preview, setPreview] = useState(null);

    useEffect (() => {
        setValue('zip', address.zip);
        setValue('pref', address.pref);
        setValue('city', address.city);
        setValue('town', address.town);
        setValue('lat', address.lat);
        setValue('lng', address.lng);
    }), [address];

    function handlePicture(e) {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
    }

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <form className={styles.formCard} onSubmit={ handleSubmit(onSubmit) }>
                <div className={styles.field}>
                    <input { ...register('title') } type='text' placeholder='タイトル' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='picture' className={styles.pictureLabel}>画像を選択</label>
                    <input { ...register('picture') } type='file' id='picture' className={styles.picture} accept='image' onChange={ handlePicture } />
                    { preview && <img src={ preview } alt='preview' /> }
                </div>
                <div className={styles.field}>
                    <textarea { ...register('description') } placeholder='説明' />
                </div>
                <div className={styles.field}>
                    <input { ...register('zip') } type="text" placeholder="自動入力（ピン対応）" readOnly />
                </div>
                <div className={styles.field}>
                    <input { ...register('pref') } type="text" placeholder="自動入力（ピン対応）" readOnly />
                </div>
                <div className={styles.field}>
                    <input { ...register('city') } type="text" placeholder="自動入力（ピン対応）" readOnly />
                </div>
                <div className={styles.field}>
                    <input { ...register('town') } type="text" placeholder="自動入力（ピン対応）" readOnly />
                </div>
                <input { ...register('lat') } type="hidden" />
                <input { ...register('lng') } type="hidden" />
                <button type='submit' className={styles.buttonForm}>投稿</button>
            </form>
        </>
    );
}