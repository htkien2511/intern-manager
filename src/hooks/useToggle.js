import React from 'react'
const useToggle = () => {
    const [isShowing, setIsShowing] = React.useState(false)

    const show = () => {
        setIsShowing(true)
    }

    const hide = () => {
        setIsShowing(false)
    }

    const toggle = () => {
        setIsShowing(!isShowing)
    }

    return {
        isShowing,
        show,
        hide,
        toggle,
    }
}

export default useToggle