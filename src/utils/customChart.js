import React, { useRef, useEffect }  from 'react'

const CustomChart = () => {

    const canvasRef = useRef(null)
    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "white";
        //line
        ctx.beginPath();
        ctx.moveTo(0,50);
        ctx.lineTo(800,50);
        ctx.closePath();
        ctx.stroke();
        //eof line

        //zero
        ctx.beginPath();
        ctx.moveTo(140,60);
        ctx.lineTo(140,40);
        ctx.closePath();
        ctx.stroke();
        ctx.font = "14px Fira Sans";
        ctx.strokeText("0", 137, 80)
        //eof zero

        //u
        ctx.beginPath();
        ctx.moveTo(70,60);
        ctx.lineTo(70,40);
        ctx.closePath();
        ctx.stroke();
        ctx.font = "14px Fira Sans";
        ctx.strokeText("-u = -1.64", 40, 80)
        //eof u

        //direction
        ctx.beginPath();
        ctx.moveTo(290,42);
        ctx.lineTo(300,50);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(290,58);
        ctx.lineTo(300,50);
        ctx.closePath();
        ctx.stroke();
        ctx.font = "16px Fira Sans";
        ctx.strokeText("U", 285, 78)
        //eof direction

        //red lines
        for(let i = 70; i > 0; i-= 4){
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(i,49);
            ctx.lineTo(i - 2,40);
            ctx.closePath();
            ctx.stroke();
        }
        //eof red lines
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const render = () => {
          draw(context);
        };
        render();
      }, []);

    return (
        <div className='canvasWrapper'>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
    )
}

export default CustomChart