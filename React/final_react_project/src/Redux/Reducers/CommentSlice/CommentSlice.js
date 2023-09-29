import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const CommentSLice = createSlice({
    name: 'commente',
    initialState,
    reducers: {
        addComment: (state, action) => { state.push(action.payload) }
    }
})

export const { addComment } = CommentSLice.actions;
export default CommentSLice.reducer;
