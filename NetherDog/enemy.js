class Enemy {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.fps = 50;
        this.frameInterval = 1000 / this.fps;
        this.timeToNextFrame = 0;
        this.markForDeletion = false;
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.id = "GroundEnemy";
        this.width = 55.75;
        this.height = 80;
        this.scale = 1;
        this.cwidth = this.width * this.scale;
        this.cheight = this.height * this.scale;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.margin;
        this.image = document.getElementById("groundEnemy1");
    }
    update(deltatime) {
        this.x -= this.game.groundSpeed;
        if (this.x < -this.width) {
            this.markForDeletion = true;
        }
    }
    draw(context) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export class AirEnemy extends Enemy {
    constructor(game) {
        super(game)
        this.width = 266;
        this.height = 188;
        this.scale = .4;
        this.cwidth = this.width * this.scale;
        this.cheight = this.height * this.scale;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height / 2 - this.height * this.scale);
        this.spawnY = this.y;
        this.angle = 0;
        this.anglerate = .11;
        this.image = document.getElementById("groundEnemy2");
    }
    update(deltatime) {
        this.x -= this.game.flightSpeed;
        this.angle += this.anglerate;
        this.y = this.spawnY + Math.sin(this.angle) * 10 - 5;
        if (this.x < -this.width) {
            this.markForDeletion = true;
        }
    }
    draw(context) {
        // context.strokeRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
}
