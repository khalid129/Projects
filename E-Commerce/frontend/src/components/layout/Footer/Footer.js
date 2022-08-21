import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import { SocialIcon } from 'react-social-icons';
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App of Android and IOS mobile phone</p>
            <div>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
            </div>
        </div>
        <div className="midFooter">
            <h1>E-COMMERCE</h1>
            <p>Your Satisfaction is our first priority</p>

            <p>Copyright 2022 &copy; Engr Khalid</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.youtube.com/watch?v=AN3t-OmdyKA&t=17095s">
            Instagram</a>
            <a href="https://www.youtube.com/watch?v=AN3t-OmdyKA&t=17095s">
            Youtube</a>
            <a href="https://www.youtube.com/watch?v=AN3t-OmdyKA&t=17095s">
            Facebook</a>
        </div>
    </footer>
  )
}

export default Footer