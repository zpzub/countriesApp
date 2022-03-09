import React from "react"
import { useEffect, useState } from 'react';
import { useParams }  from 'react-router'
import axios from "axios";
import ActivityCard from "./activitycard";
import './CountriePage.css';
import loading from'../images/loading.gif';
//import { useDispatch, useSelector } from 'react-redux'

export function Countrypage(props){

    const [country, setCountry] = useState('')
    const [activity, setActivity] = useState('')

    let {name} = useParams()
    //console.log(name)

    useEffect(() =>{
        axios.get('http://localhost:3000/api/countries/?name=' + name)
        .then((response) =>{
            setCountry(response.data[0])
        })

        axios.get('http://localhost:3000/api/activities/?country=' + name)
        .then((response) =>{
            setActivity(response.data)
        })

        return() => {
            setCountry(null)
        }
    }, [name])
    //console.log(country)
    console.log(activity)

    return <div className="mainContainer">
        { country ?
        <>
        <div className="countryContainer">
            <div className="countryHeader">
                <img src={country.flag} alt='flag' className="countryFlag"/><h3 className="countryName">{country.name}</h3> 
            </div>
        <h5 className="countrySection">&#8600; Capital</h5>
        <h4 className="countryData">{country.capital.replace(/[{(")}]/g, '')} </h4>
        <h5 className="countrySection">&#8600; Region + Continent</h5>
        <h4 className="countryData">{country.subregion} in {country.continent}</h4>
        <h5 className="countrySection">&#8600; Area</h5>
        <h4 className="countryData"> {country.area} km2</h4>
        <h5 className="countrySection">&#8600; Population</h5>
        <h4 className="countryData">{country.population} m</h4>
        <h5 className="countrySection">&#8600; Code</h5>
        <h4 className="countryData">{country.id}</h4>
        </div>

        <div className="activitiesContainer">
        <h3 className="activitiesTitle">Activities</h3>

        {
        activity instanceof Array? 
        <>
        {activity.map((a) =>{
            
            return <ActivityCard name={a.name} difficulty={a.difficulty} duration={a.duration} season={a.season} key={a.id}/>
            
            })
        }
        <a href="/add" className="button">Create an Activity </a>
        </>
    :   <div>There are no activities for {country.name}. <br></br>
        <a href="/add" className="button">Create an Activity </a>
        </div> 
    }
    
    </div>
        
        </>:
        <div className='loading'><p> <img src={loading} alt='loading' height='250'/> </p></div>

    }
        {/* {country.map((country) => (
            <div><h3>{country.name}</h3> <img src={country.flag} alt='flag' /> <h4>{country.continent}</h4></div>
            ))} */}

        
    </div>

}