
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score
  var ground 
  var PLAY = 1;
  var END = 0;
  var gameState = 1;
var score = 0;

  function preload(){


    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstaceImage = loadImage("obstacle.png");

  }



  function setup() {
createCanvas(600, 600);
   monkey = createSprite(100, 450, 0, 0);
    monkey.addAnimation("monkey", monkey_running);
    monkey.scale = 0.1;
    
    ground = createSprite(300, 450, 1200, 20);
    ground.velocityX = -5;
    ground.x = ground.width/2;
    
    FoodGroup = new Group();
    obstacleGroup = new Group();
    
  }


  function draw() {
  background(255);
    
      text("Score: "+ score, 500,50);
    
    
    if (gameState === PLAY)
    {
     if (ground.x < 0)
     {
      ground.x = ground.width/2; 
     }
       if (keyDown("space"))// && monkey.y >= 450)
       {
        monkey.velocityY = -10;
        
       }
       monkey.velocityY = monkey.velocityY + 0.8;
    score = score + Math.round(getFrameRate()/60);
      
      spawnObstacles();
      spawnBanana();
      
      if (monkey.isTouching(obstacleGroup))
    {
     gameState = END; 
    }
      
    }
    
    
    
    if (gameState === END)
    {
     text("GAME OVER", 200, 200);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      
    }
    monkey.collide(ground);
    
    
     drawSprites();
  }
function spawnObstacles()
{
  if (frameCount % 80 === 0)
  {
    var obstacles = createSprite(450, 420, 10, 10);     obstacles.addImage("obstacle", obstaceImage);
    obstacles.scale = 0.1
    obstacles.velocityX = (-5 + score/100);
    obstacles.lifetime = 1000;
    obstacleGroup.add(obstacles);
    
    obstacleGroup.depth = monkey.depth;
    
  }
    
  
}

function spawnBanana()
{
  if (frameCount % 80 === 0)
  {
    var bananas = createSprite(500, 380, 10, 10)
    
    bananas.addImage("banana", bananaImage);
    bananas.scale = 0.1;
    bananas.velocityX = -5
    bananas.lifetime = 1000;
    FoodGroup.add(bananas);
  }
}





