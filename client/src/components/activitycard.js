import React from "react"
import './ActivityCard.css';
//import {Link} from 'react-router-dom'

export default function ActivityCard(props){
    return <div className="activityCard">
        <h4 className="activityTitle">{props.name}</h4>
        <p className="activitySubTitle">Difficulty</p>
        <h4 className="activityData">{props.difficulty} pts</h4>
        <p className="activitySubTitle">Duration</p>
        <h4 className="activityData">{props.duration}</h4>
        <p className="activitySubTitle">Season</p>
        <h4 className="activityData">{props.season}</h4>

    </div>

}