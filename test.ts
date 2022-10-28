// tests go here; this will not be compiled when this package is used as an extension.
let theTarget: Sprite = null
let throwBall: Ball = null
let myBall: Ball = null

function test1(){
myBall = carnival.create(img`.`, SpriteKind.Player)
myBall.setPosition(80, 90)
let statusbar = statusbars.create(120, 6, StatusBarKind.Health)
statusbar.setColor(5, 10)
statusbar.setBarBorder(1, 1)
statusbar.setPosition(80, 113)
myBall.controlBallWithArrowKeys(true)
myBall.setIter(10)
myBall.setTraceMulti(carnival.Tracers.Cross)
myBall.variablePower(statusbar, 30, 50, 100)
carnival.addLabelTo("Target Practice", carnival.Areas.Top, 4)
carnival.startTimer()
}


function test2(){
	throwBall = carnival.createProjectileBallFromSprite(img`.`, myBall)
    info.changeScoreBy(1)
    music.baDing.play()
}

function test3(){
   carnival.showTimer(false)
    myBall.throwIt()
    carnival.startCountdownGame(15, carnival.WinTypes.Win)
	myBall.stopIt()
	myBall.destroy()
}

function test4() {
	carnival.customGameOverExpanded("Great Job!")
}


test1();
test2();
test3();
test4();
