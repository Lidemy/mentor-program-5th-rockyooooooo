import styled from 'styled-components'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'
import { blackDefault, blueLink, grayLine } from '../../constants'

const HeaderContainer = styled.header`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${grayLine};
`

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 50rem;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  @media screen and (max-width: 1024px) {
    & {
      display: ${(props) => props.isHamburgerOpen ? 'flex' : 'none'};
      flex-direction: column;
      align-items: center;
      width: 100%;
      background: white;
      position: absolute;
      top: 3.25rem;
      box-shadow: 0 8px 16px #0a0a0a1a;
    }
  }
`

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${blackDefault};
  cursor: pointer;
  padding: 0.5rem 1rem;
  line-height: 1.5;

  &:hover {
    color: ${blueLink};
  }

  @media screen and (max-width: 1024px) {
    &:hover {
      background-color: #0000000d;
    }
  }
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    & {
      flex-direction: column;
      width: 100%;
      padding: 0.5rem;
    }

    & + & {
      box-shadow: 0 8px 16px #0a0a0a1a;
    }
  }
`

const Nav = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: ${blackDefault};
  padding: 0.5rem 1rem;
  line-height: 1.5;

  &:hover {
    color: ${blueLink};
  }

  @media screen and (max-width: 1024px) {
    & {
      width: 100%;
    }

    &:hover {
      background-color: #0000000d;
    }
  }
`

const Hamburger = styled.div`
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  cursor: pointer;

  &:hover {
    background-color: #0000000d;
  }

  @media screen and (min-width: 1024px) {
    & {
      display: none;
    }
  }
`
const Span = styled.span`
  display: block;
  background-color: ${blackDefault};
  width: 1rem;
  height: 1px;
  position: absolute;
  left: calc(50% - 0.5rem);
  transition: transform 300ms ease, opacity 300ms ease;
`
const BurgerTop = styled(Span)`
  top: calc(50% - calc(1rem - 6px) / 2);
  transform-origin: top left;
  transform: rotate(${(props) => props.isHamburgerOpen && '45deg'}) translateY(${(props) => props.isHamburgerOpen && '-1px'});
`
const BurgerMiddle = styled(Span)`
  top: 50%;
  opacity: ${(props) => props.isHamburgerOpen && 0};
`
const BurgerBottom = styled(Span)`
  top: calc(50% + calc(1rem - 6px) / 2);
  transform-origin: bottom left;
  transform: rotate(${(props) => props.isHamburgerOpen && '-45deg'});
`

const activeStyle = {
  color: blueLink
}

const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const location = useLocation()
  const history = useHistory()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    setIsHamburgerOpen(false)
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  const handleHamburgerClick = () => {
    setIsHamburgerOpen((prev) => !prev)
  }

  return (
    <HeaderContainer>
      <Navbar>
        <Brand to="/" onClick={() => setIsHamburgerOpen(false)}>Large</Brand>
        <Menu isHamburgerOpen={isHamburgerOpen}>
          <NavbarList>
            <Nav to="/list" activeStyle={activeStyle} onClick={() => setIsHamburgerOpen(false)}>文章列表</Nav>
            {user && <Nav to="/new" activeStyle={activeStyle} onClick={() => setIsHamburgerOpen(false)}>發布文章</Nav>}
            <Nav to="/about" activeStyle={activeStyle} onClick={() => setIsHamburgerOpen(false)}>About</Nav>
          </NavbarList>
          <NavbarList>
            {
              user ?
              <Nav to="/" onClick={handleLogout}>登出</Nav> :
              <>
                <Nav to="/register" activeStyle={activeStyle} onClick={() => setIsHamburgerOpen(false)}>註冊</Nav>
                <Nav to="/login" activeStyle={activeStyle} onClick={() => setIsHamburgerOpen(false)}>登入</Nav>
              </>
            }
          </NavbarList>
        </Menu>
        <Hamburger onClick={handleHamburgerClick}>
          <BurgerTop isHamburgerOpen={isHamburgerOpen} />
          <BurgerMiddle isHamburgerOpen={isHamburgerOpen} />
          <BurgerBottom isHamburgerOpen={isHamburgerOpen} />
        </Hamburger>
      </Navbar>
    </HeaderContainer>
  )
}

export default Header;
