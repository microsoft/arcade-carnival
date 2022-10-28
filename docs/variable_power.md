# add label to

Changes power from min to max with sin-like cycle and displays the current power on a statusbar

```sig
variablePower(status, minNum, maxNum, thisSpeed)
```

## Parameters

* **status**: The statusbar where the power will be indicated
* **minNum**: The minimum amount of power in the cycle
+ **maxNum**: The maximum amount of power in the cycle
+ **thisSpeed**: The speed of change for the power bar

## Example #example

In this example, we add a variable power bar to the bottom of our ball toss game

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
statusbar.setColor(5, 10)
statusbar.setBarBorder(1, 1)
statusbar.setPosition(80, 113)
carnival.startTimer()
myBall.setTraceMulti(tracers.Full)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(50)
//@highlight
myBall.variablePower(statusbar, 30, 50, 100)

```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```