var ground;
var player;
var obstacleImage, obastacle;
var banana,bananaImage;
var obstaclesGroup;
var gamestate = "play";
var background;
var backgroundImage;

function preload() {

  playerImage = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
  backgroundImage=loadImage("background monkey go happy.png");
  

}

function setup() {
  createCanvas(600, 400);

  background=createSprite(300,300,600,600);
  background.addImage(backgroundImage);
  background.scale=3;
  
  ground = createSprite(250, 350, 800, 10);

  player = createSprite(50, 300);
  player.addAnimation("moving", playerImage);
  player.scale = 0.1;

  obstaclesGroup = new Group();

}

function draw() {
  

  if (gamestate === "play") {
    ground.velocityX = -10;
    if (ground.x < 0) {
      ground.x = 300;    
    }

    if (keyDown(UP_ARROW)) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8

    spawnObstacles();

    if (player.isTouching(obstaclesGroup)) {
      gamestate = "end";
    }
  }

  if (gamestate === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 230, 250);
    obstaclesGroup.visible = true;
    player.visible = true;
  }


  ground.visible = false;
  player.collide(ground);

  drawSprites();
  
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 300);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.y = Math.round(random(25, 350));
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}