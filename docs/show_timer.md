# show timer

Allows user to show or hide the timer at the top of the screen

```sig
showTimer(false)
```

## Parameters

none

## Example #example

In this example, we hide our timer thats counting up in our purple window

```blocks

scene.setBackgroundColor(12)
carnival.startTimer()
//@highlight
showTimer(false)

```


```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```