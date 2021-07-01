class Trex{
    constructor(x,y,width,height){
        var options = {
            isStatic:false,
           
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }
    
    display(){
       
            var pencil = this.body.position;
            fill("white");
            rectMode(CENTER)
        rect(pencil.x,pencil.y,this.width,this.height);
        image(trex2,pencil.x-20,pencil.y-20,this.width,this.height);

       }
    }
        
        