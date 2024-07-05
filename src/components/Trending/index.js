import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import SideNav from '../SideNav'
import VideoItem from '../VideoItem'
import LoaderItem from '../LoaderItem'
import Failure from '../Failure'

import AppContext from '../../context/AppContext'

import {RouteContainer} from '../StyledComponents/styledComponents'

class Trending extends Component {
  state = {apiStatus: 'INITIAL', videosList: []}

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
    <div data-testid="banner">
      <HiFire color="#ff0000" />
      <h1>Trending</h1>
    </div>
  )

  renderVideos = () => {
    const {videosList} = this.state
    return (
      <ul>
        {videosList.map(eachVideo => (
          <VideoItem key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return <LoaderItem />
      case 'SUCCESS':
        return this.renderVideos()
      case 'FAILURE':
        return <Failure onClickRetry={this.onClickRetry} />
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <>
              <SideNav />
              <div>
                <Header />
                <RouteContainer isDark={isDark} data-testid="trending">
                  {this.renderBanner()}
                  {this.renderResult()}
                </RouteContainer>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Trending
