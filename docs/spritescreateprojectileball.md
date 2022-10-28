# create projectile ball

Create a new ball with a given speed that starts from the location of another sprite with that sprite's properties. The sprite auto-destroys when it leaves the screen. You can modify position after it's created.

```sig
createProjectileBallFromSprite(img, parentBall, kind)
```

## Parameters

* **img**: The image you want the resulting projectile to have
* **parentBall**: The parent ball where the projectiles will originate from and whose properties will be cloned
+ **kind**: (Optional) The spritekind you want the projectile ball to have

## Example #example

In this example, we toss a projectile from the parent ball each time the A button is pressed.

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	//@highlight
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
myBall.variablePower(statusbar, 30, 50, 100)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```