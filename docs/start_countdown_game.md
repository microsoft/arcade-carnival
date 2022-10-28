# start countdown with game over

Adds more game end styles to countdown

```sig
startCountdownGame(myTime, winType, winEffect)
```

## Parameters

* **myTime**: The number that represents seconds of time for your countdown timer
* **winType**: The way the score is judged when the countdown ends (multiplayer, score, timer, etc.)
+ **winEffect**: The effect that plays when the game over screen shows (confetti, melt, etc)

## Example #example

In this example, we play a button masher game and run a multiplayer gameover screen when the timer ends.

```blocks

controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player2.changeScoreBy(1)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    info.player1.changeScoreBy(1)
})

//@highlight
carnival.startCountdownGame(15, winTypes.Multi)


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```