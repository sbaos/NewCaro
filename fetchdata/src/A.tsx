import './App.css';
import React,{useEffect, useRef, useState} from 'react';
import Loading from './loading/loading';
const URL_BASE = 'https://jsonplaceholder.typicode.com';
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default function A() {

  const [loading,setLoading] = useState(true);
  const [posts,setpPosts] = useState<Post[]|undefined>();
  const [error,setError] = useState();
  const [page,setPage] = useState(1);
  const [r,sR] = useState<{}>();
  const abortController = useRef<AbortController|undefined>();
  useEffect(()=>{
    console.log("render")
  })
  useEffect(()=>{
      const fetchPost =async () =>{
        abortController.current?.abort();
        abortController.current = new AbortController();

        setLoading(true);
        try {
            const response = await fetch(`${URL_BASE}/posts/`);
            const posts = (await response.json()) as Post[];
            Array.isArray(posts)?setpPosts(posts):setpPosts([posts]);
            setTimeout(()=>{
                window.alert("Cho doi la hanh phuc");
                handlePlayAudio();
            },5000)
            
        } catch (error: any) {
            setError(error);
        } finally{
            setLoading(true);
        }
      }
    fetchPost();

  },[page])


    const audioRef = useRef<HTMLAudioElement>(null);
    const link = './sound/hanmactu.wav';
    const handlePlayAudio = () => {
      if (audioRef.current) {
        audioRef.current?.play();
      }
    };
  
    const handlePauseAudio = () => {
      if (audioRef.current) {
        audioRef.current?.pause();
      }
    };
  return (
    <div>
        {loading?
        <div>
            <div>
                <button onClick={handlePlayAudio}>Play</button>
                <button onClick={handlePauseAudio}>Pause</button>
                <audio ref={audioRef} src={`${link}`} />
            </div>
            <Loading></Loading>
        </div>
        

         :
          <div>
            <div className='bground'></div>
            <h1 className='header'>Fetch Data</h1>
            
            <button onClick={()=>{setPage(page+1)}}>Render</button>
            <input className='input-search' type="string" placeholder='Search'/>
            <pre className='App'>
            <ol>
            {posts?.map((post=>{
                if(post.id%2===0) return  <li key={post.id}>{post.id}<p>{post.body}</p></li>
                return  <li  style={{display:'none'}}key={post.id}>{post.id}<p>{post.body}</p></li>
             }))
             }
            </ol>
            </pre>
            
          </div>
        }
    </div>
 
   
  );
}

