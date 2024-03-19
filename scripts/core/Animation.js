class Animation
{
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop)
    {
        
        Object.assign(this,{spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop});
        
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick , ctx, x, y, scale)
    {
        
        this.elapsedTime += tick;
        if (this.isDone())
        {
            if(this.loop)
            {
                this.elapsedTime -= this.totalTime;
            }
            else
            {
                console.log("Trying to draw frame of Animation post completion");
                return;
            }
        }
        
        let frame = this.currentFrame();
        if (this.reverse)
        {
            this.frameCount - frame - 1;
        }

        ctx.drawImage(this.spritesheet, this.xStart + frame*(this.width+this.framePadding),this.yStart,
                this.width,this.height,
                x,y,
                this.width*scale, this.height*scale);
    };

    currentFrame()
    {
        return Math.floor(this.elapsedTime/this.frameDuration);
    };
    isDone()
    {
        return (this.elapsedTime>=this.totalTime);
    }
}
