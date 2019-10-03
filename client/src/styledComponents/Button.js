import styled, { css } from 'styled-components';

const blue = '#27279f';
const darkBlue = '#22228b';

const Button = styled.button`
    border: 0;
    outline: none;
    padding: 0.75rem;
    line-height: 1;
    font-size: 14px;
    border: 1px solid ${blue};
    background-color: ${blue};
    color: white;
    border-radius: 3px;
    transition: all 0.1s ease-out;
    cursor: pointer;

    ${props => props.marginLeft && css`
        margin-left: 16px;
    `}

    &:hover {
        background: ${darkBlue};
    }
`;

export default Button;
