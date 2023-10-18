import React, { useEffect, useState } from 'react'
import Navbare from '../Navbare/Navbare'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Search.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const Serach = ({ renderStars }) => {
    const [searchRecipe, SetSeachRecipe] = useState([])
    const { key } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8080/recipes')
            .then((response) => { SetSeachRecipe(response.data) })
            .catch((error) => { console.error(error) })
    }, [])

    const searched = searchRecipe.filter((recipe) => {
        return recipe.name.toLowerCase().includes(key.toLowerCase());
    });

    return (
        <div>
            <div>
                <Navbare />
            </div>
            <div className='search'>
                <p className='result'>Result Search For {key}</p>
                <div className='searchResult'>
                    <div className='searchResultList'>
                        {searched.map((dinnere) => (
                            <Link to={`/recipe/${dinnere.name}/${dinnere.id}`} className='link'>
                                <Card style={{ width: '18rem' }} className='dinnerCard' >
                                    <Card.Img variant="top" src={"../../" + dinnere.photo} className='dinnerCardImg' />
                                    <Card.Body>
                                        <Card.Title className='card-title'>{dinnere.name}</Card.Title>
                                        <Card.Text className='cardTexte'>
                                            {dinnere.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item className='cuisine'>Cuisine: {dinnere.cuisine}</ListGroup.Item>
                                        <ListGroup.Item>{renderStars(dinnere.Rate)}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Link>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Serach