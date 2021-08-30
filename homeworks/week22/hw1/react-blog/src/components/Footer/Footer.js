import styled from 'styled-components'
import { grayLine } from '../../constants';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${grayLine};
  padding-top: 2rem;
  margin: 5rem auto;
  font-size: 0.9rem;
  
  @media screen and (min-width: 1024px) {
    width: 50rem;
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <pre>© 2021 Allen  Powered by <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a></pre>
      <a href="https://github.com/rockyooooooo/react-blog" rel="noopener noreferrer" target="_blank">GitHub</a>
    </FooterContainer>
  )
}

export default Footer;
