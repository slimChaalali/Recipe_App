import { createSlice } from '@reduxjs/toolkit'

const initialState = { foods: [] };

const RecipeSlice = createSlice({
    name: 'recipe',
    initialState,

    reducers: {
        addRecipes: (state, action) => {
            return {
                ...state,
                foods: [...state.foods, ...action.payload]
            };
        }
    }
})

export const { addRecipes } = RecipeSlice.actions;
export default RecipeSlice.reducer;