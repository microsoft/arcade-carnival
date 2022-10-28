# on game over custom

Allows the user to add custom end game screen, complete with their own message, sound effects, and judging method

```sig
customGameOverExpanded(message, winEffect, gameSound, scoring, score)
```

## Parameters

* **message**: The text that shows as the win message
* **winEffect**: The effect that plays on the screen as the game window displays
+ **gameSound**:  The music effect that plays as the game window displays
+ **scoring**: The winType that is used to determine game winner (high score, low score, high time, low time, etc.)
+ **score**: A number you can pass in to be considered for custom score

## Example #example

In this example, we add a custom game over screen based on the random number that the computer chooses

```blocks
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (vote == 2) {
		//@highlight
        carnival.customGameOverExpanded("P2 wins with " + convertToText(p2_attempts) + " attempts", effects.confetti, music.powerUp, scoreTypes.LScore, p2_attempts)
    } else {
        p2_attempts += 1
    }
})

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (vote == 1) {
        carnival.customGameOverExpanded("P1 wins with " + convertToText(p1_attempts) + " attempts", effects.confetti, music.powerUp, scoreTypes.LScore, p1_attempts)
    } else {
        p1_attempts += 1
    }
})


let p2_attempts = 1
let p1_attempts = 1
let vote = 0

game.showLongText("Press your space bar when you believe you've been chosen. The vote cycles every second.", DialogLayout.Center)
carnival.startTimer()
game.onUpdateInterval(1000, function () {
    vote = randint(1, 2)
})


```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```