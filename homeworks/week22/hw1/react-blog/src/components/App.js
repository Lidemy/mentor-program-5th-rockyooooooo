import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import PostPage from '../pages/PostPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import NewPostPage from '../pages/NewPostPage'
import ListPage from '../pages/ListPage'
import { AuthContext } from '../contexts'
import { getMe } from '../WebAPI'
import { getAuthToken } from '../utils'
import AboutPage from '../pages/AboutPage'
import LoadingPage from '../pages/LoadingPage'

const Root = styled.div`
 padding-top: 53px;
`

const Container = styled.div`
  margin: 0 auto;
  padding: 3rem 1.5rem 0;

  @media screen and (min-width: 1024px) {
    width: 50rem;
  }
`

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) return

    getMe().then((response) => {
      const { ok, data } = response
      if (!ok) {
        console.log(data)
        return
      }
      setUser(data)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          {isLoading && <LoadingPage />}
          <Container>
            <Switch>
              <Route exact path="/">
                <HomePage setIsLoading={setIsLoading} />
              </Route>
              <Route path="/list">
                <ListPage setIsLoading={setIsLoading} />
              </Route>
              <Route path="/new">
                <NewPostPage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/login">
                <LoginPage setIsLoading={setIsLoading} />
              </Route>
              <Route path="/register">
                <RegisterPage setIsLoading={setIsLoading} />
              </Route>
              <Route path="/posts/:id">
                <PostPage setIsLoading={setIsLoading} />
              </Route>
            </Switch>
          </Container>
          {!isLoading && <Footer isLoading={isLoading} />}
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
