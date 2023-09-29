import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './LatestRecipe.css';
import { Link } from 'react-router-dom';

const LatestRecipe = ({ starsRate }) => {
    const [latest, setLatest] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/recipes')
            .then((response) => { setLatest(response.data) })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const latestRecipes = latest.filter((lateste) => lateste.type === 'latest')
    return (
        <div className='latestList'>
            {latestRecipes.map((lateste) => (

                <Card style={{ width: '18rem' }} className='latestCard'>
                    <Link to={`/recipe/${lateste.name}/${lateste.id}`} className='link'>
                        <Card.Img variant="top" src={lateste.photo} className='latestCardImg' />
                        <Card.Body >
                            <Card.Title className='card-title'>{lateste.name}</Card.Title>
                            <Card.Text className='cardText'>
                                {lateste.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item className='cuisine'>Cuisine: {lateste.cuisine}</ListGroup.Item>
                            <ListGroup.Item>{starsRate(lateste.Rate)}</ListGroup.Item>
                        </ListGroup>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default LatestRecipe