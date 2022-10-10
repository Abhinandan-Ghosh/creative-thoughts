import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const route = useRouter()
    const [user, loading] = useAuthState(auth)
    //See if user is logged in
    const getData = async () => {
        if (loading) return
        if (!user) return route.push("/auth/login")
    }
    //get user data
    useEffect(() => {
        getData()
    }, [user, loading])

    return (
        <div>
            <h1>Your posts</h1>
            <div>Posts</div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}

export default Dashboard