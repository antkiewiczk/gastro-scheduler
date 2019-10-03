import styled from 'styled-components';
import { belowDesktop, belowTablet, belowPhablet } from './base';

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    @media ${belowDesktop} {
        max-width: 760px;
    }
    @media ${belowTablet} {
        max-width: 510px;
    }
    @media ${belowPhablet} {
        max-width: 100%;
    }
`;

export default Container;
