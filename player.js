import { states, Ideal, Running, Sitting, Jumping, Falling, Dash, Hit, Ko } from "./playerState.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100.3;
        this.height = 91.3;
        this.bottom = this.game.height - this.height - this.game.margin;
        this.right = this.game.width - this.width;
        this.x = 0;
        this.y = this.bottom;
        this.image = document.getElementById("player");
        this.vX = 0;
        this.maxvX = game.gameSpeed;
        this.weight = .5;
        this.vY = 0;
        this.maxvY = Math.sqrt(2 * this.weight * (this.bottom));
        this.frameX = 0;
        this.frameY = 0;
        this.frameCount = 7;
        this.dashDuration = 1000;
        this.currDash = 0;
        this.isDashable = true;
        this.states = [new Ideal(this), new Running(this), new Sitting(this), new Jumping(this), new Falling(this), new Dash(this), new Hit(this), new Ko(this)];
        this.currState = this.states[states.RUNNING];
        this.currState.enter();
        this.HeartCount = 10;
    }
    update(deltatime) {
        this.checkCollision();
        this.currState.handelInput(this.game.input);

        //movement
        this.x += this.vX;
        this.y -= this.vY;
        this.vY -= this.weight;

        //powerUpRistriction
        // if(this.currDash > this.dashDuration){
        //     this.isDashable=false;
        // }else()

        //boundary
        if (this.x >= this.right) this.x = this.right;
        else if (this.x < 0) this.x = 0;
        if (this.y >= this.bottom) {
            this.y = this.bottom;
        }

        // frame Update
        if (this.game.timeToNextFrame > this.game.frameInterval) {
            this.frameX = (this.frameX + 1) % this.frameCount;
            this.game.timeToNextFrame = 0;
        } else {
            this.game.timeToNextFrame += deltatime;
        }
    }
    draw(context) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return (this.y >= this.bottom);
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width &&
                enemy.x + enemy.cwidth > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.cheight > this.y) {
                enemy.markForDeletion = true;
                if ("GroundEnemy" == enemy.id) {
                    if (this.HeartCount <= 0) {
                        this.currState = this.states[states.KO]
                        this.currState.enter();
                    } else {
                        this.currState = this.states[states.HIT]
                        this.currState.enter();
                    }
                } else {
                    this.game.score++;
                }
                // console.log(this.game.score);
            }
        })
    }
}