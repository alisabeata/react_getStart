// styled-components

// https://www.styled-components.com/


yarn add styled-components

import styled from 'styled-components';


const Container = styled.div`
  text-align: center;

  &:before {
    content: '';
    position: absolute;
  }
`;

class App extends Component {
  render() {
    return (
      <Container>
        ...
      </Container>
    );
  }
}

// - keyframes
import {keyframes} from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ImgLogo = styled.img`
  animation: ${rotate360} 1s linear infinite;
`;

// - использование свойств из props
const ImgLogo = styled.img`
  height: ${props => props.height || 80}px;
`;


// - экспорт общих переменных

// in colors.js
export const color1 = '#fff';
export const color2 = '#ccc';
export const color3 = '#555';

// in App.js
import * as colors from './colors';

const Header = styled.div`
  color: ${colors.color1};
`;

// - импорт картинок
import logoImg from './logo';

<img src={logoImg} />
