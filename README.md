## Usage

This extensions adds blocks to help you create your own carnival games in MakeCode Arcade using throwable balls, extra timer functions, and extra game-over options.


* Setting Up a Ball

```blocks
let myBall: Ball = null
myBall = carnival.create(assets.image`ball-yellow`, SpriteKind.Player)
myBall.setPosition(80, 90)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(50)
myBall.setTraceMulti(carnival.Tracers.Full)
```

This snippet sets up a ball called myBall and allows you to control it with arrow keys. You'll also see that it has a trace marker that's set to 50% value.


* Variable Power

```blocks
let theTarget: Sprite = null
let throwBall: Ball = null
let myBall: Ball = null
scene.setBackgroundImage(assets.image`wildWest`)
myBall = carnival.create(assets.image`ball-yellow`, SpriteKind.Player)
myBall.setPosition(80, 90)
let statusbar = statusbars.create(120, 6, StatusBarKind.Health)
statusbar.setColor(5, 10)
statusbar.setBarBorder(1, 1)
statusbar.setPosition(80, 113)
let myBooth = sprites.create(assets.image`booth`, SpriteKind.Booth)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(10)
myBall.setTraceMulti(carnival.Tracers.Cross)
myBall.variablePower(statusbar, 30, 50, 100)
```

This snippet adds to the code above by creating a statusbar that is used as a visual indicator of the power at any given time. The power varies between 30% and 50% of full power.



* Tossing Projectile Balls

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    throwBall = carnival.createProjectileBallFromSprite(assets.image`ball-blue`, myBall)
})
```

This snippet creates a ball of type projectile that emits from the parent ball using its angle and power settings.



* Timer

```blocks
carnival.startTimer()
```

This sets a timer that counts up throughout the game, or until carnival.startTimer() is called again.



* Countdown

```blocks
carnival.startCountdownGame(15, carnival.WinTypes.Timed)

```

This starts a countdown that launches an endgame state when completed. You can choose from win, lose, best time, best score, or multiplayer.



* Game

```blocks
    carnival.customGameOverExpanded("Great Job!", effects.confetti, music.powerUp, carnival.ScoreTypes.HScore, 0)
```

This allows for a custom game over message under circumstances of your choosing.  You can change the message, the background effect, the music, the way score is judged (win, lose, time, score, or multiplayer.) You can also pass in a custom "score" to for judging success.



* Label

```blocks
carnival.addLabelTo("Target Practice", carnival.Areas.Top, 4)
```

This adds a label to your carnival booth, using a predetermined location near the top, middle, or bottom of the play area.




## Use this extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/microsoft/arcade-carnival** and import

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.



## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/microsoft/arcade-carnival/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
