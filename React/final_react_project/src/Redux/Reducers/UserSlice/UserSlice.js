import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoged: false,
    actualUser: []
}

const UserSlice = createSlice({
    name: 'userSl',
    initialState,
    reducers: {
        curentUSer: (state, action) => {
            state.actualUser=action.payload;
        },
        logStatus: (state, action) => {
            state.isLoged = action.payload;
        }
    }
});

export const { curentUSer, logStatus } = UserSlice.actions;
export default UserSlice.reducer;