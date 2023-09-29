import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favTab: []
}

const favoriteSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        favAdd: (state, action) => {
            state.favTab.push(action.payload);
        },
        updateFav: (state, action) => {
            state.favTab = action.payload;
        }
    },
});

export const { favAdd, updateFav } = favoriteSlice.actions;
export default favoriteSlice.reducer;

