import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Message from './components/Message'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../utils/firebase'
import Link from 'next/link'

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
        <title>Creative Thoughts</title>
        <meta name="description" content="Share your thoughts with the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='my-12 text-lg font-md'>
        <h2 className='text-xl mb-8 text-center font-medium'>See what other people are saying</h2>
        {
          allPosts.map((post) => (
            <Message key={post.id} {...post} >
              <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
                <button className='text-slate-500'>{post?.comments?.length > 0 ? post?.comments?.length : 0} comments</button>
              </Link>
            </Message>
          ))
        }
      </div>
    </div>
  )
}
