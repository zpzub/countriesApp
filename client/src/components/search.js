import React from "react"
import { searchCountry } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import mainLogo from'../images/logo.png';
import './Search.css';

export function Search(){
   let navigate = useNavigate(); 
    const [search, onSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault();
         dispatch(searchCountry(search))
         onSearch('')
         navigate("/home");
    }

    function onChange(event) {
        event.preventDefault();
        onSearch(event.target.value)
        
    }

    return <div className="header">
        <a href="/home"><img  src={mainLogo} alt="Beautiful Countries" className="logoStyle"/></a>
            <form onSubmit={onSubmit} className='formStyle'>
                <input type="text" placeholder='Search country...' onChange={onChange} value={search} className='formText'/>
                <input type="submit" value='Search' className="searchButton"/>

            </form>
  
    </div>

}