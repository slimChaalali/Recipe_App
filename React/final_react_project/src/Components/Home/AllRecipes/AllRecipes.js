import Navbare from '../Navbare/Navbare'
import './AllRecipes.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Footer from '../Footer/Footer';

const AllRecipes = ({ renderStars }) => {
    const [food, setfood] = useState([]);
    const [flag, setFlag] = useState('');
    const { type } = useParams();
    const [kitchen, setKitchen] = useState([]);

    useEffect(() => {
        const findKitchen = () => {
            switch (type) {
                case 'French':
                    setKitchen(food.filter((kitchen) => kitchen.cuisine === 'French'));
                    setFlag('french.png');
                    break;
                case 'Chinese':
                    setKitchen(food.filter((kitchen) => kitchen.cuisine === 'Chinese'));
                    setFlag('chinese.png');
                    break;
                case 'German':
                    setKitchen(food.filter((kitchen) => kitchen.cuisine === 'German'));
                    setFlag('german.png');
                    break;
                case 'Mexican':
                    setKitchen(food.filter((kitchen) => kitchen.cuisine === 'Mexican'));
                    setFlag('mexico.png');
                    break;
                case 'Italian':
                    setKitchen(food.filter((kitchen) => kitchen.cuisine === 'Italian'));
                    setFlag('italy.jpg');
                    break;
                case 'Global':
                    setKitchen(food);
                    break;
                default:
                    setKitchen(true);
                    break;
            }
        };
        axios.get('http://localhost:8080/recipes')
            .then((response) => { setfood(response.data); findKitchen(); })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [type, food]);

    return (
        <div>
            <section>
                <Navbare />
            </section>
            <section className='recipe-main'>
                <div className='first-img'>
                    <img src="../Foods.png" alt="" />
                </div>
                <div className='outline'>
                    {type !== 'Global' && (<img src={"../../" + flag} alt="" />)}
                    <h1>Discover Our {type} Recipes</h1>
                    <p>Explore a world of culinary inspiration with our {type} recipes, where you'll discover a treasure trove of delicious dishes, cooking tips, and mouthwatering recipes to satisfy every craving</p>

                </div>
                <div className='kitchen-detail'>
                    <img src="../vegetables.jpg" alt="" />
                    <h5><span>''</span> Good food has the remarkable power to bring people together and create lasting memories <span>''</span></h5>
                </div>
                <div className='explore'>
                    <h1>Explore our Diches</h1>
                    <div>
                        <div className='dinnerList'>
                            {kitchen.map((recipes) => (
                                <Link to={`/recipe/${recipes.name}/${recipes.id}`} className='link' >
                                    <Card style={{ width: '18rem' }} className='recipeCard'>
                                        <Card.Img variant="top" src={"../../" + recipes.photo} className='recipeCardImg' />
                                        <Card.Body className='cardBody'>
                                            <Card.Title className='card-title'>{recipes.name}</Card.Title>
                                            <Card.Text>
                                                {recipes.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item className='cuisine'>Cuisine: {recipes.cuisine}</ListGroup.Item>
                                            <ListGroup.Item>{renderStars(recipes.Rate)}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Link>))}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AllRecipes