import React, { useEffect, useRef, useState } from "react";
import Board from "./Board/Board";
import ReactDOM from 'react-dom/client';
import GameState from "./GameState";
import Setting from "../Menu/setting";
import './GameMain.css';
import FullColorBackground from "../Background/FullColorBackGround";
const player_1 = 'X';
const player_2 = 'O';
// const root = ReactDOM.createRoot(document.getElementById('root'));
//cap nhat -> useEffect[dependency]
function GameMain({BoardSize,setStart}) {
  const [gridSize, setGridSize] = useState(300);
  const [N, setN] = useState(3);
  const [turn, setTurn] = useState(0);
  const [tiles, setTiles] = useState(Array(N * N).fill({ val: '', color: 'rgb(0,255,0)', size: `${gridSize / N}px`,bgcolor: [0,0,255] }));
  const cellindex = useRef([]);//cellindex[0]->x , cellindex[1]->y
  const P1List = useRef([]);
  const P2List = useRef([]);
  const [win, setWin] = useState(null);
  const [gameState, setGameState] = useState(GameState.running);
  const [tryagain,settryagain] = useState(false);
  let renderbutton = document.getElementById('button-render');
  const Nwin =3;
  const g = useRef(GameState.running);
  const [gcolor,setgcolor]= useState('gray');

  useEffect(()=>{console.log("render")})
  useEffect(() => {
    setTiles(Array(N * N).fill({ val: '', 
                                 color: 'rgb(0,255,0)', 
                                 size: `${gridSize / N}px`,
                                 bgcolor: [0,0,255] }));
  }, [N, gridSize]);
  useEffect(()=>{
    if(tryagain===false&&gameState!==GameState.running){
      resetGame();
    }
    },[tryagain])
  useEffect(() => {
    if (checkWin()) {
      setGameState(turn === 1 ? GameState.pl1win : GameState.pl2win);
      g.current= (turn === 1 ? GameState.pl1win : GameState.pl2win);
      setWin(turn === 1 ? player_1 : player_2);
    }else if(checkDraw()){
      setGameState(GameState.draw);
      g.current= (GameState.draw);
    }
  }, [tiles]);
  useEffect(()=>{
    //make win to change color
    // const t = setInterval(()=>{},100)
    if(win!==undefined&&win!==null){
      colorCellWin();
      settryagain(true);
    }
    renderbutton?.click();
  },[win])
  function resetGame(){
    setTiles(Array(N * N).fill({ val: '', color: 'rgb(0,255,0)', size: `${gridSize / N}px`,bgcolor: [0,0,255] }));
    setGameState(g=>GameState.running);
    g.current=GameState.running;
    P1List.current=[];
    P2List.current=[];
    settryagain(false);
    setWin(null);
    setTurn(0);
  }
  function checkDraw(){
    let result = true;
    tiles?.forEach(e=>{
      if(e.val==='') result=false;
    })
    return result;
  }
  function checkWin() {
        let i=cellindex.current[0];
        let j=cellindex.current[1];
        if (checkngang(i,j) || checkdoc(i,j) || checkcheotrai(i, j) || checkcheophai(i, j)) {
          return true;
        }
    return false;
  }
  function checkngang(x,y){
    for (let i = Math.max(0,x-Nwin); i <= Math.min(N-1,x+Nwin); i++) {
      for (let j = Math.max(0,y-Nwin); j <= Math.min(N-1,y+Nwin); j++) {
        if (tiles[i * N + j]?.val === '') continue;
        let ok = true;
        let init = tiles[i * N + j]?.val;
        for (let k = 0; k < Nwin; k++) {
          if (j + k >= N || tiles[i * N + j+k]?.val !== init) {
            ok = false;
            break;
          }
        }
        if (ok)   return true;
      }
    }
    return false;
  }
  function checkdoc(x,y){
    for (let j = Math.max(0,y-Nwin); j <= Math.min(N-1,y+Nwin); j++) {
      for (let i = Math.max(0,x-Nwin); i <= Math.min(N-1,x+Nwin); i++) {
        if (tiles[i * N + j]?.val === '') continue;
        let ok = true;
        let init = tiles[i * N + j].val;
        for (let k = 0; k < Nwin; k++) {
          if (i + k >= N || tiles[(i+k) * N + j]?.val !== init) {
            ok = false;
            break;
          }
        }
        if (ok)   return true;
      }
    }
    return false;
  }
  function checkcheotrai(x,y){
    for (let i = Math.max(0,x-Nwin); i <= Math.min(N-1,x+Nwin); i++) {
      for (let j = Math.max(0,y-Nwin); j <= Math.min(N-1,y+Nwin); j++) {
        if (tiles[i * N + j]?.val === '') continue;
        let ok = true;
        let init = tiles[i * N + j].val;
        for (let k = 0; k < Nwin; k++) {
          if (i + k >= N ||j+k>=N|| tiles[(i+k) * N + j+k]?.val !== init) {
            ok = false;
            break;
          }
        }
        if (ok)   return true;
      }
    }
    return false;
  }
  function checkcheophai(x,y){
    for (let i = Math.max(0,x-Nwin); i <= Math.min(N-1,x+Nwin); i++) {
      for (let j = Math.max(0,y-Nwin); j <= Math.min(N-1,y+Nwin); j++) {
        if (tiles[i * N + j]?.val === '') continue;
        let ok = true;
        let init = tiles[i * N + j].val;
        for (let k = 0; k < Nwin; k++) {
          if (i + k >= N || j-k <0 || tiles[(i+k) * N + j-k]?.val !== init) {
            ok = false;
            break;
          }
        }
        if (ok)   return true;
      }
    }
    return false;
  }
  function setChessValid(i,j){
    if (g.current !== GameState.running) return false;
    if (tiles[i*N+j]?.val!=='') return false;
    cellindex.current=[i,j];
    return true;
  }
  function setNewChess(i, j,newTiles) {
    let c = turn === 0 ? 'rgb(0,255,0)' : 'red';
    newTiles[i * N + j] = { ...newTiles[i * N + j], val: turn === 0 ? 'X' : 'O', color: c };
  }
  function handleSetChess(i,j){
    let newList = [...tiles];
    if(!setChessValid(i,j)) return;
    setNewChess(i,j,newList);
    addChessToList();
    blurChess(newList);//-> index from head of List
    setTiles(c=>newList);
    removeChess(newList);
    setTurn(prevTurn => (prevTurn === 0 ? 1 : 0));
  }
  function addChessToList(){
    let List=P1List.current;
    if(turn===1) {List=P2List.current;}
    if(cellindex.current.length===0) return;
    List.push(cellindex.current);
  }
  function getChessToBlur(){
    let List = P1List.current;
    if(turn===0) List=P2List.current;
    if(List.length<3) return [];
    return List[0];
  }
  function blurChess(newList){
    let ij=getChessToBlur();
    if(ij.length===0) return;
    if(tiles?.length===0) return;
    let i = ij[0];
    let j = ij[1];
    let tile = newList[i*N+j];
    if(tile?.val==='') return;
    if(tile?.val==='X') tile.color='rgb(0,150,0)';
    else if(tile?.val==='O') tile.color='rgb(150,0,0)';
  }
  function removeChess(newList){
    let List=P1List.current;
    if(turn===1) {
        List=P2List.current;
    }
    if(List?.length>3){
      let ij=List[0];
      List.shift();
      newList[ij[0]*N+ij[1]].val='';
    }
  }
  function colorCell(i,j,newList){
    newList[i*N+j].bgcolor=[195, 255, 210];
  }
  function colorCellWin(){
    let newList = tiles;
    // colorCell(0,0,newList);
    if(win===player_1){
      P1List.current.forEach(e=>{
        colorCell(e[0],e[1],newList);
      })
    }else if(win===player_2){
      P2List.current.forEach(e=>{
        colorCell(e[0],e[1],newList);
      })
    }
    setTiles(t=>newList);
  }
  function setGGameSate(state){
    setGameState(pr=>state);
    g.current=state;
  }
  let colorborderturn;
  if(turn===0) colorborderturn='rgb(0,255,0)';
  else if(turn===1) colorborderturn='rgb(255,0,0)';
  else colorborderturn='black'
  return (
    <div className="GameMain" style={{'--color':gcolor}}>
      {/* <FullColorBackground/> */}
      <Board
        classNames={'Board'}
        N={N}
        gridSize={gridSize}
        tiles={tiles}
        turn={turn}
        setChess={handleSetChess}
        cellindex={cellindex}
        tryagain={tryagain}
        settryagain={settryagain}
        gameSate={gameState}
        resetGame={resetGame}
        
      />     
      {gameState === GameState.running ? (
        <p className="playerturn-text" style={{'--colorborderturn':colorborderturn}}>Player {turn === 0 ? player_1 : player_2}'s turn</p>
      ) : (
        <p></p>
      )}
      <button style={{ display: 'none' }} 
              id="button-render" 
              onClick={() => { setTiles([...tiles]) }}>
              RENDER
      </button>
      <div className="c" style={{'--ca': ``}}></div>
      <br />
      {/* <Setting N={N} 
                gridSize={gridSize} 
                setN={setN} 
                setGridSize={setGridSize}
                setGameState={setGameState}
                resetGame={resetGame}></Setting> */}
    <button className="exit-button" onClick={()=>{setStart(false);}}>EXIT</button>
    </div>
  );
}
export default GameMain