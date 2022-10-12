import { arrayRemove, arrayUnion, deleteField, doc, getDoc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsTrash2Fill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { auth, db } from '../utils/firebase'
import Message from './components/Message'

const Details = () => {
    const router = useRouter()
    const routeData = router.query
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    console.log(auth, routeData.id)
    //Submit a message
    const submitMessage = async () => {
        // check if user is logged in
        if (!auth.currentUser) return router.push('/auth/login')

        if (!message) {
            toast.error("Please don't leave an empty comment 😅", { position: toast.POSITION.TOP_CENTER, autoClose: 1500 })
        }

        const docRef = doc(db, "posts", routeData.id)
        setMessage('')

        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now()

            })
        })
    }
    // get comments
    const getComments = async () => {
        const docRef = doc(db, 'posts', routeData?.id)
        console.log("doc ref", docRef)
        // const docSnap = await getDoc(docRef)
        // setAllMessages(docSnap.data().comments)

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            console.log("snapshot", snapshot.data())

            setAllMessages(snapshot?.data().comments)
        });
        return unsubscribe
    }

    useEffect(() => {
        console.log("checking")

        if (!router.isReady) return
        getComments()
    }, [router.isReady])

    //delete comment
    const deleteComment = async (id, message) => {
        const docRef = doc(db, 'posts', id)
        updateDoc(docRef, {
            comments: arrayRemove({ ...message })
        });
    }


    return (
        <div >
            <Message {...routeData}></Message>
            <div className='my-4'>
                <div className='flex'>
                    <input
                        className='bg-gray-800 w-full text-white p-2 text-sm'
                        type="text" value={message}
                        placeholder="Write a comment 😄"
                        onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={submitMessage} className='bg-cyan-500 text-white py-2 px-4 text-sm'>Submit</button>
                </div>
                <div className='py-6'>
                    <h2 className='font-bold'>Comments</h2>
                    {allMessages?.map(message => {
                        return (
                            <div key={message.time} className='bg-white p-4 border-2 my-4'>
                                <div className='flex justify-between items-start'>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <img className='w-10 rounded-full' src={message.avatar} />
                                        <h2>{message.userName}</h2>

                                    </div>
                                    {auth?.currentUser.photoURL === message.avatar && <button onClick={() => deleteComment(routeData?.id, message)} className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm'>
                                        <BsTrash2Fill className='text-xl' />
                                    </button>}
                                </div>

                                <h2>{message.message}</h2>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Details