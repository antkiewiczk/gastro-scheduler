import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Icon = styled(({ icon, ...props }) => React.cloneElement(icon, props))`
    background: transparent;
    ${({ marginRight }) => marginRight && css`
        margin-right: 0.5rem;
    `}
`;

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
  size: PropTypes.number,
  marginRight: PropTypes.bool,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 20,
  marginRight: false,
  fill: '#fff',
};

export default Icon;
