import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice/UserSlice';
import recipeReducer from './Reducers/RecipeSlice/RecipeSlice';
import favoriteReducer from './Reducers/FavoriteSlice/FavoriteSlice'
import CommentReducer from './Reducers/CommentSlice/CommentSlice'

const store = configureStore({
    reducer: {
        userSl: userReducer,
        recipe: recipeReducer,
        fav: favoriteReducer,
        commente: CommentReducer,
    }
})

export default store;