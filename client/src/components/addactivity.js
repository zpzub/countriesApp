import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getCountries, addActivity } from '../redux/actions';
import './AddActivity.css';
//import { addActivity } from '../redux/actions'


function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = 'Name field is required';
    } else if(input.country.length < 1){
        errors.country = 'A country is required';
    }else if(!input.difficulty){
        errors.difficulty = 'A difficulty is required';
    }else if(!input.duration){
        errors.duration = 'A duration is required';
    }else if(!input.season){
        errors.season = 'A season is required';
    }
    return errors;
}

export function AddActivity(params) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countriesList = useSelector((state) => state.countries)
    countriesList.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        country: [],
        difficulty: '',
        duration: '',
        season:'',
    })
    
    useEffect(() =>{
        dispatch(getCountries())
    }, [dispatch])
    
    function removeCountry(event){
        setInput({
            ...input, 
            country: input.country.filter(n => n !== event.target.value),
        })
    }

    function onSubmit(event) {
        event.preventDefault();
        if(errors.name || errors.country || errors.difficulty || errors.duration ||errors.season){
            alert('Some fields are missing!')
        }else{
        dispatch(addActivity(input))
        alert('Activity added!')
        setInput({
            name: '',
            country: [],
            difficulty: '',
            duration: '',
            season:'',        })
       navigate('/home')}
    }

    function onChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value
        }))
    }

    function handleRadio(event) {
        if(event.target.checked){
            setInput({
                ...input, 
                difficulty: event.target.value,
            })
        }
    }

    function handleSelect(event) {
        if(!input.country.includes(event.target.value)){
            setInput({
                ...input, 
                country: [...input.country, event.target.value],
            })
        }else{
            setInput({
                ...input, 
                country: input.country.filter((n) => {return n !== event.target.value}),
            })
        }
    }

    function handleSelectSeason(event) {
        setInput({
            ...input, 
            season:  event.target.value,
        })
    }

   

   
    //console.log(input)
    //console.log(activity)

    return <div className='mainContainers'>
        <div className='titleContainer'>
        <h1 className='activityTitles'> Add your activity</h1>
        <a href='/home' className='button'>Take me home</a>
        </div>
        <div className='formContainer'>
            <form onSubmit={onSubmit}>
                <label className='formLabel'>Activity name:</label>
                <input name="name" type="text" onChange={onChange} value={input.name} pattern="[a-zA-Z]+" className='formField'/>
                {errors.name && (<p className='error'>{errors.name}</p>)}<br></br>
                <label className='formLabel'>Activity Countries:</label>

                <select onChange={(e) => handleSelect(e)} className='formField'>
                <option value="" disabled>Select your countries</option>
                {countriesList.map((country) =>{
                       return <option value={country.name} key={country.id} className='formField'> {country.name} </option>
                    })
                }
                </select>
                {errors.country && (<p className='error'>{errors.country}</p>)}
                <br></br>
                {input.country.map(e => {
                    return <div><button key={e.id} type="button" className='listButton' onClick={(e) =>removeCountry(e)} value={e}> {e} x</button></div>})}

                <br></br>
                <label className='formLabel'>Difficulty:</label>
               
                <fieldset id="group1" className='formField'>
                    <input type="radio" id="Difficulty1" name="group1" value='1' onChange={(e) =>handleRadio(e)} /> <label htmlFor="Difficulty1">1</label>

                    <input type="radio" id="Difficulty2" name="group1" value='2' onChange={(e) =>handleRadio(e)}/> <label htmlFor="Difficulty2">2</label>

                    <input type="radio" id="Difficulty3" name="group1" value='3' onChange={(e) =>handleRadio(e)}/> <label htmlFor="Difficulty3">3</label>

                    <input type="radio" id="Difficulty4" name="group1" value='4' onChange={(e) =>handleRadio(e)}/> <label htmlFor="Difficulty4">4</label>

                    <input type="radio" id="Difficulty5" name="group1" value='5' onChange={(e) =>handleRadio(e)}/> <label htmlFor="Difficulty5">5</label>
                </fieldset>
                {errors.difficulty && (<p className='error'>{errors.difficulty}</p>)}
 
                <label className='formLabel'>Duration:</label>
                <input name="duration" type="text" onChange={onChange} value={input.duration} className='formField'/>
                {errors.duration && (<p className='error'>{errors.duration}</p>)}

                <label className='formLabel'>Season:</label>
                <select onChange={(e) => handleSelectSeason(e)} className='formField'>
                    <option>Choose</option>
                    <option value='winter'>Winter</option>
                    <option value='summer'>Summer</option>
                    <option value='autumn'>Autumn</option>
                    <option value='spring'>Spring</option>
                </select>
                {errors.season && (<p className='error'>{errors.season}</p>)}
                <br></br>
                <button type="submit" value='Add activity' className='formButton'>Add Activity</button>

            </form>
            </div>
            </div>
    
}