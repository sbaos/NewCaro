import React, { useEffect, useRef, useState } from "react";
import './App.css';
import GameMain from "./GameMain/GameMain";
import FullColorBackground from "./Background/FullColorBackGround.jsx";
import GalaxyBackground from "./Background/GalaxyBackgound.jsx";
import Loading from './loading/loading.jsx'
import Menu from "./Menu/menu.jsx";
import Background from './Background/background.jsx' 
import BackgroundType from "./Background/BackgroundType.js";
function App() {
  const [BoardSize,setBoardSize] = useState(window.innerHeight);
  const [loading,setLoading] = useState(true);
  const [start,setStart] = useState(false);
  const [backgroundtype,setbackgroundtype] = useState(BackgroundType.galaxy);
  function handleResize(){
      setBoardSize(window.innerHeight);
  }
  useEffect(()=>{
    window?.addEventListener('resize', handleResize);
    setTimeout(()=>{setLoading(false)},2000);
    return () => {
      window?.removeEventListener('resize', handleResize);
    };
  },[])
  
  return (
    <div className="App">
      {loading?<Loading></Loading>:
        <>
          <Background type={backgroundtype}></Background>
          {!start?
              <Menu setStart={setStart} backgroundtype={backgroundtype} setbackgroundtype={setbackgroundtype}></Menu>:
              <GameMain BoardSize={BoardSize} setStart={setStart} ></GameMain>
          }
          {/* <button onClick={()=>{window.alert(backgroundtype)}}></button> */}
          {/* <FullColorBackground></FullColorBackground> */}
        </>}
      
      
      {/* <GameMain BoardSize={BoardSize} ></GameMain>
      <GameMain BoardSize={BoardSize} ></GameMain> */}
    </div>
  );
}

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

export default App;
