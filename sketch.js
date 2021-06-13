/*gameState 1 = introduction
  gameState 2 = controls/instruction
  gameState 3 = play
  gameState 4 = end
*/
//if gameState =1/2 then the background (bgInt)
//if gameState =3 then the background (bgPlay)
//if gameState =4 then the background (bgEnd)
var gameState =1;
var bgInt,bgPlay,bgEnd;
var playImage,cntIMG,backIMG
var play, cnt, back;
var player1,player2;
var ground,groundI,g1,bomb,bombGroup,g1,g2,g3,b1
var gun,xm8,uzi,mp40,p90,shotgun,pistol,mp5,mecGun,m416,m25
var gun1,xm81,uzi1,mp401,p901,shotgun1,pistol1,mp51,mecGun1,m4161,m251
var bullet,ball,boomI,bullet1,bullIMG,bullet2,bullIMG2
var score
var bgSound,bgPlaySound,rlod
var fireSound

function preload(){
  bgInt = loadImage("picture/bgint.png")
  playImage =loadImage("picture/play.png")
  cntIMG =loadImage("picture/controls.png")
  backIMG =loadImage("picture/back.png")
  bgPlay=loadImage("picture/bgPlay.jpg")
  playerImage =loadImage("picture/c1/CHARECTER.png")
  player2Image =loadImage("picture/c1/charecter_l.png")
  b1 =loadImage("picture/bomb.png")
  boomI =loadImage("picture/boom.png")

  xm8 = loadImage("picture/xm8/XM8.png")
  uzi = loadImage("picture/uzi/UZI.png")
  mp40 = loadImage("picture/mp40/MP401.png")
  p90 =loadImage("picture/p90/P90.png")
  shotgun =loadImage("picture/shotgun/r1.png")
  pistol =loadImage("picture/pistol/PISTOL.png")
  mp5 =loadImage("picture/mp5/MP5_.png")
  mecGun =loadImage("picture/mec gun/MEC GUN_.png")
  m416 =loadImage("picture/m416/M416_1.png")
  m25 =loadImage("picture/m25/qw.png")
  
  xm81 = loadImage("picture/xm8/gg.png")
  uzi1 = loadImage("picture/uzi/fgg.png")
  mp401 = loadImage("picture/mp40/MP40.png")
  p901 =loadImage("picture/p90/gj.png")
  shotgun1 =loadImage("picture/shotgun/ty.png")
  pistol1 =loadImage("picture/pistol/df.png")
  mp51 =loadImage("picture/mp5/zx.png")
  mecGun1 =loadImage("picture/mec gun/lp.png")
  m4161 =loadImage("picture/m416/po.png")
  m251 =loadImage("picture/m25/io.png")

  fireSound=loadSound("sound/firee.mp3")
  rlod =loadSound("sound/kop.mp3")

  bullIMG =loadImage("picture/lb.png")
  bullIMG2 =loadImage("picture/rb.png")
}
  

function setup() {
   createCanvas(displayWidth-50,displayHeight-100);
   // gameState =1;
   ground =createSprite(displayWidth/2,displayHeight/2,displayWidth-50,displayHeight-100)
   ground.addImage(bgPlay)
   ground.scale =1.3
   ground.velocityX=-5;
   ground.visible = false;

   player1 =createSprite(displayWidth/7,displayHeight/1.5,50,50)
   player1.addImage(playerImage)
   player1.scale =0.4
   player1.visible = false;
  
   player2 =createSprite(displayWidth/3+700,displayHeight/1.5,50,50)
   player2.addImage(player2Image)
   player2.scale =0.4
   player2.visible =false;

   play = createSprite(displayWidth/2,displayHeight/3,10,10)
   play.addImage(playImage)
   play.scale=0.9
   play.visible =false;

   cnt =createSprite(displayWidth/2,displayHeight/1.5,10,10)
   cnt.addImage(cntIMG)
   cnt.scale=0.4
   cnt.visible=false;
   
   groundI=createSprite(displayWidth/2 -25,displayHeight-120,displayWidth-50,10)
   groundI.visible =false;
   g1 =createSprite(displayWidth/2-25,displayHeight/2-50,displayWidth-50,10)
   g1.visible=false;
   g2 =createSprite(displayWidth/2-765,displayHeight/2,10,displayWidth-50)
   g2.visible=false;
   g3 =createSprite(displayWidth/2+710,displayHeight/2,10,displayWidth-50)
   g3.visible=false;
   
   bombGroup =new Group();
    
   gun =createSprite(player1.x,player1.y,15,15)
   gun.addImage(xm8)
   gun.scale =0.4
   gun.visible =false;

   gun1 =createSprite(player2.x,player2.y,15,15)
   gun1.addImage(xm81)
   gun1.scale =0.4
   gun1.visible =false;
   
   score =0
}

function draw() {
  if(gameState === 1 || gameState === 2){
    background(bgInt)
  }
  else if(gameState === 3){
    background("red")
    //textSize(24)
    //text("score:"+score,displayWidth,displayHeight)
  }
  else if(gameState === 4){
    background(bgPlay)
  }
  else{
   background(0)
  }

  switch(gameState){
    case 1: intro();
           if(mousePressedOver(play)){
            play.visible =false;
            cnt.visible=false;
             gameState = 3;
           }else if(mousePressedOver(cnt)){
            play.visible =false;
            cnt.visible=false;
             gameState = 2;
           }
    break;

    case 2:ctrl();

    break;
    case 3:playingArea();
           spawnBombs();

    break;
    default:break;

  }
  
  if(keyDown("F") && frameCount % 60 === 0){
    var bullet1 =createSprite(player1.x,player1.y,10,10)
    bullet1.velocityX=7
    fireSound.play()
    bullet1.addImage(bullIMG)
    bullet1.scale=0.07
   }
  if(keyDown("M") && frameCount % 60 === 0){
    var bullet2 =createSprite(player2.x,player2.y,10,10)
    bullet2.velocityX=-7
    fireSound.play()
    bullet2.addImage(bullIMG2)
    bullet2.scale=0.07
  }
   if(frameCount % 90 === 0 && keyDown("F")){
     rlod.play()
   }
   if(frameCount % 100 === 0 && keyDown("M")){
    rlod.play()
  }
  /*
  if(bullet1.isTouching(player2)){
    fireSound.play()
  }*/

  drawSprites();
}
function intro(){
   //background(bgInt)
   play.visible =true;
   cnt.visible=true;
   textSize(50)
   fill("red")
   text("HEROIC  DUTY",displayWidth/2-175,displayHeight/2-300)
   //bgPlaySound.play();
}
function ctrl(){
// background(bgInt);
  textSize(25)
  fill("blue")
  text("controls/RULS",700,100)
  text("USE 'W','A','S','D'&ARROW KEY TO MOVE THE CHARACTER 1&2 ",250,200)
  text("USE F FOR PLAYER1 AND M FOR PLAYER2",300,300)
  text("PRESS 'R' TO RETURN TO HOME ",350,400)
  text("FOR PLAYER1 PRESS 1,2,3,4,5,6,7,8,9,0 TO CHANGE GUN",50,500)
  text("ONLY HEAD SHOT BABY & PRESS THE FIRE BUTTON FOR LONG TO FIRE AND RELOAD",10,600)
  text("FOR PLAYER2 PRESS E,R,T,Y,U,I,O,P,K,L TO CHANGE GUN",50,700)
  //var back =createSprite(50,50,10,10)
  //back.addImage(backIMG)
  if(keyDown("R")){
    gameState = 1
  }
}
function playingArea(){
    //background(0)
    ground.visible=true;

    if(ground.x<250){
       ground.x=displayWidth/2
    }

   player1.visible = true;
   player2.visible = true;

   gun.visible =true;
   gun.x=player1.x+70
   gun.y=player1.y-40
 
    gun1.visible =true
    gun1.x =player2.x-70
    gun1.y =player2.y-40
    if(keyDown("E")){
      gun.addImage(xm8)
      gun.scale =0.3
    }
    if(keyDown("R")){
      gun.addImage(uzi)
       gun.scale =0.2
    }
    if(keyDown("T")){
      gun.addImage(mp40)
      gun.scale =0.4
    }
    if(keyDown("Y")){
      gun.addImage(p90)
      gun.scale =0.2
    }
    if(keyDown("U")){
     gun.addImage(shotgun)
     gun.scale =0.3
    }
    if(keyDown("I")){
     gun.addImage(pistol)
     gun.scale =0.1
    }
   if(keyDown("O")){
     gun.addImage(mp5)
     gun.scale =0.2
    }
    if(keyDown("P")){
     gun.addImage(mecGun)
      gun.scale =0.3
    }
    if(keyDown("K")){
     gun.addImage(m416)
     gun.scale =0.3
    }
    if(keyDown("L")){
     gun.addImage(m25)
     gun.scale =0.3
    }





    if(keyDown("1")){
      gun1.addImage(xm81)
     gun1.scale =0.3
    }
    if(keyDown("2")){
     gun1.addImage(uzi1)
     gun1.scale =0.2
    }
    if(keyDown("3")){
     gun1.addImage(mp401)
     gun1.scale =0.4
    } 
    if(keyDown("4")){
    gun1.addImage(p901)
    gun1.scale =0.2
    }
    if(keyDown("5")){
     gun1.addImage(shotgun1)
     gun1.scale =0.3
    }
    if(keyDown("6")){
      gun1.addImage(pistol1)
      gun1.scale =0.1
    }
    if(keyDown("7")){
     gun1.addImage(mp51)
     gun1.scale =0.2
    }
    if(keyDown("8")){
      gun1.addImage(mecGun1)
      gun1.scale =0.3
    }
    if(keyDown("9")){
      gun1.addImage(m4161)
      gun1.scale =0.3
    }
    if(keyDown("0")){
      gun1.addImage(m251)
      gun1.scale =0.3
    }







   if(keyDown("W")){
     player1.y-=20
    }
   if(keyDown("S")){
      player1.y+=20
    }
   if(keyDown("A")){
     player1.x-=20
    }
   if(keyDown("D")){
     player1.x+=20
    }
    if(keyDown("space")){
      bullet.createSprite(player1.x,player2.y,10,10)
      bullet.velocityX=5
    }

   if(keyDown(UP_ARROW)){
     player2.y-=20
    }
   if(keyDown(DOWN_ARROW)){
       player2.y+=20
    }
   if(keyDown(LEFT_ARROW)){
     player2.x-=20
   }
   if(keyDown(RIGHT_ARROW)){
     player2.x+=20
    }
    player1.setCollider("rectangle",40,-150,100,100);
    player1.debug=true
   player1.collide(groundI)
   player1.collide(g1)
   player1.collide(g2)
   player1.collide(g3)

   player2.setCollider("rectangle",-40,-150,100,100);
   player2.debug=true
   player2.collide(groundI)
   player2.collide(g1)
   player2.collide(g2)
   player2.collide(g3)
  
   
}

function spawnBombs(){
  if(frameCount % 400===0){
    bomb = createSprite(displayWidth-70,displayHeight-150,10,10);
    bomb.addImage(b1)
    bomb.scale =0.1
    bomb.velocityX =-5
    bomb.y =displayHeight-Math.round(random(400,110));
    bomb.lifetime=400;
    bombGroup.add(bomb);
  }
  
}
/*
if (mouseIsPressed) {
  if (mouseButton === RIGHT) {
    spawnbullet();
  }
}

function spawnbullet(){
  bullet = createSprite(gun.x,gun.y,5,5)
  bullet.velocityX =3
}
*/
/* if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      ellipse(50, 50, 50, 50);
    }
    if (mouseButton === RIGHT) {
      rect(25, 25, 50, 50);
    }
    if (mouseButton === CENTER) {
      triangle(23, 75, 50, 20, 78, 75);
    }
  }*/

  //trex.setCollider("rectangle",0,0,trex.width,trex.height);