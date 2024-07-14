import './GameOver.css'
function GameOver({val,turn}) {
    let colorborderturn='green';
    if(turn===1) colorborderturn='rgb(0,255,0)';
    else if(turn===0) colorborderturn='rgb(255,0,0)';
    else colorborderturn='black'
    return ( 
    <div className="GameOver" style={{'--cl':colorborderturn}}>
        {val}
    </div> );
}

export default GameOver;