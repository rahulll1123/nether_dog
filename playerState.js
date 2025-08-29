export const states = {
    IDEAL: 0,
    RUNNING: 1,
    SITTING: 2,
    JUMPING: 3,
    FALLING: 4,
    DASH: 5,
    HIT: 6,
    KO: 7
}

class State {
    constructor(player, state) {
        this.player = player;
        this.state = state;
    }
}

export class Ideal extends State {
    constructor(player) {
        super(player, "IDEAL");
    }
    enter() {
        // this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.frameCount = 9;
        this.player.vX = 0;
    }
    handelInput(input) {
        if (input.keys.includes("ArrowRight") || input.keys.includes("ArrowLeft")) {
            this.player.currState = this.player.states[states.RUNNING]
            this.player.currState.enter();
        }

    }
}
export class Running extends State {
    constructor(player) {
        super(player, "RUNNING");
    }
    enter() {
        this.player.frameY = 3;
        this.player.frameCount = 9;
    }
    handelInput(input) {
        if (input.keys.includes("ArrowRight")) {
            this.player.vX = this.player.maxvX;
        } else if (input.keys.includes("ArrowLeft")) {
            this.player.vX = this.player.maxvX * -1;
        } else {
            this.player.vX = 0;
            if (input.keys.includes("ArrowDown")) {
                this.player.currState = this.player.states[states.SITTING]
                this.player.currState.enter();
            }
        }

        if (input.keys.includes("ArrowUp")) {
            this.player.currState = this.player.states[states.JUMPING]
            this.player.currState.enter();
        }

        // if (input.keys.includes(" ")) {
        //     this.player.currState = this.player.states[states.DASH]
        //     this.player.currState.enter();
        // }
    }
}

export class Sitting extends State {
    constructor(player) {
        super(player, "SITTING");
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.frameCount = 2;
        this.player.vX = 0;
    }
    handelInput(input) {
        if (input.keys.includes("ArrowRight") || input.keys.includes("ArrowLeft")) {
            this.player.currState = this.player.states[states.RUNNING]
            this.player.currState.enter();
        }
        if (input.keys.includes("ArrowUp")) {
            this.player.currState = this.player.states[states.JUMPING]
            this.player.currState.enter();
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super(player, "JUMPING");
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.frameCount = 7;
        this.player.vY = this.player.maxvY;
    }
    handelInput(input) {
        if (input.keys.includes("ArrowRight")) {
            this.player.vX = this.player.maxvX;
        } else if (input.keys.includes("ArrowLeft")) {
            this.player.vX = this.player.maxvX * -1;
        }

        if (input.keys.includes("ArrowDown")) {
            this.player.vY = 0;
        }
        if (this.player.vY <= 0) {
            this.player.currState = this.player.states[states.FALLING]
            this.player.currState.enter();
        }

    }
}
export class Falling extends State {
    constructor(player) {
        super(player, "JUMPING");
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.frameCount = 7;
    }
    handelInput(input) {
        if (input.keys.includes("ArrowRight")) {
            this.player.vX = this.player.maxvX;
        } else if (input.keys.includes("ArrowLeft")) {
            this.player.vX = this.player.maxvX * -1;
        }

        if (this.player.onGround()) {
            this.player.currState = this.player.states[states.RUNNING]
            this.player.currState.enter();
        }
        // if (input.keys.includes(" ")) {
        //     this.player.currState = this.player.states[states.DASH]
        //     this.player.currState.enter();
        // }

    }
}

export class Dash extends State {
    constructor(player) {
        super(player, "DASH");
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.frameCount = 7;
        this.player.vX = this.player.maxvX * 2;
        this.player.weight *= 2;
    }
    handelInput(input) {
        if (input.keys.includes(" ")) {
            if (input.keys.includes("ArrowRight")) {
                this.player.vX = this.player.maxvX * 2;
            } else if (input.keys.includes("ArrowLeft")) {
                this.player.vX = this.player.maxvX * -2;
            } else {
                this.player.vX = this.player.maxvX;
            }
            if (input.keys.includes("ArrowUp") && this.player.onGround()) {
                this.player.vY = this.player.maxvY * Math.sqrt(2);
            }
        } else {
            this.player.currState = this.player.states[states.RUNNING]
            this.player.currState.enter();
            this.player.weight /= 2;
        }

    }
}
export class Hit extends State {
    constructor(player) {
        super(player, "HIT");
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 4;
        this.player.frameCount = 11;
        this.player.vX = 0;
        this.player.vY = 0;
        this.player.game.score--;
        this.player.HeartCount--;
    }
    handelInput(input) {
        if (this.player.HeartCount <= 0) {
            this.player.currState = this.player.states[states.KO]
            this.player.currState.enter();

        } else if (this.player.frameX >= 10) {
            this.player.currState = this.player.states[states.RUNNING]
            this.player.currState.enter();
        }
    }
}
export class Ko extends State {
    constructor(player) {
        super(player, "KO");
    }
    enter() {

        this.player.frameX = 0;
        this.player.frameY = 8;
        this.player.frameCount = 12;
        this.player.vX = 0;
        this.player.vY = 0;
    }
    handelInput(input) {
        if (this.player.frameX >= 11) {
            this.player.game.isGameOver = true;
            // console.log("game over: "+this.player.game.isGameOver);
        }
    }
}




