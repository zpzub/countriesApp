import {SHOW_COUNTRIES, SEARCH, ADD_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    SORT_BY_POPULATION,
    GET_COUNTRIES,
    GET_ACTIVITIES
} from '../actions';
//import axios from 'axios';

const initialState= {
    countries: [],
    allCountries: [],
    activities: [],
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case SHOW_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
         case SEARCH:
            return {
                ...state,
                countries: action.payload
                // lo actualizo sobre el arreglo que estoy renderizando
            }
            case GET_COUNTRIES:
                return{
                    ...state,
                    countries: action.payload,
                }
            case GET_ACTIVITIES:
                return{
                    ...state,
                    activities: action.payload,
                    }
            case ADD_ACTIVITY:
                return {
                    ...state,
                }
            case FILTER_BY_CONTINENT:
                 const allCountries = state.allCountries
                 const filteredCountries = action.payload === 'All' ? allCountries : allCountries.filter(e => e.continent === action.payload)
                return {
                    ...state,
                    countries: filteredCountries,
                    }
            case FILTER_BY_ACTIVITY:
                return {
                    ...state,
                    countries: action.payload
                    // lo actualizo sobre el arreglo que estoy renderizando
                }

            case ORDER_BY_NAME: 
            let orderArray = action.payload === "asc" ?
                        state.countries.sort(function (a,b) {
                            if(a.name > b.name){
                                return 1;
                            }
                            if(b.name > a.name){
                                return -1;
                            }
                            return 0;
                        }) : state.countries.sort(function (a,b) {
                            if(a.name > b.name){
                                return -1;
                            }
                            if(b.name > a.name){
                                return 1;
                            }
                            return 0;
                        })
                        return {
                            ...state,
                            countries: orderArray
                        }
            case SORT_BY_POPULATION:
                // let sortpop = action.payload === 'ASC'?
                //     axios.get('http://localhost:3000/api/countries?order=ASC')
                //     .then((response) => {return response.data})
                //     .catch((e) => console.log(e))
                // :
                //     axios.get('http://localhost:3000/api/countries?order=DESC')
                //     .then((response) => {return response.data})
                //     .catch((e) => console.log(e))
                //         console.log(sortpop)
                return{
                    ...state,
                    countries: action.payload
                } 

            default:
            return state;
    }
};
