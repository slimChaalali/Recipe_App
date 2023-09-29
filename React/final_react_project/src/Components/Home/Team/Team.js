import React, { useEffect, useState } from 'react'
import './Team.css'
import axios from 'axios';
const Team = () => {

    const [team, setTeam] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/team')
            .then((response) => setTeam(response.data))
            .catch((error) => console.error(error))
    })

    return (
        <div className='team'>
            <div className='left-team' >
                <img src="whisk.png" alt="" />
                <h1>Tasty Bites' Team</h1>
                <p>Tasty Bites is your trusted culinary haven, home to a diverse collection of carefully curated recipes, meal plans, and expert guides. Our global community of food enthusiasts continues to grow, driven by our passionate team of recipe creators, writers, testers, photographers, and other creative professionals.</p>
                <button>READ MORE <i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className='right-team'>
                {team.map((teame) => (
                    <div className='team-member'>
                        <img src={teame.image} alt="" />
                        <h5>{teame.name}</h5>
                        <p>{teame.prof}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Team