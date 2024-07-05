import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoSunnyOutline} from 'react-icons/io5'
import {FaMoon} from 'react-icons/fa'

import AppContext from '../../context/AppContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <AppContext.Consumer>
      {value => {
        const {isDark, toggleTheme} = value

        const onClickThemeBtn = () => {
          toggleTheme()
        }

        return (
          <nav>
            <div>
              <button
                data-testid="theme"
                type="button"
                onClick={onClickThemeBtn}
              >
                {isDark ? (
                  <IoSunnyOutline color="#f9f9f9" />
                ) : (
                  <FaMoon color="#000000" />
                )}
              </button>
              <button type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </button>
              <Popup
                modal
                trigger={<button type="button">Logout</button>}
                className="popup-content"
              >
                {cancel => (
                  <div>
                    <p>Are you sure, you want to logout?</p>
                    <div>
                      <button type="button" onClick={() => cancel()}>
                        Cancel
                      </button>
                      <button type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(Header)
