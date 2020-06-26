import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class ExercisePage extends Component {
    constructor(props) {
        super(props) 

    }

    render() {
        return (
            <div>
                <h3>Exercise Page</h3>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.exercise.username}</td>
                        <td>{this.props.exercise.type}</td>
                        <td>{this.props.exercise.description}</td>
                        <td>{this.props.exercise.duration_hours + ':' + this.props.exercise.duration_min + ":" + this.props.exercise.duration_sec}</td>
                        <td>{this.props.exercise.date.substring(0,10)}</td>
                        <td>
                            <Link to={"/edit/"+this.props.exercise._id}>edit</Link> | 
                            <a href="http://localhost:5000/" onClick={() => { 
                                this.props.deleteExercise(this.props.exercise._id)}}>delete</a>
                        </td>
                    </tr>
                    </tbody>
                </table>          
            </div>
        )
    }

}