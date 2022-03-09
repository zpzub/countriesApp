import axios from 'axios'
export const SHOW_COUNTRIES = 'SHOW_COUNTRIES'
export const SEARCH = 'SEARCH'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const SORT_BY_POPULATION = 'SORT_BY_POPULATION'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'


export function show_countries(){
    return function(dispatch){
         axios.get('http://localhost:3000/api/countries')
        .then((countries) =>{
            dispatch({
                type: SHOW_COUNTRIES,
                payload: countries.data,
            })
        })
        .catch((e) =>{
            console.log(e)
        })
    }
}

export function searchCountry(search){
    return function(dispatch){
        axios.get('http://localhost:3000/api/countries?name=' + search)
        .then((searchedCountry) =>{
            dispatch({
                type: SEARCH,
                payload: searchedCountry.data,
            })
        })
        .catch((e) =>{
            console.log(e)
        })
    }
}

export function getCountries() {
    return async function (dispatch) {
        var countriesList = await axios.get('http://localhost:3000/api/countries', {});
        return dispatch({type: GET_COUNTRIES, payload: countriesList.data});
    }
}

export function getActivities() {
    return async function (dispatch) {
        var activityList = await axios.get('http://localhost:3000/api/activities', {});
        return dispatch({type: GET_ACTIVITIES, payload: activityList.data});
    }
}

export function addActivity(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3000/api/activities/add', payload)
        console.log(response)
        return response
        // .then((payload) =>{
        //     dispatch({
        //         type: ADD_ACTIVITY,
        //         payload: payload.data,
        //     })
        // })
        // .catch((e) =>{
        //     console.log(e)
        // })
    }
}
// payload es el event del select
export function filterByContinent(payload) {
    return {
        type: FILTER_BY_CONTINENT,
        payload: payload
    }
}

export function filterByActivity(payload) {
    return function(dispatch){
        axios.get('http://localhost:3000/api/countries?activity=' + payload)
        .then((searchedCountry) =>{
            dispatch({
                type: FILTER_BY_ACTIVITY,
                payload: searchedCountry.data,
            })
        })
        .catch((e) =>{
            console.log(e)
        })
    }

}

export function sortByName(payload) {
    return{
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function sortByPop(payload) {
    return function(dispatch){
        if(payload === "ASC"){
        axios.get('http://localhost:3000/api/countries?order=ASC')
        .then((response) =>{
            dispatch({
                type: SORT_BY_POPULATION,
                payload: response.data,
            })
        })
        .catch((e) =>{
            console.log(e)
        })}else{
            axios.get('http://localhost:3000/api/countries?order=DESC')
        .then((response) =>{
            dispatch({
                type: SORT_BY_POPULATION,
                payload: response.data,
            })
        })
        }
    }

}











// export function sortByPop(payload) {
//     return{
//         type: SORT_BY_POPULATION,
//         payload: payload
//     }
// }

// export function show_countries() {
//     return function(dispatch) {
//         return fetch(`http://localhost:3000/api/countries`)
//           .then(response => response.json())
//           .then(json => {
//             dispatch({ type: SHOW_COUNTRIES, payload:json});
//             console.log(json)
//           });
//       };
// };