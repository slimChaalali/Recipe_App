import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src="../../TB-logo.png" alt="" />
            </div>
            <div className='footer-links'>
                <h5>HOME</h5>
                <h5>RECIPES</h5>
                <h5>ABOUT</h5>
                <h5>LISTING</h5>
                <h5>BLOG</h5>
                <h5>CONTACT</h5>
            </div>
            <div className='footer-btns'>
                <button><i class="fa-brands fa-twitter"></i></button>
                <button><i class="fa-brands fa-instagram"></i></button>
                <button><i class="fa-brands fa-facebook"></i></button>
            </div>
            <div className='right-reserved'>
                <p>Copyright © 2023 Tasty Bites - All Rights Reserved for all content and materials on this website.</p>
            </div>
        </div>
    )
}

export default Footer