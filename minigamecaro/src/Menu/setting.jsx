import { useRef, useState,useEffect } from "react";
import './setting.css';
import BackgroundType from "../Background/BackgroundType";

function Setting({ N, gridSize, setN, setGridSize,setGameState, resetGame, setisMenu, m,backgroundtype,setbackgroundtype}) {
    const inputN = useRef();
    // const inputN = useRef();
    const inputGridSize = useRef();
    const inputNStack = useRef();
    const inputBackground = useRef();
    const [r, setRender] = useState({});

    function isEmpty(input) {
        return input.current?.value === '';
    }
    useEffect(() => {
        // Set the default value of the select element to backgroundtype
        inputBackground.current.value = backgroundtype;
    }, []);
    function handleSave() {
        
        handleExit();
    }

    function handleExit() {
        m.current = true;
        setisMenu(true);
    }
    function changeBg(){
        if(inputBackground.current.value==BackgroundType.galaxy)
            setbackgroundtype(BackgroundType.galaxy);
        else if(inputBackground.current.value==BackgroundType.fullcolor)
            setbackgroundtype(BackgroundType.fullcolor);
    }
    return (
        <div className="setting">
            <div className="input-container">
                <div className="text">N</div>
                <input ref={inputN} type="number" className="input-N"></input>
            </div>
            <div className="input-container">
                <div className="text">Grid Size</div>
                <input ref={inputGridSize} type="number" className="input-gridSize"></input>
            </div>
            <div className="input-container">
                <div className="text">N Stack</div>
                <input ref={inputNStack} type="number" className="input-NStack"></input>
            </div>
            <div className="input-container">
                <div className="text">Background</div>
                <select ref={inputBackground} className="input-background" id="1" onChange={changeBg}>
                    <option value={BackgroundType.fullcolor}>Fullcolor</option>
                    <option value={BackgroundType.galaxy}>Galaxy</option>
                </select>
            </div>
            <div className="button-container">
                <button className="save" onClick={handleSave}>save</button>
                <button className="exit" onClick={handleExit}>exit</button>
            </div>
        </div>
    );
}

export default Setting;
