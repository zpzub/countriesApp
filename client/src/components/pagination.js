import React from "react";
import './pagination.css'

export default function Pagination({countriesOnPage, countries, pagination}) {
    const pageNumbers = []

    for (var i = 1; i <= Math.ceil(countries/countriesOnPage); i++){
        pageNumbers.push(i)
    }

    // el map agarra cada numero y lo renderiza por separado
    return (
        <div className="container">
        <nav className="mainPagination">
            <ul className='paginationStyle'>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <li className="number" key={number}>
                    <button onClick={() => pagination(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
    
}