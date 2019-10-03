import React from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

const ModalOverlay = styled.div`
    display: none;
    position: fixed;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    ${props => props.open && css`
        display: block;
    `}
`;

const ModalContainer = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Main = styled.main`
    padding: 32px;
    background-color: white;
`;

const Close = styled.button`
    position: absolute;
    right: 16px;
    top: 16px;
    background: transparent;
    border: 0;
    color: white;
    font-size: 28px;
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
    if (event) {
      event.preventDefault();
    }
    this.setState({ modalOpened: !this.state.modalOpened });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const {
      header, headerClass, bodyClass,
    } = this.props;

    const { modalOpened } = this.state;

    return (
      <ModalOverlay open={modalOpened}>
        <ModalContainer>
          <div style={{ width: '800px' }}>
            <Close onClick={this.modalClose}>
                X
            </Close>
            <header>
              <h3>{header}</h3>
            </header>
            <Main>
              {this.props.children}
            </Main>
          </div>
        </ModalContainer>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  header: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  bodyClass: PropTypes.string,
  headerClass: PropTypes.string,
};

Modal.defaultProps = {
  open: false,
  header: null,
  bodyClass: '',
  headerClass: '',
};

export default Modal;
