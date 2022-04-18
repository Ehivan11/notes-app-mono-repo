import React, { useState } from 'react'
import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const user = {
      username,
      password,
    }

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )
    
    handleLogin(user)
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = ({target}) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({target}) => {
    setPassword(target.value)
  }

  return (
    <Toggleable buttonLabel={'Show login'}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={'text'}
            value={username}
            name="Username"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type={'password'}
            value={password}
            name="Password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Toggleable>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string
}
