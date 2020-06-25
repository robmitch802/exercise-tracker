import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

//functional component for each exercise
const Exercise = props =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.type}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration_hours + ':' + props.exercise.duration_min + ":" + props.exercise.duration_sec}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)


export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => { 
                this.setState({ exercises: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));
            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
    }
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Exercises: </h3>
                <table className="table table-striped" >
                    <thead className="thead-light" >
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
                       { this.exerciseList() }
                    </tbody>
                </table>

            </div>
        )
    }

}