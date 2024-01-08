namespace SpriteKind {
    export const BOSS = SpriteKind.create()
    export const empty_bubble = SpriteKind.create()
    export const Bubble = SpriteKind.create()
}
controller.player4.onEvent(ControllerEvent.Connected, function () {
    P4 = true
})
controller.player4.onEvent(ControllerEvent.Disconnected, function () {
    P4 = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BOSS, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.x = randint(5, 150)
    mySprite.y = randint(5, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BOSS, function (sprite, otherSprite) {
    statusbar2.value += -3
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (UFO) {
        projectile3 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . 1 . . . 1 . . . . . . 
            . . . . 1 . . . . . 1 . . . . . 
            . . . . 1 . . . . . 1 . . . . . 
            . . . . 1 . . . . . 1 . . . . . 
            . . . . . 1 . . . 1 . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Unidentified_Flying_Object, randint(-100, 100), randint(-100, 100))
        projectile3.setKind(SpriteKind.empty_bubble)
        projectile3.setStayInScreen(false)
    }
})
function what_enimy (_1100: number) {
    if (_1100 < 90) {
        myEnemy = sprites.createProjectileFromSprite(assets.image`Spider`, mySprite, 0, enimyspeed)
        myEnemy.x = randint(5, 155)
        myEnemy.y = 0
        myEnemy.setKind(SpriteKind.Enemy)
        animation.runImageAnimation(
        myEnemy,
        assets.animation`Flying Spider`,
        100,
        true
        )
    } else if (_1100 == 100) {
        UFO = true
        Unidentified_Flying_Object = sprites.create(assets.image`UFO`, SpriteKind.BOSS)
        Unidentified_Flying_Object.x = randint(5, 155)
        animation.runImageAnimation(
        Unidentified_Flying_Object,
        assets.animation`Flying UFO`,
        200,
        true
        )
        Unidentified_Flying_Object.setBounceOnWall(true)
        statusbar2 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar2.attachToSprite(Unidentified_Flying_Object)
        mySprite.setStayInScreen(true)
    } else {
        myEnemy = sprites.createProjectileFromSprite(assets.image`Stealth`, mySprite, 0, enimyspeed)
        myEnemy.x = randint(5, 155)
        myEnemy.y = 0
        myEnemy.setKind(SpriteKind.Enemy)
        animation.runImageAnimation(
        myEnemy,
        assets.animation`Flying Stealth`,
        100,
        true
        )
        AI_Speed_boost += 1
    }
    controller.player3.moveSprite(myEnemy, enimyspeed, 0)
    if (AI) {
        if (AI_get_fuel) {
        	
        } else {
            mySprite.follow(myEnemy, enimyspeed * 5.5)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Bubble, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    UFO = false
    Unidentified_Flying_Object.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.empty_bubble, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
})
function Shoot () {
    if (randint(1, 2) == 1) {
        projectile2 = sprites.createProjectileFromSprite(assets.image`Dart2`, mySprite, 0, -100)
        projectile2.startEffect(effects.spray)
    } else {
        projectile = sprites.createProjectileFromSprite(assets.image`Dart1`, mySprite, 0, -100)
        projectile.startEffect(effects.spray)
    }
}
sprites.onOverlap(SpriteKind.BOSS, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.BOSS, SpriteKind.Bubble, function (sprite, otherSprite) {
    otherSprite.destroy()
})
info.onLifeZero(function () {
    if (AI) {
        game.gameOver(true)
    } else {
        game.gameOver(false)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (!(P4)) {
        Shoot()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    statusbar.value = 100
    AI_get_fuel = false
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    if (AI) {
        game.over(false)
    } else {
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprite.destroy()
    otherSprite.destroy(effects.spray, 500)
    if (info.score() == 10 || (info.score() == 25 || info.score() == 40)) {
        if (enimyspeed == 100) {
            what_enimy(100)
            pauseUntil(() => !(UFO))
            if (AI) {
                if (game.ask("do you want to win? (or endless mode)")) {
                    game.over(true)
                }
            } else {
                game.over(false)
            }
        }
        info.changeScoreBy(5)
        mySprite.sayText("+5 Level Up Bounus! :)", 2000, false)
        enimyspeed += 25
        animation.runImageAnimation(
        mySprite,
        assets.animation`Flying Blue`,
        200,
        true
        )
    }
    AI_Speed_boost = enimyspeed / 25 - 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.empty_bubble, function (sprite, otherSprite) {
    projectile4 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . 1 9 9 9 1 . . . . . . 
        . . . . 1 9 9 9 9 9 1 . . . . . 
        . . . . 1 9 9 9 9 9 1 . . . . . 
        . . . . 1 9 9 9 9 9 1 . . . . . 
        . . . . . 1 9 9 9 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 50)
    projectile4.follow(Unidentified_Flying_Object)
    projectile4.setKind(SpriteKind.Bubble)
    statusbar.value += -10
    otherSprite.destroy()
})
let myFuel: Sprite = null
let projectile4: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let AI_get_fuel = false
let AI = 0
let AI_Speed_boost = 0
let myEnemy: Sprite = null
let Unidentified_Flying_Object: Sprite = null
let projectile3: Sprite = null
let UFO = false
let statusbar2: StatusBarSprite = null
let P4 = false
let enimyspeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.showLongText("You are a spaceship trying to save the world from an alien invasion and defeat the king UFO.", DialogLayout.Full)
game.showLongText("or....", DialogLayout.Full)
game.showLongText("You are the king UFO and are invading the universe, however, there is a pesky little rebel trying to stop you you need to defeat that rebel and rule the world.", DialogLayout.Full)
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.player1.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enimyspeed = 50
let AI_speed = 1000
let Next_fire = 1000
game.onUpdate(function () {
    if (AI) {
        if (UFO) {
            AI_Speed_boost = 4
        }
        if (myEnemy.y < 75) {
            mySprite.y = 95
        } else if (myEnemy.y < 80) {
            mySprite.y = 100
        } else if (myEnemy.y < 85) {
            mySprite.y = 105
        } else if (myEnemy.y < 90) {
            mySprite.y = 110
        } else if (myEnemy.y < 95) {
            mySprite.y = 115
        } else {
            mySprite.y = 120
        }
        if (AI_Speed_boost == 0) {
            AI_speed = 600
        } else if (AI_Speed_boost == 1) {
            AI_speed = 180
        } else if (AI_Speed_boost == 2) {
            AI_speed = 50
        } else if (AI_Speed_boost == 3) {
            AI_speed = 10
        } else if (AI_Speed_boost == 4) {
            AI_speed = 1
        }
        if (mySprite.x - myEnemy.x < 2) {
            if (game.runtime() > Next_fire && AI) {
                Shoot()
            }
        }
    }
})
game.onUpdate(function () {
    if (game.runtime() > Next_fire && AI) {
        Shoot()
        Next_fire = game.runtime() + AI_speed
    }
})
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSprite(assets.image`Fuel`, mySprite, 0, enimyspeed)
    myFuel.x = randint(5, 155)
    myFuel.y = 0
    myFuel.setKind(SpriteKind.Food)
    animation.runImageAnimation(
    myFuel,
    assets.animation`Shining Fuel`,
    200,
    true
    )
    if (AI) {
        mySprite.follow(myFuel, enimyspeed * 5)
        AI_get_fuel = true
    }
})
game.onUpdateInterval(2000, function () {
    if (!(UFO)) {
        what_enimy(randint(1, 100))
    }
})
game.onUpdateInterval(2000, function () {
    if (UFO) {
        controller.player2.moveSprite(Unidentified_Flying_Object)
    }
})
game.onUpdateInterval(500, function () {
    if (UFO && (AI && !(AI_get_fuel))) {
        mySprite.follow(Unidentified_Flying_Object, enimyspeed * 5)
    }
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
