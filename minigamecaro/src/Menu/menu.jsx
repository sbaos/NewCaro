import { useEffect, useRef, useState } from 'react';
import './menu.css'
import Setting from './setting';

function Menu({setStart,backgroundtype,setbackgroundtype}) {
    const [display,setDisplay] = useState(<></>);
    const [ismenu,setisMenu] = useState(true);
    const [render,setrender] = useState({});
    const m = useRef(true);
    let N=1; 
    let gridSize=1; 
    let setN=handleClickcontinue; 
    let setGridSize=1;
    let setGameState=1;
    let resetGame=1;
    function handleClickstart(e){
        setStart(true)
    }
    function handleClickcontinue(e){
    
    }
    function handleClicksetting(e){
        setisMenu(false);
        m.current=false;
        // setrender({...render});
        setDisplay(d=><Setting 
            N={N} 
            ismenu={ismenu}
            setisMenu={setisMenu}
            gridSize={gridSize} 
            setN={setN} 
            setGridSize={setGridSize}
            setGameState={setGameState}
            resetGame={resetGame}
            m={m}
            backgroundtype={backgroundtype}
            setbackgroundtype={setbackgroundtype}
        ></Setting>);
        // window.alert(display.current)
    }
    // useEffect(()=>{window.alert("change")})
    function handleClickquit(e){
        window.alert("quit")
    }
    return ( 
        <>
            {!m.current?
            display:
            <div className="menu">
                <div className='start-button button' onClick={(e)=>handleClickstart(e)}>START</div>
                <div className='continue-button button' onClick={(e)=>handleClickcontinue(e)}>CONTINUE</div>
                <div className='setting-button button' onClick={(e)=>handleClicksetting(e)}>SETTING</div>
                <div className='quit-button button' onClick={(e)=>handleClickquit(e)}>QUIT</div>
            </div> 
            }
        </>
  );
}

export default Menu;
