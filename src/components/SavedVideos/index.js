import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideNav from '../SideNav'
import VideoItem from '../VideoItem'

import AppContext from '../../context/AppContext'

import {RouteContainer} from '../StyledComponents/styledComponents'

const SavedVideos = () => (
  <AppContext.Consumer>
    {value => {
      const {isDark, savedVideosList} = value

      const renderVideos = () => (
        <ul>
          {savedVideosList.map(eachVideo => (
            <VideoItem key={eachVideo.id} videoDetails={eachVideo} />
          ))}
        </ul>
      )

      const renderBanner = () => (
        <div data-testid="banner">
          <MdPlaylistAdd color="#ff0000" />
          <h1>Saved Videos</h1>
        </div>
      )

      const renderNoSavedVideos = () => (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>You can save your videos while watching them</p>
        </div>
      )

      return (
        <>
          <SideNav />
          <div>
            <Header />
            <RouteContainer isDark={isDark} data-testid="savedVideos">
              {renderBanner()}
              {savedVideosList.length === 0
                ? renderNoSavedVideos()
                : renderVideos()}
            </RouteContainer>
          </div>
        </>
      )
    }}
  </AppContext.Consumer>
)

export default SavedVideos
