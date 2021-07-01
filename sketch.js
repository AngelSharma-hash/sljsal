const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var world,engine;
var score=0;

var trex;
//var trex1;
var ground;
//var obstacle;
var obstacleGroup;
var gameState=1;
var database;
var score=0;
var trex2;
var bground;
var obstacleimg;
var button;


function preload(){ 
  trex2= loadImage("thumbnail-420x255.png");
  bground = loadImage("c339a2b62761581e8218988a5b33ea34.jpg");
  obstacleimg = loadImage("download.jfif");
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(windowWidth/2,windowHeight-200,windowWidth,10);
  trex = new Trex(windowWidth/2,windowHeight-300,35,35);
  

  obstacleGroup = new Group();

 // trex1 = createSprite(trex.body.position.x,trex.body.position.y,20,20);

  database = firebase.database();

  gameState= database.ref('gameState');
  gameState.on("value", function(data){
    gameState = data.val();
  });

  button = createButton("BUTTON");
  button.position(800,100);

}

function draw(){
  background(bground,20,200);

  Engine.update(engine);

  World.add(world, trex);

  ground.display();
  trex.display();
  
  camera.position.x=displayWidth/2;
  camera.position.y=trex.body.position.y;

  Obstacles();

  if(gameState===1){
   
    if(keyDown("UP_ARROW")){ 
      score=score+1;
      gameState=2;
      if(obstacleGroup[0]) { 
        obstacleGroup[0].remove();

    }

      if(trex.body.position.y-obstacleGroup[0].y===0){
       
      
    }

  }

  if(gameState===2){  
    database.ref('/').update({'gameState':gameState});   
     

    }
 
  }

  if(button.mousePressed(Game)){
  
  }

  drawSprites();

}

function keyPressed(){
 
    if(keyCode === UP_ARROW){
      Matter.Body.applyForce(trex.body,trex.body.position,{x:0,y:-0.03});
      Matter.Body.setStatic(trex.body, false);
      gameState=2;
     
    
  }
  
}

function Obstacles(){
  if(frameCount%100===0){
    var obstacle = createSprite(400,1000,30,30);
    obstacle.addImage(obstacleimg);
    obstacle.scale=0.2;
    obstacle.y = trex.body.position.y-100;
    obstacle.x = trex.body.position.x;

    obstacleGroup.add(obstacle);
    //obstacle.lifetime=10;
    //console.log(trex.body.position.y);
  }
}

function Game(){
  gameState=1;
  database.ref('/').update({'gameState':gameState});

}
