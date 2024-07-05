import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import NavItem from '../NavItem'

import AppContext from '../../context/AppContext'

const navList = [
  {
    id: 'HOME',
    displayText: 'Home',
    logo: <IoMdHome />,
    path: '/',
  },
  {
    id: 'TRENDING',
    displayText: 'Trending',
    logo: <HiFire />,
    path: '/trending',
  },
  {
    id: 'GAMEING',
    displayText: 'Gaming',
    logo: <SiYoutubegaming />,
    path: '/gaming',
  },
  {
    id: 'SAVED',
    displayText: 'Saved videos',
    logo: <MdPlaylistAdd />,
    path: '/saved-videos',
  },
]

const SideNav = () => (
  <AppContext.Consumer>
    {value => {
      const {isDark, activeNavId} = value
      const websiteLogoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <nav>
          <div>
            <Link to="/">
              <img src={websiteLogoUrl} alt="website logo" />
            </Link>
            <ul>
              {navList.map(eachNav => (
                <NavItem
                  key={eachNav.id}
                  navDetails={eachNav}
                  isActive={eachNav.id === activeNavId}
                />
              ))}
            </ul>
          </div>
          <div>
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </nav>
      )
    }}
  </AppContext.Consumer>
)

export default SideNav
