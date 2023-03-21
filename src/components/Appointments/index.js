// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFavorite: false,
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  getFilteredAppointmentLists = () => {
    const {appointmentsList, isFavorite} = this.state

    if (isFavorite) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isFavorite === true,
      )
    }
    return appointmentsList
  }

  onFavorite = () => {
    const {isFavorite} = this.state

    this.setState({
      isFavorite: !isFavorite,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFavorite} = this.state
    const filterClassName = isFavorite ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentLists()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  placeholder="Date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="add-appointment-btn ">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="line" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filtered-style ${filterClassName}`}
                onClick={this.onFavorite}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleFavorite={this.toggleFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
