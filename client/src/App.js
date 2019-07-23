import React, { Component } from 'react';
import Calendar from './components/Calendar';

import './App.scss';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    fullName: null,
    position: null,
    idToDelete: null,
    idToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = async () => {
    const { position, fullName } = this.state;

    const currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    const body = JSON.stringify({
      id: idToBeAdded,
      fullName,
      position,
    });

    try {
      const resp = await fetch('http://localhost:3001/api/putData', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = async () => {
    const { idToDelete, data } = this.state;

    let objIdToDelete = null;
    data.forEach(dat => {
      // eslint-disable-next-line
      if (dat.id === idToDelete) {
        objIdToDelete = dat._id;
      }
    });

    const body = JSON.stringify({
      id: objIdToDelete,
    });

    try {
      const resp = await fetch('http://localhost:3001/api/deleteData', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = async () => {
    const { data, idToUpdate, updateToApply } = this.state;

    let objIdToUpdate = null;
    parseInt(idToUpdate, 10);
    data.forEach(dat => {
      // eslint-disable-next-line
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    const body = JSON.stringify({
      id: objIdToUpdate,
      update: { ...updateToApply },
    });

    try {
      const resp = await fetch('http://localhost:3001/api/updateData', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data, updateToApply } = this.state;

    return (
      <div className="app">
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map(dat => (
              <li style={{ padding: '10px' }} key={data.message}>
                <span style={{ color: 'gray' }}> id: </span>
                {' '}
                {dat.id}
                {' '}
                <br />
                <span style={{ color: 'gray' }}> full name: </span>
                {dat.fullName}
                <br />
                <span style={{ color: 'gray' }}> position: </span>
                {dat.position}
              </li>
            ))}
        </ul>

        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={e => this.setState({ position: e.target.value })}
            placeholder="staff member's position"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={e => this.setState({ fullName: e.target.value })}
            placeholder="staff member full name"
            style={{ width: '200px' }}
          />
          <button onClick={this.putDataToDB}>
            ADD
          </button>
        </div>

        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({ idToDelete: parseInt(e.target.value, 10) })}
            placeholder="put id of item to delete here"
          />
          <button onClick={this.deleteFromDB}>
            DELETE
          </button>
        </div>

        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of staff member to update"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({
              updateToApply: {
                ...updateToApply,
                position: e.target.value,
              },
            })}
            placeholder="new position"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({
              updateToApply: {
                ...updateToApply,
                fullName: e.target.value,
              },
            })}
            placeholder="new full name"
          />
          <button onClick={this.updateDB}>
            UPDATE
          </button>
        </div>

        <Calendar />
      </div>
    );
  }
}

export default App;
