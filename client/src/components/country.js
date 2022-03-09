import React from "react"
import {Link} from 'react-router-dom'
import './CountryCard.css';

export default function CountryCard(props){
    return <div className="countryCard">
        <Link to={props.name}>
        <img src={props.flag} alt='flag' className="countryCardFlag" />
        <h3 className="countryCardTitle">{props.name}</h3>
        <p className="countryCardSubTitle">{props.continent}</p>
        <p className="countryCardSubTitle">Pop: {props.population}</p>
        </Link>

    </div>

}