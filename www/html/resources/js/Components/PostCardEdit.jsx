import { useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import styles from './postCardEdit.module.css';

export default function PostCardEdit({ children, selectedPost, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        title: selectedPost.title ?? '',
        picture: null,
        description: selectedPost.description ?? '',
        zip: selectedPost.address?.zip ?? '',
        pref: selectedPost.address?.prefecture ?? '',
        city: selectedPost.address?.city ?? '',
        town: selectedPost.address?.town ?? '',
        lat: selectedPost.address?.latitude ?? '',
        lng: selectedPost.address?.longitude ?? '',
    });
    const [preview, setPreview] = useState(
        selectedPost.pictures?.[0] ? `/storage/${selectedPost.pictures[0].name}` : null
    );

    /*
    useEffect (() => {
        setData({
            ...data,
        });
    }, []);
    */

    function handlePicture(e) {
        const file = e.target.files[0];
        if (!file) return;
        setData('picture', file);
        setPreview(URL.createObjectURL(file));
    }

    function onSubmit(e) {
        console.log(data, selectedPost);
        e.preventDefault();
        router.post(`/post/${selectedPost.id}`, {
            _method: 'put',
            ...data,
        }, {
            forceFormData: true,
            onSuccess: () => {
                router.reload({ only: ['posts'] });
                onSuccess();
            },
        });
    }
    return (
        <>
            {children}

            <form className={styles.formCard} onSubmit={ onSubmit } >
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
                <button type='submit' className={styles.buttonForm} disabled={processing}>更新</button>
            </form>
        </>
    );
}