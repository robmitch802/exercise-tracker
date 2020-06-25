import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
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
                    duration_min: response.data.duration_sec,
                    date: new Date(response.data.date),
                })
            })
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUsername(entry) {
        this.setState({
            username: entry.target.value,
        })
    }
    onChangeType(entry) {
        this.setState({
            type: entry.target.value,
        })
    }
    onChangeDescript(entry) {
        this.setState({
            description: entry.target.value,
        })
    }
    onChangeDurationHrs(entry) {
        let hours = entry.target.value
        this.setState({
            duration_hours: hours,
        })
    }
    onChangeDurationMin(entry) {
        let minutes = entry.target.value
        this.setState({
            duration_min: minutes,
        })
    }
    onChangeDurationSec(entry) {
        let seconds = entry.target.value
        this.setState({
            duration_sec: seconds,
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date,
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            type: this.state.type,
            description: this.state.description,
            duration_hours: this.state.duration_hours,
            duration_min: this.state.duration_min,
            duration_sec: this.state.duration_sec,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data))

       // window.location = '/';
    }
 
    render() {
        return (
            <div>
                <h3>Edit Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
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
                        value={this.state.type}
                        onChange={this.onChangeType} >
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
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescript} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(hours): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration_hours}
                            onChange={this.onChangeDurationHrs} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration_min}
                            onChange={this.onChangeDurationMin} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(seconds): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration_sec}
                            onChange={this.onChangeDurationSec} 
                            />
                    </div>
                    <div className="form-group" >
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}