import React from "react"
import DarkModeToggle from "./darkModeToggle"

import styles from "./layout.module.css"
import "../styles/global.css"

export default ({ children }) => (
  <div className={styles.container}>
    <div className={styles.darkModeToggle}>
      <DarkModeToggle />
    </div>
    {children}
  </div>
)
