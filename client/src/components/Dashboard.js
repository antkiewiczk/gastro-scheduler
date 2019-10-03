import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import Container from '../styledComponents/Container';
import Button from '../styledComponents/Button';

// image
import bg from '../img/bg-image.jpg';

const HeroImg = styled.div`
  background-image: url('${bg}');
  background-position: 50%;
  height: 300px;
`;

const Group = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0.5rem;
  :not(:first-of-type) {
    margin-top: 1rem;
  }
`;

const P = styled.p`
  margin-bottom: 1rem;
`;

const Dashboard = () => (
  <>
    <HeroImg src={bg} />
    <Container>
      <h3>Gastronomy scheduler dashboard</h3>
      <Group>
        <P>Add, edit or remove your staff members as well as plan their weekly schedule. Fast, clear and user-friendly interface.</P>
        <Button onClick={() => window.location.href = 'dashboard/manage/'}>Manage your team</Button>
      </Group>
      <Group>
        <P>Manage your company's expenses, total work time, average and total spendings, number of staff on different positions and many more.</P>
        <Button onClick={() => window.location.href = 'dashboard/stats/'}>See statistics and expenses</Button>
      </Group>
    </Container>
  </>
);

Dashboard.propTypes = {

};

export default Dashboard;
