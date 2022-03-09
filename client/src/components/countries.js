import React, { useState } from 'react';
//import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { show_countries, 
    filterByContinent,
    filterByActivity,
    sortByName,
sortByPop,
getActivities } from '../redux/actions'
import CountryCard from './country'
import Pagination from './pagination';
import loading from'../images/loading.gif';
import './Countries.css';


export function Countries(){
    
        // Traemos los estados de Redux
        let countries = useSelector((state) => state.countries)
        let activities = useSelector((state) => state.activities)
        const dispatch = useDispatch()


        // Despachamos para mostrar los paises
         useEffect(()=>{
                dispatch(show_countries());
                dispatch(getActivities())
            }, [dispatch])

        //console.log(activities);

        // resetea los países
        function clickHandler(e) {
            e.preventDefault();
            dispatch(show_countries())
        }

        // Variables para la paginacion    
        const [actualPage, setActualPage] = useState(1) 
        const [countriesOnPage] = useState(10)
        const [order, setOrder] = useState('')
        const lastCountryIndex = actualPage * countriesOnPage        
        const firstCountryIndex = lastCountryIndex - countriesOnPage // da cero
        
       
        let currentCountries;
        if(firstCountryIndex === 0){
             currentCountries =  countries.slice(0, 9)}
        if(firstCountryIndex >= 1){
             currentCountries =  countries.slice(firstCountryIndex, lastCountryIndex)}
        

        const paginado = (pagenumber) => {
            setActualPage(pagenumber)
        }

        // Manejamos el filtro por continente
        function handleFilterContinent (event){
            event.preventDefault();
            dispatch(filterByContinent(event.target.value))
            setActualPage(1)
            setOrder(`el orden es ${event.target.value}`)
            console.log(order)
        }

        // Manejamos el filtro por actividad
        function handleFilterActivity (event){
            event.preventDefault();
            dispatch(filterByActivity(event.target.value))
            setActualPage(1)
            setOrder(`el orden es ${event.target.value}`)
        }

        //Manejamos el ordenamiento
        function handleSort (event){
            event.preventDefault();
            dispatch(sortByName(event.target.value))
            setActualPage(1)
            setOrder(`el orden es ${event.target.value}`)
        }

        //Manejamos el ordenamiento por population
        function handleSortPop (event){
            event.preventDefault();
            dispatch(sortByPop(event.target.value))
            setActualPage(1)
            setOrder(`el orden es ${event.target.value}`)
        }

        return <div>
            <div className='filterBar'>
            <button onClick={e => {clickHandler(e)}} className='reserFilter'>Reset Filters</button>
            
            <p className='filterTitle'>A—Z </p>
            <select onChange={e => handleSort(e)} className='filterSelect'>
                
                <option > Sort</option>
                <option value="asc"> A—Z</option>
                <option value="desc"> Z—A</option>
            </select>

            <p className='filterTitle'>Population</p>
            <select onChange={e => handleSortPop(e)} className='filterSelect'>
                <option > Sort</option>
                <option value="ASC"> Ascending</option>
                <option value="DESC"> Descending</option>
            </select>

            <p className='filterTitle'>by Continent</p>
            <select onChange={e => handleFilterContinent(e)} className='filterSelect'>
                <option value="All" > All</option>
                <option value="Africa" > Africa</option>
                <option value="Antarctica" > Antarctica</option>
                <option value="Asia" > Asia</option>
                <option value="Europe" > Europe</option>
                <option value="North America" > North America</option>
                <option value="South America" > South America</option>
                <option value="Oceania" > Oceania</option>
                
                

            </select>

            <p className='filterTitle'>by Activity</p>
            <select onChange={e => handleFilterActivity(e)} className='filterSelect'>
                <option value="All" > All</option>
                {activities.map(e => {
                    return <option value={e.name} key={e.id}> {e.name}</option>
            })}
            </select>
            </div>

            <div className='main-div'>
           { countries.length ?
            <> 
            
            <Pagination 
            countriesOnPage={countriesOnPage}
            countries={countries.length}
            pagination={paginado}/>

            {currentCountries?.map((country) => (
            <CountryCard name={country.name} flag={country.flag} continent={country.continent} population={country.population} key={country.id} />
            ))}
          
            </> : 
            <div className='loading'><p> <img src={loading} alt='loading' height='250'/> </p></div>}
            </div>
        </div>

}



