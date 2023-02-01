import React, { useContext } from 'react'
import { ThemeContext as StyledThemeCopntext } from 'styled-components'
import { ThemeContext } from '../ThemeContext'

const useTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  // const theme = useContext(StyledThemeCopntext)
  const theme = useContext(StyledThemeCopntext as React.Context<any>)
  return { isDark, toggleTheme, theme }
}

export default useTheme
