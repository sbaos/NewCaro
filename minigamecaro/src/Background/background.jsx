import BackgroundType from "./BackgroundType";
import GalaxyBackground from "./GalaxyBackgound";
import FullColorBackground from './FullColorBackGround'
import './background.css'
function Background({type}) {
    let t = BackgroundType.fullcolor;
    let b =<></>;//= <GalaxyBackground></GalaxyBackground>
    if(type===BackgroundType.galaxy) {
        b=<GalaxyBackground></GalaxyBackground>;
    }else if(type===BackgroundType.fullcolor){
        b=<FullColorBackground></FullColorBackground>
    }
    return ( 
    <div className="background">
        {b}
    </div> );
}

export default Background;