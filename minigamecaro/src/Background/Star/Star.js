export class Star{
    constructor(){
        this.render();
    }
    speechrate=0.02;
    render(){
        this.x=Math.random()*100-50;
        this.y=Math.random()*100-50;
        let a = this.y / (this.x + 0.001);
        let l = 10;
        this.dx = Math.abs(l / Math.sqrt(1 + a * a)) * Math.sign(this.x);
        this.dy = Math.abs(a * this.dx) * Math.sign(this.y);
    }
    move(){
        let sp = Math.max(
            Math.abs(this.x/window.innerWidth),
            Math.abs(this.y/window.innerHeight))*100;
        this.x+=this.dx*this.speechrate*sp;
        this.y+=this.dy*this.speechrate*sp;
        if(this.x>window.innerWidth/2||this.x<-window.innerWidth/2||this.y>window.innerHeight/2||this.y<-window.innerHeight/2) {
            this.render();
        }
    }
}