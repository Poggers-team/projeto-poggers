// objeto do asteroide
export class Asteroid
{
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}