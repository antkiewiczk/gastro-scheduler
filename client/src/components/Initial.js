import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  ${props => props.column && css`
    flex-direction: column;
  `}
  ${props => props.spaceBetween && css`
    justify-content: space-between;
    width: 240px;
  `}
`;

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  background: lightskyblue;
  border: 1px solid lightskyblue;
  color: white;
  ${props => props.red && css`
    background: red;
    border: 1px solid red;
  `}
`;

const Input = styled.input`
  width: 240px;
  padding: 8px;
  margin: 12px;
  font-size: 14px;
`;

class Initial extends Component {
  constructor() {
    super();

    this.state = {
      organisation: {},
      myOrganisation: null,
    };
  }

  componentDidMount() {
    // this.getDataFromDb();
    this.getOrganisation();
  }

    getOrganisation = () => {
      fetch('http://localhost:3001/api/getOrganisation')
        .then(data => data.json())
        .then(res => {
          this.setState({ myOrganisation: res.data[0] });
          if (res.data[0]) {
            window.location.href = '/dashboard/';
          }
        });
    };

      createOrganisation = async () => {
        const { organisation } = this.state;

        const body = JSON.stringify({
          ...organisation,
        });

        try {
          const resp = await fetch('http://localhost:3001/api/putOrganisation', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body,
          });

          if (resp.ok) {
            this.getOrganisation();
          }
        } catch (e) {
          console.error(e);
        }
      };

      deleteOrganisation = async () => {
        const { organisation } = this.state;
        await fetch(`http://localhost:3001/api/deleteOrganisation?id=${organisation[0]._id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      updateOrganisation = e => {
        const { value, name } = e.target;
        const { organisation } = this.state;

        if (!organisation.operatingHours) {
          organisation.operatingHours = [];
        }

        if (name === 'operatingHoursFrom') {
          organisation.operatingHours[0] = value;
        } else if (name === 'operatingHoursTo') {
          organisation.operatingHours[1] = value;
        } else {
          organisation[name] = value;
        }

        this.setState({
          organisation,
        });
      }

      render() {
        const { myOrganisation } = this.state;

        return (
          <div>
            {!myOrganisation && (
            <div>
              <h1>
            Hello, welcome to gastronomy scheduler.
              </h1>
              <h2>
            To start, please add your full name as well as your organisation&apos;s name, city and operating hours in the form below.
              </h2>
              <h2>
            Once created, you will be able to add and modify your staff and their weekly schedule and see the running expenses.
              </h2>
              <Flex column>
                <h3>Organisation info</h3>
                <Input
                  type="text"
                  name="name"
                  onChange={this.updateOrganisation}
                  placeholder="Name"
                />
                <Input
                  type="text"
                  name="city"
                  onChange={this.updateOrganisation}
                  placeholder="City"
                />
                <Input
                  type="number"
                  name="operatingHoursFrom"
                  onChange={this.updateOrganisation}
                  placeholder="Hour the business starts operating"
                  min={4}
                />
                <Input
                  type="number"
                  name="operatingHoursTo"
                  onChange={this.updateOrganisation}
                  placeholder="Hour the business ends operating"
                  max={24}
                />
                <Input
                  type="text"
                  name="ownerFullName"
                  onChange={this.updateOrganisation}
                  placeholder="Owner's full name"
                />
                <Flex spaceBetween>
                  <Button onClick={this.createOrganisation}>
                Create your organisation
                  </Button>
                  <Button red onClick={this.deleteOrganisation}>Delete</Button>
                </Flex>
              </Flex>
            </div>
            ) }
          </div>
        );
      }
}

Initial.propTypes = {

};

export default Initial;
