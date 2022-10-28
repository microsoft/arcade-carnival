# create

Returns a created ball sprite based on specifications

```sig
create(img, kind, x, y)
```

## Parameters

* **img**: The image that the ball will have
* **kind**: The type of sprite the ball will be
+ **x**: The initial x position of the ball
+ **y**: The initial y position of the ball

## Example #example

In this example, we create a ball that can be thrown in whichever direction you aim it.

```blocks

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    throwBall = carnival.createProjectileBallFromSprite(assets.image`ball-blue`, myBall)
})
let throwBall: Ball = null
let myBall: Ball = null
scene.setBackgroundColor(12)
carnival.startTimer()
//@highlight
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