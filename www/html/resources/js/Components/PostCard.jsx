import { router, usePage } from '@inertiajs/react';
import styles from './PostCard.module.css';

export default function PostCard({ post, onDelete }) {
    const { auth } = usePage().props;
    const user = post.user;//auth.user;
    const isOwner = auth.user.id === post.user_id;

    const handleDelete = (e) => {
        e.stopPropagation();
        if (confirm('削除しますか？')) {
            router.delete(`/post/${post.id}`, {
                onSuccess: () => {
                    console.log('削除成功');
                    onDelete?.();
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
                    {user.avatar ? (
                        <img src={`/storage/${user.avatar}`} alt={user.name} />
                    ) : (
                        <div className={styles.dummyAvatar}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className={styles.userName}>
                            {user.name}
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
                {isOwner &&
                    <div className={styles.deleteButton}>
                        <button onClick={handleDelete}>×</button>
                    </div>
                }
            </div>
        </div>
    );
}