# control ball with arrow keys

Allows you to change a ball's potential for angle of flight and power using the arrow keys

```sig
controlBallWithArrowKeys(on)
```

## Parameters

* **on**: Boolean that directs whether or not to allow control of ball with arrow keys


## Example #example

In this example, users are able to choose the direction that their ball will fly using the arrow keys.

```blocks

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
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
myBall.setIter(10)
myBall.setTraceMulti(tracers.Cross)
myBall.variablePower(statusbar, 30, 50, 100)
//@highlight
myBall.controlBallWithArrowKeys(true)
```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```