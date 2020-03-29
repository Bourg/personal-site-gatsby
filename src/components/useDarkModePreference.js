import { useCallback, useEffect, useState } from "react"

const useDarkModeSystemPreference = () => {
  // Grab a reference to the matchMedia function
  const matchDark =
    typeof Window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null

  // Start by simply checking user preference
  const [prefersDarkMode, setDarkModePreference] = useState(
    matchDark ? matchDark.matches : false
  )

  // Subscribe to system color scheme preferences
  const onColorSchemePreferenceChange = useCallback(
    event => {
      setDarkModePreference(event.matches)
    },
    [setDarkModePreference]
  )
  useEffect(() => {
    if (!matchDark) {
      return
    }

    matchDark.addEventListener("change", onColorSchemePreferenceChange)

    return () =>
      matchDark.removeEventListener("change", onColorSchemePreferenceChange)
  }, [matchDark, onColorSchemePreferenceChange])

  return prefersDarkMode
}

const useDarkModePreference = () => {
  const darkModeSystemPreference = useDarkModeSystemPreference()
  const [darkModeSitePreference, setDarkModeSitePreference] = useState(null)

  return [
    !!(darkModeSitePreference == null
      ? darkModeSystemPreference
      : darkModeSitePreference),
    setDarkModeSitePreference,
  ]
}

export default useDarkModePreference
