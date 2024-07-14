import './TryAgain.css'
function TryAgain({settryagain,tryagain}) {
    function handleOnClick(){
        setTimeout(()=>{settryagain(false);},300)
        
    }
    return ( 
    <>
    {tryagain===true?<div className='TryAgain'>
                 <button className='tryagain-button' onClick={()=>handleOnClick()}>Try Again</button>
              </div>:<div></div> }
    </>
    );
}

export default TryAgain;