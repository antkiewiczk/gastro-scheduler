import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Delete, Edit } from 'styled-icons/material';
import { Calendar as CalendarIco, Plus, ChevronLeft } from 'styled-icons/boxicons-regular';

// components
import Calendar from './Calendar';
import Modal from './Modal';
import Button from '../styledComponents/Button';
import Container from '../styledComponents/Container';
import Input from '../styledComponents/Input';
import Icon from '../styledComponents/Icon';

// utils
import { belowDesktop } from '../styledComponents/base';

const Flex = styled(Container)`
  display: flex;
  @media ${belowDesktop} {
    flex-direction: column;
  }
`;

const StaffList = styled.div`
  width: 70%;
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
  width: 30%;
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

  addStaffMember = async () => {
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

  deleteStaffMember = async id => {
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

  updateStaffMember = async ({ schedule }) => {
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

  toggleEditModal = id => {
    const { displayModal } = this.state;
    this.setState({
      idToUpdate: id,
      displayModal: !displayModal,
    });
  }

  toggleScheduleModal = id => {
    const { displayCalendar } = this.state;
    this.setState({
      idToUpdate: id,
      displayCalendar: !displayCalendar,
    });
  }

  closeModals = () => {
    this.setState({
      displayCalendar: false,
      displayModal: false,
    });
  }

  render() {
    const {
      staffList, updateToApply, displayCalendar, idToUpdate, displayModal,
    } = this.state;

    let memberSchedule = {};
    let member = {};
    staffList.map(el => {
      if (el.id === idToUpdate) {
        memberSchedule = el.schedule;
        member = el;
      }
    });

    return (
      <Flex>
        <a href="/dashboard" style={{ whiteSpace: 'nowrap' }}>
          <Icon icon={<ChevronLeft />} fill="#02021e" />
          Go back
        </a>
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
                    <Button onClick={() => this.toggleEditModal(dat.id)}>
                      <Icon icon={<Edit />} marginRight />
                      Edit
                    </Button>
                    <Button marginLeft onClick={() => this.toggleScheduleModal(dat.id)}>
                      <Icon icon={<CalendarIco />} marginRight />
                      Add schedule
                    </Button>
                    <Button marginLeft onClick={() => this.deleteStaffMember(dat.id)}>
                      <Icon icon={<Delete />} />
                    </Button>
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
            placeholder="Staff member's position"
          />
          <Input
            type="text"
            onChange={e => this.setState({ hourlyRate: e.target.value })}
            placeholder="Hourly rate"
          />
          <Input
            type="text"
            onChange={e => this.setState({ fullName: e.target.value })}
            placeholder="Staff member's full name"
          />
          <Button onClick={this.addStaffMember}>
            <Icon icon={<Plus />} marginRight />
            Add
          </Button>
        </AddStaffMemberForm>

        {displayCalendar && (
        <Modal open={displayCalendar} onClose={this.closeModals} size="auto" header="Weekly schedule">
          <Calendar
            onSubmit={this.updateStaffMember}
            id={idToUpdate}
            schedule={memberSchedule}
          />
        </Modal>
        )}

        {displayModal && (
        <Modal open={displayModal} onClose={this.closeModals} header="Edit staff member" size="small">
          <Input
            type="text"
            onChange={e => this.setState({
              updateToApply: {
                ...updateToApply,
                position: e.target.value,
              },
            })}
            value={member.position}
            placeholder="New position"
          />
          <Input
            type="text"
            onChange={e => this.setState({
              updateToApply: {
                ...updateToApply,
                fullName: e.target.value,
              },
            })}
            value={member.fullName}
            placeholder="New full name"
          />
          <Input
            type="number"
            onChange={e => this.setState({
              updateToApply: {
                ...updateToApply,
                hourlyRate: e.target.value,
              },
            })}
            value={member.hourlyRate}
            placeholder="New hourly rate"
          />
          <Button onClick={this.updateStaffMember} marginTop>
            Update
          </Button>
        </Modal>
        )}

      </Flex>
    );
  }
}

Manage.propTypes = {

};

export default Manage;
