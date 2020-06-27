import React, { Component } from 'react';
import axios from 'axios';


export default class ExercisePage extends Component {
    constructor(props) {
        super(props) 

       
    }

    render() {
        return (
            <div>
                <h3>Exercise Title</h3>  
                <ul>
                    <li>Type: {this.state.exercise.type}</li>
                    <li>Description: {this.state.exercise.description}</li>
                    <li>Duration: {this.state.exercise.duration_hours}:{this.state.exercise.duration_min}:{this.state.exercise.duration_sec}</li>
                    <li>Date: {this.state.exercise.date}</li>
                    <li><a href="http://localhost:5000" >Back</a></li>
                </ul>       
            </div>
        
        )}

}