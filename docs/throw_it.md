# throw ball

Adjusts the velocity of a ball sprite to travel along a path (usually determined by arrow keys)

```sig
throwIt()
```

## Parameters

none

## Example #example

In this example, we toss a ball when the A button is pressed

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //@highlight
    myBall.throwIt()
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