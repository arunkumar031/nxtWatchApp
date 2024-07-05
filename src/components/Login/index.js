import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import AppContext from '../../context/AppContext'

import {LoginButton} from '../StyledComponents/styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  renderForm = () => {
    const {showError, errorMsg, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <AppContext.Consumer>
        {value => {
          const {isDark} = value
          const websiteLogoUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div>
              <form onSubmit={this.onClickLogin}>
                <img src={websiteLogoUrl} alt="website logo" />
                <div>
                  <label htmlFor="username">USERNAME</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div>
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type={passwordType}
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                </div>
                <div>
                  <input
                    id="checkbox"
                    type="checkbox"
                    onClick={this.onClickShowPassword}
                  />
                  <label htmlFor="checkbox">Show Password</label>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showError ? <p>{errorMsg}</p> : null}
              </form>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderForm()
  }
}

export default Login
