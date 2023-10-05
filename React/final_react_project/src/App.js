import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import RecipeContent from './Components/Home/RecipeContent/RecipeContent';
import AllRecipes from './Components/Home/AllRecipes/AllRecipes';
import Profile from './Components/Home/Profile/Profile';

function App() {

  const renderStars = (rate) => {
    const totalStars = 5;
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i style={{ color: 'rgb(234, 199, 0)' }} className="fa fa-star"></i>);
    }

    if (halfStar) {
      stars.push(<i style={{ color: 'rgb(234, 199, 0)' }} className="fa fa-star-half-o"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i style={{ color: 'rgb(234, 199, 0)' }} className="fa fa-star-o"></i>);
    }

    return stars;
  }
  return (
    <div className="App">
      <Provider store={store}>

        <Routes>
          <Route path='' element={<Login />} />
          <Route path='/home' element={<Home renderStars={renderStars} />} />
          <Route path='/allrecipes/:type' element={<AllRecipes renderStars={renderStars}/>} />
          <Route path='/recipe/:name/:key' element={<RecipeContent renderStars={renderStars} />} />
          <Route path='/profile/:key' element={<Profile/>} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
