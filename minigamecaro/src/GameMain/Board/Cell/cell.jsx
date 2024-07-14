import React, { useState, useEffect, useRef, createRef, useContext } from 'react';
import './cell.css';
import { AppContext } from '../../../App';

function Cell({N,tile,turn,setChess,i,j,cellindex}) {
  if(tile==null) return (<>NULL VLAUE</>)
  return (
    <div className='cell' style={{'--cell-size': tile.size,
                                  '--cell-color':tile.color,
                                  '--text-size': tile.size,
                                  '--bgcolor_r':tile.bgcolor[0],
                                  '--bgcolor_g':tile.bgcolor[1],
                                  '--bgcolor_b':tile.bgcolor[2]
                                  }} onClick={()=>setChess(i,j)}>
       <span>{tile.val}</span>
    </div>
  );
}

export default Cell;
