import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'

import Header from '../Header'
import SideNav from '../SideNav'
import LoaderItem from '../LoaderItem'
import Failure from '../Failure'

import AppContext from '../../context/AppContext'

import {
  CustomButton,
  RouteContainer,
} from '../StyledComponents/styledComponents'

class VideoItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    videoDetails: {},
    liked: false,
    disliked: false,
  }

  componentDidMount() {
    this.getData()
  }

  onClickRetry = () => {
    this.getData()
  }

  onClickLike = () => {
    this.setState(prevState => ({liked: !prevState.liked, disliked: false}))
  }

  onClickDislike = () => {
    this.setState(prevState => ({disliked: !prevState.disliked, liked: false}))
  }

  getData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bear ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({videoDetails: data.video_details, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDark, savedVideosList, toggleSaveVideo} = value
          console.log(savedVideosList)

          const {videoDetails} = this.state
          const isPresent = savedVideosList.find(
            each => each.id === videoDetails.id,
          )
          const saved = isPresent !== undefined

          const onClickSave = () => {
            toggleSaveVideo(videoDetails)
          }

          const renderVideoDetails = () => {
            const {liked, disliked} = this.state
            const {channel} = videoDetails
            const publishedTimePeriod = formatDistanceToNow(
              new Date(videoDetails.published_at),
            )
            const saveText = saved ? 'Saved' : 'Save'
            return (
              <>
                <ReactPlayer
                  url={videoDetails.video_url}
                  playing={false}
                  controls
                />
                <p>{videoDetails.title}</p>
                <div>
                  <p>
                    {videoDetails.view_count} views <BsDot />
                    {publishedTimePeriod}
                  </p>
                  <div>
                    <CustomButton
                      type="button"
                      isActive={liked}
                      onClick={this.onClickLike}
                    >
                      <AiOutlineLike />
                      Like
                    </CustomButton>
                    <CustomButton
                      type="button"
                      isActive={disliked}
                      onClick={this.onClickDislike}
                    >
                      <AiOutlineDislike />
                      Dislike
                    </CustomButton>
                    <CustomButton
                      type="button"
                      isActive={saved}
                      onClick={onClickSave}
                    >
                      <CgPlayListAdd />
                      {saveText}
                    </CustomButton>
                  </div>
                </div>
                <hr />
                <div>
                  <div>
                    <img src={channel.profile_image_url} alt="channel logo" />
                  </div>
                  <div>
                    <p>{channel.name}</p>
                    <p>{channel.subscriber_count} subscribers</p>
                    <p>{videoDetails.description}</p>
                  </div>
                </div>
              </>
            )
          }

          const renderResult = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case 'IN_PROGRESS':
                return <LoaderItem />
              case 'SUCCESS':
                return renderVideoDetails()
              case 'FAILURE':
                return <Failure onClickRetry={this.onClickRetry} />
              default:
                return null
            }
          }

          return (
            <>
              <SideNav />
              <div>
                <Header />
                <RouteContainer isDark={isDark} data-testid="videoItemDetails">
                  {renderResult()}
                </RouteContainer>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default VideoItemDetails
