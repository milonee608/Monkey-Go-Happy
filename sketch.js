var monkey, monkey_img,ground;
var jungle, ji, banana, bi, stone, si;

var bananacd = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime = 0;


function preload() {
monkey_img =
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  ji = loadImage("jungle.jpg");

  bi = loadImage("banana.png");

  si = loadImage("stone.png");


}

function setup() {
  createCanvas(600, 400);
  
  
  jungle = createSprite(400, 100);
  jungle.addImage("j", ji);
  jungle.velocityX=-4;
  
    
  monkey = createSprite(75, 280, 10, 10);
  monkey.addAnimation("mon", monkey_img);
  monkey.scale = 0.10;

  ground = createSprite(200, 350, 400, 5);
 
  ground.visible=false;
  
  ObstaclesGroup = new Group();
  BananasGroup = new Group();
}

function draw() {
    
 stroke("white");  
  textSize(30);
  fill("white");
  background(ji);
  drawSprites();

  if (gameState === PLAY) {
    
    survivalTime = Math.ceil(frameCount / 2);
    if (ground.x > 0) {
      ground.x = ground.width / 2;      
    }
    if(jungle.x<120){
     // jungle.x = jungle.width / 2;
      jungle.x=400;
    }
      
    if (keyWentDown("space") && monkey.y >= 250) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.6;
    Obstacles();
    Bananas();

    if (BananasGroup.displace(monkey)) {
      bananacd = bananacd + 1;
      BananasGroup.destroyEach();
      Bananas();
    }
    
    switch(bananacd){
      case 5:
        monkey.scale=0.25;
        break;
      case 10:
        monkey.scale=0.3;
        break;
      case 15:
        monkey.scale=0.35;
        break;
        case 16:
        monkey.scale=0.38;
        break
      default:
        break;
    }
        

    if (monkey.isTouching(ObstaclesGroup)) {
      monkey.scale=0.1;
      gameState = END;
    }

  } else if (gameState === END) {

    BananasGroup.destroyEach();
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    jungle.velocityX=0;
    
    text("GAME OVER", 190, 140);

    ObstaclesGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  

  text("SurvivalTime:" + survivalTime, 300, 50);
  text("Bananas collected:" + bananacd, 160, 170);
}

function Obstacles() {
  if (frameCount % 300 === 0) {
    
  
  stone = createSprite(400, 320, 10, 10);
    stone.addImage("stone",si);
    stone.velocityX = -10;
    stone.scale = 0.15;
    stone.lifetime = 100;
    ObstaclesGroup.add(stone);
  }
}

function Bananas() {
  if (frameCount % 80 === 0) {
   
     b=createSprite(400,random(120,200))
  b.addImage("banana",bi);
  b.velocityX = -10;
  b.scale = 0.05;
    b.lifetime = 100;
    BananasGroup.add(b);
  }
}