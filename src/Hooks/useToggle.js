import { useState } from 'react'

const useToggle = initial => {
    const [toggle, setToggle] = useState(initial)

    const handleToggle = () => {
        setToggle(toggle => !toggle)
    }
    const resetToggle = () => {
        setToggle(initial)
    }

    return [toggle, handleToggle, resetToggle]
}

export default useToggle
