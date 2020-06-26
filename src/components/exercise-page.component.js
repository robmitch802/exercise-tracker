import React, { Component } from 'react';
import axios from 'axios';


export default class ExercisePage extends Component {
    constructor(props) {
        super(props) 

        this.state={
            username:'',
            type: '',
            description: '',
            duration_hours: '',
            duration_min: '',
            duration_sec: '',
            date: new Date(),
            users: [],
            types: ['long run', 'easy run', 'workout', 'race', 'cross-train']
        }

    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    type: response.data.type,
                    description: response.data.description,
                    duration_hours: response.data.duration_hours,
                    duration_min: response.data.duration_min,
                    duration_sec: response.data.duration_sec,
                    date: new Date(response.data.date), 
                })
            })
    }

    render() {
        return (
            <div>
                <h3>Exercise Title</h3>  
                <ul>
            <div>Type: {this.state.exercise.type}</div>
            <div>Description: {this.state.exercise.description}</div>
            <div>Duration: {this.state.exercise.duration_hours}:{this.state.exercise.duration_min}:{this.state.exercise.duration_sec}</div>
            <div>Date: {this.state.exercise.date}</div>
            <div><a href="http://localhost:5000" >Back</a></div>

)
                </ul>       
            </div>
        )
    }

}