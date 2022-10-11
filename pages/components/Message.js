import React from 'react'

const Message = ({ children, avatar, username, description }) => {
    return (
        <div className='bg-white p-8 border-b-2 rounded-lg'>
            <div className='flex items-center gap-2'>
                <img src={avatar} className='w-12 rounded-full' />
                <h2>{username}</h2>
            </div>
            <div className='py-4'>
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}

export default Message