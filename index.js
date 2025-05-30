const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const score = document.getElementById('score');
const s = new Snake();
let f = new Food();
const scaleValue = 20;
document.addEventListener("keydown", keyPressed);

const fpsInterval = 1000 / 10;
let startTime = Date.now();


function Snake() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.xspeed = 1;
    this.yspeed = 0;

    this.total = 0;
    this.tail = [];

    this.update = () => {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.total - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = {x: this.x, y: this.y};

        if (this.x < canvas.width && this.y < canvas.height && this.x >= 0 && this.y >= 0) {
            this.x = this.x + this.xspeed * scaleValue;
            this.y = this.y + this.yspeed * scaleValue;
        } else {
            if (this.x >= canvas.width - scaleValue) {
                this.x = 1;
            } else if (this.y >= canvas.height - scaleValue) {
                this.y = 1;
            } else if (this.x <= 0) {
                this.x = canvas.width - scaleValue;
            } else if (this.y <= 0) {
                this.y = canvas.height - scaleValue;
            }
        }
    }

    this.show = () => {
        context.fillStyle = "white";
        for (let i = 0; i < this.total; i++) {
            context.fillRect(this.tail[i].x, this.tail[i].y, scaleValue, scaleValue);
        }
        context.fillRect(this.x, this.y, scaleValue, scaleValue);
    }

    this.eat = (food) => {
        const distance = Math.floor(Math.sqrt(Math.pow(this.x - food.x, 2) + Math.pow(this.y - food.y, 2)));
        if (distance < scaleValue) {
            this.total++;
            score.innerHTML = this.total;
            return true;
        } else {
            return false;
        }
    }

    this.kill = () => {

    }
}

function Food() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
}


function keyPressed(e) {
    if (e.key == "ArrowUp") {
        if (s.yspeed === 1) return;
        s.xspeed = 0;
        s.yspeed = -1;
    } else if (e.key == "ArrowRight") {
        if (s.xspeed === -1) return;
        s.xspeed = 1;
        s.yspeed = 0;
    } else if (e.key == "ArrowDown") {
        if (s.yspeed === -1) return;
        s.xspeed = 0;
        s.yspeed = 1;
    } else if (e.key == "ArrowLeft") {
        if (s.xspeed === 1) return;
        s.xspeed = -1;
        s.yspeed = 0;
    }
}

function updateGameState() {

    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime > fpsInterval) {
        startTime = currentTime - (elapsedTime % fpsInterval);
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.fillStyle = "red";
        context.arc(f.x, f.y, 10, 0, 2 * Math.PI);
        context.fill();

        s.update();
        s.show();
        if (s.eat(f)) {
            f = new Food();
        }
    }

    window.requestAnimationFrame(updateGameState);
}

updateGameState();
