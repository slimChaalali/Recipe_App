import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbare.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFav } from '../../../Redux/Reducers/FavoriteSlice/FavoriteSlice';
import { curentUSer, logStatus } from '../../../Redux/Reducers/UserSlice/UserSlice';


const Navbare = () => {
    const location = useLocation();
    const favorites = useSelector(state => state.fav.favTab);
    const user = useSelector(state => state.userSl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const handleSearch = () => setIsClicked(!isClicked);
    const favoUser = favorites.filter(favo => favo.id === user.actualUser.id)
    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            navigate('/')
        }
    };
    const handleRemove = (id, event) => {
        event.preventDefault();
        const indexRemove = favorites.findIndex(recipe => recipe.favourites.id === id && recipe.id === user.actualUser.id);
        const updatedArray = [...favorites];
        if (indexRemove !== -1) {
            updatedArray.splice(indexRemove, 1);
            dispatch(updateFav(updatedArray))
        }
    };
    const logout = () => {
        dispatch(curentUSer({}));
        dispatch(logStatus(false));
        navigate('/')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link to="/home"> <Navbar.Brand href="#" className='navbareLogo'><img src="../../TB-logo.png" alt="" /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate('/home')} style={{ color: '#430C8C' }}>Home</Nav.Link>
                        <Nav.Link style={{ color: '#430C8C' }}>Link</Nav.Link>
                        <NavDropdown title="Recipes" id="navbarScrollingDropdown">
                            <NavDropdown.Item style={{ color: '#430C8C' }}>Action</NavDropdown.Item>
                            <NavDropdown.Item style={{ color: '#430C8C' }}>
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={{ color: '#430C8C' }}>
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Kitchen" id="navbarScrollingDropdown" >
                            <Link to="/allrecipes/French" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>French</NavDropdown.Item></Link>
                            <Link to="/allrecipes/Mexican" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>Mexican</NavDropdown.Item></Link>
                            <Link to="/allrecipes/Italian" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>Italian</NavDropdown.Item></Link>
                            <Link to="/allrecipes/Chinese" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>Chinese</NavDropdown.Item></Link>
                            <Link to="/allrecipes/German" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>German</NavDropdown.Item></Link>
                            <NavDropdown.Divider />
                            <Link to="/allrecipes/Global" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#action3" style={{ color: '#430C8C' }}>See All</NavDropdown.Item></Link>
                        </NavDropdown>
                        <Nav.Link href="#" style={{ color: '#430C8C' }}>
                            Link
                        </Nav.Link>

                    </Nav>
                    <Form className="d-flex">
                        {user.isLoged && (
                            <NavDropdown title={<i class="fa-solid fa-heart"></i>} id="favoriteScrollingDropdown">

                                <div className="custom-dropdown-menu">
                                    {favoUser.slice(0, 3).map((favo) => (

                                        <div className='favorite'>
                                            <img src={"../../" + favo.favourites.photo} alt="" />
                                            <NavDropdown.Item href="#action3" className='favorite-item' ><p>{favo.favourites.name}</p></NavDropdown.Item>
                                            <button className='remove-button' onClick={(event) => handleRemove(favo.favourites.id, event)}><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    ))}
                                    <NavDropdown.Divider />
                                    {favoUser.length > 0 ? (
                                        <NavDropdown.Item className='see-more'>
                                            See All{favoUser.length > 3 && (<>(+{favoUser.length - 3})</>)}
                                        </NavDropdown.Item>
                                    ) : (<NavDropdown.Item className='see-more'>
                                        No Favorite Yet
                                    </NavDropdown.Item>)}
                                </div>
                            </NavDropdown>)}

                        {isClicked ? (<div className='search-form'><Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onKeyPress={handleEnterKey}
                        />
                            <button onClick={handleSearch} className='close-button' ><i class="fa-solid fa-xmark"></i></button></div>) : (<button onClick={handleSearch} className='search-button'><i class="fa-solid fa-magnifying-glass"></i></button>)}

                    </Form>
                    {user.isLoged ? (<div className='logedIn'>
                        <img
                            src={location.pathname === '/recipe' ? user.actualUser.img : `../../${user.actualUser.img}`}
                            alt=""
                        />
                        <p>{user.actualUser.name} {user.actualUser.familyName}</p>
                        <div className="mb-2">
                            <DropdownButton
                                key='start'
                                id='dropdown-button-drop-start'
                                drop='start'
                                variant="none"
                                title={<i class="fa-solid fa-bars"></i>}
                            >
                                <Dropdown.Item eventKey="1" style={{ color: '#430C8C' }}>Profile</Dropdown.Item>
                                <Dropdown.Item eventKey="2" style={{ color: '#430C8C' }}>Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4" style={{ color: '#430C8C' }} onClick={logout}>LogOut</Dropdown.Item>
                            </DropdownButton>
                        </div>

                    </div>) : (<Link to="/">
                        <div className='log-in'>
                            <i class="fa-solid fa-user"></i>
                            <p>Log In</p>
                        </div>
                    </Link>)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbare