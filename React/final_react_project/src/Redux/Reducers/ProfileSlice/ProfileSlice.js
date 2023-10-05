import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],

}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,

    reducers: {
        addNewUserPost: (state, action) => { state.posts.push(action.payload) },
        addExistUserPost: (state, action) => { state.posts[action.payload.pos].postes.push(action.payload.morePost) },
        addPostComment: (state, action) => {
            const exactUser = state.posts.find((post) => post.id === action.payload.id)
            exactUser.postes[action.payload.key].comments.push({
                comment: action.payload.comment,
                name: action.payload.name,
                img: action.payload.img
            })
        },

    }
})

export const { addExistUserPost, addNewUserPost, addPostComment } = ProfileSlice.actions;
export default ProfileSlice.reducer;


