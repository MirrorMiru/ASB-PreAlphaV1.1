var player
var npc1, npc2, npc3
var platform
var enemy1
var backg, ts, titleN
var gameState = "title"
var button
var PG




function preload(){

    bgImg = loadImage("images/Bg.png")

    
    PlayerWR = loadAnimation("images/Walk1R.png", "images/Walk2R.png","images/Walk3R.png","images/Walk4R.png","images/Walk5R.png")
    PlayerWL = loadAnimation("images/Walk1L.png", "images/Walk2L.png","images/Walk3L.png","images/Walk4L.png","images/Walk5L.png")
    PlayerI = loadAnimation("images/Idle.png")
    PlayerJ = loadAnimation("images/JumpR.png")
    PlayerJL = loadAnimation("images/JumpL.png")

 

    NpcI1R = loadAnimation("images/Npc1.png")
    NpcI1L = loadAnimation("images/Npc1L.png")
    NpcI2 = loadImage("images/Npc2.png")
    NpcI3 = loadImage("images/Npc3.png")

    EnemyI1 = loadImage("images/Enemy1R.png")
    Enemy2W = loadAnimation("images/Enemy2W1L.png","images/Enemy2W2L.png","images/Enemy2W3L.png")
    Enemy2I = loadAnimation("images/Enemy2L.png")

    PlatformI1 = loadImage("images/Platform1.png")
    PlatformI2 = loadImage("images/Platform2.png")

    bgTitle = loadImage("images/Title.png")
    Ntitle1 = loadImage("images/Logo.png")
    Ntitle2 = loadImage("images/Logo(alt).png")

    ChainI = loadImage("images/Chain.png")

}

function setup(){
    createCanvas(windowWidth , windowHeight)

    PG = new Group()

    //background
    backg = createSprite(windowWidth/2 , windowHeight/2)
    backg.addImage(bgImg)
    backg.scale = 2.5
    backg.visible = false

    //platform = createSprite(windowWidth/2,windowHeight-100, 500, 400)
    createPlatform(windowWidth/2,windowHeight-100, 2,0.5)

    createPlatform(windowWidth/2 + 400 ,windowHeight-100 , 2,0.5)

    createPlatform(windowWidth/2 + 800 ,windowHeight-100 , 2,0.5)
   
    PG.setVisibleEach(false)


    npc1 = createSprite(windowWidth/2+450 , windowHeight/2+100)
    npc1.addAnimation("Npc1L",NpcI1L)
    npc1.addAnimation("Npc1R",NpcI1R)
    npc1.scale = 0.20


    player = createSprite(windowWidth/2 , windowHeight/2+100)
    player.addAnimation("walk1", PlayerWR)
    player.addAnimation("walk2",PlayerWL)
    player.addAnimation("idle", PlayerI)
    player.addAnimation("jump",PlayerJ)
    player.addAnimation("jump2",PlayerJL)
    player.changeAnimation("idle",PlayerI)
    player.scale = 0.35

    
    //player.debug = true
    //platform.debug = true

    ts = createSprite(windowWidth/2, windowHeight/2)
    ts.addImage(bgTitle)
    ts.scale = 2.8
    ts.visible = false

    titleN = createSprite(windowWidth/2, windowHeight/2-200)
    titleN.addImage(Ntitle2)
    titleN.scale = 2.5
    titleN.visible = false
        
}

function draw(){
    background(255)
  


   //console.log(gameState)


    if(gameState === "play"){
     
      
        //====================GAME START===============================
        backg.visible = true
        ts.visible = false
        titleN.visible = false
        PG.setVisibleEach(true)
   
        //===========================camera============================
        camera.position.x = player.x

       
        npc1.collide(PG)
        player.collide(PG)
        //===================gravity===================================
        player.velocityY += 1
        npc1.velocityY += 1

        //=====================npc=====================================
        if(player.x > npc1.x){
            npc1.changeAnimation("Npc1R",NpcI1R)
        }

        if(player.x < npc1.x || player.x === npc1.x ){
            npc1.changeAnimation("Npc1L",NpcI1L)
        }
        
        //=======================player================================


        //JUMP
        if(keyWentDown("W") && player.isTouching(PG)){
            player.changeAnimation("jump",PlayerJ)
            player.velocityY = -20
        }
        if(keyWentUp("W")){
            player.changeAnimation("idle",PlayerI)
        }


        //RIGHT
        if(keyDown("D")){
            player.changeAnimation("walk1",PlayerWR)
            if(keyDown("W")){
              player.changeAnimation("jump",PlayerJ)  
            }
            player.velocityX = 5
        }
        if(keyWentUp("D")){
            player.velocityX = 0
            player.changeAnimation("idle",PlayerI)
        }

        //LEFT
        if(keyDown("A")){
            player.changeAnimation("walk2",PlayerWL)
            if(keyDown("W")){
                player.changeAnimation("jump2",PlayerJL)  
              }
            player.velocityX = -5
        }
        if(keyWentUp("A")){
            player.velocityX = 0
            player.changeAnimation("idle",PlayerI)
        }


        
    }  

   if(gameState === "title"){
        ts.visible = true
        titleN.visible = true
    }
    drawSprites()
    
if(gameState==="title"){

    textSize(25)
    fill("#5dcad8")
    strokeWeight(3)
    stroke(0)
    text("Press 'SPACE' to start", windowWidth/2 -150, windowHeight/2 +70)

    if(keyDown("SPACE")){
        gameState = "play"
    }
    
}

}



function createPlatform(xpos,ypos,type, scale){

 

    platform = createSprite(xpos,ypos)
    
    platform.setCollider("rectangle",0,0,550,450)

    if(type === 1){
        platform.addImage(PlatformI1)
        platform.scale = scale
        
    }
    if(type === 2){
        platform.addImage(PlatformI2)
        platform.scale = scale
    }

    PG.add(platform)

}