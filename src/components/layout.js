import React, { useEffect } from "react"
import "normalize.css"

import styles from "./layout.module.css"
import useDarkModePreference from "./useDarkModePreference"

export default ({ children }) => {
  const [prefersDarkMode, setDarkModePreference] = useDarkModePreference()
  useEffect(() => {
    if (!window) {
      return
    }

    const root = window.document.documentElement

    let switchTo
    let switchFrom
    if (prefersDarkMode) {
      switchTo = styles.darkTheme
      switchFrom = styles.lightTheme
    } else {
      switchTo = styles.lightTheme
      switchFrom = styles.darkTheme
    }

    root.classList.remove(switchFrom)
    root.classList.add(switchTo)
  }, [prefersDarkMode])

  return (
    <div className={styles.layout}>
      {children}
      <label>
        Prefer dark mode:
        <input
          name="darkModeCheckbox"
          type="checkbox"
          checked={prefersDarkMode}
          onChange={event => {
            setDarkModePreference(event.target.checked)
          }}
        />
      </label>
    </div>
  )
}
