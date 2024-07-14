import { useEffect, useState } from "react";

function FullColorBackground() {
    const [color,setgcolor] = useState('gray');
    useEffect(()=>{
        const t =setInterval(()=>{setgcolor(makecolorrandom())},1000)
        return ()=>{clearInterval(t);}
    },[])
    function makecolorrandom(){
        return `rgba(${Math.floor(Math.random()*255)},
                     ${Math.floor(Math.random()*255)},
                     ${Math.floor(Math.random()*255)},
                     1)`;    }
    return ( 
    <div style={{backgroundColor: color,
                height:'100%',
                width: '100%',
                position: 'absolute',
                padding:'0px',
                display:'flex',
                top: '0px',
                opacity:'0.6'}} onClick={()=>{
        setgcolor(`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.5)`)}}>
    </div> );
}

export default FullColorBackground;