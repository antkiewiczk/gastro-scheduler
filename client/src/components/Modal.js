import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Close } from 'styled-icons/material';

import { button } from '../styledComponents/base';

const ModalOverlay = styled.div`
    display: none;
    position: fixed;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 10;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    ${props => props.open && css`
      display: flex;
    `}
`;

const Wrapper = styled.div`
  ${({ size }) => {
    if (size === 'small') {
      return css`
    width: 360px;  
  `;
    } if (size === 'large') {
      return css`
        width: 1200px;
      `;
    } if (size === 'auto') {
      return css`
      width: auto
      `;
    }
  }}
`;

const Main = styled.main`
    padding: 1.5rem;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const CloseButton = styled(Close)`
    position: absolute;
    right: 16px;
    top: 16px;
    background: transparent;
    cursor: pointer;
`;

const Header = styled.header`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  background-color: white;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    background: ${button};
  }
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: props.open || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.modalOpened !== nextProps.open) {
      this.setState({
        modalOpened: nextProps.open,
      });
    }
  }

  modalClose = event => {
    const { onClose } = this.props;
    const { modalOpened } = this.state;
    if (event) {
      event.preventDefault();
    }
    this.setState({ modalOpened: !modalOpened });

    if (onClose) {
      onClose();
    }
  };

  render() {
    const {
      header, children, size,
    } = this.props;

    const { modalOpened } = this.state;

    return (
      <ModalOverlay open={modalOpened}>
        <Wrapper size={size}>
          <CloseButton onClick={this.modalClose} size={40} fill="white" />
          <Header>
            <h4>{header}</h4>
          </Header>
          <Main>
            {children}
          </Main>
        </Wrapper>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  header: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  size: PropTypes.oneOf(['small', 'large', 'auto']),
};

Modal.defaultProps = {
  open: false,
  header: null,
  size: 'small',
};

export default Modal;
