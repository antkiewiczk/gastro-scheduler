import styled from 'styled-components';
import { button } from './base';

const Input = styled.input`
    outline: none;
    border: 0;
    padding: 0.5rem;
    border: 1px solid ${button};
    border-radius: 3px;
    margin: 0.5rem 0;
    width: 100%;
    background: transparent;
`;

export default Input;
