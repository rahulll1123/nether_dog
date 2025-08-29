import { Background } from "./background.js";
import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { states } from "./playerState.js";
import { AirEnemy, GroundEnemy } from "./enemy.js"

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    // canvas.width = 500;
    // canvas.height = 500;
    canvas.width = window.innerWidth - 6;
    canvas.height = window.innerHeight - 6;

    class Game {
        constructor(width, height) {
            this.isGameOver = false;
            this.width = width;
            this.height = height;
            this.fps = 30;
            this.score = 0;
            this.frameInterval = 1000 / this.fps;
            this.timeToNextFrame = 0;
            this.gameSpeed = 5;
            this.groundSpeed = 5;
            this.flightSpeed = 5;
            this.margin = this.height / 6;
            this.player = new Player(this);
            this.input = new InputHandler();
            this.background = new Background(this);
            this.enemies = [];
            this.enemyInterval = 1000;
            this.groundEnemyInterval = this.enemyInterval;
            this.groundEnemyTimer = 0;
            this.airEnemyInterval = 800;
            this.airEnemyTimer = 0;
        }
        update(deltatime) {
            // player state effect
            if ((this.player.currState === this.player.states[states.SITTING])) {
                this.groundSpeed = 0;
            } else {
                this.groundSpeed = 5;
            }

            // enemies spawning
            // ground
            if (this.groundEnemyTimer > this.groundEnemyInterval) {
                if (Math.random() > .5) {
                    this.enemies.push(new GroundEnemy(this));
                    // console.log(this.enemies);
                }
                this.groundEnemyTimer = 0;
            } else {
                if (this.groundSpeed)
                    this.groundEnemyTimer += deltatime;
            }

            // air
            if (this.airEnemyTimer > this.airEnemyInterval) {
                if (Math.random() > .3) {
                    this.enemies.push(new AirEnemy(this));
                    this.airEnemyInterval = Math.random() * this.enemyInterval / 2 + this.enemyInterval / 2;
                    // console.log(this.enemies);
                }
                this.airEnemyTimer = 0;
            } else {
                this.airEnemyTimer += deltatime;
            }

            // this.player.checkCollision();


            // out of bound data clearation
            this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion)


            this.player.update(deltatime);
            this.enemies.forEach(enemy => {
                enemy.update(deltatime);
            })
            this.background.update();
        }
        draw(context) {
            this.background.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            //display score
            context.save();
            ctx.font = '48px serif';
            ctx.fillStyle = 'White';
            context.fillText("Score: " + this.score, 40, 50);
            ctx.fillStyle = 'Black';
            context.fillText("Score: " + this.score, 42, 52);
            context.restore();

            //display Health
            context.save();
            ctx.font = '24px serif';
            ctx.fillStyle = 'White';
            context.fillText("Lives: " + this.player.HeartCount, 40, 80);
            ctx.fillStyle = 'Black';
            context.fillText("Lives: " + this.player.HeartCount, 42, 82);
            context.restore();


            this.player.draw(context)

        }
    }
    const game = new Game(canvas.width, canvas.height);
    let oldtimestamp = 0;
    let deltatime = 16;
    function animate(timestamp) {
        deltatime = timestamp - oldtimestamp;
        oldtimestamp = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltatime);
        game.draw(ctx);
        if (!game.isGameOver)
            requestAnimationFrame(animate)
    }
    animate(0);
})