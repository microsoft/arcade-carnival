# set trace multi

Chooses the method of predictive tracing for the Ball type

```sig
setTraceMulti(traceWay)
```

## Parameters

* **traceWay**: The type of visual to use as the ball trace


## Example #example

In this example, we use a crosshair to show the general direction the ball wil go

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
myBall.controlBallWithArrowKeys(true)
//@highlight
myBall.setTraceMulti(tracers.Cross)
myBall.variablePower(statusbar, 30, 50, 100)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```