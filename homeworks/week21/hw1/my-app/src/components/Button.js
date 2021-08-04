import styled from 'styled-components'
import colors from '../constants/colors'

const Button = styled.button`
background: transparent;
font-size: 1rem;
color: ${colors.gray02};
padding: 0.5rem;
border-radius: 0.5rem;
border: none;
transition: color 300ms ease;
cursor: pointer;

&:hover {
  color: ${colors.white};
}
`

export default Button