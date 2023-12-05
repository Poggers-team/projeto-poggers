// objeto da nave
export class Spaceship
{
    constructor(x, y, width, height, speed) { 
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.speed = speed; 
    }

    moveLeft() { 
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight(canvasWidth) { 
        if (this.x < canvasWidth - this.width) {
            this.x += this.speed;
        }
    }

    draw(context) { 
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}