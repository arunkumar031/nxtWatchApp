import {Link} from 'react-router-dom'

import AppContext from '../../context/AppContext'

const GameItem = props => {
  const {videoDetails} = props

  return (
    <Link to={`/videos/${videoDetails.id}`}>
      <AppContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <li>
              <img src={videoDetails.thumbnail_url} alt="video thumbnail" />
              <p>{videoDetails.title}</p>
              <p>{videoDetails.view_count} Watching Worldwide</p>
            </li>
          )
        }}
      </AppContext.Consumer>
    </Link>
  )
}

export default GameItem
