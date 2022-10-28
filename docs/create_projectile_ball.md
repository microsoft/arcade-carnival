# create projectile ball

Create a new ball with a given speed that starts from the location of another sprite. The ball auto-destroys when it leaves the screen. You can modify position after it's created.

```sig
createProjectileBallFromSprite(img, parentBall, kind)
```

## Parameters

* **img**: The image that the projectile takes
* **parentBall**: The ball sprite from which the projectiles emit and take their settings
+ **kind**: The spritekind associated with each new ball

## Example #example

In this example, we emit balls of kind projectile from a main ball in the middle of the screen

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	//@highlight
    throwBall = carnival.createProjectileBallFromSprite(assets.image`ball-blue`, myBall)
})
let throwBall: Ball = null
let myBall: Ball = null
myBall = carnival.create(assets.image`ball-yellow`, SpriteKind.Player)
myBall.setPosition(80, 90)
let statusbar = statusbars.create(120, 6, StatusBarKind.Health)
statusbar.setColor(5, 10)
statusbar.setBarBorder(1, 1)
statusbar.setPosition(80, 113)
carnival.startTimer()
myBall.controlBallWithArrowKeys(true)
myBall.setIter(10)
myBall.setTraceMulti(tracers.Cross)
myBall.variablePower(statusbar, 30, 50, 100)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```