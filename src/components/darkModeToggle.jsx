import React, { useCallback, useRef, useState } from "react"
import styles from "./darkModeToggle.module.css"

const initialVelocity = -0.3
const initialAcceleration = 0.002

const travel = 120

const doTransition = (element, setIsInTransition) => {
  setIsInTransition(true)

  let position = 0
  let velocity = initialVelocity
  let switchedVelocity = undefined
  let acceleration = initialAcceleration
  let done = false

  let lastTimeMillis = new Date().getTime()
  let nextTimeMillis
  let totalTimeMillis = 0

  const doAnimationFrame = () => {
    // Compute timing
    nextTimeMillis = new Date().getTime()
    const elapsedTimeMillis = nextTimeMillis - lastTimeMillis
    totalTimeMillis += elapsedTimeMillis
    lastTimeMillis = nextTimeMillis

    // Compute the physics step
    const nextVelocity = velocity + acceleration * elapsedTimeMillis
    let nextPosition = position + nextVelocity * elapsedTimeMillis

    // When the threshold is crossed on the way down...
    if (position >= travel && acceleration > 0) {
      acceleration *= -1
      switchedVelocity = velocity
    }
    // When the direction of motion switches...
    else if (velocity >= 0 && nextVelocity <= 0) {
      element.style.backgroundColor = "blue"
    }
    // When the original position is reached again...
    else if (position <= 0 && acceleration < 0) {
      console.log("DONE")
      nextPosition = 0
      done = true
    }

    // Apply physics changes
    velocity = nextVelocity
    position = nextPosition

    // Update the element
    element.style.top = `${position}px`
    element.style.opacity =
      switchedVelocity && position > travel
        ? Math.max(
            0,
            switchedVelocity -
              2 * Math.abs(switchedVelocity - Math.abs(velocity))
          ) / switchedVelocity
        : 1

    // Continue the animation if the motion is still downward, or has not crossed the original position
    // Hard stop the animation after 5 seconds as an emergency backstop
    if (!done && totalTimeMillis < 5000) {
      requestAnimationFrame(doAnimationFrame)
    } else {
      setIsInTransition(false)
    }
  }
  requestAnimationFrame(doAnimationFrame)
}

const DarkModeToggle = () => {
  const [isInTransition, setIsInTransition] = useState(false)
  const ref = useRef(null)
  const doToggle = useCallback(() => {
    const element = ref && ref.current

    if (!element || isInTransition) {
      return
    }

    doTransition(element, setIsInTransition)
  }, [isInTransition, setIsInTransition])

  const doKeyToggle = useCallback(
    event => {
      if (event.key === "Enter") {
        doToggle()
      }
    },
    [doToggle]
  )

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={doToggle}
      onKeyDown={doKeyToggle}
      ref={ref}
    ></div>
  )
}

export default DarkModeToggle
