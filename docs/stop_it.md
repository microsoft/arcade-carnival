# stop ball

Stop the ball at the current location

```sig
stopIt()
```

## Parameters

none

## Example #example

In this example, we stop the projectile balls after one second so the user can create pictures and images with them

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    throwBall = carnival.createProjectileBallFromSprite(assets.image`ball-blue`, myBall)
    pause(1000)
	//@highlight
    throwBall.stopIt()
})
let throwBall: Ball = null
let myBall: Ball = null
scene.setBackgroundColor(12)
carnival.startTimer()
myBall = carnival.create(assets.image`ball-yellow`, SpriteKind.Player)
myBall.setPosition(80, 90)
let statusbar = statusbars.create(120, 6, StatusBarKind.Health)
statusbar.setColor(5, 10)
statusbar.setBarBorder(1, 1)
statusbar.setPosition(80, 113)
carnival.startTimer()
myBall.setTraceMulti(tracers.Full)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(50)
myBall.variablePower(statusbar, 30, 50, 100)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```