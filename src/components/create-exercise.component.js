import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescript = this.onChangeDescript.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username:'',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'test user'
        })
    }

    onChangeUsername(entry) {
        this.setState({
            username: entry.target.value,
        })
    }

    onChangeDescript(entry) {
        this.setState({
            description: entry.target.value,
        })
    }
    onChangeDuration(entry) {
        this.setState({
            duration: entry.target.value,
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
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        //window.location = '/';
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
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescript} 
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration(minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} 
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
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}