import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

// components
import Button from '../styledComponents/Button';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-y: scroll;
`;

const Day = styled.div`
  display: flex;
  padding: 0 8px;
  flex-direction: column;
  width: 150px;
`;

const DayOfMonth = styled.span`
  color: white;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Header = styled.div`
  background: lightskyblue;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  ${({ today }) => today && css`
    background: ${darken(0.25, 'lightskyblue')};
  `}
`;

const Hours = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Hour = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 22px;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: all .15s ease-out;

  ${({ mark }) => {
    switch (mark) {
      case 'mark':
        return css`
           background-color: lightskyblue;
           color: white;
        `;
      case 'top':
        return css`
          background-color: lightskyblue;
           color: white;
          border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
        `;
      case 'bottom':
        return css`
          background-color: lightskyblue;
             color: white;
             border-top-left-radius: 0;
             border-top-right-radius: 0;
        `;
      case 'middle':
        return css`
          background-color: lightskyblue;
             color: white;
             border-radius: 0;
        `;
      default:
        return css``;
    }
  }}

 &:hover {
    background-color: lightskyblue;
    color: white;
   }
`;

const range = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i += 1) {
    hours.push(i);
  }
  return hours;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const operationHours = range(7, 22);

class Calendar extends Component {
  constructor(props) {
    super(props);

    const { schedule } = props;

    this.state = {
      currentWeekParsed: [],
      weeklySchedule: schedule,
      currentDay: null,
    };
  }

  componentDidMount = () => {
    this.getFullWeek();
  }

  getFullWeek = () => {
    const today = new Date().getDay();
    const prevMonday = this.getPreviousMonday();

    const currentWeek = [];
    const milliseconds = prevMonday.getTime() + (6 * 60 * 60 * 24 * 1000);
    const nextSunday = new Date(milliseconds);
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

  getPreviousMonday = () => {
    const date = new Date();
    const day = date.getDay();
    let prevMonday;
    if (date.getDay() === 0) {
      prevMonday = new Date().setDate(date.getDate() - 7);
    } else {
      prevMonday = new Date().setDate(date.getDate() - day + 1);
    }

    return new Date(prevMonday);
  }

  addHourSchedule = (hour, day) => {
    const { weeklySchedule } = this.state;

    if (Object.keys(weeklySchedule).length === 0) {
      weeklySchedule[day] = [hour];
    } else if (weeklySchedule[day] && weeklySchedule[day].length < 2) {
      if (weeklySchedule[day][0] < hour) {
        weeklySchedule[day].push(hour);
      } else {
        // first selected hour was higher than second selected hour e.g 17 and 10 -> we want 10 - 17
        weeklySchedule[day].unshift(hour);
      }
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
      return 'top';
    } if (weeklySchedule[day] && weeklySchedule[day][1] === hour) {
      return 'bottom';
    } if (weeklySchedule[day] && weeklySchedule[day][0] < hour && weeklySchedule[day][1] > hour) {
      return 'middle';
    }
  }

  render() {
    const { currentWeekParsed, weeklySchedule } = this.state;
    const { onSubmit } = this.props;

    return (
      <>
        <CalendarWrapper>
          {currentWeekParsed.map(day => (
            <Day>
              <Header today={day.day === new Date().getDate()}>
                <DayOfMonth>{day.day}</DayOfMonth>
                <span>{day.name}</span>
              </Header>
              <Hours>
                {operationHours.map(hour => (
                  <Hour
                    mark={this.determineMarkedClass(day.day, hour)}
                    name={hour}
                    onClick={e => this.addHourSchedule(hour, day.day)}
                  >
                    {`${hour}:00`}
                  </Hour>
                ))
              }
              </Hours>
            </Day>
          ))}

        </CalendarWrapper>
        <div>
          <Button onClick={() => onSubmit(weeklySchedule)}>Submit</Button>
        </div>
      </>
    );
  }
}

Calendar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  schedule: PropTypes.object,
};

Calendar.defaultProps = {
  schedule: {},
};

export default Calendar;
