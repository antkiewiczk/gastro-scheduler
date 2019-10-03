import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Delete, Edit } from 'styled-icons/material';
import { Calendar as CalendarIco, Plus } from 'styled-icons/boxicons-regular';

// components
import Calendar from './Calendar';
import Modal from './Modal';
import Button from '../styledComponents/Button';
import Container from '../styledComponents/Container';

// utils
import { belowDesktop } from '../styledComponents/base';

const Input = styled.input`
  width: 240px;
  padding: 8px;
  margin: 12px;
  font-size: 14px;
`;

const Flex = styled(Container)`
  display: flex;
  @media ${belowDesktop} {
    flex-direction: column;
  }
`;

const StaffList = styled.div`
  width: 60%;
  padding: 16px;
  @media ${belowDesktop} {
    width: 100%;
  }
`;

const Span = styled.span`
  color: grey;
`;

const AddStaffMemberForm = styled.div`
  padding: 16px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media ${belowDesktop} {
    width: 100%;
  }
`;

const Ul = styled.ul`
  width: 100%;
`;

const Li = styled.li`
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  span {
    line-height: 1.3;
  }
`;

const DeleteIcon = styled(Delete)`
  background: transparent;
`;

const EditIcon = styled(Edit)`
  margin-right: 0.5rem;
  background: transparent;
`;

const CalendarIcon = styled(CalendarIco)`
  margin-right: 0.5rem;
  background: transparent;  
`;

const PlusIcon = styled(Plus)`
  margin-right: 0.5rem;
  background: transparent;  
`;

class Manage extends Component {
  constructor() {
    super();

    this.state = {
      staffList: [],
      fullName: null,
      position: null,
      hourlyRate: null,
      idToUpdate: null,
      updateToApply: {},
      displayCalendar: false,
      displayModal: false,
    };
  }

  componentDidMount() {
    this.getStaff();
  }

  getStaff = () => {
    fetch('http://localhost:3001/api/getData')
      .then(data => data.json())
      .then(res => this.setState({ staffList: res.data }));
  };

  putDataToDB = async () => {
    const {
      position, fullName, hourlyRate, staffList,
    } = this.state;

    const currentIds = staffList.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    const body = JSON.stringify({
      id: idToBeAdded,
      fullName,
      position,
      hourlyRate,
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
        this.getStaff();
      }
    } catch (e) {
      console.error(e);
    }
  };

  deleteFromDB = async id => {
    const { staffList } = this.state;

    let objIdToDelete = null;
    staffList.forEach(dat => {
      // eslint-disable-next-line
      if (dat.id === id) {
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
        this.getStaff();
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateDB = async ({ schedule }) => {
    const { staffList, idToUpdate, updateToApply } = this.state;

    if (schedule) {
      updateToApply.schedule = schedule;
    }

    let objIdToUpdate = null;
    parseInt(idToUpdate, 10);
    staffList.forEach(dat => {
      // eslint-disable-next-line
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    console.log('updateToApply', updateToApply);
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
        this.getStaff();
      }
    } catch (e) {
      console.error(e);
    }

    if (schedule) {
      this.setState({
        displayCalendar: false,
      });
    }
  };

  editStaffMember = id => {
    const { displayModal } = this.state;
    this.setState({
      idToUpdate: id,
      displayModal: !displayModal,
    });
  }

  addSchedule = id => {
    const { displayCalendar } = this.state;
    this.setState({
      idToUpdate: id,
      displayCalendar: !displayCalendar,
    });
  }

  render() {
    const {
      staffList, updateToApply, displayCalendar, idToUpdate, displayModal,
    } = this.state;

    let memberSchedule = {};
    staffList.map(el => {
      if (el.id === idToUpdate) {
        memberSchedule = el.schedule;
      }
    });
    console.log('staffList', staffList);
    return (
      <Flex>
        <a href="/dashboard">{'< back'}</a>
        <StaffList>
          <h2>Your staff</h2>
          <Ul>
            {staffList.length <= 0
              ? 'NO DB ENTRIES YET'
              : staffList.map(dat => (
                <Li key={staffList.message}>
                  <div>
                    <Span>ID: </Span>
                    {dat.id}
                    <br />
                    <Span>Full name: </Span>
                    {dat.fullName}
                    <br />
                    <Span>Position: </Span>
                    {dat.position}
                    <br />
                    <Span>Hourly rate: </Span>
                    {dat.hourlyRate}
                    <br />
                  </div>
                  <div>
                    <Button onClick={() => this.editStaffMember(dat.id)}>
                      <EditIcon size={14} fill="white" />
                      Edit
                    </Button>
                    <Button marginLeft onClick={() => this.addSchedule(dat.id)}>
                      <CalendarIcon size={14} fill="white" />
                      Add schedule
                    </Button>
                    <Button marginLeft onClick={() => this.deleteFromDB(dat.id)}><DeleteIcon size={14} fill="white" /></Button>
                  </div>
                </Li>
              ))}
          </Ul>
        </StaffList>

        <AddStaffMemberForm>
          <h2>Add new employee</h2>
          <Input
            type="text"
            onChange={e => this.setState({ position: e.target.value })}
            placeholder="staff member's position"
            style={{ width: '200px' }}
          />
          <Input
            type="text"
            onChange={e => this.setState({ hourlyRate: e.target.value })}
            placeholder="hourly rate"
            style={{ width: '200px' }}
          />
          <Input
            type="text"
            onChange={e => this.setState({ fullName: e.target.value })}
            placeholder="staff member full name"
            style={{ width: '200px' }}
          />
          <Button onClick={this.putDataToDB}>
            <PlusIcon size={14} fill="white" />
            Add
          </Button>
        </AddStaffMemberForm>

        <Modal open={displayCalendar}>
          <div>
            <Calendar
              onSubmit={this.updateDB}
              id={idToUpdate}
              schedule={memberSchedule}
            />
          </div>
        </Modal>

        <Modal open={displayModal}>
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
            <input
              type="number"
              style={{ width: '200px' }}
              onChange={e => this.setState({
                updateToApply: {
                  ...updateToApply,
                  hourlyRate: e.target.value,
                },
              })}
              placeholder="new hourly rate"
            />
            <Button onClick={this.updateDB}>
            Update
            </Button>
          </div>
        </Modal>
      </Flex>
    );
  }
}

Manage.propTypes = {

};

export default Manage;
