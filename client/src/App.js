
import React, { Component } from 'react';
import Calendar from './components/Calendar';

import './App.scss';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
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
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = async message => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    
    const body = JSON.stringify({
      id: idToBeAdded,
      message: message,
    });

    try {
      const resp = await fetch('http://localhost:3001/api/putData', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      };
    } catch(e) {
      console.error(e);
    }
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = async idTodelete => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      console.log('dat', dat);
      // eslint-disable-next-line
      if (dat.id == idTodelete) {
        console.log('dat._id', dat._id);
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
          'Content-Type': 'application/json'
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      };
    } catch(e) {
      console.error(e);
    }
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = async (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      // eslint-disable-next-line
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    const body = JSON.stringify({
      id: objIdToUpdate,
      update: { message: updateToApply },
    });

    try {
      const resp = await fetch('http://localhost:3001/api/updateData', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
      });

      if (resp.ok) {
        this.getDataFromDb();
      };
    } catch(e) {
      console.error(e);
    }
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div className='app'>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>

        <Calendar />
      </div>
    );
  }
}

export default App;