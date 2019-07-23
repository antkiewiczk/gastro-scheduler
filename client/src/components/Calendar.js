import React, { Component } from 'react';
import PropTypes from 'prop-types';

const range = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const operationHours = range(6, 24);

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      currentWeekParsed: [],
      weeklySchedule: {},
      currentDay: null,
    };
  }

  componentDidMount = () => {
    this.getFullWeek();
  }

  getFullWeek = () => {
    const today = new Date().getDay();
    const prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);

    const currentWeek = [];
    const nextSunday = new Date();
    nextSunday.setDate(prevMonday.getDate() + 6);
    for (let d = prevMonday; d <= nextSunday; d.setDate(d.getDate() + 1)) {
      currentWeek.push(new Date(d));
    }

    const currentWeekParsed = [];
    currentWeek.map(day => {
      currentWeekParsed.push({
        name: days[day.getDay()], year: day.getFullYear(), month: months[day.getMonth()], day: day.getDate(),
      });
    });

    this.setState({
      currentWeekParsed,
    });
  }

  addHourSchedule = (hour, day) => {
    const { weeklySchedule } = this.state;

    if (Object.keys(weeklySchedule).length === 0) {
      weeklySchedule[day] = [hour];
    } else if (weeklySchedule[day] && weeklySchedule[day].length < 2) {
      weeklySchedule[day].push(hour);
    } else if (weeklySchedule[day] && weeklySchedule[day].length === 2) {
      return null;
    } else {
      weeklySchedule[day] = [hour];
    }

    this.setState({
      weeklySchedule,
    });
  }

  determineMarkedClass = (day, hour) => {
    const { weeklySchedule } = this.state;

    if (weeklySchedule[day] && weeklySchedule[day].length === 1 && weeklySchedule[day][0] === hour) {
      return 'mark';
    } if (weeklySchedule[day] && weeklySchedule[day][0] === hour) {
      return 'mark-top';
    } if (weeklySchedule[day] && weeklySchedule[day][1] === hour) {
      return 'mark-bottom';
    } if (weeklySchedule[day] && weeklySchedule[day][0] < hour && weeklySchedule[day][1] > hour) {
      return 'mark-middle';
    }
  }

  render() {
    const { currentWeekParsed, weeklySchedule } = this.state;
    console.table('weeklySchedule', weeklySchedule);
    return (
      <div className="calendar">
        {/* leave for now */}
        {/* <div>{`${day.month} ${day.year}`}</div> */}
        {currentWeekParsed.map(day => (
          <div className="day">
            <div className={`day-header ${day.day === new Date().getDate() ? 'today' : ''}`}>
              <span className="dayOfMonth">{day.day}</span>
              <span>{day.name}</span>
            </div>
            <div className="day-hours">
              {operationHours.map(hour => (
                <div
                  className={`day-hour ${this.determineMarkedClass(day.day, hour)}`}
                  name={hour}
                  onClick={e => this.addHourSchedule(hour, day.day)}
                >
                  {`${hour}:00`}
                </div>
              ))
              }
            </div>
          </div>
        ))}

      </div>

    );
  }
}

Calendar.propTypes = {

};

export default Calendar;
