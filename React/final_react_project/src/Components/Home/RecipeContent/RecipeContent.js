import React, { useEffect, useState } from 'react'
import Navbare from '../Navbare/Navbare'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeContent.css';
import YouTube from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { favAdd } from '../../../Redux/Reducers/FavoriteSlice/FavoriteSlice';
import { ToastContainer, toast } from 'react-toastify';
import { addComment } from '../../../Redux/Reducers/CommentSlice/CommentSlice';


const RecipeContent = ({ renderStars }) => {
    const { key } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userSl);
    const commentairy = useSelector(state => state.commente);
    const [allRecipes, setAllRecipes] = useState([]);
    const [star, setStar] = useState('');
    const favo = useSelector(state => state.fav.favTab);
    const [comment, setComment] = useState('');
    const notify = () => toast.success('Added To Favorite');
    const notify1 = (str) => toast.warning(str);
    useEffect(() => {
        axios.get('http://localhost:8080/recipes')
            .then((response) => { setAllRecipes(response.data) })
            .catch((error) => {
                console.error(error)
            })
    }, []);
    const exactRecipe = allRecipes.find((recipe) => recipe.id === key);
    const commaFinder = (str) => {
        return str.split(',')
    }
    const starValue = (e) => {
        setStar(e.target.value)
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const handleFavorite = () => {
        if (user.isLoged) {
            const existedFav = favo.find(recipe => recipe.favourites.name === exactRecipe.name && recipe.id===user.actualUser.id );

            if (!existedFav) {
                dispatch(favAdd({
                    id: user.actualUser.id,
                    favourites: exactRecipe}));
                notify();
            }
            else {
                notify1('Already Added To Favorite')
            }
        }
        else {
            notify1('You Must Login First')
        }
    }
    const submitComment = () => {
        const commentExist = commentairy.find((commentt) => commentt.id === user.actualUser.id && commentt.idRecipe === exactRecipe.id);
        if (commentExist) {
            notify1('You already gave your opinion')
        }
        else {
            dispatch(addComment({
                id: user.actualUser.id,
                idRecipe: exactRecipe.id,
                photo: user.actualUser.img,
                fullName: user.actualUser.name + ' ' + user.actualUser.familyName,
                avis: star,
                commentaire: comment,
            }))
        }
    }
    const recipeComment = exactRecipe ? commentairy.filter(comments => comments.idRecipe === exactRecipe.id) : [];

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <div>
                <Navbare />
            </div>
            <div className='RecipeContent'>
                {exactRecipe ? (
                    <div className='recipe-head'>
                        <h1>{exactRecipe.name}</h1>
                        <p className='rates'>{renderStars(exactRecipe.Rate)}</p>
                        <p className='desc'>{exactRecipe.description}</p>
                        <div className='Recipebuttons'>
                            <button onClick={handleFavorite}>Add To Favorite <i class="fa-solid fa-heart" style={{ color: '#e00000', fontSize: '17px' }}></i></button>
                            <button >Rate <i class="fa-solid fa-star" style={{ color: 'rgb(234, 199, 0)', fontSize: '17px' }} ></i></button>
                            <button>Share <i class="fa-solid fa-share-nodes"></i></button>
                        </div>
                        <div className='video'>
                            <YouTube videoId={exactRecipe.video.split('v=')[1]} opts={{ autoplay: 1 }} />
                        </div>
                        <div className='prep-time'>
                            <p>Prep Time <br /> {exactRecipe.prepTime}</p>
                            <p>Cook Time<br />  {exactRecipe.cookTime}</p>
                            <p>Total Time<br /> {exactRecipe.totalTime}</p>
                            <p>Servings<br />  {exactRecipe.Servings}</p>
                            <p>Yield <br /> {exactRecipe.yield}</p>
                        </div>
                        <div className='ingredients'>
                            <h5>Ingredients</h5>
                            {commaFinder(exactRecipe.ingredients).map((ingredient) => (
                                <p><i class="fa-solid fa-pepper-hot" style={{ color: '#e00000', fontSize: '20px' }}></i> {ingredient}</p>
                            ))}
                        </div>
                        <div className='direction'>
                            <h5>Directions</h5>
                            <p>Step 1: {exactRecipe.firstStep}</p>
                            <p>Step 2: {exactRecipe.secondStep}</p>
                            {exactRecipe.thirdStep && (<p>Step 3: {exactRecipe.thirdStep}</p>)}
                            {exactRecipe.fourthStep && (<p>Step 4: {exactRecipe.fourthStep}</p>)}
                            {exactRecipe.fifthStep && (<p>Step 5: {exactRecipe.fifthStep}</p>)}
                            {exactRecipe.sixStep && (<p>Step 6: {exactRecipe.sixStep}</p>)}
                            {exactRecipe.sevenStep && (<p>Step 6: {exactRecipe.sevenStep}</p>)}
                        </div>
                        <div className='Nutrition'>
                            <h5>Nutrition Facts </h5>
                            <p>(per serving)</p>
                            <div className='quantite'>
                                <p>Calories<br />{exactRecipe.Calories}</p>
                                <p>Fat<br />{exactRecipe.Fat}g</p>
                                <p>Carbs<br />{exactRecipe.Carbs}g</p>
                                <p>Protein<br />{exactRecipe.Protein}g</p>
                            </div>
                        </div>
                        <div className='recipe-photo'>
                            <img src={"../../" + exactRecipe.photo} alt="" />
                        </div>
                        {user.isLoged && (
                            <section className='comment-section'>
                                <div>
                                    <h5>Rate And Comment</h5>
                                </div>

                                <div className='rate-photo'>
                                    <img src={"../../" + user.actualUser.img} alt="" />
                                    <div className='rate'>
                                        <input type="radio" id="star5" name="rate" value="5" onClick={starValue} />
                                        <label htmlFor="star5" title="5 stars"></label>
                                        <input type="radio" id="star4" name="rate" value="4" onClick={starValue} />
                                        <label htmlFor="star4" title="4 stars"></label>
                                        <input type="radio" id="star3" name="rate" value="3" onClick={starValue} />
                                        <label htmlFor="star3" title="3 stars"></label>
                                        <input type="radio" id="star2" name="rate" value="2" onClick={starValue} />
                                        <label htmlFor="star2" title="2 stars"></label>
                                        <input type="radio" id="star1" name="rate" value="1" onClick={starValue} />
                                        <label htmlFor="star1" title="1 star"></label>
                                    </div>
                                </div>
                                <div className='comment-box'>
                                    <textarea placeholder="Add your comment..." value={comment} onChange={handleComment}></textarea>
                                    <button onClick={submitComment}>Comment</button>
                                </div>

                            </section>)}
                        <section className='all-comments'>
                            {recipeComment.map((comment) => (
                                <div className='comments'>
                                    <div className='top'>
                                        <img src={"../../" + comment.photo} alt="" />
                                        <h5>{comment.fullName}</h5>
                                    </div>
                                    <p className='comment-star'>{renderStars(comment.avis)}</p>
                                    <p className='comment-content'>{comment.commentaire}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                ) : (
                    <div>
                        <p>page not found</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default RecipeContent