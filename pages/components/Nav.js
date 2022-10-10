import Link from 'next/link'
import React from 'react'
import { auth } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  console.log(user)
  return (
    <nav className='flex justify-between items-center py-10'>
      <Link href="/">
        <button className='text-lg font-medium'>
          Creative Thoughts
        </button>
      </Link>
      <ul className='flex items-center gap-10'>
        {!user &&
          (<Link href="/auth/login">
            <a className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8'>Join Now</a>
          </Link>)}
        {user &&
          (
            <div className='flex items-center gap-6'>
              <Link href="/post">
                <a className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-md font-medium ml-8'>Post</a>
              </Link>
              <Link href="/dashboard">
                <img className='w-12 rounded-full cursor-pointer' src={user.photoURL} />
              </Link>
            </div>
          )}
      </ul>
    </nav>
  )
}

export default Nav