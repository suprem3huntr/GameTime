class Body
{
    constructor(x,y,prev,game,counter)
    {
        
        Object.assign(this,{x,y,prev,game,counter});
        GRID[((x/SNAKERADIUS)-1)/2][((y/SNAKERADIUS)-1)/2] = 1;
        this.dead = false;

    }

    update()
    {
        if (!this.dead)
        {
            if(this.counter == UPDATES)
        {
            this.oldx = this.x;
            this.oldy = this.y
            this.x = this.prev.oldx
            this.y = this.prev.oldy;

            this.counter = 0;
        }
        this.counter += 1
        }
        

        
    }
    draw(ctx)
    {

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x,this.y,SNAKERADIUS,0,2*Math.PI);
        ctx.stroke();
        ctx.strokeStyle = "black";
    }


    createSnake()
    {
        
        var newBody = new Body(this.oldx,this.oldy,this,this.game,this.counter);
        this.game.addEntity(newBody);
        return newBody;
        
    }
    kill()
    {
        this.dead =true;
        if(!this.prev.dead)
        {
            this.prev.kill();
        }
        
    }

}