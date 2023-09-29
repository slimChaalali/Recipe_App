import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './DinnerTime.css';
import { Link } from 'react-router-dom';




const DinnerTime = ({ starsRate }) => {
    const [dinner, setDinner] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/recipes')
            .then((response) => { setDinner(response.data) })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const dinnerRecipes = dinner.filter((dinnere) => dinnere.type === 'dinner')

    return (
        <div className='dinnerTime'>
            <h2>Dinnertime Classics <i class="fa-solid fa-arrow-right-long"></i></h2>
            <div className='dinnerList'>
                {dinnerRecipes.map((dinnere) => (
                    <Link to={`/recipe/${dinnere.name}/${dinnere.id}`} className='link'>
                        <Card style={{ width: '18rem' }} className='dinnerCard' >
                            <Card.Img variant="top" src={dinnere.photo} className='dinnerCardImg' />
                            <Card.Body>
                                <Card.Title className='card-title'>{dinnere.name}</Card.Title>
                                <Card.Text className='cardTexte'>
                                    {dinnere.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item className='cuisine'>Cuisine: {dinnere.cuisine}</ListGroup.Item>
                                <ListGroup.Item>{starsRate(dinnere.Rate)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Link>))}
            </div>
        </div>
    )
}

export default DinnerTime