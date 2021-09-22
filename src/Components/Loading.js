import React from 'react'
import './loading.css'

const Loading = () => {
    return (
        <div className='loadingWrapper'>
            <div className='loading'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
        </div>
    )
}

export default Loading
