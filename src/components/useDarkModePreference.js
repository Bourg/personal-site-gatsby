import { useCallback, useEffect, useState } from "react"

const useDarkModeSystemPreference = () => {
  // Start by simply checking user preference
  const [prefersDarkMode, setDarkModePreference] = useState(false)

  // Subscribe to system color scheme preferences
  const onColorSchemePreferenceChange = useCallback(
    event => {
      setDarkModePreference(event.matches)
    },
    [setDarkModePreference]
  )
  useEffect(() => {
    // Grab a reference to the matchMedia function
    const matchDark =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null

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
    darkModeSitePreference == null
      ? darkModeSystemPreference
      : darkModeSitePreference,
    setDarkModeSitePreference,
  ]
}

export default useDarkModePreference
