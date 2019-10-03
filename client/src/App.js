import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Initial from './components/Initial';
import Dashboard from './components/Dashboard';
import Manage from './components/Manage';

// styles
import './styles/App.scss';

class App extends Component {
  state = {
    data: [],
    fullName: null,
    position: null,
    hourlyRate: null,
    idToDelete: null,
    idToUpdate: null,
    organisation: {},
    updateToApply: {},
    displayCalendar: false,
    displayModal: false,
  };

  render() {
    const {
      /* data, updateToApply, displayCalendar, idToUpdate, displayModal, */ organisation, myOrganisation,
    } = this.state;

    // let memberSchedule = {};
    // data.map(el => {
    //   if (el.id === idToUpdate) {
    //     memberSchedule = el.schedule;
    //   }
    // });
    // console.log('organisation', organisation);
    // console.log('myOrganisation', myOrganisation);
    return (
      <div className="app">
        <Router>
          <Route path="/" exact component={Initial} />
          <Route path="/dashboard/" exact component={Dashboard} />
          <Route path="/dashboard/manage/" component={Manage} />
        </Router>
      </div>
    );
  }
}

export default App;
