 import React from "react";
 import { Link } from "react-router-dom";
 import './Landing.css';
 import bg from'../images/ldg-bg.jpg';
 import logos from'../images/ldg-logos.png';
 import scrabble from'../images/scrabble.png';

 export function Landing() {

    return (
        <div className="main">
            <div className="first-column" style={{ backgroundImage: `url(${bg})`}}>
            <h1 className="ldg-title">A beautiful, useless app to show you i can code</h1>
            <h2 className="ldg-subtitle">(and maybe help you with Scrabble <img src={scrabble} alt='scrabble' height='25' ></img>)</h2>
            <Link to='/home'>
                <button className="ldg-button">Take me in! &#8594;</button>
            </Link>
            </div>
            <div className="second-column">
                <img src={logos} alt='React Node JS Express Sequelize' height='30' ></img>
                <h3 className="subtitle">Why?</h3>
                <p>After 15 years of working on web design and digital marketing, it was time to code. This app it's a simple example of the use of <b>JavaScript</b> along <b>React, Redux, NodeJS, Express and Sequelize.</b> — With the help of the <b>REST Countries API.</b>  </p>
                <h3 className="subtitle">Who am i?</h3>
                <p><strong>Patricio Zubiri</strong>, A creative designer and full stack developer based in Buenos Aires.<br></br>  <a href="https://www.patriciozubiri.com/" target='blank' className='linkbutton'>Come say hi!</a> </p>
            </div>
        </div> 
    )
     
 };
 