# get timer

Gets the value of the current timer in the game widow

```sig
getTimerValue()
```

## Parameters

none

## Example #example

In this example, we change the color of the background screen based on the value of the timer.

```blocks

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    throwBall = carnival.createProjectileBallFromSprite(assets.image`ball-blue`, myBall)
})

let throwBall: Ball = null
let myBall: Ball = null
scene.setBackgroundColor(12)
carnival.startTimer()
myBall = carnival.create(assets.image`ball-yellow`, SpriteKind.Player)
myBall.setPosition(80, 90)
let statusbar = statusbars.create(120, 6, StatusBarKind.Health)

carnival.startTimer()
myBall.setTraceMulti(tracers.Full)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(50)

game.onUpdateInterval(1000, function () {
	//@highlight
    scene.setBackgroundColor(carnival.getTimerValue() % 16)
})

```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```