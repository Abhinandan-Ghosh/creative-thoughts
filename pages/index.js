import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Message from './components/Message'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../utils/firebase'

export default function Home() {
  //Create a state with all posts from db
  const [allPosts, setAllPosts] = useState([])

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='my-12 text-lg font-md'>
        <h2>See what other people are saying</h2>
        {
          allPosts.map((post) => (
            <Message key={post.id} {...post} ></Message>
          ))
        }
      </div>
    </div>
  )
}
