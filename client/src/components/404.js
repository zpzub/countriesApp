import React from "react";
import './404.css'

export function Mistake(){
    return (
        <div className="errorContainer">
            <h1 className="errorTitle">Sorry, this content is not available ;( <br></br></h1>
            <div className="errorLink"><a href="/home" className="button">Take me home</a></div>
        </div>
    )
}