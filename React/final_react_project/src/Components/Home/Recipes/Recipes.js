import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Recipes.css';
import { Link } from 'react-router-dom';

const Recipes = ({ starsRate }) => {
    const [recipe, setRecipe] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/recipes')
            .then((response) => { setRecipe(response.data) })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const otherRecipes = recipe.filter((erecipe) => erecipe.type === 'other')
    return (
        <div className='recipeTime'>
            <h2>Tasty Bites' Recipes <i class="fa-solid fa-arrow-right-long"></i></h2>
            <div className='dinnerList'>
                {otherRecipes.map((recipes) => (
                    <Link to={`/recipe/${recipes.name}/${recipes.id}`} className='link'>
                        <Card style={{ width: '18rem' }} className='recipeCard'>
                            <Card.Img variant="top" src={recipes.photo} className='recipeCardImg' />
                            <Card.Body className='cardBody'>
                                <Card.Title className='card-title'>{recipes.name}</Card.Title>
                                <Card.Text>
                                    {recipes.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item className='cuisine'>Cuisine: {recipes.cuisine}</ListGroup.Item>
                                <ListGroup.Item>{starsRate(recipes.Rate)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Link>))}
            </div>
        </div>
    )
}

export default Recipes