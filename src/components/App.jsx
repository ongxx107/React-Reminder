import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import '../App.css';
import moment from 'moment';
// import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    console.log("this.state.dueDate", this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate); // dispatcher send it to action
  }

  deleteReminder(id) {
    this.props.deleteReminder(id); // dispatcher send it to action
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className = 'list-group col-sm-4'>
        {
          reminders.map(reminder => {
            return (
              <li key = {reminder.id} className = 'list-group-item'>
                <div className = 'list-item'>
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className = 'list-item delete-button'
                  onClick = {() => this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className = 'App'>
        <div className = 'title'>
          Reminder App
        </div>
        <div className = 'form-inline reminderForm'>
          <div className = 'form-group'>
            <input
              className = 'form-control reminderInput'
              placeholder = 'Remind me to...'
              onChange = {event => this.setState({text: event.target.value})}
            />
            <input
              className = 'form-control reminderInput'
              type = 'datetime-local'
              onChange = {event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <Button
            type = 'button'
            className = 'btn btn-success'
            onClick = {() => this.addReminder()}
          >
            Add Reminder
          </Button>
        </div>
        { this.renderReminders() }
        <div
           className = 'btn = btn-danger'
           onClick = {() => this.props.clearReminders()}
        >
          Clear All
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

// function mapDispatchProps(dispatch) {
//   return bindActionCreators({ addReminder }, dispatch);
// }

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App); // connect/map multiple functions for updated reminders from action and pass it to Provider in src/index.js
