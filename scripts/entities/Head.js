class Head
{
    constructor(game,x,y,spritesheet)
    {
        Object.assign(this,{game,x,y,spritesheet});
        this.movement = 0; // right = 0, down =1, left =2,up =3;
        this.last = this;
        this.counter = 0;
        GRID[((x/SNAKERADIUS)-1)/2][((y/SNAKERADIUS)-1)/2] = 1;
        this.dead = false;

    }

    start()
    {
        this.initiateSnake();
    }
    update()
    {
        if(!this.dead)
        {
            var TICK = this.game.clockTick;
            if(!this.wait && this.game.right && !this.game.left && !this.game.up && !this.game.down && this.movement !== 2)
            {
                this.movement = 0;
                this.wait = true;
            }
            else if(!this.wait && !this.game.right && this.game.left && !this.game.up && !this.game.down && this.movement !== 0)
            {
                this.movement = 2;
                this.wait = true;
            }
            else if(!this.wait && !this.game.right && !this.game.left && !this.game.up && this.game.down && this.movement !== 3)
            {
                this.movement = 1;
                this.wait = true;
            }
            else if(!this.wait && !this.game.right && !this.game.left && this.game.up && !this.game.down && this.movement !== 1)
            {
                this.movement = 3;
                this.wait = true;
            }
    
            
            if(this.counter == UPDATES)
            {
                this.wait = false;
                this.oldx = this.x;
                this.oldy = this.y;
                switch(this.movement)
                {
                    
                    case 0:
                        this.x += SNAKERADIUS * 2;
                        break;
                    case 1:
                        this.y += SNAKERADIUS * 2;
                        break;
                    case 2:
                        this.x -= SNAKERADIUS * 2;
                        break;
                    case 3:
                        this.y -= SNAKERADIUS * 2;
                        break;
                }
                if(this.x > SNAKERADIUS * 2 * 19 || this.x<0 || this.y > SNAKERADIUS * 2 * 19 || this.y<0)
                {
                    this.kill();
                }
                
                else
                {
                    GRID[((this.x/SNAKERADIUS)-1)/2][((this.y/SNAKERADIUS)-1)/2] = 1;
                
                    this.checkCollision();
                    if(this.last.hasOwnProperty("oldx") && this.last.hasOwnProperty("oldy"))
                    {
                        GRID[((this.last.oldx/SNAKERADIUS)-1)/2][((this.last.oldy/SNAKERADIUS)-1)/2] = 0;
                    }
                }
                
                this.counter = 0;
            }
            
            this.counter += 1
        }
        
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x,this.y,SNAKERADIUS,0,2*Math.PI);
        ctx.stroke();
    }


    initiateSnake()
    {
        for(var i = 0; i < 2; i++)
        {
            
            this.last = new Body(this.last.x - 2*SNAKERADIUS,this.last.y,this.last,this.game,this.counter);
            this.game.addEntity(this.last);
        }
        //this.game.entities.reverse();
    }

    increaseBody()
    {
        this.last = this.last.createSnake();
    }

    checkCollision()
    {
        
        for(var i=0; i<this.game.entities.length; i++)
        {
            var ent = this.game.entities[i];
            if(ent !== this && this.Collide(ent))
            {
                if(ent instanceof Food)
                {
                    
                    this.increaseBody();
                    ent.kill();
                }
                else
                {
                    this.kill();
                }
            }
        }
    }
    Collide(ent)
    {
        
        return (this.x == ent.x && this.y == ent.y);
    }
    kill()
    {
        this.x = this.oldx;
        this.y = this.oldy;
        console.log("Hit yourself");
        this.dead = true;
        this.last.kill();
    }
    
}