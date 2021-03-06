import React, { useState } from 'react'
import { postAdded } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'



const AddPostForm = () => {

    const [title, setTtile] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState('')

    const onAuthorChanged = e => setUserId(e.target.value)

    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    const savePost = () => {
        if (title && content) {
            dispatch(postAdded(
                title,
                content,
                userId
            ))
            setTtile("")
            setContent("")
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (

        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e) => setTtile(e.target.value)}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="button" onClick={savePost} disabled={!canSave}>Save Post</button>
            </form>
        </section>

    )
}

export default AddPostForm