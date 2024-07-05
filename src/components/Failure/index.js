import AppContext from '../../context/AppContext'

const Failure = props => (
  <AppContext.Consumer>
    {value => {
      const {isDark} = value
      const {onClickRetry} = props

      const failureImgUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

      const onClickRetryBtn = () => {
        onClickRetry()
      }

      return (
        <div>
          <img src={failureImgUrl} alt="failure view" />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" onClick={onClickRetryBtn}>
            Retry
          </button>
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default Failure
