import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { selectAllPosts, fetchPosts } from './postsSlice'
const PostsList = () => {

    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch()

    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
            dispatch(fetchPosts()) 
    }, [postStatus, dispatch])


    const renderedPosts = posts.map((post) => (
        <article className="post-excerpt" key={post.id}>

            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    ))

    return (
        <div>
            <h2>Post</h2>
            {renderedPosts}

        </div>
    )
}

export default PostsList