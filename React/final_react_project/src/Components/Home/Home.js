import React, { useEffect } from 'react'
import Navbare from './Navbare/Navbare'
import './Home.css'
import LatestRecipe from './Latest/LatestRecipe'
import DinnerTime from './DinnerTime/DinnerTime'
import Team from './Team/Team'
import Recipes from './Recipes/Recipes'
import Footer from './Footer/Footer'

const Home = ({renderStars}) => {
  
  useEffect(() => {
  }, []);
  return (
    <div>
      <Navbare />
      <div className='header-page'>
        <div className='header'>
          <div className='welcome'>
            <h2>Welcome to Tasty Bites</h2>
            <p>your home for delicious recipes that are easy to make and a joy to savor! Explore a world of flavorful dishes and get ready to whip up some tasty treats.</p>
          </div>
        </div>
        <div className='right'>
          <div className='header-right'>
            <img src="quote.png" alt="" />
            <div className='latest'>
              <h2>The Latest <i class="fa-solid fa-arrow-right-long"></i></h2>
            </div>
          </div>
          <div className='latesRecipe'>
            <LatestRecipe starsRate={renderStars} />
          </div>
        </div>
      </div>
      <div>
        <DinnerTime starsRate={renderStars} />
      </div>
      <div>
        <Team />
      </div>
      <div>
        <Recipes starsRate={renderStars} />
      </div>
      <div>
        <Footer/>
      </div>

    </div>
  )
}

export default Home