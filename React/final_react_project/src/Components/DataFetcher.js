import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addRecipes } from '../Redux/Reducers/RecipeSlice/RecipeSlice';


const DataFetcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8080/recipes')
      .then((response) => {
        dispatch(addRecipes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    axios.get('http://localhost:8080/latest')
      .then((response) => {
        dispatch(addRecipes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    axios.get('http://localhost:8080/dinner')
      .then((response) => {
        dispatch(addRecipes(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);
  return <></>;
};

export default DataFetcher;