import {Link, withRouter} from 'react-router-dom'

import AppContext from '../../context/AppContext'

const NavItem = props => {
  const {navDetails, history} = props
  const {location} = history
  const isActive = location.pathname === navDetails.path

  const color = isActive ? 'red' : 'black'
  return (
    <AppContext.Consumer>
      {value => {
        const {isDark} = value

        return (
          <Link to={navDetails.path}>
            <li>
              <div style={{color}}>{navDetails.logo}</div>
              <p>{navDetails.displayText}</p>
            </li>
          </Link>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(NavItem)
