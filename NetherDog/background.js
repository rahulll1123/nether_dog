class Layer {
    constructor(game, image, speed) {
        this.game = game;
        this.image = image;
        this.width = 2400;
        this.height = 720;
        this.drawHeight = this.game.height;
        this.drawWidth = this.width * this.game.height / this.height;
        this.x = 0;
        this.y = 0;
        this.speed = speed;
    }
    update() {
        if (this.x <= -this.drawWidth) this.x += this.drawWidth;
        this.x -= this.speed * this.game.groundSpeed;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.drawWidth, this.drawHeight);
        context.drawImage(this.image, this.x + this.drawWidth, this.y, this.drawWidth, this.drawHeight);
    }
}
export class Background {
    constructor(game) {
        this.game = game;
        this.layer1image = document.getElementById("layer1");
        this.layer2image = document.getElementById("layer2");
        this.layer3image = document.getElementById("layer3");
        this.layer4image = document.getElementById("layer4");
        this.layer5image = document.getElementById("layer5");
        this.layers = [
            new Layer(game, this.layer1image, .2),
            new Layer(game, this.layer2image, .3),
            new Layer(game, this.layer3image, .5),
            new Layer(game, this.layer4image, .8),
            new Layer(game, this.layer5image, 1),
        ];

    }
    update() {
        this.layers.forEach(layer => {
            layer.update();
        })
    }
    draw(context) {

        this.layers.forEach(layer => {
            layer.draw(context);
        })
    }
}