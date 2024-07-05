import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

import AppContext from '../../context/AppContext'

const ChannelVideoItem = props => {
  const {videoDetails} = props
  const {channel} = videoDetails
  const publishedTimePeriod = formatDistanceToNow(
    new Date(videoDetails.published_at),
  )

  return (
    <Link to={`/videos/${videoDetails.id}`}>
      <AppContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <li>
              <img src={videoDetails.thumbnail_url} alt="video thumbnail" />
              <div>
                <img src={channel.profile_image_url} alt="channel logo" />
                <div>
                  <p>{videoDetails.title}</p>
                  <p>{channel.name}</p>
                  <div>
                    <p>{videoDetails.view_count} views</p> <BsDot />
                    <p>{videoDetails.published_at}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      </AppContext.Consumer>
    </Link>
  )
}

export default ChannelVideoItem
