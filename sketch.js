var bot, human
var tech, bullets, road
var score, coins, gameState
var botSound, playerImg, roadImg, techImg, bulletImg, standingImg
var bulletGroup, techGroup, coinGroup

function preload(){
    playerImg = loadAnimation("Runner-1.png", "Runner-2.png")
    roadImg = loadImage("Road.png")
    bulletImg = loadImage("bullet.png")
    standingImg = loadImage("Runner-1.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    
    console.log(windowHeight, windowWidth)
    
    road = createSprite(600, 638)
    road.addImage("ground", roadImg)

    bot = createSprite(100, 100 , 10, 10)
    
    human = createSprite(600, 638)
    human.addAnimation("standing", standingImg)
    human.addAnimation("running", playerImg)
    human.scale = 0.1

    bulletGroup = createGroup()

    score = 5
    gameState = "Serve"

}

function draw() {
    background("white")
    console.log(gameState)
    if (gameState == "Serve") {
        if (keyIsDown(32)) {
            gameState = "Play"
        }
    }
    
    
    
    if (gameState == "Play") {
        human.changeAnimation("running", playerImg)
        human.x = World.mouseX
        bot.visible = false
        road.velocityY = 7
        spawnBullets()
        
        if (road.y > 838) {
            road.y = 638
        }

        if (human.isTouching(bulletGroup)) {
            score -= 1
            
        }

        if (score < 1) {
        gameState = "End"
        }

        human.bounce(bulletGroup, bulletHit)

    }



    drawSprites() 
}

function spawnBullets(){
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
    bullets = createSprite(Math.round(random(50, width-50),40, 10, 10));
    bullets.addImage("shooting", bulletImg)
    bullets.scale = 0.2
    bullets.velocityY = 6
    bulletGroup.add(bullets)
    }
  }

  function bulletHit(human, bullet) {
    bullet.velocityY = 0
    bullet.destroy();
    score -= 1
  }