import PostCard from './PostCard';
import PostCardEdit from './PostCardEdit';
import { useState } from 'react';

export default function PostList({ posts, selectedPost, onSelect }) {
    //const [selectedPost, setSelectedPost] = useState(null); // Map.jsxへ

    console.log(posts);

    return (
        <>
            {!selectedPost &&
                posts.map(post => (
                    <div key={post.id} onClick={() => onSelect(post)}>
                        <PostCard post={post} />
                    </div>
                ))
            }
            {selectedPost &&
                <PostCardEdit selectedPost={selectedPost} onSuccess={() => onSelect(null)}>
                    <div onClick={() => onSelect(null)}>
                        <PostCard post={selectedPost} onDelete={() => onSelect(null)} />
                    </div>
                </PostCardEdit>
            }
        </>
    );
}