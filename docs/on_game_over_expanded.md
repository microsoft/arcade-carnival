# on game over expanded

Adds custom end game styles, including multiplayer, score-based, and time-based

```sig
onGameOverExpanded(winStyle, winEffect)
```

## Parameters

* **winStyle**: The method for judging the winner (multiplayer, score, time, etc.)
* **winEffect**: The special effect that plays during the end screen (confetti, melt, etc.)

## Example #example

In this example, we add multiplayer game screen to a simple button clicker

```blocks

controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player2.changeScoreBy(1)
})
info.onCountdownEnd(function () {
	//@highlight
    carnival.onGameOverExpanded(winTypes.Multi)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player1.changeScoreBy(1)
})
info.startCountdown(10)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```