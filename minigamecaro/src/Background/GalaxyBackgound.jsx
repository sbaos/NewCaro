import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { Star } from './Star/Star';
import { Ballon } from './Ballon/Ballon';
const GalaxyBackground = () => {
  const sketchRef = useRef();
  const stars = useRef([]);
  const ballons = useRef([]);
  const height = useRef(window.innerHeight);
  const width = useRef(window.innerWidth);
  function generateStar(N) {
    for (let index = 0; index < N; index++) {
      stars.current.push(new Star());
    }
  }

  function move() {
    stars.current.forEach((e) => { e.move(); });
  }
  function handleResize(){
    height.current=window.innerHeight;
    width.current=window.innerWidth
  }
  let candraw = true;
  useEffect(() => {
    window.addEventListener('resize',handleResize);
    console.log(height,width);
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(width.current,height.current * 0.993);
        p.background(0);
        generateStar(70);
      };
      const rainbowColors = [
        p.color(255, 0, 0), // Red
        p.color(255, 127, 0), // Orange
        p.color(255, 255, 0), // Yellow
        p.color(0, 255, 0), // Green
        p.color(0, 0, 255), // Blue
        p.color(75, 0, 130), // Indigo
        p.color(148, 0, 211) // Violet
      ];
      let i = 0;
      p.draw = () => {
      // if(candraw){

        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(2);
        stars.current.forEach((s) => {
          // Calculate the color gradient
          let startColor = p.color(255, 255, 255); // white
          let endColor = p.color(0, 255, 255); // red
          let numSteps = 5; // Number of steps in the gradient
          let steplength = Math.max(Math.abs(s.x),Math.abs(s.y*p.width/p.height))/100 / numSteps;
          for (let i = 0; i < numSteps; i++) {
            let interColor = p.lerpColor(rainbowColors[i], rainbowColors[i + 1], 0.5);
            // let interColor = p.lerpColor(startColor, endColor, i / numSteps);
            p.stroke(interColor);
            let x1 = s.x + (s.dx * steplength*i) ;
            let y1 = s.y + (s.dy * steplength*i) ;
            let x2 = s.x + (s.dx * (steplength*(i+ 1))) ;
            let y2 = s.y + (s.dy * (steplength*(i+1))) ;
            p.line(x1, y1, x2, y2);
          }

        });
        ballons.current.push(new Ballon(p.mouseX - p.width / 2, p.mouseY - p.height / 2,10,rainbowColors[i=(i+1)%7]));
        ballons.current = ballons.current.filter(b => b.r > 0.1); 
        ballons.current.forEach((b,index)=>{
          p.stroke(b.color);
          p.fill(b.color)
          p.ellipse(b.x,b.y,b.r,b.r);
          b.r-=1;
        })
        move();
      // }
      };
      p.windowResized = () => {
        // Resize canvas when window size changes
        width.current = window.innerWidth;
        height.current = window.innerHeight;
        p.resizeCanvas(width.current, height.current * 0.993);
      };
      p.mousePressed = () => {
        ballons.current.push(new Ballon(p.mouseX - p.width / 2, p.mouseY - p.height / 2,50));
      };
      
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize',handleResize);
      stars.current=[];
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} style={{ position: 'fixed', top: '0px' ,zIndex: -1}}></div>;
};

export default GalaxyBackground;
