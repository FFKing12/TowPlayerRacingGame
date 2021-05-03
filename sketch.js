var path,mainCyclist,mainCyclist1;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadImage("images/BikeRacer1.png");
  mainRacerImg2 = loadImage("images/motorRacer.png");

  oppPink1Img = loadImage("images/obstacle1.png");
  
  oppYellow1Img = loadImage("images/obstacle2.png");
  
  oppRed1Img = loadImage("images/obstacle3.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,250);
mainCyclist.addImage("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.2;
mainCyclist.setCollider("circle",0,0,100);
mainCyclist.debug = false;

mainCyclist1 = createSprite(70,70);
mainCyclist1.addImage("SahilRunning",mainRacerImg2);
mainCyclist1.scale=0.080;
mainCyclist1.setCollider("circle",0,0,400);
mainCyclist1.debug = false;

gameOver = createSprite(300,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   if(keyDown(UP_ARROW)){
   mainCyclist.y = mainCyclist.y - 5;
   }

   if(keyDown(DOWN_ARROW)){
    mainCyclist.y = mainCyclist.y + 5;
  }

  if(keyDown('W')){
    mainCyclist1.y = mainCyclist1.y - 5;
    }
 
    if(keyDown('S')){
     mainCyclist1.y = mainCyclist1.y + 5;
   }

   edges= createEdgeSprites();
   mainCyclist .collide(edges);

   edges= createEdgeSprites();
   mainCyclist1.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 50 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist) || pinkCG.isTouching(mainCyclist1)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist) || yellowCG.isTouching(mainCyclist1)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist) || redCG.isTouching(mainCyclist1)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press 'R' to Restart the game!", 150,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("R")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.1;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addImage("opponentPlayer1",oppPink1Img);
        player1.setCollider("rectangle",0,0,200,500);
        player1.debug = false;
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.1;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addImage("opponentPlayer2",oppYellow1Img);
        player2.setCollider("rectangle",0,0,550,200);
        player2.debug = false;
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.1;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addImage("opponentPlayer3",oppRed1Img);
        player3.setCollider("rectangle",0,0,500,200);
        player3.debug = false;
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}