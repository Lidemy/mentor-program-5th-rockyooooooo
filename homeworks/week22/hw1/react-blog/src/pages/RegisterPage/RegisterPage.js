import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { register, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from '../../contexts'
import { Button, ErrorMessage, Form, Input } from '../../components/utils/Form'

const RegisterPage = ({ setIsLoading }) => {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrorMessage(null)

    setIsLoading(true)
    const registerResponse = await register({username, password, nickname})
    const {  message, token } = registerResponse
    if (!registerResponse.ok) {
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
      <h2>註冊</h2>
      <label htmlFor="username">Username:</label>
      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <label htmlFor="password">Password:</label>
      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <label htmlFor="nickname">Nickname:</label>
      <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
      <Button>註冊</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  )
}

RegisterPage.propTypes = {
  setIsLoading: PropTypes.func
}

export default RegisterPage;
