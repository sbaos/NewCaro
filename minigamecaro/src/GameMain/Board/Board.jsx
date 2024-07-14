import { useEffect, useState } from "react";
import Cell from "./Cell/cell";
import GameOver from "../../GameOver"
import TryAgain from '../TryAgain/TryAgain'
import './Board.css'
import GameState from "../GameState";
function Board({N,gridSize,tiles,classNames,turn,setChess,cellindex,settryagain,tryagain,gameSate}) {
    const [tils,setTils] = useState(Array(9).fill(null));
    const [tryAiainconfig,settryAiainconfig] = useState({size: gridSize*0.2})
    const creatTiles = () => {
        let newList = [];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                newList.push(<Cell N={N} setChess={setChess} cellindex={cellindex} turn={turn} i={i} j={j} tile={tiles[i*N+j]} key={i+'-'+j}></Cell>);
            }
        }
        setTils(t=>newList);
    }
    let val=null;
    let gameOver;
    if(gameSate===GameState.pl1win){  
        val='Player X win!'  ;
    }else if(gameSate===GameState.pl2win){
        val = 'Player O win!';
    }else if(gameSate===GameState.draw){
        val='DRAW'
    }
    val===null?<></>:gameOver=<GameOver className='GameOver' val={val} turn={turn} tryAiainconfig={tryAiainconfig}/>;
    useEffect(()=>{
        creatTiles();
        // console.log(tils)
        return ()=>{
            setTils(t=>[]);
        }
    },[N,gridSize,tiles])
    
    return (
    <div className='Board main'style={{'--board_w': gridSize*2+'px','--board_h':gridSize*1.2+'px' }}
        onClick={(e)=>{
            e.stopPropagation();
        }}>
        <div onClick={()=>console.log(tryagain)} className="Grid" style={{'--N':N}}>{tils}</div>
        { gameOver }
        <TryAgain settryagain={settryagain} tryagain={tryagain} className='TryAgain'/>
    </div>  );
}

export default Board;