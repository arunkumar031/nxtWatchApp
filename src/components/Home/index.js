import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch, IoMdClose} from 'react-icons/io'

import Header from '../Header'
import SideNav from '../SideNav'
import ChannelVideoItem from '../ChannelVideoItem'
import LoaderItem from '../LoaderItem'
import Failure from '../Failure'

import AppContext from '../../context/AppContext'

import {
  HomeRouteContainer,
  HomeBanner,
} from '../StyledComponents/styledComponents'

class Home extends Component {
  state = {
    apiStatus: 'INITIAL',
    videosList: [],
    showBanner: true,
    searchInput: '',
    searchQuery: '',
  }

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  onClickCloseBanner = () => {
    this.setState({showBanner: false})
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchQuery: searchInput}, this.getData)
  }

  getData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {searchQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchQuery}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({videosList: data.videos, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderBanner = () => (
    <HomeBanner data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button">GET IT NOW</button>
      </div>
      <button
        data-testid="close"
        type="button"
        onClick={this.onClickCloseBanner}
      >
        <IoMdClose />
      </button>
    </HomeBanner>
  )

  renderVideos = () => {
    const {videosList} = this.state
    return videosList.length === 0 ? null : (
      <ul>
        {videosList.map(eachVideo => (
          <ChannelVideoItem key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </ul>
    )
  }

  renderNoVideos = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderResult = () => {
    const {apiStatus, videosList} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return <LoaderItem />
      case 'SUCCESS':
        return videosList.length === 0
          ? this.renderNoVideos()
          : this.renderVideos()
      case 'FAILURE':
        return <Failure onClickRetry={this.onClickRetry} />
      default:
        return null
    }
  }

  render() {
    const {showBanner} = this.state

    return (
      <AppContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <>
              <SideNav />
              <div>
                <Header />
                <HomeRouteContainer isDark={isDark} data-testid="home">
                  {showBanner ? this.renderBanner() : null}
                  <div>
                    <div>
                      <input
                        type="search"
                        onChange={this.onChangeSearchInput}
                      />
                      <button
                        data-testid="searchButton"
                        type="button"
                        onClick={this.onClickSearch}
                      >
                        <IoIosSearch />
                      </button>
                    </div>
                    {this.renderResult()}
                  </div>
                </HomeRouteContainer>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
