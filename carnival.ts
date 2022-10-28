
namespace SpriteKind {
    //% isKind
    export const Ball = SpriteKind.create()
    //% isKind
    export const Booth = SpriteKind.create()
    //% isKind
    export const Mouse = SpriteKind.create()
    //% isKind
    export const Crosshair = SpriteKind.create()
    //% isKind
    export const Moon = SpriteKind.create()
}

enum winTypes {
    //% block="win game"
    Win,
    //% block="lose game"
    Lose,
    //% block="best score"
    Score,
    //% block="best time"
    Timed,
    //% block="multiplayer"
    Multi,
    //% block="custom" blockHidden
    Custom
}

enum scoreTypes {
    //% block="high score"
    HScore,
    //% block="low score"
    LScore,
    //% block="high time"
    HTime,
    //% block="low time"
    LTime,
    //% block="none"
    None
}

enum speeds {
    //% block="fast"
    Fast,
    //% block="medium"
    Med,
    //% block="slow"
    Slow
}

enum areas {
    //% block="top"
    Top,
    //% block="middle"
    Mid,
    //% block="bottom"
    Bottom
}

enum tracers {
    //% block="full"
    Full,
    //% block="partial"
    Part,
    //% block="pointer"
    Pointer,
    //% block="crosshair"
    Cross,
    //% block="off"
    Off
}

let textSprite: TextSprite = null
//let fanfare: effects.BackgroundEffect = undefined;
//let winStyle="winTypes.Score"

// Get array of player info
let players: info.PlayerInfo[];



/**
* An extension full of carnival goodness
*/
//% weight=100 color=#b70082 icon="\uf54e"
//% groups='["Ball", "Timer", "Countdown", "Game", "Scene"]'
namespace carnival {

    /**
    * Adds text to the top, middle, or bottom
    * of screen as defined by games
    */
    //% group="Scene"
    //% blockId=add_label_to
    //% block="add label $myLabel to $myPosition of window || $myColor"
    //% myLabel.defl="Whack-the-Mole"
    //% myColor.shadow="colorindexpicker"
    //% myColor.defl=4
    //% myPosition.defl=areas.Bottom
    //% inlineInputMode=inline
    //% help=github:carnival/docs/add_label_to
    export function add_label_to(myLabel: string, myPosition: areas, myColor?: number) {
        if (myColor == undefined)
            myColor = 4;

        textSprite = textsprite.create(myLabel, 0, myColor)
        if (myPosition == areas.Bottom) textSprite.setPosition(80, 110);
        if (myPosition == areas.Mid) textSprite.setPosition(80, 50);
        if (myPosition == areas.Top) textSprite.setPosition(80, 20);
    }



    // Formerly of the Info Category -----

    let countdownInitialized = false;
    let countUpInitialized = false;

    class TimerState {
        public playerStates: info.PlayerState[];
        public visibilityFlag: number;

        //public timerElapsed: number;
        public bgColor: number;
        public borderColor: number;
        public fontColor: number;

        constructor() {
            this.visibilityFlag = info.Visibility.Hud;
            this.bgColor = screen.isMono ? 0 : 1;
            this.borderColor = screen.isMono ? 1 : 3;
            this.fontColor = screen.isMono ? 1 : 3;
        }
    }

    let timerState: TimerState = undefined;

    let timerStateStack: {
        state: TimerState,
        scene: scene.Scene
    }[];


    /**
     * Adds timer to game
     */
    //% color="#b70082"
    //% group="Timer"
    //% blockId=start_count_up_game
    //% block="start timer"
    //% inlineInputMode=inline
    //% help=github:carnival/docs/start_count_up_game
    export function startTimer() {
        control.timer1.reset();
        updateFlag(info.Visibility.Countdown, true);
        timerHUD();

    }

    /**
     * Set whether timer should be displayed
     * @param on if true, countdown is shown; otherwise, countdown is hidden
     */
    //% color="#b70082"
    //% group="Timer"
    //% blockId=show_timer
    //% block="show timer $on=toggleOnOff"
    //% inlineInputMode=inline
    //% help=github:carnival/docs/show_timer
    export function showTimer(on: boolean) {
        updateFlag(info.Visibility.Countdown, on);
    }

    /**
     * Return the current value of the count-up timer
     */
    //% color="#b70082"
    //% group="Timer"
    //% blockId=get_timer
    //% block="timer value"
    //% inlineInputMode=inline
    //% help=github:carnival/docs/get_timer
    export function getTimerValue(): number {
        return control.timer1.millis();
    }


    function updateFlag(flag: info.Visibility, on: boolean) {
        timerHUD();
        if (on) timerState.visibilityFlag |= flag;
        else timerState.visibilityFlag = ~(~timerState.visibilityFlag | flag);
    }

    function drawTimer(millis: number) {
        if (millis < 0) millis = 0;
        millis |= 0;

        const font = image.font8;
        const smallFont = image.font5;
        const seconds = Math.idiv(millis, 1000);
        const width = font.charWidth * 5 - 2;
        let left = (screen.width >> 1) - (width >> 1) + 1;
        let color1 = timerState.fontColor;
        let color2 = timerState.bgColor;

        screen.fillRect(left - 3, 0, width + 6, font.charHeight + 3, timerState.borderColor)
        screen.fillRect(left - 2, 0, width + 4, font.charHeight + 2, color2)

        if (seconds < 60) {
            const top = 1;
            const remainder = Math.idiv(millis % 1000, 10);

            screen.print(formatDecimal(seconds) + ".", left, top, color1, font)
            const decimalLeft = left + 3 * font.charWidth;
            screen.print(formatDecimal(remainder), decimalLeft, top + 2, color1, smallFont)
        }
        else {
            const minutes = Math.idiv(seconds, 60);
            const remainder = seconds % 60;
            screen.print(formatDecimal(minutes) + ":" + formatDecimal(remainder), left, 1, color1, font);
        }
    }

    function formatDecimal(val: number) {
        val |= 0;
        if (val < 10) {
            return "0" + val;
        }
        return val.toString();
    }

    function timerHUD() {
        if (timerState) return;

        timerState = new TimerState();

        scene.createRenderable(
            scene.HUD_Z,
            () => {

                // show timer
                if (timerState.visibilityFlag & info.Visibility.Countdown) {
                    const scene = game.currentScene();
                    //const elapsed = scene.millis();
                    const elapsed = control.timer1.millis();
                    drawTimer(elapsed);
                    let t = elapsed / 1000;
                    if (t <= 0) {
                        t = 0;

                    }
                }
            }
        );
    }



    /**
     * Adds game end style to countdown
     */
    //% color="#b70082"
    //% group="Countdown"
    //% blockId=start_countdown_game
    //% block="start countdown $myTime (s) and game over $winType || effect $winEffect"
    //% myTime.defl=15
    //% winType.defl=winTypes.Score
    //% winEffect.defl=effects.confetti
    //% inlineInputMode=inline
    //% help=github:carnival/docs/start_countdown_game
    export function startCountdownGame(myTime: number, winType: winTypes, winEffect?: effects.BackgroundEffect) {
        if (!winType)
            winType = winTypes.Win;
        if (!winEffect && winType != winTypes.Lose) {
            winEffect = effects.confetti;
        }
        else { winEffect = effects.melt; }

        init(winType, winEffect);
        info.startCountdown(myTime);

    }

    function saveLowScore(newLow: number) {
        const curr = settings.readNumber("low-score")
        if (curr == undefined || newLow < curr) {
            settings.writeNumber("low-score", newLow);
        }
    }

    // Get the last recorded low score
    function lowScore(): number {
        return settings.readNumber("low-score");
    }


    function newGameOver(winStyle: winTypes, fanfare: effects.BackgroundEffect, winSound?: music.Melody, scoreType?: scoreTypes, message?: string, customScore?: number) {

        // Prep default variables for different win types
        let winnerNumber = [1];  // Which players have the high scores?
        let thisBest = info.score(); // Who has the best score this round?
        let newBest = false; // Is thisBest the newBest for all games?
        let bestScore = info.highScore(); // What is the bestScore of all time?

        // Save number of seconds passed during game
        const thisScene = game.currentScene();
        //let timeElapsed = roundOff(thisScene.millis() / 1000, 2); //Can't get points to match timer perfectly
        let timeElapsed = Math.floor(thisScene.millis() / 1000);

        if (control.timer1.millis() >= 0) {
            timeElapsed = Math.floor(control.timer1.millis() / 1000);
            // timeElapsed = roundOff(control.timer1.millis() / 1000, 2);  //Can't get points to match timer perfectly

        }

        /*
        // Save all scores as relevant to the game.
            info.saveAllScores(); // This is throwing an error for some reason
        */


        // Initialize thisBest if customScore wasn't included
        if (customScore === undefined) {
            thisBest = info.player1.getState().score;
        }

        // Initialize the messaging / fanfare based on winStyle
        if (winStyle == winTypes.Custom) {
            if (!scoreType) { scoreType = scoreTypes.HScore; }
            if (!message) { message = "Game Over!"; }
            if (!fanfare) { fanfare = effects.confetti; }


        } else if (winStyle == winTypes.Win) {
            scoreType = scoreTypes.HScore;
            message = "You Win!";
            if (!fanfare) { fanfare = effects.confetti; }

        } else if (winStyle == winTypes.Score) {
            scoreType = scoreTypes.HScore;
            message = "Great Score!";
            if (!fanfare) { fanfare = effects.confetti; }

        } else if (winStyle == winTypes.Timed) {
            scoreType = scoreTypes.LTime;
            message = "Great Time!";
            if (!fanfare) { fanfare = effects.confetti; }

        } else if (winStyle == winTypes.Multi) {
            scoreType = scoreTypes.HScore;
            if (!fanfare) { fanfare = effects.confetti; }

            // Find winner of multiplayer
            const scoreInfo1 = info.player1.getState();
            const scoreInfo2 = info.player2.getState();
            const scoreInfo3 = info.player3.getState();
            const scoreInfo4 = info.player4.getState();
            const allScores = [scoreInfo1.score, scoreInfo2.score, scoreInfo3.score, scoreInfo4.score];


            // Find player with highest score in Multi
            thisBest = -Infinity; // Make sure there's no false tie
            for (let i = 0; i < 4; i++) {
                if (allScores[i] != undefined && allScores[i] > thisBest) {
                    thisBest = allScores[i];
                    winnerNumber = [i + 1];
                } else if (allScores[i] != undefined && allScores[i] == thisBest) {
                    winnerNumber.push(i + 1);
                }
            }

            // Construct string for one winner
            if (!message && winnerNumber.length <= 1) {
                message = "Player " + winnerNumber[0] + " Wins!";
            } else {
                //Construct string for ties
                message = "Players ";

                for (let i = 0; i < ((winnerNumber.length) - 1); i++) {
                    message += winnerNumber[i] + " & ";
                }

                // remove the last ampersand and the trailing space
                message += winnerNumber[(winnerNumber.length) - 1] + " Tied!";
            }

        } else {
            if (!scoreType) { scoreType = scoreTypes.None; }
            if (!message) { message = "Game Over!"; }
            if (!fanfare) { fanfare = effects.melt; }
        }

        // Overwrite current game score if something was passed in
        if (customScore != undefined) {
            thisBest = customScore;
        }

        // Set bestScore and newBest based on score and scoreType
        if (scoreType == scoreTypes.HScore) {
            if (thisBest > bestScore) {
                newBest = true;
                bestScore = thisBest;
                info.setScore(thisBest);
                info.saveHighScore();
            }

        } else if (scoreType == scoreTypes.LScore) {
            bestScore = settings.readNumber("low-score");
            if (bestScore == undefined) { bestScore = Infinity; }
            if (thisBest < bestScore) {
                newBest = true;
                bestScore = thisBest;
                info.setScore(thisBest);
                saveLowScore(thisBest);
            }

        } else if (scoreType == scoreTypes.HTime) {

            // Set thisBest to timeElapsed if no customScore
            if (!customScore) {
                thisBest = timeElapsed;
            }

            if (thisBest > bestScore) {
                newBest = true;
                bestScore = thisBest;
                info.setScore(thisBest);
                info.saveHighScore();
            }

        } else if (scoreType == scoreTypes.LTime) {
            bestScore = settings.readNumber("low-score");
            if (bestScore == undefined) { bestScore = Infinity; }

            // Set thisBest to timeElapsed if no customScore
            if (!customScore) {
                thisBest = timeElapsed;
            }

            if (thisBest < bestScore) {
                newBest = true;
                bestScore = thisBest;
                info.setScore(thisBest);
                saveLowScore(thisBest);
            }

        } else {

            // Score judging type must be "None"
            thisBest = undefined;
            bestScore = undefined;
            newBest = false;
        }

        // Make sure there's a sound to playe
        if (!winSound) { winSound = music.powerUp; }

        // releasing memory and clear fibers. Do not add anything that releases the fiber until background is set below,
        // or screen will be cleared on the new frame and will not appear as background in the game over screen.
        game.popScene();
        game.pushScene();
        scene.setBackgroundImage(screen.clone());

        winSound.play();

        fanfare.startScreenEffect();

        pause(400);

        const overDialog = new GameOverDialog(true, message, thisBest, bestScore, newBest);
        scene.createRenderable(scene.HUD_Z, target => {
            overDialog.update();
            target.drawTransparentImage(
                overDialog.image,
                0,
                (screen.height - overDialog.image.height) >> 1
            );
        });
        pause(500); // wait for users to stop pressing keys
        overDialog.displayCursor();
        game.waitAnyButton();
        control.reset();

    }

    function roundOff(thisNum: number, toPlace: number): number {
        const x = Math.pow(10, toPlace);
        return Math.round(thisNum * x) / x;
    }

    function init(winStyle: winTypes, fanfare: effects.BackgroundEffect) {
        if (countdownInitialized) return;
        countdownInitialized = true;

        info.onCountdownEnd(function () {

            //Handling manually to include number of seconds passed
            /*
            if (winStyle == winTypes.Win) {
                game.over(true, fanfare)
            } else */ if (winStyle == winTypes.Lose) {
                game.over(false, fanfare)
            } else {
                newGameOver(winStyle, fanfare);
            }
        })
    }

    export class GameOverDialog extends game.BaseDialog {
        protected cursorOn: boolean;
        protected isNewbestScore: boolean;

        constructor(
            protected win: boolean,
            protected messageText: string,
            protected score?: number,
            protected best?: number,
            protected newBest?: boolean
        ) {
            super(screen.width, 46, img`
        1 1 1
        f f f
        1 1 1
        `);
            this.cursorOn = false;

            /* Since best time is lower, need to do this elsewhere
            this.isNewbestScore = this.score > this.bestScore;
            */
        }

        displayCursor() {
            this.cursorOn = true;
        }

        update() {
            this.clearInterior();
            this.drawTextCore();

            if (this.cursorOn) {
                this.drawCursorRow();
            }
        }

        drawTextCore() {
            const titleHeight = 8;

            this.image.printCenter(
                this.messageText,
                titleHeight,
                screen.isMono ? 1 : 5,
                image.font8
            );


            if (this.score != undefined) {
                const scoreHeight = 23;
                const bestScoreHeight = 34;
                const scoreColor = screen.isMono ? 1 : 2;

                this.image.printCenter(
                    "Score:" + this.score,
                    scoreHeight,
                    scoreColor,
                    image.font8
                );

                if (this.newBest == true) {
                    this.image.printCenter(
                        "New Best Score!",
                        bestScoreHeight,
                        scoreColor,
                        image.font5
                    );
                } else {
                    this.image.printCenter(
                        "Best:" + this.best,
                        bestScoreHeight,
                        scoreColor,
                        image.font8
                    );
                }
            }
        }
    }

    // End Info

    // Formerly namespace Game


    /**
     * Adds additional end game styles
     */
    //% color="#b70082"
    //% group="Game"
    //% blockId=on_game_over_expanded
    //% block="game over $winStyle || add effect $winEffect"
    //% winType.defl=winTypes.Win
    //% winEffect.defl=effects.confetti
    //% inlineInputMode=inline
    //% help=github:carnival/docs/on_game_over_expanded
    export function onGameOverExpanded(winStyle: winTypes, winEffect?: effects.BackgroundEffect) {

        if (winEffect == undefined) {
            if (winStyle == winTypes.Lose) { winEffect = effects.melt; }
            else { winEffect = effects.confetti; }
        }

        if (winStyle == winTypes.Lose) {
            game.over(false, winEffect)
        } else {
            newGameOver(winStyle, winEffect);
        }
    }

    /**
     * Adds custom end game styles
     */
    //% color="#b70082"
    //% group="Game"
    //% blockId=on_game_over_custom_expanded
    //% block="game over $message || with $winEffect and $gameSound send score $score judge $scoring"
    //% message.defl="Great Job!"
    //% scoring.defl=scoreTypes.None
    //% winEffect.defl=effects.confetti
    //% gameSound.defl=music.powerUp
    //% inlineInputMode=inline
    //% help=github:carnival/docs/on_game_over_custom_expanded
    export function customGameOverExpanded(message: string, winEffect?: effects.BackgroundEffect, gameSound?: music.Melody, scoring?: scoreTypes, score?: number) {
        if (!winEffect) { winEffect = effects.confetti; }
        if (!scoring) { scoring = scoreTypes.HScore; }
        if (score == undefined) { info.score(); }
        if (!gameSound) { gameSound = music.powerUp; }
        game.setGameOverSound(true, gameSound);
        newGameOver(winTypes.Custom, winEffect, gameSound, scoring, message, score);
    }


    // Formerly namespace Ball



    /**
     * Creates a new throwable from an image and kind
     * @param img the image for the sprite
     * @param kind the kind to make the throwable
     * @param x optional initial x position, eg: 10
     * @param y optional initial y position, eg: 110
     */
    //% blockId=throw_create block="ball $img=screen_image_picker of kind $kind=spritekind || at x $x y $y"
    //% color="#b70082"
    //% group="Ball"
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% blockSetVariable=myBall
    //% weight=100
    //% help=github:carnival/docs/throw_create
    export function create(img: Image,
        kind: number,
        x: number = 10,
        y: number = 110): Ball {
        return new Ball(img, kind, x, y);
    }



    /**
   * Create a new ball with a given speed that starts from the location of another sprite.
   * The sprite auto-destroys when it leaves the screen. You can modify position after it's created.
   */
    //% group="Ball"
    //% color="#b70082"
    //% weight=99
    //% blockId=spritescreateprojectileballfromparent block="ball projectile $img=screen_image_picker based on $parentBall=variables_get(myBall) || of kind $kind=spritekind"
    //& kind.defl=1
    //% blockSetVariable=myBall
    //% inlineInputMode=inline
    //% help=github:carnival/docs/create_projectile_ball
    export function createProjectileBallFromSprite(img: Image, parentBall: Ball, kind?: number): Ball {
        let vx = xComponent(parentBall.angle, parentBall.pow);
        let vy = carnival.yComponent(parentBall.angle, parentBall.pow);
        let ay = parentBall.gravity;
        let ax = parentBall.wind;
        let p = parentBall.pow;
        if (!kind) { kind = SpriteKind.Projectile; }
        return createProjectileBall(img, vx, vy, ax, ay, p, kind, parentBall);
    }

    /**
     * Create a new sprite with given speed, and place it at the edge of the screen so it moves towards the middle.
     * The sprite auto-destroys when it leaves the screen. You can modify position after it's created.
     */
    //% group="Ball"
    //% color="#b70082"
    //% blockId=spritescreateprojectileball block="ball $img=screen_image_picker vx $vx vy $vy of kind $kind=spritekind||based on $parentBall=variables_get(myBall)"
    //% blockSetVariable=myBall
    //% inlineInputMode=inline
    //% expandableArgumentMode=toggle
    //% help=github:carnival/docs/spritescreateprojectileball
    function createProjectileBall(img: Image, vx: number, vy: number, ax: number, ay: number, power: number, kind?: number, parentBall?: Ball) {
        const s = carnival.create(img, kind || SpriteKind.Projectile);
        const sc = game.currentScene();

        if (parentBall) {
            s.setPosition(parentBall.x, parentBall.y);
            s.vx = xComponent(parentBall.angle, parentBall.pow);
            s.vy = carnival.yComponent(parentBall.angle, parentBall.pow);
            s.ay = parentBall.gravity;
            s.ax = parentBall.wind;
            s.pow = parentBall.pow;
        } else {
            // put it at the edge of the screen so that it moves towards the middle
            // If the scene has a tile map, place the sprite fully on the screen
            const xOff = sc.tileMap ? -(s.width >> 1) : (s.width >> 1) - 1;
            const yOff = sc.tileMap ? -(s.height >> 1) : (s.height >> 1) - 1;
            const cam = game.currentScene().camera;

            let initialX = cam.offsetX;
            let initialY = cam.offsetY;

            if (vx < 0) {
                initialX += screen.width + xOff;
            } else if (vx > 0) {
                initialX += -xOff;
            }

            if (vy < 0) {
                initialY += screen.height + yOff;
            } else if (vy > 0) {
                initialY += -yOff;
            }

            s.setPosition(initialX, initialY);
        }

        s.moon.destroy();
        s.flags |= sprites.Flag.AutoDestroy | sprites.Flag.DestroyOnWall;

        return s;
    }



    /**
     * Convert degrees to radians
     * @param degree to convert
     * @return converted value in radians
     */
    function degreeToRadian(degree: number): number {
        return degree * Math.PI / 180;
    }

    /**
     * Evaluate the x component of a given vector
     * @param degree angle of vector
     * @param magnitude magnitude of vector
     * @return x component of vector
     */
    //% color="#b70082"
    export function xComponent(degree: number, magnitude: number): number {
        return magnitude * Math.cos(degreeToRadian(degree));
    }

    /**
     * Evaluate the y component of a given vector
     * @param degree angle of vector
     * @param magnitude magnitude of vector
     * @return y component of vector
     */
    //% color="#b70082"
    export function yComponent(degree: number, magnitude: number): number {
        return -magnitude * Math.sin(degreeToRadian(degree));
    }
}

/**
 * A throwable
 **/

//% blockNamespace=carnival color="#b70082" blockGap=8
class Ball extends sprites.ExtendableSprite {
    private renderable: scene.Renderable;

    private controlKeys: boolean;
    private trace: boolean;

    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="angle"
    //% weight=8
    public angle: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="power"
    //% weight=8
    public pow: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="tracing time (seconds)"
    //% weight=8
    public iter: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="trace color"
    //% weight=8
    public traceColor: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="gravity"
    //% weight=8
    public gravity: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="wind"
    //% weight=8
    public wind: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="angle adjust rate"
    //% weight=8
    public angleRate: number;
    //% group="Ball" blockSetVariable="myBall"
    //% blockCombine block="wind"
    //% weight=8
    public powerRate: number;
    //% group="Ball" blockSetVariable="myBall"
    //% weight=8
    public moon: Sprite;


    public constructor(img: Image,
        kind: number,
        x: number,
        y: number) {
        super(img);
        this.setKind(kind);
        this.x = x;
        this.y = y;

        this.gravity = 20;
        this.pow = 50;
        this.angle = 10;
        this.angleRate = 3;
        this.powerRate = 3;
        this.iter = .4;
        this.wind = 0;
        this.moon = sprites.create(assets.image`crosshair`, SpriteKind.Moon);
        this.moon.setFlag(SpriteFlag.Invisible, true);

        this.renderable = scene.createRenderable(-0.5, (target, camera) => {
            let xComp = carnival.xComponent(this.angle, this.pow);
            let yComp = carnival.yComponent(this.angle, this.pow);
            let xOffset = camera.offsetX;
            let yOffset = camera.offsetY;

            for (let i: number = 0.1; i < this.iter; i += i / 5) {
                let x = this.x + i * xComp + (i ** 2) * this.wind / 2;
                let y = this.y + i * yComp + (i ** 2) * this.gravity / 2;
                target.setPixel(
                    x - xOffset,
                    y - yOffset,
                    this.traceColor
                );
            }
        }, () => !this.ay && this.trace);

        this.controlKeys = false;
        this.trace = false;
        this.traceColor = 1;
    }

    /**
     * Gets the throwables's sprite
     */
    get sprite(): Sprite {
        return this;
    }

    /**
     * Set how to show the trace for the estimated path
     * @param on whether to turn on or off this feature, eg: true
     */
    //% blockId=setTraceMulti block="trace $this path estimate $traceWay"
    //% weight=80
    //% color="#b70082"
    //% group="Ball"
    //% traceWay.defl="tracers.Full"
    //% this.defl=myBall
    //% help=github:carnival/docs/set_trace_multi
    public setTraceMulti(traceWay: tracers): void {

        if (traceWay == tracers.Full) {
            this.moon.setFlag(SpriteFlag.Invisible, true);
            this.iter = 3;
            this.trace = true;
        } else if (traceWay == tracers.Part) {
            this.moon.setFlag(SpriteFlag.Invisible, true);
            this.iter = .3;
            this.trace = true;
        } else if (traceWay == tracers.Pointer) {
            this.moon.setFlag(SpriteFlag.Invisible, true);
            this.iter = .2;
            this.trace = true;
        } else if (traceWay == tracers.Cross) {
            this.trace = false;
            this.moon.setFlag(SpriteFlag.Invisible, false);
        } else {
            this.trace = false;
            this.moon.setFlag(SpriteFlag.Invisible, false);
        }
    }


    /**
     * Set the crosshairs to distance away from center of
     * ball in direction ball will travel
     */

    public update_crosshair(dist?: number) {
        if (dist == undefined) { dist = 3; }
        spriteutils.placeAngleFrom(
            this.moon,
            this.angle * Math.PI / -180,
            Math.max(this.width + dist, this.height + dist),
            this
        )
    }

    /**
     * Set the trace length for the estimated path in percent
     */
    //% weight=50
    //% color="#b70082"
    //% group="Ball""
    //% blockId=set_trace_iter block="set $this trace length to $len \\%"
    //% len.defl=50
    //% this.defl=myBall
    //% help=github:carnival/docs/set_trace_iter
    public setIter(len: number): void {
        // Make 100 percent distance = 3
        this.iter = 3 * (len / 100);
    }

    /**
     * Throw the throwable with the current settings
     */
    //% weight=70
    //% color="#b70082"
    //% group="Ball"
    //% blockId=throw_it block="toss $this"
    //% this.defl=myBall
    //% help=github:carnival/docs/throw_it
    public throwIt(): void {
        this.vx = carnival.xComponent(this.angle, this.pow);
        this.vy = carnival.yComponent(this.angle, this.pow);
        this.ay = this.gravity;
        this.ax = this.wind;
    }

    /**
     * Stop the throwable at the current location
     */
    //% color="#b70082"
    //% weight=70
    //% group="Ball"
    //% blockId=stop_it block="stop $this"
    //% this.defl=myBall
    //% help=github:carnival/docs/stop_it
    public stopIt(): void {
        this.ay = 0;
        this.ax = 0;
        this.vx = 0;
        this.vy = 0;
    }

    /**
     * Set whether to control the throwable with the arrow keys; left and right
     * to adjust the angle, and up and down to increase / decrease power
     * @param on whether to turn on or off this feature, eg: true
     */
    //% color="#b70082"
    //% weight=80
    //% group="Ball"
    //% blockId=control_ball_keys block="control $this with arrow keys || $on=toggleOnOff"
    //% this.defl=myBall
    //% inlineInputMode=inline
    //% help=github:carnival/docs/control_ball_keys
    public controlBallWithArrowKeys(on: boolean = true): void {
        this.controlKeys = on;

        game.onUpdate(() => {
            if (this.controlKeys) {
                this.angle -= controller.dx() * this.angleRate / 2;
                this.pow -= controller.dy() * this.powerRate / 2;
            }
        })
    }

    /**
  * Changes power from min to max with sin-like cycle
  */
    //% blockId=variable_power block="vary $this power using $status=variables_get(statusbar) from $minNum \\% to $maxNum \\% || speed $thisSpeed"
    //% weight=2
    //% color="#b70082"
    //% group="Ball"
    //% minNum.defl=30
    //% maxNum.defl=60
    //% this.defl=myBall
    //% inlineInputMode=inline
    //% help=github:carnival/docs/variable_power
    public variablePower(status: StatusBarSprite, minNum: number, maxNum: number, thisSpeed?: number): void {
        if (thisSpeed == undefined) { thisSpeed = 100; }
        if (minNum < 0) { minNum = 0; }
        if (maxNum > 100) { maxNum = 100; }
        game.onUpdate(() => {
            status.value = minNum + Math.abs(Math.sin(game.runtime() / (90000 * (1 / thisSpeed))) * (maxNum - minNum))
            this.pow = status.value;
            this.update_crosshair();
        })
    }

}
