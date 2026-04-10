import { router } from '@inertiajs/react';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
    const handleDelete = () => {
        if (confirm('削除しますか？')) {
            router.delete(`/post/${post.id}`, {
                onSuccess: () => {
                    console.log('削除成功');
                },
                onError: (error) => {
                    console.log('削除失敗', error);
                    alert('削除に失敗しました');
                },
            });
        }
    };

    return (
        <div className={styles.postCard}>
            <div className={styles.contents}>
                <div className={styles.user}>
                    <img src={`/storage/${post.pictures[0].name}`} />
                    <div className={styles.userName}>
                        user name
                    </div>
                </div>
                <div className={styles.postText}>
                    <div className={styles.address}>
                        <span>〒{post.address.zip}</span>
                        <span>{post.address.prefecture}</span>
                        <span>{post.address.city}</span>
                        <span>{post.address.town}</span>
                    </div>
                    <div className={styles.title}>
                        <span>{post.title}</span>
                    </div>
                    <div className={styles.description}>
                        <span>{post.description}</span>
                    </div>
                </div>
                <div className={styles.picture}>
                    <img src={`/storage/${post.pictures[0].name}`} />
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <div className={styles.deleteButton}>
                    <button onClick={handleDelete}>×</button>
                </div>
            </div>
        </div>
    );
}