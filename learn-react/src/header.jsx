import { useEffect, useState } from 'react';
import './index.css'
function Header(prop) {
    const [timespeech,setTimeSpeech] = useState(1);
    const [time,setTime] = useState(new Date());
    const [timedown,setTimeDown] = useState(0);
    const [down,setDown] = useState(0);
    const defval  = "00";
    // let t = timedown;
    useEffect(()=>{
        const intervalid = setInterval(()=>{
            countDown();
        },1000/timespeech)

        return ()=>{
            clearInterval(intervalid);
        }
    },[down,timespeech]);
    useEffect(()=>{
        if(timedown<=0) {setDown(d=>0)
            console.log("stop")
        }
    },[timedown,timespeech])
    function formatTime(time){
        let hours = time.getHours();
        let Minutes = time.getMinutes();
        let Seconds = time.getSeconds();
        // const meridium = hours>=12? 'PM':'AM'
        // hours =hours%12|| 12; 
        return `${hours}:${Minutes}:${Seconds}`;
        
    }
    function timeToSeconds(h,m,s){
        let t = h*3600+m*60+s*1;
        console.log(h*3600,m*60+s,t);
        return t;
    }
    function secondsToTime(t){
        let hours=Math.floor(t/3600);
        t%=3600;
        let minutes=Math.floor(t/60);
        t%=60;
        let seconds=Math.floor(t);
        return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    }
    function countDown(){
        down?setTimeDown(t=>t-1):0;
   
    }
    function handlesettimedown() {
        setDown(1); // Set down to true immediately
        SettimeDown();
    }
      
    function SettimeDown(){
        
        let hours = document.getElementsByClassName('input-hours')[0].value||0;
        let minutes = document.getElementsByClassName('input-minutes')[0].value||0;
        let senconds = document.getElementsByClassName('input-seconds')[0].value||0;
        
        setTimeDown(t=>timeToSeconds(hours,minutes,senconds));
        console.log(hours,minutes,senconds,timedown)
    }   
    function addZero(number){
       return( (number<10?"0":"")+ number);
    }
    function reset(){
        setDown(t=>0);
        setTimeDown(t=>0);
        setTimeSpeech(t=>1);
        document.querySelectorAll('input').forEach(e=>e.value='');
    }
    function handleInputH(e){
        // if(e.target.value>=60) e.target.value=60;
    }
    function handleInputM(e){
        if(e.target.value>=59) e.target.value=59;
        if(e.target.value<0) e.target.value=0;
        
    }
    function handleInputS(e){
        if(e.target.value>=59) e.target.value=59;
        if(e.target.value<0) e.target.value=0;
    }
    let myWindow;
    return (
        <div className='clock-container'>
           <div className='clock'>
               <span >{secondsToTime(timedown)}</span>
               <br />
               <input onChange={(e)=>handleInputH(e)} type="number" className='input-hours' placeholder={defval} />:
               <input onChange={(e)=>handleInputM(e)} type="number" className='input-minutes' placeholder={defval} />:
               <input onChange={(e)=>handleInputS(e)} type="number" className='input-seconds' placeholder={defval} />
               <br />
               <button onClick={()=>{setTimeSpeech(t=>t+1)}}>Speech up</button>
               <button onClick={()=>{setTimeSpeech(t=>t>1?t-1:t)}}>Speech down</button>
               <button onClick={()=>handlesettimedown()}>Set</button>
               <button onClick={()=>setDown(0)}>Pause</button>
               <button onClick={()=>setDown(1)}>Continue</button>
               <button onClick={()=>reset()}>Reset</button>
               <button onClick={()=>{ myWindow = window.open("https://www.w3schools.com/jsref/met_win_open.asp", "myWindow", "width=200, height=100")}}>Inf</button>
               <button onClick={()=>{ window.close()}}>Close</button>
               <p>Time Speech:{timespeech}</p>
           </div>
        </div>
    );
}

export default Header;
