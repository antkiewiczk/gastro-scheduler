import React, { Component } from 'react';
import PropTypes from 'prop-types';

const range = (start, end) => {
    const hours = []
    for (let i = start; i <= end; i++) {
        hours.push(i);
    }
    return hours
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const operationHours = range(6, 24);

class Calendar extends Component {
    constructor() {
        super();

        this.state = {
            currentWeekParsed: [],
            hourRange: [],
        }
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
        for (var d = prevMonday; d <= nextSunday; d.setDate(d.getDate() + 1)) {
            currentWeek.push(new Date(d));
        }

        const currentWeekParsed = [];
        currentWeek.map(day => {
            currentWeekParsed.push({ name: days[day.getDay()], year: day.getFullYear(), month: months[day.getMonth()], day: day.getDate() })
        })

        this.setState({
            currentWeekParsed
        });
    }

    addHourSchedule = (hour, day) => {
        const { hourRange } = this.state;

        if (hourRange.length === 0) {
            hourRange.push({ [day]: [hour] });
        } else {
            hourRange.map(d => {
                if (d[day] && d[day].length === 2) {
                    return;
                } else if (parseInt(Object.keys(d), 10) === day) {
                    console.log('parseInt(Object.keys(d), 10)', parseInt(Object.keys(d), 10));
                    d[day].push(hour);
                } else {
                    hourRange.push({[day]: [hour]});
                }
            })

        }

        this.setState({
            hourRange,
        });
    }

    determineMarkedClass = (day, hour) => {
        const { hourRange } = this.state;

        if (hourRange.includes(hour)) {
            return 'mark';
        } else if (hourRange[0] < hour && hourRange[1] > hour) {
            return 'mark';
        }
    }

    render() {
        const { currentWeekParsed, hourRange } = this.state;
        console.table('hourRange', hourRange);
        return (
            <div className="calendar">
                {/* leave for now */}
                {/* <div>{`${day.month} ${day.year}`}</div> */}
                {currentWeekParsed.map(day => {
                    return (
                        <div className="day">
                            <div className={`day-header ${day.day === new Date().getDate() ? "today" : ''}`}>
                                <span className={`dayOfMonth`}>{day.day}</span>
                                <span>{day.name}</span>
                            </div>
                            <div className="day-hours">
                                {operationHours.map(hour => <div className={`day-hour ${this.determineMarkedClass(day.day, hour)}`} name={hour} onClick={e => this.addHourSchedule(hour, day.day)}>{`${hour}:00`}</div>)}
                            </div>
                        </div>
                    )
                })}

            </div>

        );
    }
}

Calendar.propTypes = {

};

export default Calendar;