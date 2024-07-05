import React from 'react'

const AppContext = React.createContext({
  isDark: false,
  activeNavId: 'HOME',
  savedVideosList: [],
  onClickNavItem: () => {},
  toggleTheme: () => {},
  toggleSaveVideo: () => {},
})

export default AppContext
