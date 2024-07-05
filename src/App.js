import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import AppContext from './context/AppContext'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDark: false,
    activeNavId: 'HOME',
    savedVideosList: [],
  }

  onClickNavItem = activeNavId => {
    this.setState({activeNavId})
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  toggleSaveVideo = video => {
    const {savedVideosList} = this.state
    const findVideo = savedVideosList.find(each => each.id === video.id)
    if (findVideo === undefined) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
    } else {
      const updatedSavedVideosList = savedVideosList.filter(
        each => each.id !== video.id,
      )
      this.setState({
        savedVideosList: updatedSavedVideosList,
      })
    }
  }

  render() {
    const {isDark, activeNavId, savedVideosList} = this.state
    return (
      <AppContext.Provider
        value={{
          isDark,
          activeNavId,
          savedVideosList,
          onClickNavItem: this.onClickNavItem,
          toggleTheme: this.toggleTheme,
          toggleSaveVideo: this.toggleSaveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
