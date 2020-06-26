import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDescript = this.onChangeDescript.bind(this);
        this.onChangeDurationHrs = this.onChangeDurationHrs.bind(this);
        this.onChangeDurationMin = this.onChangeDurationMin.bind(this);
        this.onChangeDurationSec = this.onChangeDurationSec.bind(this);     
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username:'',
            type: '',
            description: '',
            duration_sec: '',
            duration_min: '',
            duration_hours: '',
            date: new Date(),
            users: [],
            types: ['long run', 'easy run', 'workout', 'race', 'cross-train']
        }
    }
//pulls in users on page render
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username,
                    })
                }
            })
    }
//event handler for form fields
    handleChange = (event) => {
        let input = event.target.value
        this.setState({
            [event.target.name]: input
        })
    }
//event handler specific to date field
    onChangeDate(date) {
        this.setState({
            date: date,
        })
    }

//submit handler
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            type: this.state.type,
            description: this.state.description,
            duration_sec: this.state.duration_sec,
            duration_min: this.state.duration_min,
            duration_hours: this.state.duration_hours,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add/', exercise)
            .then(res => console.log(res.data))

        window.location = '/';
    }
 
    render() {
        return (
            <div>
                <h3>Create a New Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option 
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>

                    </div>
                    <div className="form-group">
                        <label>Exercise Type:</label>
                        <select ref="userInput"
                        required
                        className="form-control"
                        name="type"
                        value={this.state.type}
                        onChange={this.handleChange} >
                            {
                                this.state.types.map(function(type) {
                                    return <option
                                    key={type}
                                    value={type}>{type}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            rows="3"
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(hours): </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="duration_hours"
                            value={this.state.duration_hours}
                            onChange={this.handleChange} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="duration_min"
                            value={this.state.duration_min}
                            onChange={this.handleChange} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(seconds): </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="duration_sec"
                            value={this.state.duration_sec}
                            onChange={this.handleChange} 
                            />
                    </div>
                    <div className="form-group" >
                        <label>Date of Exercise: </label>
                        <div>
                            <DatePicker 
                                name="date"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}