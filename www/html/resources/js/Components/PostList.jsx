import PostCard from './PostCard';
import PostCardEdit from './PostCardEdit';
import { useState } from 'react';

export default function PostList({ posts }) {
    const [selectedPost, setSelectedPost] = useState(null); // Map.jsxへ

    console.log(posts);

    return (
        <>
            {!selectedPost &&
                posts.map(post => (
                    <div key={post.id} onClick={() => setSelectedPost(post)}>
                        <PostCard post={post} />
                    </div>
                ))
            }
            {selectedPost &&
                <PostCardEdit selectedPost={selectedPost} onSuccess={() => setSelectedPost(null)}>
                    <div onClick={() => setSelectedPost(null)}>
                        <PostCard post={selectedPost} />
                    </div>
                </PostCardEdit>
            }
        </>
    );
}