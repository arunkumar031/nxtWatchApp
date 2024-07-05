import AppContext from '../../context/AppContext'

const NotFound = () => (
  <AppContext.Consumer>
    {value => {
      const {isDark} = value
      const notFoundImgUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div>
          <img src={notFoundImgUrl} alt="not found" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default NotFound
