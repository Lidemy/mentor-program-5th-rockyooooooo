import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../contexts'
import { Button, ErrorMessage, Form, Input } from '../../components/utils/Form'

const LoginPage = ({ setIsLoading }) => {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrorMessage(null)

    setIsLoading(true)
    const loginResponse = await login(username, password)
    const {  message, token } = loginResponse
    if (!loginResponse.ok) {
      setErrorMessage(message)
      setIsLoading(false)
      return
    }
    setAuthToken(token)

    const getMeResponse = await getMe()
    const { data } = getMeResponse
    if (!getMeResponse.ok) {
      setAuthToken(null)
      setErrorMessage(data)
      setIsLoading(false)
      return
    }
    setUser(data)
    setIsLoading(false)
    history.push('/')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>登入</h2>
      <label htmlFor="username">Username:</label>
      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label htmlFor="password">Password:</label>
      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button>登入</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  )
}

LoginPage.propTypes = {
  setIsLoading: PropTypes.func
}

export default LoginPage;
